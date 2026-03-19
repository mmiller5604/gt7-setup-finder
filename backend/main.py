"""
GT7 Setup Finder — FastAPI backend

GET /setups?car=Ferrari+458+Italia&track=Nürburgring+Nordschleife
GET /setups?car=...&track=...&force=true  (bypass cache, regenerate)

Flow:
  1. Validate car + track against known allowlists
  2. Check SQLite cache
  3. Cache miss → scrape GTPlanet → extract via Claude → cache result
  4. Return { aggressive: {...}, safe: {...} }
"""

import asyncio
import os
import sqlite3
import json
from pathlib import Path

import anthropic
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Query, Request
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

from extractor import extract_setups_from_images
from scraper import fetch_setup_images
from allowlists import VALID_CARS, VALID_TRACKS

load_dotenv(override=True)

# ── Rate limiter ─────────────────────────────────────────────────────────────
limiter = Limiter(key_func=get_remote_address)

# ── App setup ────────────────────────────────────────────────────────────────
app = FastAPI(title="GT7 Setup Finder", version="0.1.0")
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# ── CORS ─────────────────────────────────────────────────────────────────────
_raw_origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173")
ALLOWED_ORIGINS = [o.strip() for o in _raw_origins.split(",") if o.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_methods=["GET"],
    allow_headers=["*"],
)

# ── SQLite cache ─────────────────────────────────────────────────────────────
DB_PATH = Path(__file__).parent / "setups.db"


def _get_db() -> sqlite3.Connection:
    conn = sqlite3.connect(DB_PATH)
    conn.execute("""
        CREATE TABLE IF NOT EXISTS setups (
            cache_key   TEXT PRIMARY KEY,
            car         TEXT NOT NULL,
            track       TEXT NOT NULL,
            aggressive  TEXT,
            safe        TEXT,
            created_at  TEXT DEFAULT (datetime('now'))
        )
    """)
    conn.execute("""
        CREATE TABLE IF NOT EXISTS search_counts (
            cache_key TEXT PRIMARY KEY,
            count     INTEGER DEFAULT 1
        )
    """)
    conn.commit()
    return conn


def _cache_key(car: str, track: str) -> str:
    return f"{car}::{track}"


def _read_cache(key: str) -> dict | None:
    with _get_db() as conn:
        row = conn.execute(
            "SELECT aggressive, safe FROM setups WHERE cache_key = ?", (key,)
        ).fetchone()
    if row is None:
        return None
    return {
        "aggressive": json.loads(row[0]) if row[0] else None,
        "safe": json.loads(row[1]) if row[1] else None,
    }


def _write_cache(key: str, car: str, track: str, result: dict) -> None:
    agg = json.dumps(result["aggressive"]) if result["aggressive"] else None
    saf = json.dumps(result["safe"]) if result["safe"] else None
    with _get_db() as conn:
        conn.execute(
            """INSERT OR REPLACE INTO setups (cache_key, car, track, aggressive, safe)
               VALUES (?, ?, ?, ?, ?)""",
            (key, car, track, agg, saf),
        )
        conn.execute(
            """INSERT INTO search_counts (cache_key, count) VALUES (?, 1)
               ON CONFLICT(cache_key) DO UPDATE SET count = count + 1""",
            (key,),
        )
        conn.commit()


def _increment_count(key: str) -> None:
    """Increment hit counter for cached results."""
    with _get_db() as conn:
        conn.execute(
            """INSERT INTO search_counts (cache_key, count) VALUES (?, 1)
               ON CONFLICT(cache_key) DO UPDATE SET count = count + 1""",
            (key,),
        )
        conn.commit()


# ── Endpoints ─────────────────────────────────────────────────────────────────

@app.get("/setups")
@limiter.limit("6/minute")
async def get_setups(
    request: Request,
    car: str = Query(..., description="Car name (must be a valid GT7 car)"),
    track: str = Query(..., description="Track name (must be a valid GT7 track)"),
    force: bool = Query(False, description="Bypass cache and regenerate"),
):
    # ── Input validation ─────────────────────────────────────────────────────
    if car not in VALID_CARS:
        raise HTTPException(
            status_code=400,
            detail=f"Unknown car '{car}'. Please select from the supported car list.",
        )
    if track not in VALID_TRACKS:
        raise HTTPException(
            status_code=400,
            detail=f"Unknown track '{track}'. Please select from the supported track list.",
        )

    # ── API key ──────────────────────────────────────────────────────────────
    api_key = os.getenv("ANTHROPIC_API_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="Service not configured. Please try again later.")

    # ── Cache lookup ─────────────────────────────────────────────────────────
    key = _cache_key(car, track)

    if not force:
        cached = _read_cache(key)
        if cached:
            _increment_count(key)
            return {"source": "cache", "car": car, "track": track, **cached}

    # ── Scrape + generate ────────────────────────────────────────────────────
    # Run sync scraper in a thread pool so it doesn't block the event loop
    post_records = await asyncio.to_thread(fetch_setup_images, car, track)

    if not post_records:
        raise HTTPException(
            status_code=404,
            detail=f"No community posts found on GTPlanet for '{car}'.",
        )

    anthropic_client = anthropic.Anthropic(api_key=api_key)
    result = await asyncio.to_thread(
        extract_setups_from_images, post_records, car, track, anthropic_client
    )

    if result["aggressive"] is None and result["safe"] is None:
        raise HTTPException(
            status_code=404,
            detail=f"Found community posts for '{car}' but could not generate setup values.",
        )

    _write_cache(key, car, track, result)
    return {"source": "scraped", "car": car, "track": track, **result}


@app.get("/popular")
async def get_popular(limit: int = Query(6, ge=1, le=20)):
    """Return the most-searched car+track combos."""
    with _get_db() as conn:
        rows = conn.execute(
            """SELECT s.car, s.track, sc.count
               FROM search_counts sc
               JOIN setups s ON s.cache_key = sc.cache_key
               ORDER BY sc.count DESC
               LIMIT ?""",
            (limit,),
        ).fetchall()
    return [{"car": r[0], "track": r[1], "count": r[2]} for r in rows]


@app.get("/health")
async def health():
    return {"status": "ok", "version": "0.1.0"}
