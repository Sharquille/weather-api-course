# Level 2 / Phase 02 - Chaining APIs

## Goal

Use the output of one API as the input to another. Build a script that fetches
weather and sends a Discord notification.

## Setup

1. Create a Discord server or use an existing one.
2. Open channel settings.
3. Go to Integrations > Webhooks > New Webhook.
4. Copy the webhook URL.
5. Copy `.env.example` to `.env` in your working folder.

```bash
cd level-2/02-chaining-apis/starter
cp .env.example .env
```

Put your real webhook URL in `.env`.

## Exercises

Build `notify.py` so it:

1. Fetches weather for a city.
2. Checks whether rain or high humidity is likely.
3. Builds a Discord webhook payload.
4. Sends the payload to Discord with `requests.post()`.
5. Prints the HTTP status code.

## Commands

```bash
python3 notify.py Roseau
```

## Research Task

- What is a webhook?
- Why does Discord's webhook endpoint accept POST but not GET?
- What does the response from a successful webhook call look like?

## Checkpoint

- [ ] What is a webhook?
- [ ] What data shape does Discord expect?
- [ ] What HTTP status means success?
- [ ] Where should the webhook URL live?
