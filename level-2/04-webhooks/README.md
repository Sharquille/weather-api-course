# Level 2 / Phase 04 - Receiving Webhooks

## Goal

Flip direction. Instead of calling someone else's API, build an endpoint that
another service can call.

## Setup

1. Install ngrok: https://ngrok.com/download
2. Create a free ngrok account.
3. Add your auth token:

   ```bash
   ngrok config add-authtoken YOUR_TOKEN
   ```

4. Install Flask:

   ```bash
   pip install flask
   ```

## Exercises

Build `server.py` with:

1. A Flask server on port 8080.
2. `POST /webhook` that reads JSON, logs it, and returns 200.
3. `GET /health` for a simple health check.
4. An ngrok tunnel with `ngrok http 8080`.
5. A test POST from webhook.site or curl.

## Commands

Terminal 1:

```bash
cd level-2/04-webhooks/starter
python3 server.py
```

Terminal 2:

```bash
ngrok http 8080
```

Test:

```bash
curl -X POST http://localhost:8080/webhook \
  -H "Content-Type: application/json" \
  -d '{"event":"test","source":"curl"}'
```

## n8n Option

If you self-host n8n, you can build the same idea with a Webhook Trigger node.
The concept is identical: a public endpoint receives an event and starts a
workflow.

## Research Task

- What is the difference between a webhook and an API call?
- How does ngrok work?
- What is event-driven architecture?
- How would you secure a webhook endpoint?

## Checkpoint

- [ ] What flips between an API call and a webhook?
- [ ] Why does ngrok exist?
- [ ] What does 200 OK tell the webhook sender?
- [ ] What is signature verification?
