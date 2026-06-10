# Level 2 / Phase 01 - Python Project Structure

## Goal

Move from one-file scripts to a proper Python package with `src/`,
`pyproject.toml`, a CLI entry point, and pytest tests.

## New Structure

```text
weather/
├── pyproject.toml
├── src/
│   └── weather/
│       ├── __init__.py
│       ├── cli.py
│       └── sources/
│           ├── __init__.py
│           ├── open_meteo.py
│           ├── openweather.py
│           └── weatherapi.py
└── tests/
    └── test_sources.py
```

## Exercises

1. Copy the Level 1 Phase 03 source functions into the new package layout.
2. Make every source module expose a `fetch(city: str) -> dict` function.
3. Create `pyproject.toml`.
4. Install the package in editable mode.
5. Add pytest tests for response normalisation.
6. Confirm the CLI still works.

## Commands

```bash
cd level-2/01-python-structure/starter
pip install -e ".[dev]"
pytest -v
python -m weather.cli Roseau
```

Use `solution/` as a reference after attempting the starter.

## Research Task

- What is `pyproject.toml`?
- Why is `pyproject.toml` replacing `setup.py`?
- How does `pip install -e .` work?
- What does `__init__.py` do?
- Why use `src/` layout?

## Checkpoint

- [ ] Why use `src/` layout?
- [ ] What does editable install mean?
- [ ] Why use pytest over unittest here?
- [ ] How do you run one test file?
- [ ] How do you run one test function?
