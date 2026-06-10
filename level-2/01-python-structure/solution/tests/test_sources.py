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
