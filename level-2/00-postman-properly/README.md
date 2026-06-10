# Level 2 / Phase 00 - Postman Properly

## Goal

Use Postman as more than a GUI curl. Build collections, environments, variables,
and tests you can run from the CLI with Newman.

## Setup

1. Install Postman: https://www.postman.com/downloads/
2. Install Newman:

   ```bash
   npm install -g newman
   ```

3. Create a Postman account so your collections can sync.

## Exercises

### 1. Create The Collection

Create a new collection named `Weather APIs`.

Add three requests:

- Open-Meteo current weather
- OpenWeatherMap current weather
- WeatherAPI current weather

Use the URLs and query parameters from Level 1 Phase 02.

### 2. Create An Environment

Create a Postman environment named `Weather`.

Add variables:

| Variable | Value |
|---|---|
| `OWM_KEY` | Your OpenWeatherMap key |
| `WEATHERAPI_KEY` | Your WeatherAPI key |
| `CITY` | `Roseau` |

Do not commit exported environments containing real keys.

### 3. Use Variables In Requests

Replace hardcoded values with Postman variables:

```text
{{OWM_KEY}}
{{WEATHERAPI_KEY}}
{{CITY}}
```

### 4. Add Test Scripts

In each request's Tests tab, add assertions. Example for OpenWeatherMap:

```javascript
pm.test("status is 200", () => pm.response.to.have.status(200));

const body = pm.response.json();

pm.test("has numeric temperature", () => {
  pm.expect(body.main.temp).to.be.a("number");
});

pm.test("humidity is 0-100", () => {
  pm.expect(body.main.humidity).to.be.within(0, 100);
});
```

### 5. Export

Export the collection as Collection v2.1.

Export the environment, then replace real key values with placeholders before
committing anything.

### 6. Run From CLI

```bash
newman run weather.postman_collection.json -e weather.postman_environment.json
```

## Research Task

- What is a pre-request script?
- What is a test script?
- What does `pm.environment.set("key", value)` do?
- How would you run a collection on a schedule?

## Checkpoint

- [ ] What is a collection?
- [ ] What is an environment?
- [ ] What is Newman?
- [ ] How does Newman differ from running Postman in the GUI?
- [ ] What does exported collection JSON look like?

## Go Deeper

- https://learning.postman.com/
- https://github.com/postmanlabs/newman
- https://learning.postman.com/docs/writing-scripts/test-scripts/
