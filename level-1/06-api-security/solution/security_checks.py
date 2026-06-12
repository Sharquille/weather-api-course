"""
Level 1 — Phase 06: API Security (SOLUTION)
"""

import os
import re
from pathlib import Path

import requests
from dotenv import load_dotenv

load_dotenv(Path(__file__).parent / ".env")

SECRET_PATTERNS = [
    re.compile(
        r'(api[_-]?key|apikey|secret|token|password)\s*=\s*["\']', re.IGNORECASE
    ),
    re.compile(r"AKIA[0-9A-Z]{16}"),  # AWS access key
    re.compile(r"sk_live_[A-Za-z0-9]{20,}"),  # Stripe live key
    re.compile(r'["\']([A-Za-z0-9_\-]{40,})["\']'),  # Generic long random
]


def scan_file_for_secrets(filepath: str) -> list[str]:
    p = Path(filepath)
    if not p.exists():
        return []
    text = p.read_text(encoding="utf-8")
    findings = []
    for i, line in enumerate(text.splitlines(), start=1):
        stripped = line.strip()
        if not stripped or stripped.startswith("#"):
            continue
        if "os.getenv" in line or "os.environ" in line:
            continue
        for pat in SECRET_PATTERNS:
            if pat.search(line):
                findings.append(f"  L{i}: {stripped[:100]}")
                break
    return findings


def scan_directory(directory: str) -> None:
    print(f"Scanning {directory}...")
    root = Path(directory)
    total_findings = 0
    for py_file in root.rglob("*.py"):
        findings = scan_file_for_secrets(str(py_file))
        if findings:
            print(f"\n  ⚠️  {py_file}")
            for f in findings:
                print(f)
            total_findings += len(findings)
    if total_findings == 0:
        print("  ✅ Clean — no hardcoded secrets found")


def compare_auth_methods() -> None:
    api_key = os.getenv("OPENWEATHER_API_KEY", "demo_key_for_testing")
    city = "Roseau"

    url_with_key = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric"
    url_clean = f"https://api.openweathermap.org/data/2.5/weather?q={city}&units=metric"
    headers = {"Authorization": f"Bearer {api_key}"}

    print("Method 1 (query param) — what the server logs see:")
    print(f"  {url_with_key}\n")
    print("Method 2 (header) — what the server logs see:")
    print(f"  {url_clean}")
    print(f"  (key is only in the headers, NOT in the URL)\n")
    print("Headers sent in Method 2:")
    for k, v in headers.items():
        print(f"  {k}: {v}")


def fetch_with_rate_limit_handling(url: str, params: dict) -> dict | None:
    try:
        response = requests.get(url, params=params, timeout=10)

        if response.status_code == 429:
            retry_after = response.headers.get("Retry-After", "unknown")
            print(f"❌ Rate limited. Retry after {retry_after} seconds.")
            return None
        if response.status_code == 401:
            print("❌ Key is invalid or missing")
            return None
        if response.status_code == 403:
            print("❌ Key valid but access denied — check your plan/scope")
            return None

        response.raise_for_status()
        return response.json()

    except requests.exceptions.Timeout:
        print("❌ Request timed out")
        return None
    except requests.exceptions.RequestException as e:
        print(f"❌ Request failed: {e}")
        return None


def validate_api_key(service: str) -> bool:
    try:
        if service == "openweather":
            key = os.getenv("OPENWEATHER_API_KEY")
            if not key:
                print("  OPENWEATHER_API_KEY not set in .env")
                return False
            r = requests.get(
                "https://api.openweathermap.org/data/2.5/weather",
                params={"q": "London", "appid": key},
                timeout=10,
            )
            return r.status_code == 200

        if service == "weatherapi":
            key = os.getenv("WEATHERAPI_KEY")
            if not key:
                print("  WEATHERAPI_KEY not set in .env")
                return False
            r = requests.get(
                "https://api.weatherapi.com/v1/current.json",
                params={"key": key, "q": "London"},
                timeout=10,
            )
            return r.status_code == 200

        print(f"Unknown service: {service}")
        return False
    except requests.exceptions.RequestException as e:
        print(f"  Network error during validation: {e}")
        return False


if __name__ == "__main__":
    print("=== Part A: Secret Scanner ===")
    scan_directory("../../level-1")

    print("\n=== Part B: Auth Method Comparison ===")
    compare_auth_methods()

    print("\n=== Part C: Rate Limit Handler — happy path test ===")
    fetch_with_rate_limit_handling(
        "https://api.open-meteo.com/v1/forecast",
        {"latitude": 15.3, "longitude": -61.4, "current": "temperature_2m"},
    )

    print("\n=== Part D: Key Validator ===")
    owm_valid = validate_api_key("openweather")
    wapi_valid = validate_api_key("weatherapi")
    print(
        f"  OpenWeatherMap key: {'✅ valid' if owm_valid else '❌ invalid or missing'}"
    )
    print(
        f"  WeatherAPI key:     {'✅ valid' if wapi_valid else '❌ invalid or missing'}"
    )
