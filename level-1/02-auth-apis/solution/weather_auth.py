"""
Level 1 — Phase 02: Authenticated APIs (SOLUTION)
"""

import requests
import os
from dotenv import load_dotenv

load_dotenv()


def get_weather_owm(city: str) -> dict | None:
    url = "https://api.openweathermap.org/data/2.5/weather"
    api_key = os.getenv("OPENWEATHER_API_KEY")

    if not api_key:
        print("❌ OPENWEATHER_API_KEY not found in .env")
        return None

    params = {"q": city, "appid": api_key, "units": "metric"}

    try:
        response = requests.get(url, params=params, timeout=10)

        if response.status_code == 401:
            print("❌ Invalid API key — check your .env")
            return None
        if response.status_code == 403:
            print("❌ Access forbidden — check your plan")
            return None
        if response.status_code == 429:
            print("❌ Rate limit exceeded — slow down")
            return None

        response.raise_for_status()
        check_rate_limits(response)

        d = response.json()
        return {
            "source": "OpenWeatherMap",
            "city": d["name"],
            "country": d["sys"]["country"],
            "temp": d["main"]["temp"],
            "feels_like": d["main"]["feels_like"],
            "humidity": d["main"]["humidity"],
            "description": d["weather"][0]["description"],
            "wind_speed": round(d["wind"]["speed"] * 3.6, 1),  # m/s → km/h
        }
    except requests.exceptions.Timeout:
        print("❌ OpenWeatherMap timed out")
    except requests.exceptions.ConnectionError:
        print("❌ Cannot reach OpenWeatherMap")
    return None


def get_weather_wapi(location: str) -> dict | None:
    url = "https://api.weatherapi.com/v1/current.json"
    api_key = os.getenv("WEATHERAPI_KEY")

    if not api_key:
        print("❌ WEATHERAPI_KEY not found in .env")
        return None

    params = {"key": api_key, "q": location, "aqi": "yes"}

    try:
        response = requests.get(url, params=params, timeout=10)

        if response.status_code == 401:
            print("❌ Invalid WeatherAPI key")
            return None
        if response.status_code == 429:
            print("❌ WeatherAPI rate limit exceeded")
            return None

        response.raise_for_status()
        d = response.json()
        return {
            "source": "WeatherAPI",
            "city": d["location"]["name"],
            "country": d["location"]["country"],
            "temp": d["current"]["temp_c"],
            "humidity": d["current"]["humidity"],
            "uv_index": d["current"]["uv"],
            "wind_kph": d["current"]["wind_kph"],
            "condition": d["current"]["condition"]["text"],
        }
    except requests.exceptions.Timeout:
        print("❌ WeatherAPI timed out")
    except requests.exceptions.ConnectionError:
        print("❌ Cannot reach WeatherAPI")
    return None


def check_rate_limits(response) -> None:
    rate_headers = [
        "X-RateLimit-Limit",
        "X-RateLimit-Remaining",
        "X-RateLimit-Reset",
        "Retry-After",
        "RateLimit-Limit",
        "RateLimit-Remaining",
    ]
    found = {h: response.headers[h] for h in rate_headers if h in response.headers}
    if found:
        print("   Rate limit headers:")
        for k, v in found.items():
            print(f"     {k}: {v}")
    else:
        print("   No rate limit headers in this response")


if __name__ == "__main__":
    print("\n=== OpenWeatherMap ===")
    owm = get_weather_owm("Roseau")
    if owm:
        print(f"   {owm['city']}, {owm['country']}")
        print(f"   Temp      : {owm['temp']}°C (feels {owm['feels_like']}°C)")
        print(f"   Condition : {owm['description'].title()}")
        print(f"   Humidity  : {owm['humidity']}%")
        print(f"   Wind      : {owm['wind_speed']} km/h")

    print("\n=== WeatherAPI ===")
    wapi = get_weather_wapi("Roseau, Dominica")
    if wapi:
        print(f"   {wapi['city']}, {wapi['country']}")
        print(f"   Temp      : {wapi['temp']}°C")
        print(f"   Condition : {wapi['condition']}")
        print(f"   UV Index  : {wapi['uv_index']}")
        print(f"   Wind      : {wapi['wind_kph']} km/h")

    print("\n=== Temperature comparison ===")
    if owm and wapi:
        diff = abs(owm["temp"] - wapi["temp"])
        print(f"   OWM:  {owm['temp']}°C")
        print(f"   WAPI: {wapi['temp']}°C")
        print(f"   Diff: {diff:.1f}°C")
        print("   (small differences are normal — measurement station locations vary)")
