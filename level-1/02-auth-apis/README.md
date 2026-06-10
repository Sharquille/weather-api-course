# Level 1 / Phase 02 - Authenticated APIs

## Goal

Use real API keys safely and normalise responses from two different weather
providers.

## Work In

```text
starter/weather_auth.py
```

Copy the example environment file before running:

```bash
cd level-1/02-auth-apis/starter
cp .env.example .env
```

Put real keys in `.env`. Do not commit `.env`.

## Key Ideas

- API keys as secrets
- `.env` files
- `python-dotenv`
- 401, 403, and 429 handling
- response normalisation

## Checkpoint

- [ ] Why should keys stay out of source code?
- [ ] What should you do if a key is accidentally committed?
- [ ] What does 429 mean?
- [ ] Why normalise different API responses into one shape?
