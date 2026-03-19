"""
Uses Claude to generate GT7 car setups from community post text scraped from GTPlanet.

Instead of Vision on images (which are decorative car photos), we:
1. Collect post text from threads where the car is mentioned.
2. Send that community context + car/track info to Claude.
3. Claude generates two complete setups (aggressive + safe) using context + GT7 knowledge.
"""

import json
import anthropic

SETUP_SCHEMA = {
    "suspension": {
        "front_height": "",
        "rear_height": "",
        "front_spring_rate": "",
        "rear_spring_rate": "",
        "front_arb": "",
        "rear_arb": "",
        "front_damper_compression": "",
        "front_damper_extension": "",
        "rear_damper_compression": "",
        "rear_damper_extension": "",
        "front_camber": "",
        "rear_camber": "",
        "front_toe": "",
        "rear_toe": "",
    },
    "aero": {
        "front_downforce": "",
        "rear_downforce": "",
    },
    "brakes": {
        "balance": "",
        "front_pressure": "",
        "rear_pressure": "",
    },
    "lsd": {
        "initial_torque": "",
        "accel_sensitivity": "",
        "decel_sensitivity": "",
    },
    "tyres": {
        "front": "",
        "rear": "",
    },
    "transmission": {
        "final_gear": "",
    },
    "_source_url": "",
}

GENERATE_PROMPT = """\
You are an expert Gran Turismo 7 tuner. A user wants setups for the **{car}** at **{track}**.

Below is community-sourced information from GTPlanet tuning threads for this car:

---
{community_context}
---

Using this community data as context (it may contain tyre compounds, PP ratings, tuning tips, \
or partial values), generate TWO complete GT7 car setups:

1. An **AGGRESSIVE** setup — stiffer springs and ARB, higher downforce, harder tyres (SS/RS), \
more LSD sensitivity, more negative camber. Focused on maximum performance for experienced drivers.

2. A **SAFE** setup — softer springs, lower downforce, softer tyres (SH/SM or RH/RM), lower LSD \
settings, more neutral alignment. Forgiving and easy to drive consistently.

Use realistic GT7 values for this car's category and the thread context as a guide.

Return ONLY a JSON object in this exact format (no markdown, no commentary):
{{
  "aggressive": {schema_with_source},
  "safe": {schema_with_source}
}}

Field rules:
- Numeric fields: return as string (e.g. "8.20", "-1.5", "55").
- Tyre compounds: use GT7 abbreviation (SH, SM, SS, RH, RM, RS, IM, IH, or "N/A" if irrelevant).
- Ride height in mm (e.g. "95").
- Spring rate in N/mm (e.g. "8.20").
- ARB: integer 1–10.
- Damper compression/extension: integer 1–10.
- Camber: degrees as negative float (e.g. "-2.5").
- Toe: degrees as string (e.g. "-0.10" for toe-in, "0.10" for toe-out).
- Downforce: integer (e.g. "250").
- Brake balance: e.g. "5+3" (front+rear on GT7 scale).
- Brake pressure: percentage string (e.g. "100%").
- LSD values: integer 1–60.
- Final gear: float (e.g. "3.500").
- _source_url: URL of the most relevant GTPlanet thread from the community context above.
- If the car has no adjustable aero, leave aero fields as "".
"""


def _build_community_context(post_records: list[dict]) -> tuple[str, str]:
    """
    Deduplicate posts and build a text block for Claude.
    Returns (context_text, best_thread_url).
    """
    seen_texts = set()
    parts = []
    best_url = ""

    for record in post_records:
        text = record.get("post_text", "").strip()
        if not text or text in seen_texts:
            continue
        seen_texts.add(text)
        thread_title = record.get("thread_title", "")
        thread_url = record.get("thread_url", "")
        if not best_url and thread_url:
            best_url = thread_url
        # Truncate very long posts to keep context manageable
        truncated = text[:800] + ("..." if len(text) > 800 else "")
        parts.append(f"[Thread: {thread_title}]\n{truncated}")

    context_text = "\n\n".join(parts) if parts else "No community posts found."
    return context_text, best_url


def extract_setups_from_images(
    post_records: list[dict],
    car: str,
    track: str,
    client: anthropic.Anthropic,
) -> dict:
    """
    Generate aggressive and safe GT7 setups for the given car+track using
    community post text as context for Claude.

    Returns: {"aggressive": {...}, "safe": {...}}
    """
    community_context, best_url = _build_community_context(post_records)

    # Build schema placeholders with _source_url included
    schema_with_source = json.dumps({**SETUP_SCHEMA, "_source_url": best_url}, indent=2)

    prompt = GENERATE_PROMPT.format(
        car=car,
        track=track,
        community_context=community_context,
        schema_with_source=schema_with_source,
    )

    try:
        response = client.messages.create(
            model="claude-opus-4-6",
            max_tokens=2048,
            messages=[{"role": "user", "content": prompt}],
        )
        raw = response.content[0].text.strip()

        # Strip markdown code fences if present
        if raw.startswith("```"):
            raw = raw.split("```")[1]
            if raw.startswith("json"):
                raw = raw[4:]
            raw = raw.strip()

        result = json.loads(raw)

        # Ensure _source_url is set if Claude left it blank
        for setup_type in ("aggressive", "safe"):
            setup = result.get(setup_type)
            if setup and not setup.get("_source_url"):
                setup["_source_url"] = best_url

        return {
            "aggressive": result.get("aggressive"),
            "safe": result.get("safe"),
        }
    except Exception:
        return {"aggressive": None, "safe": None}
