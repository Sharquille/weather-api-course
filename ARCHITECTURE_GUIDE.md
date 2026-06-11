# 📚 Architecture and Professional Design Patterns Guide

Welcome to the **Weather API Course Architecture Guide**. 

This guide outlines the primary architectural structures, security principles, and testing patterns embedded within this codebase. These patterns mirror real-world software engineering practices and serve as the foundation for building enterprise-grade, secure, and reliable API integrations.

---

## 📂 Core Architectural Patterns

| Level / Phase | Feature | Concept | Purpose |
|---|---|---|---|
| **Level 1, Phase 04** | **Browser Key Manager UI** | Client-Side Key Management | Eliminates manual console hacks with an intuitive browser settings panel. |
| **Level 2, Phase 01** | **Modern Package Tooling (`ruff`, `mypy`)** | Static Code Analysis | Enforces strict style guidelines and automatically catches typing issues. |
| **Level 2, Phase 01** | **Offline API Mocking in `pytest`** | Network Isolation | Intercepts outbound network requests to enable offline, reliable testing. |
| **Level 2, Phase 04** | **Cryptographic Signature Verification** | Message Authenticity | Validates webhook payloads using SHA256 HMAC tokens. |

---

## 🔑 1. Local Key Management UI (Level 1, Phase 04)

### The Concept
When developing a client-side (frontend) application that speaks directly to third-party weather APIs, developers face a classic challenge: **how to supply API keys without exposing them to the public internet.**

In a pure local learning environment, we avoid hardcoding credentials by using the browser's native `localStorage` vault. 

### The Implementation
Rather than forcing you to open the developer console to inject these keys, the course application includes an elegant, local **🔑 API Key Settings Panel** at the top of the interface:
* It stores keys safely in your personal browser instance.
* No keys are ever sent to an external database, keeping credentials fully private.
* It enables seamless toggling between multiple services (OpenWeatherMap and WeatherAPI) instantly.

---

## 🛠 2. Linting & Static Type-Checking (Level 2, Phase 01)

### The Concept
In high-performance engineering teams, quality gates are checked before a single line of code is run. We rely on two industry standards for this:
1. **Linters and Formatters (`ruff`)**: Checks code for syntax violations, anti-patterns, unused imports, and enforces standard line-formatting.
2. **Type Checkers (`mypy`)**: Inspects Python type hints to verify mathematical and logic operations are sound.

### Configuration
The package configuration file (`pyproject.toml`) contains strict, production-ready static analysis parameters:

```toml
[tool.ruff]
line-length = 88

[tool.ruff.lint]
select = ["E", "F", "I"]  # Style rules, code errors, and import sorts

[tool.mypy]
ignore_missing_imports = true
strict = true
```

### Running Static Checks:
To run these checks locally, install the package in development mode and execute the tools:
```bash
# Install with dev dependencies
pip install -e ".[dev]"

# Run styling/bug check
ruff check .

# Check types
mypy src/
```

---

## 🧪 3. Offline API Mocking (Level 2, Phase 01)

### The Concept
An automated test suite should never rely on active third-party servers. If your tests make live internet requests to fetch the weather:
1. They will **fail** if your network is down or if the weather provider experiences an outage (flaky tests).
2. They will **deplete your API rate limits** when running in continuous integration pipelines.
3. They require exposing live credentials inside CI runners (e.g., GitHub Actions).

We resolve this by using **API Mocking**—intercepting outbound HTTP requests and supplying a local, fake JSON body instead.

### The Implementation
Using Python's standard `unittest.mock.patch` library, we intercept `requests.get` inside the `test_sources.py` file:

```python
from unittest.mock import patch, MagicMock
from weather.sources import open_meteo

@patch("weather.sources.open_meteo.requests.get")
def test_open_meteo_fetch_mocked(mock_get):
    # 1. Create a mock response for the Geocoding API step
    mock_geo = MagicMock()
    mock_geo.json.return_value = {
        "results": [{"latitude": 15.30, "longitude": -61.39}]
    }
    mock_geo.raise_for_status = MagicMock()

    # 2. Create a mock response for the Forecast API step
    mock_weather = MagicMock()
    mock_weather.json.return_value = {
        "current": {
            "temperature_2m": 25.0,
            "wind_speed_10m": 12.0,
            "relative_humidity_2m": 80,
            "weather_code": 1
        }
    }
    mock_weather.raise_for_status = MagicMock()

    # 3. Configure mock_get to return Geocoding FIRST, then Forecast SECOND
    mock_get.side_effect = [mock_geo, mock_weather]

    # 4. Fetch the weather — this runs 100% offline!
    result = open_meteo.fetch("Roseau")

    # 5. Verify the data normalized perfectly
    assert result["temp_c"] == 25.0
    assert result["wind_kph"] == 12.0
```

---

## 🔒 4. Webhook Cryptographic Signatures (Level 2, Phase 04)

### The Concept
A webhook receiver exposes an open endpoint on the public internet (e.g., `POST /webhook`) so that external systems can push updates to your application. Because this port is open, **anyone who discovers your URL can spoof payloads and send malicious or fake data.**

To solve this, professional systems (like Stripe, GitHub, and Shopify) secure webhooks with **cryptographic symmetric signature verification**.

### How Webhook Signing Works:
1. The sender and your receiver share a **secret key** (e.g., `super-secret-key-shared-with-sender`).
2. When the sender fires a payload, they generate a **SHA256 HMAC hash** of the raw request body using that secret.
3. The sender includes this hash in the request headers (e.g., `X-Hub-Signature-256`).
4. Your Flask server accepts the raw payload, calculates the HMAC signature using your copy of the secret, and compares it to the incoming header signature. If they match, the payload is verified as authentic.

### Testing the Verified Endpoint:
1. Run the server:
   ```bash
   python3 level-2/04-webhooks/solution/server.py
   ```
2. Unsigned request:
   ```bash
   curl -X POST http://localhost:8080/webhook-secure \
     -H "Content-Type: application/json" \
     -d '{"temp_c": 32.1}'
   ```
   *Response:* `HTTP 401 Unauthorized`

3. Properly signed request using the shared secret. First compute the signature
   of the exact body bytes:
   ```bash
   python3 -c 'import hmac, hashlib; print(hmac.new(b"super-secret-key-shared-with-sender", b"{\"temp_c\": 32.1}", hashlib.sha256).hexdigest())'
   ```
   Then send it (the signature below is the correct one for this body and secret):
   ```bash
   curl -X POST http://localhost:8080/webhook-secure \
     -H "Content-Type: application/json" \
     -H "X-Hub-Signature-256: a0339019187ee47eee3d0fefc9305073611217dfa3672f9104691e0b1fd0efdb" \
     -d '{"temp_c": 32.1}'
   ```
   *Response:* `HTTP 200 OK` ("verified & processed")

   Note: the signature is computed over the raw request body, so even a one-character
   change to the JSON (an extra space, a different number) produces a completely
   different signature. That is the whole point.

---

## ⚡ 5. Production Edge Proxies (Cloudflare Pages Functions)

When you deploy your static frontend onto Cloudflare Pages, your front-end browser must make external fetching calls. 

To hide your API keys in a real deployed production app, you route your browser requests through a serverless **API Proxy** (or Backend-for-Frontend). Cloudflare Pages supports this natively via **Pages Functions** by looking for a `/functions` folder.

#### Front-End fetch:
```javascript
// No secret keys are stored or sent by the client browser!
const response = await fetch(`/api/weather?city=Roseau`);
const data = await response.json();
```

#### Inside `/functions/api/weather.js` (Runs Securely on the Edge):
```javascript
export async function onRequest(context) {
  const { searchParams } = new URL(context.request.url);
  const city = searchParams.get("city") || "Roseau";
  
  // Stored safely on Cloudflare's server dashboard (never visible to users)
  const OWM_KEY = context.env.OWM_KEY; 

  // The proxy secure-fetches the real API using your hidden key
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OWM_KEY}&units=metric`
  );
  
  const data = await response.json();
  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" }
  });
}
```
This is the ultimate, gold-standard pattern for keeping credentials fully hidden while deploying blazing-fast frontend apps!

---

## 💻 6. Running and Testing Locally (No Cloudflare Required)

While Cloudflare is utilized for the production deployment phase of your browser app, **the entire course is designed to be fully compatible with local-only development.**

### Local Static Server
To run the course dashboard or test any browser-based phases (such as Level 1 Phase 04) on your machine, you can run Python's built-in HTTP server module. This serves the files over `http://localhost:8080` instead of the raw `file://` protocol (which browser security restrictions and CORS will often block).

Run the following command from the repository root:
```bash
python3 -m http.server 8080
```
Then navigate to: `http://localhost:8080`

### Session and Progress Retention
* **Progress Tracking:** All phase completion statuses and custom API keys are securely persisted in your web browser's **`localStorage`**.
* **State Preservation:** As long as you do not clear your browser's application cache, your course progress will remain intact.
* **Cloud Sync (Optional):** If you wish to back up your progress or move between machines without hosting on Cloudflare, you can configure the GitHub Gist sync feature (see `PROGRESS_SYNC.md`). This writes your progress securely to a private Gist on your GitHub account.

### Local Backend & Webhooks
For backend-related phases (such as Level 2 Phase 04 webhooks), you will run a local **Flask** server:
```bash
python3 level-2/04-webhooks/starter/server.py
```
To expose this server to external webhook senders (like Discord or webhook.site) without using Cloudflare, use a reverse tunneling utility like **ngrok**:
```bash
ngrok http 8080
```
This maps a temporary, secure public URL to your local server.

