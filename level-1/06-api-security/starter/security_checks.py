"""
Level 1 — Phase 06: API Security (STARTER)

This phase has no "build a feature" goal.
The goal is to understand what can go wrong and practice defensive habits.

Work through each section. Some TODOs require reading output carefully,
not just running code.
"""

import requests
import os
import re
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()


# ─────────────────────────────────────────────
#  Part A — Secret scanner (basic)
# ─────────────────────────────────────────────


def scan_file_for_secrets(filepath: str) -> list[str]:
    """
    Scan a Python file for patterns that look like hardcoded secrets.
    Returns a list of suspicious lines.

    This is a simplified version of what tools like GitGuardian do.
    """
    # TODO 1: Read the file at filepath
    #   Use Path(filepath).read_text(encoding="utf-8")
    #   If the file doesn't exist, return an empty list

    # TODO 2: Define patterns to look for
    #   Use re.compile() for each pattern
    #   Patterns to detect:
    #     - Lines containing: api_key, apikey, secret, token, password (case insensitive)
    #     - Lines where a string literal is assigned (e.g. KEY = "abc123")
    #
    # Hint:
    #   patterns = [
    #       re.compile(r'(api_key|apikey|secret|token|password)\s*=\s*["\']', re.IGNORECASE),
    #   ]

    # TODO 3: Check each line against your patterns
    #   Collect lines that match
    #   Skip lines that start with # (comments) and lines containing os.getenv

    # TODO 4: Return the list of suspicious lines
    return []


def scan_directory(directory: str) -> None:
    """Scan all .py files in a directory for hardcoded secrets."""
    # TODO 5: Use Path(directory).rglob("*.py") to find all Python files
    #   Call scan_file_for_secrets() on each
    #   Print results: filename + suspicious lines, or "clean" if none found
    print(f"Scanning {directory}...")


# ─────────────────────────────────────────────
#  Part B — Auth method comparison
# ─────────────────────────────────────────────


def compare_auth_methods() -> None:
    """
    Make the same API call two ways and compare what ends up in the URL.
    Demonstrates why header auth is more secure than query param auth.
    """
    api_key = os.getenv("OPENWEATHER_API_KEY", "demo_key_for_testing")
    city = "Roseau"

    # Method 1: key as query parameter
    url_with_key = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric"

    # Method 2: key as header
    url_clean = f"https://api.openweathermap.org/data/2.5/weather?q={city}&units=metric"
    headers = {"Authorization": f"Bearer {api_key}"}

    # TODO 6: Print both URLs
    #   In Method 1, the key is visible in the URL
    #   In Method 2, what does the URL look like without the key?
    #   This is what appears in server logs, browser history, etc.

    print("Method 1 (query param) — what the server logs see:")
    print(f"  {url_with_key}")
    print()
    print("Method 2 (header) — what the server logs see:")
    # TODO 7: Print url_clean — notice the key is NOT in the URL
    print(f"  TODO: print url_clean here")
    print()
    print("The key in Method 2 is only in the request headers,")
    print("which are NOT typically logged by web servers.")


# ─────────────────────────────────────────────
#  Part C — Rate limit handler
# ─────────────────────────────────────────────


def fetch_with_rate_limit_handling(url: str, params: dict) -> dict | None:
    """
    Make an API request and handle rate limiting properly.
    On 429, read the Retry-After header and tell the user how long to wait.
    """
    try:
        response = requests.get(url, params=params, timeout=10)

        # TODO 8: Handle these status codes before raise_for_status():
        #   429: read response.headers.get("Retry-After")
        #        print how many seconds to wait
        #        return None
        #   401: print "Key is invalid or missing"
        #        return None
        #   403: print "Key valid but access denied — check your plan/scope"
        #        return None

        response.raise_for_status()
        return response.json()

    except requests.exceptions.Timeout:
        print("❌ Request timed out")
        return None


# ─────────────────────────────────────────────
#  Part D — Key validator
# ─────────────────────────────────────────────


def validate_api_key(service: str) -> bool:
    """
    Test that an API key actually works before using it in production code.
    Returns True if the key is valid, False otherwise.
    """
    # TODO 9: Based on the service name, make a minimal API call
    #   to verify the key works
    #
    #   For "openweather": hit the weather endpoint with q="London"
    #   For "weatherapi":  hit the current endpoint with q="London"
    #
    #   Return True if status is 200, False otherwise
    #   Do NOT raise exceptions — this function should always return a bool

    if service == "openweather":
        pass  # TODO: implement
    elif service == "weatherapi":
        pass  # TODO: implement
    else:
        print(f"Unknown service: {service}")
        return False

    return False  # replace with real logic


# ─────────────────────────────────────────────
#  Entry point
# ─────────────────────────────────────────────

if __name__ == "__main__":

    print("=== Part A: Secret Scanner ===")
    # TODO 10: Scan the level-1 directory for hardcoded secrets
    #   scan_directory("../../level-1")
    #   What does it find? (Should be nothing if you have been using .env)
    scan_directory(".")

    print("\n=== Part B: Auth Method Comparison ===")
    compare_auth_methods()

    print("\n=== Part C: Rate Limit Handler ===")
    # TODO 11: Call fetch_with_rate_limit_handling with real params
    #   Use the Open-Meteo URL (no key, no rate limit risk)
    #   to test the happy path, then think about how to test the 429 path

    print("\n=== Part D: Key Validator ===")
    # TODO 12: Validate both your API keys
    #   Print whether each key is valid before running any other code
    owm_valid = validate_api_key("openweather")
    wapi_valid = validate_api_key("weatherapi")
    print(
        f"  OpenWeatherMap key: {'✅ valid' if owm_valid else '❌ invalid or missing'}"
    )
    print(
        f"  WeatherAPI key:     {'✅ valid' if wapi_valid else '❌ invalid or missing'}"
    )
