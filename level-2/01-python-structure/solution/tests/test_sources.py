from unittest.mock import MagicMock, patch

from weather.sources import open_meteo, openweather, weatherapi


def test_open_meteo_normalize_current():
    result = open_meteo.normalize_current(
        {
            "temperature_2m": 29.4,
            "wind_speed_10m": 12.3,
            "relative_humidity_2m": 76,
            "weather_code": 61,
        }
    )

    assert result == {
        "source": "Open-Meteo",
        "temp_c": 29.4,
        "wind_kph": 12.3,
        "humidity": 76,
        "desc": "slight rain",
    }


def test_openweather_normalize_response():
    result = openweather.normalize_response(
        {
            "main": {"temp": 30.1, "humidity": 82},
            "wind": {"speed": 4.5},
            "weather": [{"description": "scattered clouds"}],
        }
    )

    assert result["source"] == "OpenWeatherMap"
    assert result["temp_c"] == 30.1
    assert result["wind_kph"] == 16.2
    assert result["humidity"] == 82
    assert result["desc"] == "scattered clouds"


def test_weatherapi_normalize_response():
    result = weatherapi.normalize_response(
        {
            "current": {
                "temp_c": 28.7,
                "wind_kph": 9.0,
                "humidity": 70,
                "condition": {"text": "Partly cloudy"},
            }
        }
    )

    assert result == {
        "source": "WeatherAPI",
        "temp_c": 28.7,
        "wind_kph": 9.0,
        "humidity": 70,
        "desc": "Partly cloudy",
    }


@patch("weather.sources.open_meteo.requests.get")
def test_open_meteo_fetch_mocked(mock_get):
    """
    Test the full fetch process of Open-Meteo offline by mocking requests.get.
    This demonstrates how to test API logic without making live network calls.
    """
    # 1. Mock Geocoding API response
    mock_geo = MagicMock()
    mock_geo.json.return_value = {"results": [{"latitude": 15.30, "longitude": -61.39}]}
    mock_geo.raise_for_status = MagicMock()

    # 2. Mock Forecast API response
    mock_weather = MagicMock()
    mock_weather.json.return_value = {
        "current": {
            "temperature_2m": 25.0,
            "wind_speed_10m": 12.0,
            "relative_humidity_2m": 80,
            "weather_code": 1,
        }
    }
    mock_weather.raise_for_status = MagicMock()

    # Configure our mock to return mock_geo first, then mock_weather
    mock_get.side_effect = [mock_geo, mock_weather]

    # Run the function
    result = open_meteo.fetch("Roseau")

    # Assert expected properties based on mock responses
    assert result == {
        "source": "Open-Meteo",
        "temp_c": 25.0,
        "wind_kph": 12.0,
        "humidity": 80,
        "desc": "mainly clear",
    }

    # Assert requests.get was indeed called twice
    assert mock_get.call_count == 2
