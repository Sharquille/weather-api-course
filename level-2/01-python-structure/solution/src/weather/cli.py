"""Command line entry point for the weather package."""

import sys

from weather.sources import open_meteo, openweather, weatherapi


SOURCES = [
    ("Open-Meteo", open_meteo.fetch),
    ("OpenWeatherMap", openweather.fetch),
    ("WeatherAPI", weatherapi.fetch),
]


def main() -> int:
    city = sys.argv[1] if len(sys.argv) > 1 else "Roseau"

    for name, fetch in SOURCES:
        try:
            result = fetch(city)
            print(f"{name}: {result['temp_c']} deg C, {result['desc']}")
        except Exception as exc:
            print(f"{name}: failed - {exc}")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
