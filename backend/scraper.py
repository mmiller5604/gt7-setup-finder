"""
GTPlanet scraper — searches within garage-style tuning threads for posts
mentioning the car name, then returns setup image URLs from those posts.

GTPlanet organises setups inside "tuning garage" threads (e.g. "Jeje6410 GT7
Tune Garage") rather than per-car threads. So we:
  1. Collect the top garage threads from the board listing.
  2. For each thread, scan every page for posts that mention the car name.
  3. Collect attachment image URLs from those matching posts.
"""

import re
import httpx
from bs4 import BeautifulSoup

BOARD_URL = "https://www.gtplanet.net/forum/board/gt7-car-tuning.458/"
HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/124.0.0.0 Safari/537.36"
    ),
    "Accept-Language": "en-US,en;q=0.9",
}

MAX_BOARD_PAGES = 1    # board listing pages to scan for garage threads
MAX_GARAGE_THREADS = 4 # how many garage threads to search inside
MAX_THREAD_PAGES = 3   # pages per garage thread to scan
MAX_POSTS = 8          # total matching posts to collect before stopping


def _normalize(text: str) -> str:
    """Lowercase and strip non-alphanumeric chars for fuzzy matching."""
    return re.sub(r"[^a-z0-9 ]", "", text.lower())


# Brand words that are too generic to match on their own
BRAND_WORDS = {
    "toyota", "honda", "nissan", "mazda", "subaru", "mitsubishi", "lexus",
    "ferrari", "lamborghini", "porsche", "mclaren", "bugatti", "pagani",
    "aston", "martin", "jaguar", "bentley", "rolls", "royce",
    "bmw", "mercedes", "amg", "audi", "volkswagen", "renault", "peugeot",
    "chevrolet", "ford", "dodge", "shelby", "corvette", "mustang",
    "car", "the", "this", "with", "that", "for", "and", "gran", "turismo",
}


def _expand_keywords(keywords: list[str]) -> list[str]:
    """
    Expand keyword list with numeric sub-parts so 'gr86' also matches '86',
    and 'rs01' also matches '01', etc.
    """
    expanded = list(keywords)
    for kw in keywords:
        nums = re.findall(r"\d+", kw)
        for n in nums:
            if n not in expanded and len(n) >= 2:
                expanded.append(n)
    return expanded


def _post_mentions_car(post_text: str, car: str) -> bool:
    """
    Return True if the post mentions the specific car.

    Strategy:
    1. Try ALL keywords (strict).
    2. Fall back to model-specific keywords (non-brand) with any() match,
       also expanding alphanumeric codes like 'gr86' → '86' so community
       shorthand names still match.
    """
    norm_post = _normalize(post_text)
    all_keywords = [w for w in _normalize(car).split() if len(w) > 1]

    # Pass 1: all keywords must match
    if all_keywords and all(kw in norm_post for kw in all_keywords):
        return True

    # Pass 2: any model-specific keyword (expanded with numeric variants) matches
    model_keywords = _expand_keywords(
        [w for w in all_keywords if w not in BRAND_WORDS and len(w) > 2]
    )
    if model_keywords and any(kw in norm_post for kw in model_keywords):
        return True

    return False


def _is_garage_thread(title: str) -> bool:
    """
    Return True if the thread is a tuning garage (contains many car setups)
    rather than a single-topic discussion thread.
    """
    norm = _normalize(title)
    garage_keywords = ["tune", "tuning", "garage", "setup", "settings", "tunes"]
    return any(kw in norm for kw in garage_keywords)


def _get_garage_threads() -> list[dict]:
    """Fetch the board listing and return the top garage-style threads."""
    threads = []
    with httpx.Client(headers=HEADERS, timeout=15, follow_redirects=True) as client:
        for page in range(1, MAX_BOARD_PAGES + 1):
            url = BOARD_URL if page == 1 else f"{BOARD_URL}page-{page}"
            try:
                resp = client.get(url)
                resp.raise_for_status()
            except httpx.HTTPError:
                break

            soup = BeautifulSoup(resp.text, "html.parser")
            items = soup.select("div.structItem--thread")
            if not items:
                break

            for item in items:
                title_tag = item.select_one("div.structItem-title a[data-tp-primary]")
                if not title_tag:
                    continue
                title = title_tag.get_text(strip=True)
                href = title_tag.get("href", "")
                if not href.startswith("http"):
                    href = f"https://www.gtplanet.net{href}"

                if _is_garage_thread(title):
                    threads.append({"title": title, "url": href})
                    if len(threads) >= MAX_GARAGE_THREADS:
                        return threads

    return threads


def _get_images_for_car_in_thread(thread_url: str, car: str) -> list[dict]:
    """
    Scan all pages of a thread. For each post that mentions the car,
    collect attachment image URLs from that post.
    Returns list of {"thread_url", "thread_title", "image_url"}.
    """
    results = []
    thread_title = ""

    with httpx.Client(headers=HEADERS, timeout=15, follow_redirects=True) as client:
        for page in range(1, MAX_THREAD_PAGES + 1):
            url = thread_url if page == 1 else f"{thread_url}page-{page}"
            try:
                resp = client.get(url)
                resp.raise_for_status()
            except httpx.HTTPError:
                break

            soup = BeautifulSoup(resp.text, "html.parser")

            # Grab thread title once
            if not thread_title:
                h1 = soup.select_one("h1.p-title-value")
                thread_title = h1.get_text(strip=True) if h1 else thread_url

            posts = soup.select("article.message-body")
            if not posts:
                break

            for post in posts:
                post_text = post.get_text()
                if not _post_mentions_car(post_text, car):
                    continue

                post_text_clean = post.get_text(separator=" ", strip=True)
                record: dict = {
                    "thread_title": thread_title,
                    "thread_url": thread_url,
                    "post_text": post_text_clean,
                }
                # Collect attachment image URLs as bonus context (may be setup screenshots)
                for img in post.select("img"):
                    src = img.get("src", "")
                    if not src:
                        continue
                    if not src.startswith("http"):
                        src = f"https://www.gtplanet.net{src}"
                    if "/forum/attachments/" not in src:
                        continue
                    record.setdefault("image_urls", []).append(src)
                results.append(record)

            if len(results) >= MAX_POSTS:
                return results

    return results


def fetch_setup_images(car: str, track: str) -> list[dict]:
    """
    Main entry point. Finds community posts mentioning the car from GTPlanet.
    Returns a list of {"thread_title", "thread_url", "post_text", "image_urls"?} dicts.
    """
    garage_threads = _get_garage_threads()
    all_posts = []

    for thread in garage_threads:
        posts = _get_images_for_car_in_thread(thread["url"], car)
        all_posts.extend(posts)
        if len(all_posts) >= MAX_POSTS:
            break

    return all_posts[:MAX_POSTS]
