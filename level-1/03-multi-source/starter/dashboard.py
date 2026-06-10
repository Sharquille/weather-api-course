"""
Level 1 — Phase 03: Multi-Source Aggregation (STARTER)

Fetch weather from 3 sources in parallel. Show them side by side.
"""

import os
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

import requests
from dotenv import load_dotenv

load_dotenv(Path(__file__).parent / ".env")


# ─────────────────────────────────────────────
#  Part A — Three source callables
# ─────────────────────────────────────────────


def fetch_open_meteo(city: str) -> dict:
    """
    TODO 1: Geocode the city, then fetch from Open-Meteo.
    Return a normalised dict:
        {"source": "Open-Meteo", "temp_c": float, "wind_kph": float, "humidity": int, "desc": str}
    """
    pass


def fetch_openweather(city: str) -> dict:
    """
    TODO 2: Call OpenWeatherMap.
    Use OPENWEATHER_API_KEY from env. Convert m/s wind to km/h.
    Return the same normalised dict shape.
    """
    pass


def fetch_weatherapi(city: str) -> dict:
    """
    TODO 3: Call WeatherAPI.
    Use WEATHERAPI_KEY from env.
    Return the same normalised dict shape.
    """
    pass


# ─────────────────────────────────────────────
#  Part B — Parallel orchestration
# ─────────────────────────────────────────────

SOURCES = {
    "Open-Meteo": fetch_open_meteo,
    "OpenWeatherMap": fetch_openweather,
    "WeatherAPI": fetch_weatherapi,
}


def fetch_all(city: str) -> list[dict]:
    """
    TODO 4: Use ThreadPoolExecutor to call all 3 sources in parallel.
    Collect successful results. Failed sources should be skipped (not crash).
    Return a list of normalised dicts.
    """
    pass


# ─────────────────────────────────────────────
#  Part C — Render
# ─────────────────────────────────────────────


def render_table(results: list[dict]) -> str:
    """
    TODO 5: Format results as a fixed-width table.
    Columns: Source, Temp °C, Wind kph, Humidity, Description
    """
    pass


# ─────────────────────────────────────────────
#  Part D — Main
# ─────────────────────────────────────────────

if __name__ == "__main__":
    import sys

    city = sys.argv[1] if len(sys.argv) > 1 else "Roseau"

    # TODO 6: Time the fetch, print the table, print the elapsed time
