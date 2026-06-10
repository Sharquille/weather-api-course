"""
Level 1 — Phase 02: Authenticated APIs (STARTER)

The curl equivalent of what you are building:
  curl "https://api.openweathermap.org/data/2.5/weather?q=Roseau&appid=YOUR_KEY&units=metric"
  curl "https://api.weatherapi.com/v1/current.json?key=YOUR_KEY&q=Roseau"
"""

import requests
import os
from dotenv import load_dotenv

load_dotenv()


# ─────────────────────────────────────────────
#  Part A — Read the API key from .env
# ─────────────────────────────────────────────


def get_owm_key() -> str | None:
    """
    TODO 1: Read OPENWEATHER_API_KEY from environment.
    Return None if it's missing or empty.
    """
    pass


def get_wapi_key() -> str | None:
    """
    TODO 2: Read WEATHERAPI_KEY from environment.
    Return None if it's missing or empty.
    """
    pass


# ─────────────────────────────────────────────
#  Part B — Fetch from OpenWeatherMap
# ─────────────────────────────────────────────


def get_weather_owm(city: str) -> dict | None:
    """
    TODO 3: Call OpenWeatherMap's current weather endpoint.

    URL: https://api.openweathermap.org/data/2.5/weather
    Params: q=city, appid=<key>, units=metric

    Handle 401 (invalid key), 403 (forbidden), 429 (rate limit) with
    distinct friendly messages. Return None on any failure.
    Return the normalised dict on success.
    """
    pass


# ─────────────────────────────────────────────
#  Part C — Fetch from WeatherAPI
# ─────────────────────────────────────────────


def get_weather_wapi(location: str) -> dict | None:
    """
    TODO 4: Call WeatherAPI's current.json endpoint.

    URL: https://api.weatherapi.com/v1/current.json
    Params: key=<key>, q=location, aqi=yes

    Return the normalised dict on success, None on failure.
    """
    pass


# ─────────────────────────────────────────────
#  Part D — Rate limit header inspection
# ─────────────────────────────────────────────


def check_rate_limits(response) -> None:
    """
    TODO 5: Print any rate-limit-related headers you find in the response.

    Look for: X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset,
              Retry-After, RateLimit-Limit, RateLimit-Remaining
    """
    pass


# ─────────────────────────────────────────────
#  Part E — CLI entry point
# ─────────────────────────────────────────────

if __name__ == "__main__":
    print("\n=== OpenWeatherMap ===")
    # TODO 6: Call get_weather_owm("Roseau") and print the result nicely

    print("\n=== WeatherAPI ===")
    # TODO 7: Call get_weather_wapi("Roseau, Dominica") and print the result nicely

    print("\n=== Temperature comparison ===")
    # TODO 8 (bonus): Compare the temperatures from both APIs and print the diff
