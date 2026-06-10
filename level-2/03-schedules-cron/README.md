# Level 2 / Phase 03 - Schedules And cron

## Goal

Run the notification script automatically every morning at 7:00.

## Linux And macOS

Open your crontab:

```bash
crontab -e
```

Add a line like this, adjusting paths for your machine:

```cron
0 7 * * * cd /path/to/weather-api-course/level-2/02-chaining-apis/solution && /usr/bin/python3 notify.py Roseau >> /tmp/weather.log 2>&1
```

Cron syntax:

```text
minute hour day-of-month month day-of-week command
```

Examples:

```cron
0 7 * * *     # 7:00 AM every day
* * * * *     # every minute, useful only for testing
```

## Windows

Use Task Scheduler:

1. Create Task.
2. Trigger: Daily at 7:00 AM.
3. Action: start your Python executable.
4. Arguments: path to `notify.py`.
5. Start in: the folder containing `notify.py`.

## Make It Idempotent

If cron runs twice, the script should not send duplicate messages. Add a state
file that records the last date a message was sent.

```python
from datetime import date
from pathlib import Path

STATE_FILE = Path("/tmp/weather-notify-state")


def already_sent_today() -> bool:
    if not STATE_FILE.exists():
        return False
    return STATE_FILE.read_text().strip() == str(date.today())


def mark_sent_today() -> None:
    STATE_FILE.write_text(str(date.today()))
```

Call `already_sent_today()` before sending. Call `mark_sent_today()` only after
Discord accepts the message.

## Research Task

- What does `>>` do compared with `>`?
- Why redirect stderr with `2>&1`?
- How do you check whether cron actually ran?
- What is the difference between cron and systemd timers?

## Checkpoint

- [ ] What does `0 7 * * *` mean?
- [ ] Why log to a file?
- [ ] What is idempotency?
- [ ] How do you debug a cron job that is not running?
