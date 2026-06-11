"""OpenWeatherMap source. Requires OPENWEATHER_API_KEY."""

from typing import Any


def fetch(city: str) -> dict[str, Any]:
    """Fetch weather and return a normalised weather dict."""
    # TODO: read OPENWEATHER_API_KEY from the environment.
    # TODO: call the current weather endpoint.
    # TODO: return keys: source, temp_c, wind_kph, humidity, desc.
    raise NotImplementedError
