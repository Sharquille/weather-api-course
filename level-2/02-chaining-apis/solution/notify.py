"""
Level 2 / Phase 02 - Chaining APIs (solution).
"""

import os
import sys
from pathlib import Path

import requests
from dotenv import load_dotenv

load_dotenv(Path(__file__).parent / ".env")

PHASE_01_SRC = Path(__file__).resolve().parents[2] / "01-python-structure" / "solution" / "src"
sys.path.insert(0, str(PHASE_01_SRC))

from weather.sources import open_meteo  # noqa: E402


def get_today_forecast(city: str) -> dict:
    return open_meteo.fetch(city)


def build_message(weather: dict) -> dict:
    city = weather.get("city", "Roseau")
    humidity = weather.get("humidity", 0)
    desc = weather.get("desc", "").lower()
    temp = weather.get("temp_c", 0)

    if "rain" in desc or "drizzle" in desc or "shower" in desc or humidity > 85:
        text = f"Rain expected in {city}. Bring an umbrella. Humidity: {humidity}%."
    elif temp > 30:
        text = f"Hot day in {city}: {temp} deg C. Stay hydrated."
    else:
        text = f"Weather in {city}: {temp} deg C, {weather.get('desc', 'clear')}."

    return {"content": text}


def send_to_discord(payload: dict) -> int:
    url = os.getenv("DISCORD_WEBHOOK_URL")
    if not url:
        raise RuntimeError("DISCORD_WEBHOOK_URL is missing")

    response = requests.post(url, json=payload, timeout=10)
    return response.status_code


def main() -> int:
    city = sys.argv[1] if len(sys.argv) > 1 else "Roseau"
    weather = get_today_forecast(city)
    weather["city"] = city
    payload = build_message(weather)
    status = send_to_discord(payload)
    print(f"Sent to Discord: HTTP {status}")
    return 0 if 200 <= status < 300 else 1


if __name__ == "__main__":
    raise SystemExit(main())
