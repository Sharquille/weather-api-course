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

## Optional: Signature-Verified Webhook

Anyone who discovers your public webhook URL can send fake payloads. Real
services (GitHub, Stripe, Slack) solve this by signing each request with a
shared secret. The starter has a commented `TODO` block for an optional
`/webhook-secure` endpoint; the solution implements it with HMAC-SHA256.

How it works:

1. Sender and receiver share a secret key.
2. The sender computes an HMAC-SHA256 hash of the raw request body and puts it
   in the `X-Hub-Signature-256` header.
3. Your server recomputes the hash from the body it received and compares with
   `hmac.compare_digest()`. Mismatch or missing header means reject.

Test it against the solution server:

```bash
# Compute the signature for the exact body bytes
python3 -c 'import hmac, hashlib; print(hmac.new(b"super-secret-key-shared-with-sender", b"{\"temp_c\": 32.1}", hashlib.sha256).hexdigest())'

# Unsigned request -> 401
curl -s -o /dev/null -w "%{http_code}\n" -X POST http://localhost:8080/webhook-secure \
  -H "Content-Type: application/json" -d '{"temp_c": 32.1}'

# Signed request -> 200
curl -X POST http://localhost:8080/webhook-secure \
  -H "Content-Type: application/json" \
  -H "X-Hub-Signature-256: a0339019187ee47eee3d0fefc9305073611217dfa3672f9104691e0b1fd0efdb" \
  -d '{"temp_c": 32.1}'
```

The signature covers the raw bytes of the body, so changing even one character
of the JSON produces a completely different signature.

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
- [ ] Why compare signatures with `hmac.compare_digest()` instead of `==`?
