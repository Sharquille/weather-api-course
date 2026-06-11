"""OpenWeatherMap source. Requires OPENWEATHER_API_KEY."""

import os
from typing import Any

import requests
from dotenv import load_dotenv

load_dotenv()


def normalize_response(data: dict[str, Any]) -> dict[str, Any]:
    return {
        "source": "OpenWeatherMap",
        "temp_c": data["main"]["temp"],
        "wind_kph": round(data["wind"]["speed"] * 3.6, 1),
        "humidity": data["main"]["humidity"],
        "desc": data["weather"][0]["description"],
    }


def fetch(city: str) -> dict[str, Any]:
    key = os.getenv("OPENWEATHER_API_KEY")
    if not key:
        raise RuntimeError("OPENWEATHER_API_KEY missing")

    response = requests.get(
        "https://api.openweathermap.org/data/2.5/weather",
        params={"q": city, "appid": key, "units": "metric"},
        timeout=10,
    )
    response.raise_for_status()
    return normalize_response(response.json())
