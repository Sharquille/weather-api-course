# Level 1 Capstone — Transfer Gate

This is not a new lesson. It's a **gate**: prove the Level 1 skills transfer to an
API you have never seen before you unlock Level 2 automation.

No new concepts. No copy-paste from earlier phases. One file, ~60 minutes.

## The challenge

Build a single Python file (`client.py`) that talks to **an API you have never
used** and is **not** a weather API.

It must:

1. Call the API with `requests.get(url, params=..., timeout=...)`.
2. Handle failure for real — `Timeout`, `HTTPError` (including `401`/`429`), and
   `ConnectionError` — printing a clear message for each, never a raw traceback.
3. Print **one genuinely useful line** of output.
4. Keep any API key in a `.env` (loaded with `python-dotenv`), never in the file.

## Predict first

Before you open the new API's docs, write down the four things you already know
you'll need to find:

- its **base URL**,
- how it **authenticates** (header vs query param, or no key at all),
- the **one field** you actually want out of the response,
- which **errors** it can return.

You learned all four in Level 1. The docs just fill in the specifics.

## Steps

1. Browse [`public-apis/public-apis`](https://github.com/public-apis/public-apis)
   and pick something you find interesting and have **not** used. Prefer a free,
   no-credit-card tier.
2. Read just enough of its docs to find the base URL, the auth method, and the
   field you want.
3. If it needs a key, sign up, put it in `.env`, and load it with
   `python-dotenv`. Verify `.env` is git-ignored.
4. Write `client.py`: build the request, set a `timeout`, call
   `raise_for_status()`.
5. Wrap the call in `try/except` for `Timeout`, `HTTPError`, and
   `ConnectionError`.
6. Run it. Then deliberately break the key or URL and re-run to confirm it fails
   gracefully.

## How to know you're done

| Level | What it looks like |
|---|---|
| **Emerging** | Runs, but only by leaning on Level 1 solutions |
| **Developing** | Worked independently on this familiar shape |
| **Transfer-ready** | Could do this cold against any API, explain each error branch, and teach it back |

Aim for **Transfer-ready** before you start Level 2. If any step felt shaky, the
Level 1 phase it came from is the one to revisit first.

## Run

```bash
cd level-1/09-capstone
python3 client.py
```
