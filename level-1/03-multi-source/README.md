# Level 1 / Phase 03 - Multi-Source Aggregation

## Goal

Call multiple weather APIs in parallel and render a side-by-side dashboard.

## Work In

```text
starter/dashboard.py
```

Use the solution only after trying the starter.

## Commands

```bash
cd level-1/03-multi-source/starter
python3 dashboard.py Roseau
```

## Key Ideas

- `ThreadPoolExecutor`
- parallel I/O
- `as_completed()`
- graceful degradation when one source fails
- fixed-width terminal tables

## Checkpoint

- [ ] Why is parallel I/O faster than sequential calls here?
- [ ] How do you keep one failing source from crashing the whole dashboard?
- [ ] What is the JavaScript equivalent of this pattern?
- [ ] Why does the slowest source set the total runtime?
