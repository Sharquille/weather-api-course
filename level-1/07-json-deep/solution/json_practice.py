"""
Level 1 — Phase 07: JSON Deep Dive (SOLUTION)
"""

import json
import os
from datetime import datetime
from pathlib import Path

import requests
from dotenv import load_dotenv

load_dotenv(Path(__file__).parent / ".env")

CACHE_DIR = Path("./cache")
CACHE_DIR.mkdir(exist_ok=True)

EXPECTED_KEYS = {
    "temperature_2m": float,
    "wind_speed_10m": float,
    "relative_humidity_2m": int,
    "weather_code": int,
}


# ─────────────────────────────────────────────
#  Part A — File cache
# ─────────────────────────────────────────────


def save_response_to_file(data: dict, filename: str) -> None:
    data = dict(data)
    data["cached_at"] = datetime.now().isoformat()
    with open(CACHE_DIR / filename, "w") as f:
        json.dump(data, f, indent=2)


def load_response_from_file(filename: str) -> dict | None:
    path = CACHE_DIR / filename
    if not path.exists():
        return None
    with open(path) as f:
        return json.load(f)


# ─────────────────────────────────────────────
#  Part B — safe_get
# ─────────────────────────────────────────────


def safe_get(data, *keys, default=None):
    for key in keys:
        if isinstance(data, dict):
            data = data.get(key, default)
        else:
            return default
    return data


# ─────────────────────────────────────────────
#  Part C — Batch from config
# ─────────────────────────────────────────────


def load_cities_config(config_file: str) -> list[dict]:
    path = Path(config_file)
    if not path.exists():
        return [
            {"city": "Roseau", "label": "Home"},
            {"city": "London", "label": "Reference"},
            {"city": "New York", "label": "Reference 2"},
        ]
    try:
        with open(path) as f:
            return json.load(f)
    except json.JSONDecodeError:
        return []


def fetch_and_cache_cities(cities: list[dict]) -> dict:
    results = {}
    key = os.getenv("OPENWEATHER_API_KEY")

    for entry in cities:
        city, label = entry["city"], entry.get("label", city)
        slug = city.lower().replace(" ", "_") + ".json"

        cached = load_response_from_file(slug)
        if cached:
            print(f"  {label}: from cache ({cached.get('cached_at', '?')})")
            results[label] = {
                "temp": safe_get(cached, "main", "temp"),
                "humidity": safe_get(cached, "main", "humidity"),
                "desc": safe_get(cached, "weather", 0, "description"),
                "source": "cache",
            }
            continue

        if not key:
            print(f"  {label}: no key, skipping fetch")
            continue

        r = requests.get(
            "https://api.openweathermap.org/data/2.5/weather",
            params={"q": city, "appid": key, "units": "metric"},
            timeout=10,
        )
        r.raise_for_status()
        save_response_to_file(r.json(), slug)
        d = r.json()
        results[label] = {
            "temp": d["main"]["temp"],
            "humidity": d["main"]["humidity"],
            "desc": d["weather"][0]["description"],
            "source": "fetched",
        }
        print(f"  {label}: fetched and cached")

    return results


# ─────────────────────────────────────────────
#  Part D — Schema validator
# ─────────────────────────────────────────────


def validate_schema(data: dict, expected: dict) -> list[str]:
    errors = []
    for key, expected_type in expected.items():
        if key not in data:
            errors.append(f"Missing key: {key}")
            continue
        if not isinstance(data[key], expected_type):
            actual = type(data[key]).__name__
            errors.append(
                f"Wrong type for {key}: expected {expected_type.__name__}, got {actual}"
            )
    return errors


# ─────────────────────────────────────────────
#  Part E — Comparison
# ─────────────────────────────────────────────


def compare_weather_responses(
    response_a: dict, response_b: dict, label_a: str = "A", label_b: str = "B"
) -> None:
    fields = ["temperature_2m", "wind_speed_10m", "relative_humidity_2m"]
    print(f"\n  {'Field':<30} {label_a:<15} {label_b:<15} {'Diff'}")
    print(f"  {'-'*65}")
    for field in fields:
        val_a = safe_get(response_a, field, default="N/A")
        val_b = safe_get(response_b, field, default="N/A")
        try:
            diff = abs(float(val_a) - float(val_b))
            diff_str = f"{diff:.2f}"
        except (TypeError, ValueError):
            diff_str = "—"
        print(f"  {field:<30} {str(val_a):<15} {str(val_b):<15} {diff_str}")


# ─────────────────────────────────────────────
#  Entry point
# ─────────────────────────────────────────────

if __name__ == "__main__":
    print("=== Part A: Cache System ===")
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
    save_response_to_file(weather, "roseau_current.json")
    loaded = load_response_from_file("roseau_current.json")
    print(f"  Cached at: {loaded.get('cached_at')}")

    print("\n=== Part B: Safe Nested Access ===")
    nested = {"location": {"city": {"name": "Roseau"}}}
    print(f"  City name: {safe_get(nested, 'location', 'city', 'name')}")
    print(
        f"  Missing key returns: {safe_get(nested, 'a', 'b', 'c', default='NOT FOUND')}"
    )

    print("\n=== Part C: Batch Fetch ===")
    # Create a config file first if it doesn't exist
    cfg_path = Path("cities.json")
    if not cfg_path.exists():
        cfg_path.write_text(
            json.dumps(
                [
                    {"city": "Roseau", "label": "Home"},
                    {"city": "London", "label": "Reference"},
                    {"city": "New York", "label": "Reference 2"},
                ],
                indent=2,
            )
        )
    cities = load_cities_config("cities.json")
    fetch_and_cache_cities(cities)
    print("  Run again — second pass should say 'from cache'")

    print("\n=== Part D: Schema Validation ===")
    errors = validate_schema(weather, EXPECTED_KEYS)
    print(f"  Errors: {errors if errors else '(none — valid)'}")

    bad = dict(weather)
    del bad["weather_code"]
    bad["wind_speed_10m"] = "not a number"
    errors = validate_schema(bad, EXPECTED_KEYS)
    print(f"  Errors in tampered data:")
    for e in errors:
        print(f"    - {e}")

    print("\n=== Part E: Comparison ===")
    a = requests.get(
        "https://api.open-meteo.com/v1/forecast",
        params={
            "latitude": 15.30,
            "longitude": -61.39,
            "current": "temperature_2m,wind_speed_10m,relative_humidity_2m",
        },
        timeout=10,
    ).json()["current"]
    b = requests.get(
        "https://api.open-meteo.com/v1/forecast",
        params={
            "latitude": 51.51,
            "longitude": -0.13,
            "current": "temperature_2m,wind_speed_10m,relative_humidity_2m",
        },
        timeout=10,
    ).json()["current"]
    compare_weather_responses(a, b, label_a="Roseau", label_b="London")
