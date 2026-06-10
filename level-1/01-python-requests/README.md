# Level 1 / Phase 01 - Python Requests

## Goal

Replace curl with a Python CLI script that calls an API, parses JSON, handles
errors, and formats output.

## Work In

```text
starter/weather_basic.py
```

The starter has numbered TODOs. Complete them in order and run the script after
each meaningful change.

## Commands

```bash
cd level-1/01-python-requests/starter
python3 weather_basic.py
```

## Key Ideas

- `requests.get()`
- query parameters
- `response.raise_for_status()`
- JSON parsing
- `try` / `except`
- command-line arguments with `sys.argv`

## Checkpoint

- [ ] Why use a `params` dictionary instead of building the URL manually?
- [ ] What does `raise_for_status()` do?
- [ ] Why should HTTP requests include a timeout?
- [ ] What is the Python equivalent of a curl POST with JSON?
