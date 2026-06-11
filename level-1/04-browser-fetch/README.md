# Level 1 / Phase 04 - Browser fetch()

## Goal

Build the same multi-source weather dashboard in the browser using `fetch()`.

## Work In

```text
starter/index.html
```

Run through a local web server. Do not open the file directly with `file://`.

## Commands

```bash
cd level-1/04-browser-fetch/starter
python3 -m http.server 8080
```

Open `http://localhost:8080`.

## API Keys In The Browser

The page includes a small "Local API Key Settings" panel. Paste your
OpenWeatherMap and WeatherAPI keys there and click "Save to Browser". The keys
are stored in your browser's `localStorage` (keys `OWM_KEY` and
`WEATHERAPI_KEY`) and never leave your machine. The fetch functions read them
from `localStorage` — this is the browser-side stand-in for the `.env` file you
used in Phase 02.

## Key Ideas

- `fetch()`
- `async` / `await`
- `URLSearchParams`
- `Promise.allSettled()`
- DOM rendering
- CORS

## Checkpoint

- [ ] Why does browser JavaScript care about CORS?
- [ ] What is the difference between `Promise.all()` and `Promise.allSettled()`?
- [ ] Why is `response.json()` async?
- [ ] Where are browser-only API keys stored in this exercise?
