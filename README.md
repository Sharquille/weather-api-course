# Weather API Course

A two-level, hands-on course for learning HTTP, REST APIs, Python automation,
browser `fetch()`, deployment, security, and scheduled API workflows by building
weather integrations.

The course is designed for two learners working independently on their own
machines. Each person clones the same course repo, keeps their own API keys in
local `.env` files, and deploys their own finished app when they reach the
deployment phase.

## Quick Start

```bash
git clone https://github.com/Sharquille/weather-api-course.git
cd weather-api-course
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

Windows PowerShell:

```powershell
py -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

Open the course site by opening `index.html`, or serve it locally:

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

When the site is served (not opened as a `file://` page), each phase lesson has
a **Source & solution** panel: click *View starter code* or *Reveal solution* to
read the actual files inline, so you can study objectives and code in the browser
and keep the terminal for doing the work.

## CLI Helper (`wac`)

`wac.sh` lets you work any phase without typing long `cd` paths. Source it once
so `wac cd` can change your shell's directory:

```bash
source "$(pwd)/wac.sh"      # add this line to ~/.zshrc to make it permanent
```

Then:

```bash
wac cd 1 00        # cd into level-1/00-curl-basics/starter
wac run 1 01       # run the phase starter in its folder
wac open 1 04      # open the starter in $EDITOR
wac solution 2 04  # print the solution file(s)
wac test           # run the Level 2 Phase 01 test suite
wac serve          # serve the course site on http://localhost:8080
wac list           # list every phase
wac help           # full usage
```

`<level>` is `1` or `2`; `<phase>` is `0`–`7` (e.g. `00`, `4`, `07`). Running
`./wac.sh <command>` without sourcing also works for everything except `cd`,
which can only move a shell that sourced the file.

## Deploy The Course Site To Cloudflare Pages

This repository is ready to deploy as a static Cloudflare Pages site from the
repo root. There is no framework build step.

Recommended Pages settings:

```text
Framework preset: None
Production branch: main
Build command: exit 0
Build output directory: /
Root directory: /
```

The `_headers` file is included so Cloudflare Pages applies basic security
headers to the deployed site.

This deploys the course site itself. Level 1 Phase 05 is different: that phase
asks each learner to create a separate repo for their own finished weather app.

## Repository Structure

```text
weather-api-course/
├── _headers                    Cloudflare Pages security headers
├── index.html                  Course site and progress tracker
├── ARCHITECTURE_GUIDE.md       Professional patterns used in the course
├── PROGRESS_SYNC.md            GitHub Gist progress sync guide
├── wac.sh                      CLI helper (source it; see "CLI Helper")
├── fonts/                      Self-hosted Inter + JetBrains Mono
├── requirements.txt            Shared Python dependencies
├── level-1/                    API fundamentals
│   ├── 00-curl-basics/
│   ├── 01-python-requests/
│   ├── 02-auth-apis/
│   ├── 03-multi-source/
│   ├── 04-browser-fetch/
│   ├── 05-deploy/
│   ├── 06-api-security/
│   └── 07-json-deep/
└── level-2/                    Automation and integration workflows
    ├── 00-postman-properly/
    ├── 01-python-structure/
    ├── 02-chaining-apis/
    ├── 03-schedules-cron/
    ├── 04-webhooks/
    ├── 05-newman-testing/
    └── 06-capstone/
```

Most coding phases include a `starter/` folder and a `solution/` folder.
Learners work in `starter/`. The `solution/` folder is a reference answer for
review, debugging, and comparison after attempting the exercise.

[ARCHITECTURE_GUIDE.md](ARCHITECTURE_GUIDE.md) explains the professional
patterns embedded in the exercises: browser-side key management, linting and
type checking with `ruff` and `mypy`, offline API mocking in tests, webhook
signature verification, and edge proxies for hiding keys in production.

## Levels

Level 1 builds the fundamentals:

- `curl` and raw HTTP
- Python `requests`
- API keys and `.env` files
- Multi-source API aggregation
- Browser `fetch()`
- Cloudflare Pages deployment
- API security
- JSON parsing, caching, and validation

Level 2 turns those fundamentals into automation:

- Postman collections and Newman
- Python package structure
- API chaining and Discord webhooks
- cron and scheduled jobs
- receiving webhooks with Flask and ngrok
- GitHub Actions API tests
- an end-to-end capstone integration

## API Keys

Never commit real API keys. Copy the example file and keep your values local:

```bash
cp level-1/02-auth-apis/starter/.env.example level-1/02-auth-apis/starter/.env
```

Use `.env.example` for names and placeholders only. Put real keys in `.env`,
which is ignored by Git.

## Progress Sync

The course site saves phase progress locally in your browser. To sync progress
across browsers or devices, use the GitHub Gist sync panel in the site.

Read [PROGRESS_SYNC.md](PROGRESS_SYNC.md) for setup, save/load behavior, privacy
notes, and troubleshooting.

## About The Separate Deployment Repo

The course repo is the curriculum. In Level 1 Phase 05, each learner creates a
separate GitHub repository for their own deployed weather app. That separate
repo is not nested inside this repo; it is a new remote repository connected to
Cloudflare Pages.

Why separate it?

- The course repo stays clean and reusable.
- Each learner gets their own deploy pipeline and URL.
- API keys and deployment settings remain per learner.
- It mirrors how real projects separate source curriculum, forks, and deployed
  apps.

The `starter/` and `solution/` folders inside this repo are not separate Git
repositories. They are normal folders used for teaching.

## Local Verification

Run quick checks from the repo root:

```bash
python3 -m compileall level-1 level-2
```

The Level 2 Phase 01 package has its own quality gates (run from that phase's
`solution/` or `starter/` folder after `pip install -e ".[dev]"`):

```bash
pytest -v
ruff check .
mypy src/
```

Some scripts call live APIs and require keys. Those should be tested from their
phase folder after creating the relevant `.env` file.
