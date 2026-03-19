# GT7 Setup Finder

> AI-powered car tuning recommendations for Gran Turismo 7

[![React](https://img.shields.io/badge/React-18-61dafb?logo=react&logoColor=white&labelColor=20232a)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5-646cff?logo=vite&logoColor=white&labelColor=1a1a2e)](https://vitejs.dev)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![Python](https://img.shields.io/badge/Python-3.11+-3776ab?logo=python&logoColor=white)](https://python.org)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

GT7 Setup Finder lets you pick any car and track from Gran Turismo 7's full roster and instantly receive two AI-generated tuning setups — one **aggressive** (for maximum performance) and one **safe** (for stability and consistency).

---

## Features

- **562 cars & 100+ track layouts** — the complete GT7 roster in a searchable, manufacturer-grouped dropdown
- **Two setups per search** — Aggressive vs Safe, covering suspension, aero, brakes, LSD, tyres, and transmission
- **Community-sourced context** — the backend scrapes GTPlanet forum threads for your car, feeding real community knowledge into the AI
- **Smart caching** — results are stored in SQLite so repeat lookups are instant (the "cached" badge tells you when)
- **Shareable URLs** — every search updates the URL (`?car=...&track=...`), making results bookmarkable and shareable
- **Copy to clipboard** — one-click copy of any setup as formatted plain text for in-game reference
- **Rate limited** — 6 requests / minute per IP to protect API costs
- **Input validated** — car and track values are checked against a hardcoded allowlist before hitting the scraper

---

## Architecture

```
Browser (React + Vite)
        │
        │  GET /setups?car=...&track=...
        ▼
FastAPI backend (Python)
        │
        ├─── SQLite cache (setups.db)  ←─── cache hit → return instantly
        │
        └─── Cache miss
                │
                ├─ Scraper (httpx + BeautifulSoup)
                │    └─ GTPlanet forum threads for the car
                │
                └─ Claude API (Anthropic)
                     └─ Generate aggressive + safe setups
                          using community post context
```

### Data flow

1. Frontend calls `GET /setups?car=Toyota GR86 RZ '21&track=Brands Hatch Grand Prix`
2. Backend validates both params against `VALID_CARS` / `VALID_TRACKS` allowlists
3. Checks SQLite cache — if found, returns immediately with `"source": "cache"`
4. On cache miss, scraper searches GTPlanet for the car name, collects up to 5 matching community posts
5. Post text is passed to Claude as context. Claude generates both setups as structured JSON.
6. Result saved to SQLite and returned to the frontend

---

## Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React 18, Vite 5, react-select |
| Styling | Plain CSS (no framework), Inter font |
| HTTP client (FE) | axios |
| Backend | Python 3.11, FastAPI, uvicorn |
| Scraper | httpx, BeautifulSoup4 |
| AI | Anthropic Claude (claude-opus-4-6) |
| Cache | SQLite (Python built-in `sqlite3`) |
| Rate limiting | slowapi |

---

## Local Development

### Prerequisites

- Node 18+
- Python 3.11+
- An [Anthropic API key](https://console.anthropic.com)

### 1. Clone and install

```bash
git clone https://github.com/yourname/gt7-setup-finder.git
cd gt7-setup-finder

# Frontend
npm install

# Backend
cd backend
python -m venv .venv
source .venv/bin/activate      # Windows: .venv\Scripts\activate
pip install -r requirements.txt
```

### 2. Configure environment

```bash
# Frontend (optional — defaults to localhost:8000)
cp .env.example .env.local
# Edit VITE_API_URL if your backend runs elsewhere

# Backend (required)
cp backend/.env.example backend/.env
# Add your ANTHROPIC_API_KEY to backend/.env
```

### 3. Run

```bash
# Terminal 1 — backend
cd backend
uvicorn main:app --reload

# Terminal 2 — frontend
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

---

## Deployment

### Recommended split

| Component | Host |
|-----------|------|
| Frontend (`npm run build` → `dist/`) | Any static host (BisectHosting, Netlify, Vercel, GitHub Pages) |
| Backend (FastAPI) | Railway, Fly.io, or any VPS |

### Backend environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `ANTHROPIC_API_KEY` | ✅ | Your Anthropic API key |
| `ALLOWED_ORIGINS` | ✅ | Comma-separated list of allowed CORS origins (e.g. `https://yoursite.com,http://localhost:5173`) |

### Frontend environment variables

| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Backend URL (e.g. `https://gt7-api.railway.app`). Defaults to `http://localhost:8000`. |

---

## API Reference

### `GET /setups`

Returns aggressive and safe setups for a car + track combination.

| Param | Type | Description |
|-------|------|-------------|
| `car` | string | Exact car name from the GT7 roster |
| `track` | string | Exact track name from the GT7 track list |
| `force` | bool | If `true`, bypass cache and regenerate |

**Response**

```json
{
  "source": "cache",
  "car": "Toyota GR86 RZ '21",
  "track": "Brands Hatch Grand Prix",
  "aggressive": {
    "suspension": { "front_height": "65", "rear_height": "65", ... },
    "aero": { "front_downforce": "250", "rear_downforce": "300" },
    "brakes": { "balance": "3", "front_pressure": "80", "rear_pressure": "70" },
    "lsd": { "initial_torque": "10", "accel_sensitivity": "20", "decel_sensitivity": "5" },
    "tyres": { "front": "Sports Hard", "rear": "Sports Hard" },
    "transmission": { "final_gear": "3.45" },
    "_source_url": "https://www.gtplanet.net/forum/..."
  },
  "safe": { ... }
}
```

### `GET /popular`

Returns the 6 most-searched car + track combinations (cached search counts).

---

## Project Structure

```
gt7-setup-finder/
├── src/
│   ├── api/
│   │   └── setups.js          # axios client
│   ├── components/
│   │   ├── TopBar.jsx/css     # Car + track selectors
│   │   ├── ResultsPanel.jsx/css
│   │   ├── Footer.jsx/css
│   │   └── StaticPage.jsx/css # Terms + Privacy pages
│   ├── data/
│   │   ├── cars.js            # 562 cars, grouped by manufacturer
│   │   └── tracks.js          # 100+ GT7 track layouts
│   ├── App.jsx                # Router + shareable URL logic
│   └── index.css
├── backend/
│   ├── main.py                # FastAPI app, rate limiting, CORS, cache
│   ├── scraper.py             # GTPlanet scraper
│   ├── extractor.py           # Claude setup generation
│   ├── allowlists.py          # Valid car + track sets
│   └── requirements.txt
├── index.html                 # SEO meta tags
└── vite.config.js
```

---

## Disclaimer

GT7 Setup Finder is an unofficial fan tool and is not affiliated with, endorsed by, or connected to Sony Interactive Entertainment, Polyphony Digital, or Gran Turismo in any way. All car names, track names, and related trademarks are the property of their respective owners. Setup data is AI-generated using community sources as context — use at your own discretion. Always test setups carefully before racing.

---

## License

MIT
