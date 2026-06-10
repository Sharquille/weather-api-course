# Level 2 - Automation

Level 2 turns the API fundamentals from Level 1 into useful automation:
collections, packages, webhooks, schedules, CI, and a capstone project.

Complete Level 1 first. The course site locks Level 2 until all Level 1 phases
are marked complete.

## Phases

| Phase | Folder | Focus |
|---|---|---|
| 00 | `00-postman-properly/` | Postman collections, environments, Newman |
| 01 | `01-python-structure/` | `src/` layout, `pyproject.toml`, pytest |
| 02 | `02-chaining-apis/` | Weather data to Discord webhook notification |
| 03 | `03-schedules-cron/` | cron, Task Scheduler, logs, idempotency |
| 04 | `04-webhooks/` | Receiving webhooks with Flask and ngrok |
| 05 | `05-newman-testing/` | Newman in GitHub Actions |
| 06 | `06-capstone/` | End-to-end API automation project |

## Folder Pattern

Code-heavy phases include:

- `README.md` - lesson instructions
- `starter/` - incomplete files for learners
- `solution/` - reference implementation

The solution folders are normal folders in this repo. They are not nested Git
repositories.
