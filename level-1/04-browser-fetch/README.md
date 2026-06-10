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
