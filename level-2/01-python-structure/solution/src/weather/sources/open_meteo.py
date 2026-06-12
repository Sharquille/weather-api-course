"""Open-Meteo source. No API key required."""

from typing import Any

import requests

WEATHER_CODES: dict[int, str] = {
    0: "clear sky",
    1: "mainly clear",
    2: "partly cloudy",
    3: "overcast",
    45: "fog",
    48: "depositing rime fog",
    51: "light drizzle",
    53: "moderate drizzle",
    55: "dense drizzle",
    61: "slight rain",
    63: "moderate rain",
    65: "heavy rain",
    80: "slight rain showers",
    81: "moderate rain showers",
    82: "violent rain showers",
}


def normalize_current(current: dict[str, Any]) -> dict[str, Any]:
    code = current.get("weather_code")
    desc = WEATHER_CODES.get(code) if isinstance(code, int) else None
    return {
        "source": "Open-Meteo",
        "temp_c": current["temperature_2m"],
        "wind_kph": current["wind_speed_10m"],
        "humidity": current["relative_humidity_2m"],
        "desc": desc or f"weather code {code}",
    }


def fetch(city: str) -> dict[str, Any]:
    geo_params: dict[str, str | int] = {"name": city, "count": 1}
    geo = requests.get(
        "https://geocoding-api.open-meteo.com/v1/search",
        params=geo_params,
        timeout=10,
    )
    geo.raise_for_status()
    geo_data: dict[str, Any] = geo.json()
    if not geo_data.get("results"):
        raise ValueError(f"City not found: {city}")

    first: dict[str, Any] = geo_data["results"][0]
    current_fields = "temperature_2m,wind_speed_10m,relative_humidity_2m,weather_code"
    params: dict[str, str | float] = {
        "latitude": first.get("latitude", 0.0),
        "longitude": first.get("longitude", 0.0),
        "current": current_fields,
        "wind_speed_unit": "kmh",
    }
    response = requests.get(
        "https://api.open-meteo.com/v1/forecast",
        params=params,
        timeout=10,
    )
    response.raise_for_status()
    return normalize_current(response.json()["current"])
