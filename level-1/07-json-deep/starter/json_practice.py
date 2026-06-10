"""
Level 1 — Phase 07: JSON Deep Dive (STARTER)

Run: python3 json_practice.py
"""

import json
import os
import requests
from pathlib import Path
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

CACHE_DIR = Path("./cache")
CACHE_DIR.mkdir(exist_ok=True)


# ─────────────────────────────────────────────
#  Part A — JSON file cache
# ─────────────────────────────────────────────


def save_response_to_file(data: dict, filename: str) -> None:
    """
    Save an API response dict to a JSON file.
    Adds a "cached_at" timestamp to the saved data.
    """
    # TODO 1: Add a "cached_at" key to data with the current timestamp
    #   Hint: datetime.now().isoformat()

    # TODO 2: Write the data to CACHE_DIR / filename using json.dump()
    #   Use indent=2 for readable output
    #
    # Hint:
    #   with open(CACHE_DIR / filename, "w") as f:
    #       json.dump(data, f, indent=2)
    pass


def load_response_from_file(filename: str) -> dict | None:
    """
    Load a previously saved JSON file.
    Returns None if the file does not exist.
    """
    # TODO 3: Check if CACHE_DIR / filename exists
    #   If not, return None
    #
    # TODO 4: Open and load the file with json.load()
    #   Return the parsed dict
    return None


# ─────────────────────────────────────────────
#  Part B — Safe nested access
# ─────────────────────────────────────────────


def safe_get(data: dict, *keys, default=None):
    """
    Safely navigate a nested dict without crashing.

    Usage:
        safe_get(data, "current", "condition", "text")
        safe_get(data, "location", "localtime", default="unknown")

    Returns default if any key in the chain is missing.
    """
    # TODO 5: Loop through the keys
    #   At each step, try to get the next key from the current level
    #   If the key doesn't exist or the value isn't a dict, return default
    #
    # Hint:
    #   for key in keys:
    #       if isinstance(data, dict):
    #           data = data.get(key, default)
    #       else:
    #           return default
    #   return data
    return default


# ─────────────────────────────────────────────
#  Part C — Batch fetcher from config
# ─────────────────────────────────────────────


def load_cities_config(config_file: str) -> list[dict]:
    """
    Load a list of cities from a JSON config file.
    Returns a list of dicts with "city" and optional "label" keys.

    Expected config format:
    [
      {"city": "Roseau", "label": "Home"},
      {"city": "London", "label": "UK"},
      {"city": "New York", "label": "NYC"}
    ]
    """
    # TODO 6: Read and parse the config file
    #   If file doesn't exist, return a default list of 3 cities
    #   Handle json.JSONDecodeError — return empty list if file is malformed
    return [
        {"city": "Roseau", "label": "Home"},
        {"city": "London", "label": "Reference"},
        {"city": "New York", "label": "Reference 2"},
    ]


def fetch_and_cache_cities(cities: list[dict]) -> dict:
    """
    Fetch weather for each city and save to cache.
    Returns a summary dict of all results.
    """
    results = {}
    api_key = os.getenv("OPENWEATHER_API_KEY")

    for entry in cities:
        city = entry["city"]
        label = entry.get("label", city)

        # TODO 7: Check the cache first
        #   cache filename: city.lower().replace(" ", "_") + ".json"
        #   If cache file exists, load and use it (print "from cache")
        #   If not, fetch from API and save to cache (print "fetched")

        # TODO 8: Fetch from OpenWeatherMap if not cached
        #   Extract: temp, humidity, description
        #   Store in results[label]

        print(f"  {label}: TODO")

    return results


# ─────────────────────────────────────────────
#  Part D — Schema validator
# ─────────────────────────────────────────────

EXPECTED_KEYS = {
    "temperature_2m": float,
    "wind_speed_10m": float,
    "relative_humidity_2m": int,
    "weather_code": int,
}


def validate_schema(data: dict, expected: dict) -> list[str]:
    """
    Check that a dict has all expected keys with the right types.
    Returns a list of error strings (empty list = valid).

    Example:
        errors = validate_schema(weather_data, EXPECTED_KEYS)
        if errors:
            for e in errors: print(f"Schema error: {e}")
    """
    errors = []

    # TODO 9: For each key in expected:
    #   Check it exists in data — if not, add "Missing key: X" to errors
    #   Check its type matches expected[key] — if not, add "Wrong type for X: expected Y got Z"

    return errors


# ─────────────────────────────────────────────
#  Part E — JSON comparison
# ─────────────────────────────────────────────


def compare_weather_responses(
    response_a: dict, response_b: dict, label_a: str = "A", label_b: str = "B"
) -> None:
    """
    Compare two weather responses side by side.
    Print differences for key numeric fields.
    """
    fields = ["temperature_2m", "wind_speed_10m", "relative_humidity_2m"]

    print(f"\n  {'Field':<30} {label_a:<15} {label_b:<15} {'Diff'}")
    print(f"  {'-'*65}")

    # TODO 10: For each field, get value from both responses using safe_get()
    #   Print them side by side with the absolute difference
    for field in fields:
        val_a = safe_get(response_a, field, default="N/A")
        val_b = safe_get(response_b, field, default="N/A")
        # TODO: calculate diff and print formatted row
        print(f"  {field:<30} {str(val_a):<15} {str(val_b):<15} TODO")


# ─────────────────────────────────────────────
#  Entry point
# ─────────────────────────────────────────────

if __name__ == "__main__":

    print("=== Part A: Cache System ===")
    # Fetch once from Open-Meteo
    r = requests.get(
        "https://api.open-meteo.com/v1/forecast",
        params={
            "latitude": 15.30,
            "longitude": -61.39,
            "current": "temperature_2m,wind_speed_10m,relative_humidity_2m,weather_code",
            "temperature_unit": "celsius",
        },
        timeout=10,
    )
    weather = r.json()["current"]

    # TODO 11: Save the response to "roseau_current.json"
    #          Then load it back and print the "cached_at" key

    print("\n=== Part B: Safe Nested Access ===")
    nested = {"location": {"city": {"name": "Roseau"}}}
    # TODO 12: Use safe_get() to get the city name
    #          Then try a key that doesn't exist — confirm it returns None

    print("\n=== Part C: Batch Fetch ===")
    cities = load_cities_config("cities.json")
    # TODO 13: Call fetch_and_cache_cities(cities)
    #          Run it twice — second run should say "from cache"

    print("\n=== Part D: Schema Validation ===")
    # TODO 14: Run validate_schema(weather, EXPECTED_KEYS)
    #          Then delete one key from weather and run again
    #          Confirm the error is caught

    print("\n=== Part E: Comparison ===")
    # TODO 15: Fetch weather for two different cities
    #          Run compare_weather_responses() on them
