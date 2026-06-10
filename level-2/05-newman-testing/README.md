# Level 2 / Phase 05 - Newman And CI

## Goal

Run your Postman collection automatically on every push with GitHub Actions.

## Setup

1. Export your Postman collection and environment from Phase 00.
2. Save sanitized versions in this folder.
3. Add real keys to GitHub repository secrets:
   - `OWM_KEY`
   - `WEATHERAPI_KEY`

Do not commit exported environment files containing real keys.

## Files

Use these names:

```text
level-2/05-newman-testing/collection.json
level-2/05-newman-testing/env.json
```

This repo includes example placeholders:

```text
collection.example.json
env.example.json
.github-workflow-template.yml
```

## GitHub Actions Workflow

Copy `.github-workflow-template.yml` to:

```text
.github/workflows/api-tests.yml
```

Then push to GitHub and open the Actions tab.

## Research Task

- What is a workflow?
- What is a job?
- What is a step?
- What is a runner?
- What is the difference between `secrets` and `vars`?

## Checkpoint

- [ ] What triggers this workflow?
- [ ] Where do real API keys live?
- [ ] Why should exported Postman env files be sanitized?
- [ ] How do you tell whether the CI run passed?
