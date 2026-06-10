"""
Level 1 — Phase 01: Python + requests (SOLUTION)

Curl equivalent:
  curl "https://api.open-meteo.com/v1/forecast?latitude=15.30&longitude=-61.39&current=temperature_2m,wind_speed_10m,relative_humidity_2m"
"""

import sys
import requests

WEATHER_CODES = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Foggy",
    48: "Icy fog",
    51: "Light drizzle",
    61: "Light rain",
    71: "Light snow",
    80: "Rain showers",
    95: "Thunderstorm",
}


def get_weather(latitude: float, longitude: float) -> dict:
    """Fetch current weather from Open-Meteo. No API key needed."""
    url = "https://api.open-meteo.com/v1/forecast"
    params = {
        "latitude": latitude,
        "longitude": longitude,
        "current": "temperature_2m,wind_speed_10m,relative_humidity_2m,weather_code",
        "temperature_unit": "celsius",
        "wind_speed_unit": "kmh",
    }
    response = requests.get(url, params=params, timeout=10)
    response.raise_for_status()
    return response.json()["current"]


def get_weather_safe(latitude: float, longitude: float) -> dict | None:
    """Same as get_weather() but returns None on failure."""
    try:
        return get_weather(latitude, longitude)
    except requests.exceptions.Timeout:
        print("❌ Request timed out")
    except requests.exceptions.HTTPError as e:
        print(f"❌ HTTP error: {e.response.status_code}")
    except requests.exceptions.ConnectionError:
        print("❌ Connection error — check your network")
    except Exception as e:
        print(f"❌ Unexpected error: {e}")
    return None


def format_weather(data: dict, location: str = "Unknown") -> str:
    """Format weather data as a readable string."""
    code = data.get("weather_code", -1)
    condition = WEATHER_CODES.get(code, f"Code {code}")
    return (
        f"🌤  {location}\n"
        f"   Temperature : {data.get('temperature_2m', '?')}°C\n"
        f"   Wind        : {data.get('wind_speed_10m', '?')} km/h\n"
        f"   Humidity    : {data.get('relative_humidity_2m', '?')}%\n"
        f"   Condition   : {condition}\n"
    )


def post_weather_report(weather_data: dict, learner_name: str) -> None:
    """POST the weather data to httpbin.org to demonstrate sending data."""
    url = "https://httpbin.org/post"
    payload = {"learner": learner_name, "weather": weather_data}
    response = requests.post(url, json=payload, timeout=10)
    print(f"   POST status: {response.status_code}")
    print(f"   Echoed back: {response.json().get('json', {}).get('learner', '?')}")


if __name__ == "__main__":
    lat = float(sys.argv[1]) if len(sys.argv) > 1 else 15.30
    lon = float(sys.argv[2]) if len(sys.argv) > 2 else -61.39
    location = sys.argv[3] if len(sys.argv) > 3 else "Roseau, Dominica"

    data = get_weather_safe(lat, lon)
    if data is not None:
        print(format_weather(data, location))
        post_weather_report(data, learner_name="weather-course-learner")
    else:
        print("Failed to fetch weather")
        sys.exit(1)
