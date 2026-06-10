"""Open-Meteo source. No API key required."""

import requests


WEATHER_CODES = {
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


def normalize_current(current: dict) -> dict:
    code = current.get("weather_code")
    return {
        "source": "Open-Meteo",
        "temp_c": current["temperature_2m"],
        "wind_kph": current["wind_speed_10m"],
        "humidity": current["relative_humidity_2m"],
        "desc": WEATHER_CODES.get(code, f"weather code {code}"),
    }


def fetch(city: str) -> dict:
    geo = requests.get(
        "https://geocoding-api.open-meteo.com/v1/search",
        params={"name": city, "count": 1},
        timeout=10,
    )
    geo.raise_for_status()
    geo_data = geo.json()
    if not geo_data.get("results"):
        raise ValueError(f"City not found: {city}")

    first = geo_data["results"][0]
    response = requests.get(
        "https://api.open-meteo.com/v1/forecast",
        params={
            "latitude": first["latitude"],
            "longitude": first["longitude"],
            "current": "temperature_2m,wind_speed_10m,relative_humidity_2m,weather_code",
            "wind_speed_unit": "kmh",
        },
        timeout=10,
    )
    response.raise_for_status()
    return normalize_current(response.json()["current"])
