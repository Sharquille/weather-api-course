"""
Level 1 — Phase 01: Python + requests (STARTER)

Work through each TODO in order.
Run the file after completing each one: python3 weather_basic.py
Read the error if it fails. Fix it. Run again.

The curl equivalent of what you are building:
  curl "https://api.open-meteo.com/v1/forecast?latitude=15.30&longitude=-61.39&current=temperature_2m,wind_speed_10m,relative_humidity_2m"
"""

# TODO 1: Import the requests library
# Hint: it is a single line — the library name is "requests"


# TODO 2: Import sys — you will need it for CLI arguments later
# Hint: sys is a built-in Python module, no pip install needed


# ─────────────────────────────────────────────
#  Part A — Basic fetch
# ─────────────────────────────────────────────


def get_weather(latitude: float, longitude: float) -> dict:
    """
    Fetch current weather from Open-Meteo.
    No API key needed.

    Args:
        latitude:  the latitude of the location
        longitude: the longitude of the location

    Returns:
        a dict containing current weather data
    """
    url = "https://api.open-meteo.com/v1/forecast"

    # TODO 3: Build a params dict with these keys:
    #   latitude, longitude, current, temperature_unit, wind_speed_unit
    #
    # For "current" pass a comma-separated string:
    #   "temperature_2m,wind_speed_10m,relative_humidity_2m,weather_code"
    #
    # Hint: params = { "key": value, "key": value }
    params = {}  # replace this with your params dict

    # TODO 4: Make a GET request using requests.get()
    #   Pass the url and params as arguments
    #   Add timeout=10 to avoid hanging forever
    #
    # Hint: response = requests.get(url, params=params, timeout=10)
    response = None  # replace this with your requests.get() call

    # TODO 5: Check that the response was successful
    #   Use response.raise_for_status()
    #   What does this do? Look it up in the research task.

    # TODO 6: Return just the "current" key from the JSON response
    #   Hint: response.json() returns a dict
    #         the weather data is nested under the "current" key
    return {}  # replace this


# ─────────────────────────────────────────────
#  Part B — Error handling
# ─────────────────────────────────────────────


def get_weather_safe(latitude: float, longitude: float) -> dict | None:
    """
    Same as get_weather() but handles failures gracefully.
    Returns None if anything goes wrong instead of crashing.
    """
    try:
        # TODO 7: Call get_weather() from inside this try block
        #   and return its result
        pass

    # TODO 8: Add except blocks for these three error types:
    #   requests.exceptions.Timeout
    #   requests.exceptions.HTTPError
    #   requests.exceptions.ConnectionError
    #
    # Print a helpful message for each one.
    # Then return None.
    #
    # Hint:
    #   except requests.exceptions.Timeout:
    #       print("❌ Request timed out")
    #       return None

    except Exception as e:
        # This catches anything else unexpected
        print(f"❌ Unexpected error: {e}")
        return None


# ─────────────────────────────────────────────
#  Part C — Format and display
# ─────────────────────────────────────────────

# Weather code reference — Open-Meteo uses numeric codes
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


def format_weather(data: dict, location: str = "Unknown") -> str:
    """
    Turn the API response dict into a readable multi-line string.

    Args:
        data:     the dict returned by get_weather()
        location: a string label for the location

    Returns:
        a formatted string ready to print
    """
    # TODO 9: Build a formatted string using f-strings
    #   Include: location name, temperature, wind speed, humidity,
    #            and the weather description (use WEATHER_CODES dict)
    #
    # Hint: data["temperature_2m"], data["wind_speed_10m"], etc.
    #       WEATHER_CODES.get(data["weather_code"], "Unknown")
    #
    # Example output:
    #   🌤  Roseau, Dominica
    #      Temperature : 28.4°C
    #      Wind        : 12.1 km/h
    #      Humidity    : 82%
    #      Condition   : Clear sky

    return "TODO: build your formatted string here"


# ─────────────────────────────────────────────
#  Part D — POST request
# ─────────────────────────────────────────────


def post_weather_report(weather_data: dict, learner_name: str) -> None:
    """
    POST the weather data to httpbin.org/post to see how
    sending data to an API works.

    This is the Python equivalent of:
      curl -X POST https://httpbin.org/post \
        -H "Content-Type: application/json" \
        -d '{"learner": "name", "weather": {...}}'
    """
    # TODO 10: Make a POST request to "https://httpbin.org/post"
    #   Send a JSON body containing:
    #     {"learner": learner_name, "weather": weather_data}
    #
    #   Hint: use requests.post(url, json=payload)
    #   The json= argument automatically sets Content-Type: application/json
    #
    # Print the response status code and the "json" key from the response


# ─────────────────────────────────────────────
#  Part E — CLI entry point
# ─────────────────────────────────────────────

if __name__ == "__main__":
    # TODO 11: Read lat and lon from sys.argv if provided
    #   sys.argv[0] is always the script name
    #   sys.argv[1] would be the first argument, sys.argv[2] the second
    #
    #   If no arguments are given, default to Roseau, Dominica:
    #     lat = 15.30, lon = -61.39
    #
    #   Hint:
    #     lat = float(sys.argv[1]) if len(sys.argv) > 1 else 15.30

    lat = 15.30  # replace with sys.argv logic
    lon = -61.39  # replace with sys.argv logic

    # TODO 12: Call get_weather_safe() with lat and lon
    #   If the result is not None, call format_weather() and print it
    #   If the result is None, print a user-friendly error message

    print("TODO: fetch and display weather here")

    # TODO 13 (bonus): Call post_weather_report() with the result
    #   and your name as the learner_name argument
