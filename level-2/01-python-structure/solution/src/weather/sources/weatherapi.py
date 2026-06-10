"""WeatherAPI source. Requires WEATHERAPI_KEY."""

import os

import requests
from dotenv import load_dotenv

load_dotenv()


def normalize_response(data: dict) -> dict:
    return {
        "source": "WeatherAPI",
        "temp_c": data["current"]["temp_c"],
        "wind_kph": data["current"]["wind_kph"],
        "humidity": data["current"]["humidity"],
        "desc": data["current"]["condition"]["text"],
    }


def fetch(city: str) -> dict:
    key = os.getenv("WEATHERAPI_KEY")
    if not key:
        raise RuntimeError("WEATHERAPI_KEY missing")

    response = requests.get(
        "https://api.weatherapi.com/v1/current.json",
        params={"key": key, "q": city, "aqi": "no"},
        timeout=10,
    )
    response.raise_for_status()
    return normalize_response(response.json())
