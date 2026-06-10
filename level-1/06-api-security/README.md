# Level 1 / Phase 06 - API Security

## Goal

Learn how API keys leak, how to spot risky patterns, and how to handle auth and
rate-limit failures deliberately.

## Work In

```text
starter/security_checks.py
```

## Commands

```bash
cd level-1/06-api-security/starter
python3 security_checks.py
```

## Key Ideas

- secret scanning
- risky query-string auth
- safer header auth
- rate-limit handling
- key validation
- OWASP API risks

## Checkpoint

- [ ] What patterns might reveal a hardcoded secret?
- [ ] Why are keys in URLs risky?
- [ ] What should a program do when it receives 429?
- [ ] How would you validate a key without doing expensive work?
