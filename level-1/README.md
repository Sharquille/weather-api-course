# Level 1 - API Fundamentals

Level 1 teaches the core API skills needed before automation: first principles,
raw HTTP, Python requests, authenticated APIs, multi-source aggregation, browser
fetch, deployment, API security, JSON handling, and CORS.

There are **10 phases** — an interactive first-principles intro on the course
site, then the 9 build phases below. Phases 06–08 deepen and harden the app you
deploy in Phase 05, so do 05 first and keep your keys in `.env` from the start.

## Phases

| Phase | Folder | Focus |
|---|---|---|
| Intro | *(course site only)* | First principles: interfaces, abstraction, the HTTP contract |
| 00 | `00-curl-basics/` | HTTP, curl, methods, headers, status codes |
| 01 | `01-python-requests/` | Python `requests`, JSON, errors, CLI args |
| 02 | `02-auth-apis/` | API keys, `.env`, 401/403/429 handling |
| 03 | `03-multi-source/` | Parallel API calls and graceful degradation |
| 04 | `04-browser-fetch/` | Browser `fetch()`, async/await, CORS |
| 05 | `05-deploy/` | Cloudflare Pages and deployment flow |
| 06 | `06-api-security/` | Secret scanning, rate limits, key validation |
| 07 | `07-json-deep/` | JSON files, cache, safe getters, schema checks |
| 08 | `08-cors-mocking/` | CORS, Same-Origin Policy, preflight, mock server |

## How To Work

Start with each phase's `starter/` folder. Try the exercise before reading the
matching `solution/` folder. The course site in `index.html` has the full lesson
flow, research prompts, checkpoints, and run commands.
