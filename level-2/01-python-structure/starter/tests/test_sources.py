import pytest

from weather.sources import open_meteo


def test_open_meteo_starter_not_implemented():
    with pytest.raises(NotImplementedError):
        open_meteo.fetch("Roseau")


# TODO (Optional/Advanced): Write a mocked unit test for open_meteo.fetch
# This lets you test the fetch function offline without hitting real servers.
#
# Hint:
# from unittest.mock import patch, MagicMock
#
# @patch("weather.sources.open_meteo.requests.get")
# def test_open_meteo_fetch_mocked(mock_get):
#     # 1. Create a MagicMock for the geocoding response
#     # 2. Create a MagicMock for the forecast response
#     # 3. Set mock_get.side_effect = [mock_geo, mock_forecast]
#     # 4. Call open_meteo.fetch("Roseau") and assert expected results
#     pass

