import pytest

from weather.sources import open_meteo


def test_open_meteo_starter_not_implemented():
    with pytest.raises(NotImplementedError):
        open_meteo.fetch("Roseau")
