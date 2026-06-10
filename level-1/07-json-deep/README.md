# Level 1 / Phase 07 - JSON Deep Dive

## Goal

Treat JSON as data you own: save it, load it, navigate it safely, validate it,
and compare responses.

## Work In

```text
starter/json_practice.py
```

## Commands

```bash
cd level-1/07-json-deep/starter
python3 json_practice.py
```

## Key Ideas

- `json.dump()` and `json.load()`
- local cache files
- safe nested dictionary access
- schema validation
- comparing response shapes

## Checkpoint

- [ ] What is the difference between `json.dump()` and `json.dumps()`?
- [ ] Why avoid direct `data["a"]["b"]["c"]` access for uncertain responses?
- [ ] Why validate API response shape?
- [ ] How would you handle a very large JSON file?
