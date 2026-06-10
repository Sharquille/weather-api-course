"""
Level 2 / Phase 02 - Chaining APIs (starter).
"""

import os

import requests
from dotenv import load_dotenv

load_dotenv()


def get_today_forecast(city: str) -> dict:
    """TODO: use your Phase 01 weather package to fetch weather."""
    raise NotImplementedError


def build_message(weather: dict) -> dict:
    """
    TODO: return a Discord payload.

    Example:
        {"content": "Rain expected in Roseau today. Bring an umbrella."}
    """
    raise NotImplementedError


def send_to_discord(payload: dict) -> int:
    """TODO: POST payload to DISCORD_WEBHOOK_URL and return the status code."""
    raise NotImplementedError


if __name__ == "__main__":
    forecast = get_today_forecast("Roseau")
    message = build_message(forecast)
    status = send_to_discord(message)
    print(f"Sent to Discord: HTTP {status}")
