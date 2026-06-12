# Level 1 / Phase 08 - CORS & Mocking

## Goal

Understand the Cross-Origin Resource Sharing (CORS) protocol, why browser security blocks cross-origin requests, and how to configure a backend server to allow safe communication with front-end browser clients.

## Work In

```text
starter/server.py
starter/index.html
```

## Commands

```bash
# In terminal 1 (start backend mock server)
cd level-1/08-cors-mocking/starter
python3 server.py

# In terminal 2 (start frontend web server)
cd level-1/08-cors-mocking/starter
python3 -m http.server 8080
```

Open `http://localhost:8080` in your browser.

## The CORS Problem

When you fetch an API directly from standard backend python scripts (like in Phase 01), the operating system directly issues TCP/IP packets with no origin verification.
However, inside a web browser, a malicious website can access bank endpoints or other secure user cookies. To protect you, web browsers enforce the **Same-Origin Policy (SOP)**. 

If your frontend is running on `http://localhost:8080`, and it tries to fetch an API from `http://localhost:5000`, the browser blocks the response unless the backend at `localhost:5000` returns specific headers explicitly authorizing requests from `localhost:8080`.

## Key Ideas

- **SOP (Same-Origin Policy)** — browser safety gates
- **CORS (Cross-Origin Resource Sharing)** — safe cross-origin authorization
- **Preflight OPTIONS Request** — browser handshake checking allowed verbs
- **Access-Control-Allow-Origin** — the key backend authorization header
- **Access-Control-Allow-Headers** — authorizing custom headers

## Checkpoint

- [ ] What constitutes a distinct "Origin" in a browser? (Host, Port, and Protocol)
- [ ] Why does curl bypass CORS but browser `fetch()` does not?
- [ ] What is a preflight request and what HTTP method does it use?
- [ ] How does `Access-Control-Allow-Origin: *` differ from `Access-Control-Allow-Origin: http://localhost:8080`?
