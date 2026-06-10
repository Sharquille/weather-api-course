"""
Level 1 — Phase 03: Multi-Source Aggregation (SOLUTION)
"""

import os
import sys
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

import requests
from dotenv import load_dotenv

load_dotenv(Path(__file__).parent / ".env")


def fetch_open_meteo(city: str) -> dict:
    geo = requests.get(
        "https://geocoding-api.open-meteo.com/v1/search",
        params={"name": city, "count": 1},
        timeout=10,
    ).json()
    if not geo.get("results"):
        raise ValueError(f"City not found: {city}")
    lat, lon = geo["results"][0]["latitude"], geo["results"][0]["longitude"]

    url = "https://api.open-meteo.com/v1/forecast"
    r = requests.get(
        url,
        params={
            "latitude": lat,
            "longitude": lon,
            "current": "temperature_2m,wind_speed_10m,relative_humidity_2m,weather_code",
            "wind_speed_unit": "kmh",
        },
        timeout=10,
    )
    r.raise_for_status()
    cw = r.json()["current"]
    return {
        "source": "Open-Meteo",
        "temp_c": cw["temperature_2m"],
        "wind_kph": cw["wind_speed_10m"],
        "humidity": cw["relative_humidity_2m"],
        "desc": f"code {cw['weather_code']}",
    }


def fetch_openweather(city: str) -> dict:
    key = os.getenv("OPENWEATHER_API_KEY")
    if not key:
        raise RuntimeError("OPENWEATHER_API_KEY missing")
    r = requests.get(
        "https://api.openweathermap.org/data/2.5/weather",
        params={"q": city, "appid": key, "units": "metric"},
        timeout=10,
    )
    r.raise_for_status()
    d = r.json()
    return {
        "source": "OpenWeatherMap",
        "temp_c": d["main"]["temp"],
        "wind_kph": round(d["wind"]["speed"] * 3.6, 1),
        "humidity": d["main"]["humidity"],
        "desc": d["weather"][0]["description"],
    }


def fetch_weatherapi(city: str) -> dict:
    key = os.getenv("WEATHERAPI_KEY")
    if not key:
        raise RuntimeError("WEATHERAPI_KEY missing")
    r = requests.get(
        "https://api.weatherapi.com/v1/current.json",
        params={"key": key, "q": city, "aqi": "no"},
        timeout=10,
    )
    r.raise_for_status()
    d = r.json()
    return {
        "source": "WeatherAPI",
        "temp_c": d["current"]["temp_c"],
        "wind_kph": d["current"]["wind_kph"],
        "humidity": d["current"]["humidity"],
        "desc": d["current"]["condition"]["text"],
    }


SOURCES = {
    "Open-Meteo": fetch_open_meteo,
    "OpenWeatherMap": fetch_openweather,
    "WeatherAPI": fetch_weatherapi,
}


def fetch_all(city: str) -> list[dict]:
    results = []
    with ThreadPoolExecutor(max_workers=len(SOURCES)) as ex:
        futures = {ex.submit(fn, city): name for name, fn in SOURCES.items()}
        for fut in as_completed(futures):
            name = futures[fut]
            try:
                results.append(fut.result())
            except Exception as e:
                print(f"   ⚠️  {name} failed: {e}")
    return results


def render_table(results: list[dict]) -> str:
    if not results:
        return "(no sources returned data)"
    header = f"  {'Source':<16} {'Temp °C':<10} {'Wind kph':<12} {'Humidity':<10} Description"
    sep = "  " + "-" * (len(header) - 2)
    rows = [header, sep]
    for r in results:
        rows.append(
            f"  {r['source']:<16} {r['temp_c']:<10} {r['wind_kph']:<12} {r['humidity']:<10} {r['desc']}"
        )
    return "\n".join(rows)


if __name__ == "__main__":
    city = sys.argv[1] if len(sys.argv) > 1 else "Roseau"
    print(f"Fetching weather for {city} from {len(SOURCES)} sources in parallel...\n")

    start = time.perf_counter()
    results = fetch_all(city)
    elapsed = time.perf_counter() - start

    print(render_table(results))
    print(f"\nFetched {len(results)}/{len(SOURCES)} sources in {elapsed:.2f}s")
