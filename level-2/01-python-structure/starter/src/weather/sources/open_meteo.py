"""Open-Meteo source. No API key required."""


def fetch(city: str) -> dict:
    """Fetch weather and return a normalised weather dict."""
    # TODO: geocode the city with Open-Meteo's geocoding API.
    # TODO: call the forecast API with latitude and longitude.
    # TODO: return keys: source, temp_c, wind_kph, humidity, desc.
    raise NotImplementedError
