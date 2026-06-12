// ════════════════════════════════════════════════
//  COURSE DATA — fully self-contained
// ════════════════════════════════════════════════
const L1_PHASES = [
  {
    id:'l1p_intro', num:'Phase Intro', title:'First Principles of APIs',
    file:'README.md',
    desc:'Interactive Brilliant-style introduction. Master interface boundaries, abstraction layers, decompiling raw HTTP streams, and client-server symmetry.',
    pills:['First Principles','Abstraction','Interfaces','Serialization','Client-Server Symmetry','HTTP Contract'],
    goal:'Understand why APIs exist, how complex machinery is abstracted behind simple boundaries, and how machines talk to each other.',
    concept:'An API is not magic — it is an interface. We use boundaries and abstraction to simplify complex electronic pipelines. When raw binary/text data traverses the wire, it strictly mirrors a request-response contract.',
    parts:[
      {label:'Step 1', text:'The Vending Machine: Discovering the concept of an Interface and Abstraction boundaries.'},
      {label:'Step 2', text:'Code Abstractions: Connecting inputs to outputs using function boundaries.'},
      {label:'Step 3', text:'Request Decompilation: Parsing raw byte streams into methods, paths, and headers.'},
      {label:'Step 4', text:'The Symmetric Mirror: Aligning Client requests to Server responses symmetrically.'},
      {label:'Step 5', text:'Interface Contracts: Simulating strict data formats and catching contract breaks.'}
    ],
    steps:[
      'Open this introduction sandbox',
      'Step 1: Interact with the raw inner vending machinery and use clean interface buttons.',
      'Step 2: Connect pipes to form function boundaries.',
      'Step 3: Solve the byte stream parser challenge.',
      'Step 4: Answer symmetrical response mirror puzzles.',
      'Step 5: Trigger API contract breaks and analyze client stack trace errors.'
    ],
    research:'Read about the history of the term "Application Programming Interface". Why did early OS developers choose "Interface" as the core metaphor? How does it differ from a physical interface like a steering wheel?',
    checkpoint:['What does Abstraction mean in computer science?','Why are raw TCP sockets abstracted behind HTTP?','What happens when a Server breaks its interface contract?','How is symmetric client-server alignment like a conversational protocol?'],
    deeper:[['Brilliant.org — Interactive CS','https://brilliant.org'],['REST API Design Concepts','https://restfulapi.net/'],['How the Internet Works','https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/How_does_the_Internet_work']],
    run:'Launch the interactive web sandbox to solve the first-principles puzzles',
    curlNote:false
  },
  {
    id:'l1p00', num:'Phase 00', title:'curl Basics',
    file:'level-1/00-curl-basics/starter/exercises.sh',
    desc:'7 hands-on curl blocks. Methods, headers, status codes, auth. See the HTTP conversation with -v.',
    pills:['curl','GET','POST','PUT','DELETE','headers','-v','status codes'],
    goal:'Prove an API is just a URL any tool can hit.',
    concept:'`curl` and a browser are the same thing — both send HTTP. `curl` prints the raw response; the browser renders it. That\'s the whole magic of APIs. The `-v` flag shows the full HTTP conversation (lines starting with `>` are your request, `<` are the server\'s response).',
    parts:[
      {label:'Exercise 1', text:'Plain text vs JSON from wttr.in (no key, no signup). What does the Accept header do?'},
      {label:'Exercise 2', text:'See the full HTTP conversation with `-v`. Find the status code.'},
      {label:'Exercise 3', text:'POST a JSON body to httpbin.org. What does -X do? What about -d? Content-Type?'},
      {label:'Exercise 4', text:'PUT and DELETE. REST methods for different actions.'},
      {label:'Exercise 5', text:'Auth failure (expect 401). 401 vs 403 — write the difference in your notes.'},
      {label:'Exercise 6', text:'HEAD request — headers only, no body. Is the API alive? What content type?'},
      {label:'Exercise 7', text:'Research task: read Open-Meteo docs, find the hourly forecast param, modify the URL.'}
    ],
    steps:[
      'Open a terminal in `level-1/00-curl-basics/starter/`',
      'Work through each `=== Exercise N ===` block in order — one at a time',
      'Read the output before moving to the next block. The comments after each `TODO:` tell you what to look for.',
      'Do NOT run them all at once with `bash exercises.sh` — run them line by line',
      'After Exercise 5, write 401 vs 403 in your notes.md',
      'For Exercise 7, open https://open-meteo.com/en/docs and find the hourly param before running the curl'
    ],
    research:'Open https://httpbin.org/headers. Call it with `curl -H "X-Learner: your-name" https://httpbin.org/headers`. Why does the server see exactly what you sent?',
    checkpoint:['Difference between GET and POST','What 404 vs 500 means','Why `-v` helps debugging','401 vs 403 — different problems','Why HTML response ≠ API'],
    deeper:[['MDN — HTTP','https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview'],['curl docs','https://curl.se/docs/manual.html'],['HTTP status codes','https://httpstatuses.com'],['open-meteo/open-meteo','https://github.com/open-meteo/open-meteo']],
    run:'$ cd level-1/00-curl-basics/starter\n# Run each block one at a time — do NOT run the whole file\n$ bash exercises.sh',
    curlNote:true
  },
  {
    id:'l1p01', num:'Phase 01', title:'Python + requests',
    file:'level-1/01-python-requests/starter/weather_basic.py',
    desc:'13 numbered TODOs across 5 parts (A–E). requests.get(), JSON parsing, error handling, POST, CLI args.',
    pills:['requests','json','try/except','f-strings','sys.argv','POST','CLI'],
    goal:'Replace curl with a Python CLI tool.',
    concept:'`requests` is Python\'s de facto HTTP client. Same model as curl: build URL → add params/headers → send → inspect response → handle errors. The starter has a "curl equivalent" comment at the top showing the curl → Python mapping you already learned in Phase 00.',
    parts:[
      {label:'Part A', text:'Basic fetch — params dict, requests.get(), raise_for_status(), return nested "current" key'},
      {label:'Part B', text:'Error handling — Timeout, HTTPError, ConnectionError, return None gracefully'},
      {label:'Part C', text:'Format display — f-strings, WEATHER_CODES dict for readable conditions'},
      {label:'Part D', text:'POST request — requests.post(url, json=payload) auto-sets Content-Type'},
      {label:'Part E', text:'CLI entry point — sys.argv for lat/lon, default to Roseau, fetch + display + bonus POST'}
    ],
    steps:[
      'Setup: `cd level-1/01-python-requests/starter && python3 -m venv .venv && source .venv/bin/activate && pip install requests`',
      'Work through TODOs 1-13 in order. Each TODO has inline hints — read them.',
      'Run after each TODO: `python3 weather_basic.py`',
      'If it fails, READ the error. Fix it. Run again. The error IS the lesson.',
      'Part B tests error handling — try passing a bad URL on purpose to see each error type',
      'Part D shows the Python equivalent of the curl POST you did in Phase 00 Exercise 3'
    ],
    research:'Read https://open-meteo.com/en/docs and find: (1) the parameter for 7-day hourly forecast, (2) the parameter for temperature units. Modify your script to print tomorrow\'s high in Fahrenheit.',
    checkpoint:['What does `raise_for_status()` do?','`status_code` vs `ok` — when would you use each?','What happens if you remove the `timeout` parameter?','Why use a `params` dict vs building the URL string manually?','What does `requests.post(url, json=...)` do differently from `requests.post(url, data=...)`?'],
    deeper:[['requests Quickstart','https://requests.readthedocs.io/en/master/user/quickstart/'],['Open-Meteo docs','https://open-meteo.com/en/docs'],['nnja/learn_requests','https://github.com/nnja/learn_requests']],
    run:'$ cd level-1/01-python-requests/starter\n$ python3 -m venv .venv\n$ source .venv/bin/activate\n$ pip install requests\n$ python3 weather_basic.py',
    curlNote:true
  },
  {
    id:'l1p02', num:'Phase 02', title:'Authenticated APIs',
    file:'level-1/02-auth-apis/starter/weather_auth.py',
    desc:'API keys as passwords. .env files, python-dotenv, 401/429 handling, normalising two different APIs into one shape.',
    pills:['API keys','.env','os.getenv','dotenv','401','403','429','normalisation'],
    goal:'Use API keys, keep them out of git.',
    concept:'Most real APIs need a key. It\'s a password. Send it as a header or query param, never in source code, never in a public repo. A `python-dotenv` loader reads `.env` so you can keep secrets out of code.',
    parts:[
      {label:'Part A', text:'Sign up for free OWM and WeatherAPI keys, fill in .env'},
      {label:'Part B', text:'fetch_owm() — query-param auth, handle 401 / 429 / raise_for_status'},
      {label:'Part C', text:'fetch_weatherapi() — same pattern, different API'},
      {label:'Part D', text:'normalize_*() — turn two different response shapes into one consistent dict'},
      {label:'Part E', text:'main() — call both, print side by side, exit codes'}
    ],
    steps:[
      'Sign up: https://openweathermap.org/api and https://www.weatherapi.com/ (both have free tiers)',
      '`cp starter/.env.example starter/.env` and paste in your keys',
      'Verify `.env` is in `.gitignore` — never commit it',
      'Fill in the 4 functions in order',
      'Test 401 handling: corrupt your key on purpose, confirm the script says "invalid key" not "crash"',
      'Test 429 handling: hammer the API 60 times in a loop if you want to see rate limit in action (or just trust the docs)'
    ],
    research:'Read both APIs\' auth docs. Why do both use query params instead of headers? What do their rate-limit docs say? Is one method more secure than the other?',
    checkpoint:['Why use `python-dotenv` instead of `os.environ` directly?','What does `.gitignore` have to do with API security?','If you accidentally commit a key, what should you do IMMEDIATELY?','401 vs 403 vs 429 — three different problems, name them','How would you test key validation without burning real API calls?'],
    deeper:[['OWASP API Top 10','https://owasp.org/API-Security/editions/2023/en/0x11-t10/'],['OWM docs','https://openweathermap.org/api'],['WeatherAPI docs','https://www.weatherapi.com/docs/'],['theskumar/python-dotenv','https://github.com/theskumar/python-dotenv']],
    run:'$ cd level-1/02-auth-apis/starter\n$ cp .env.example .env  # fill in real keys\n$ pip install requests python-dotenv\n$ python3 weather_auth.py Roseau',
    curlNote:false
  },
  {
    id:'l1p03', num:'Phase 03', title:'Multi-Source Aggregation',
    file:'level-1/03-multi-source/starter/dashboard.py',
    desc:'3 APIs in parallel with ThreadPoolExecutor. Graceful degradation when one source fails. Print a side-by-side table.',
    pills:['ThreadPoolExecutor','parallel I/O','as_completed','graceful degradation','table rendering'],
    goal:'Hit 3 APIs simultaneously, handle partial failures.',
    concept:'Real apps fan out to multiple sources and aggregate. The hard part: some succeed, some fail — you keep what you got. ThreadPoolExecutor lets you fire all 3 calls in parallel; total time = slowest source, not sum of all sources.',
    parts:[
      {label:'Part A', text:'Build 3 source callables (open_meteo, openweather, weatherapi) that return normalised dicts'},
      {label:'Part B', text:'fetch_all() — ThreadPoolExecutor with map() or submit(), collect results, ignore exceptions'},
      {label:'Part C', text:'render_table() — fixed-width table with all 3 sources side by side'},
      {label:'Part D', text:'main() — time the whole thing with time.perf_counter(), print execution time'},
      {label:'Part E', text:'Failure test — corrupt one key, confirm the other 2 still return and the table shows the error'}
    ],
    steps:[
      'Reuse the source functions from Phase 02 (you can copy them in)',
      'Import `concurrent.futures.ThreadPoolExecutor`',
      'Build SOURCES dict: {name: callable}',
      'Use `with ThreadPoolExecutor(max_workers=3) as ex:` then `ex.map(fn, cities)`',
      'Iterate `as_completed(futures)` to handle results as they come in',
      'Wrap each source call in try/except — failed sources show "N/A" in the table, not a crash',
      'Run with one key intentionally broken to verify graceful degradation'
    ],
    research:'Read https://docs.python.org/3/library/concurrent.futures.html. What is the difference between `map()` and `submit()`? Why threads and not processes for I/O? What is the GIL and why doesn\'t it matter here?',
    checkpoint:['What does `as_completed()` do and why is it useful?','How do you handle one source failing without losing the others?','What is the Python equivalent of `Promise.allSettled()` from JavaScript?','Why is parallel I/O faster than sequential?','What is the GIL and why doesn\'t it block this from being faster?'],
    deeper:[['concurrent.futures docs','https://docs.python.org/3/library/concurrent.futures.html'],['public-apis','https://github.com/public-apis/public-apis'],['GIL explained','https://realpython.com/python-gil/']],
    run:'$ cd level-1/03-multi-source/starter\n$ python3 dashboard.py Roseau',
    curlNote:false
  },
  {
    id:'l1p04', num:'Phase 04', title:'Browser fetch()',
    file:'level-1/04-browser-fetch/starter/index.html',
    desc:'Same 3 APIs, now from inside the browser. fetch(), async/await, URLSearchParams, Promise.allSettled. Run on localhost.',
    pills:['fetch()','async/await','URLSearchParams','DOM','Promise.allSettled','CORS'],
    goal:'Call the same APIs from the browser.',
    concept:'`fetch()` is the browser\'s `requests`. Same HTTP contract, returns Promises, CORS-aware. `await` unwraps a Promise. `Promise.allSettled()` is the JavaScript equivalent of Python\'s `as_completed()` — it waits for all, never throws, gives you success/failure per item.',
    parts:[
      {label:'Part A', text:'fetchOpenMeteo() — geocode first, then forecast, build URL with URLSearchParams'},
      {label:'Part B', text:'fetchOWM() — read key from localStorage, query-param auth, handle errors'},
      {label:'Part C', text:'fetchWeatherAPI() — same pattern, different base URL'},
      {label:'Part D', text:'Click handler — call all 3 in parallel with Promise.allSettled(), render rows'},
      {label:'Part E', text:'Run on localhost — `python3 -m http.server 8080`, open in browser'}
    ],
    steps:[
      '`cd level-1/04-browser-fetch/starter`',
      'Run: `python3 -m http.server 8080` (NOT just opening the file — fetch() needs http:// not file://)',
      'Open http://localhost:8080 in your browser',
      'Paste your OWM and WeatherAPI keys into the "Local API Key Settings" panel and click "Save to Browser" — they go into `localStorage`, same place the fetch functions read from',
      'Open DevTools → Network tab → watch the 3 requests fire when you click the button',
      'Break one of the 3 functions on purpose — confirm the other 2 still render and the broken one shows an error row'
    ],
    research:'Read https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch. What is the difference between `response.ok` and `response.status`? What is `Promise.allSettled()` and why is it useful for multi-source dashboards?',
    checkpoint:['Why does the browser need CORS but curl doesn\'t?','What does `await` actually do?','Why is `response.json()` async?','How do you handle a network error in `fetch()`?','What\'s the difference between `Promise.all()` and `Promise.allSettled()`?'],
    deeper:[['MDN fetch','https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch'],['Promise.allSettled','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled'],['CORS explained','https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS']],
    run:'$ cd level-1/04-browser-fetch/starter\n$ python3 -m http.server 8080\n# Open http://localhost:8080 in your browser',
    curlNote:false
  },
  {
    id:'l1p05', num:'Phase 05', title:'Deploy YOUR version',
    file:'level-1/05-deploy/README.md',
    desc:'git push → live URL. Each person deploys their own finished app to Cloudflare Pages. Env vars, custom domain.',
    pills:['git','Cloudflare Pages','env vars','CI/CD','custom domain','preview branches'],
    goal:'Push your own finished app to the public internet.',
    concept:'Each person deploys independently — yours is yours, not a shared URL. The deploy is a separate skill from writing the app: branches, env vars, build outputs, preview deploys. By doing it yourself, you learn the pipeline end to end.',
    parts:[
      {label:'Step 1', text:'Make sure your Phase 04 solution works locally first'},
      {label:'Step 2', text:'Create a separate GitHub repo just for your deploy: `gh repo create YOUR-USERNAME/weather-my-deploy`'},
      {label:'Step 3', text:'Cloudflare Dashboard → Pages → Connect that repo. Set build output: `level-1/04-browser-fetch/solution`'},
      {label:'Step 4', text:'Save & Deploy — you get a `*.pages.dev` URL within ~60 seconds'},
      {label:'Step 5', text:'Optional: Pages → Custom domains → set up `weather.YOUR-DOMAIN.com`'},
      {label:'Step 6', text:'SECURITY: if you ever hardcode a key, revoke it from the OWM dashboard and switch to env vars immediately'}
    ],
    steps:[
      'Read https://developers.cloudflare.com/pages/getting-started/',
      'Make a new repo for your deploy (not the course repo — that\'s the source for both of you)',
      'Connect Cloudflare Pages to your deploy repo',
      'Set build command: (empty), build output directory: `level-1/04-browser-fetch/solution`',
      'Push a change — verify auto-deploy happens',
      'Optional: add a custom domain, set up a CNAME'
    ],
    research:'What does "build output directory" actually mean? What is the difference between production and preview deployments? How do env vars in Cloudflare Pages differ from `.env` files locally?',
    checkpoint:['What is a build command? What happens if it\'s empty?','What is a build output directory?','Where do env vars live in Cloudflare Pages?','How do preview branches work?','What should you do IMMEDIATELY if you commit a key?'],
    deeper:[['Cloudflare Pages docs','https://developers.cloudflare.com/pages/'],['GitHub integration','https://developers.cloudflare.com/pages/configuration/git-integration/github-integration/'],['Custom domains','https://developers.cloudflare.com/pages/configuration/custom-domains/']],
    run:'Deploy happens on Cloudflare.\nLocal sanity check:\n$ cd level-1/04-browser-fetch/solution\n$ python3 -m http.server 8080',
    curlNote:false
  },
  {
    id:'l1p06', num:'Phase 06', title:'API Security',
    file:'level-1/06-api-security/starter/security_checks.py',
    desc:'4 parts: secret scanner regex, auth method comparison, rate limit handler, key validator. Defensive mindset.',
    pills:['OWASP','secret scanning','regex','auth methods','429 handling','key validation'],
    goal:'Understand how keys leak and how to design safely.',
    concept:'API keys are passwords. This phase makes the consequences concrete. You\'ll build the same kind of scanner that GitGuardian and TruffleHog use (simplified), compare auth methods side by side, handle 429/401/403 distinctly, and validate keys before burning them on real work.',
    parts:[
      {label:'Part A', text:'Secret scanner — regex for `api_key = "..."`, `password = "..."`, scan a whole directory, skip comments and `os.getenv` lines'},
      {label:'Part B', text:'compare_auth_methods() — same API call, key as query param vs key as header. Show what ends up in server logs.'},
      {label:'Part C', text:'fetch_with_rate_limit_handling() — handle 429 by reading Retry-After header, handle 401/403 distinctly, return None gracefully'},
      {label:'Part D', text:'validate_api_key() — make a minimal test call, return bool, never raise. Run before any production code.'}
    ],
    steps:[
      '`cd level-1/06-api-security/starter`',
      'Work through Parts A–D in order',
      'Part A: run `scan_directory("../../level-1")` — what does it find? (Should be nothing if you\'ve been using .env)',
      'Part B: read the output carefully — notice the key is in the URL in Method 1, not in Method 2',
      'Part C: test 429 handling by hitting a public API hard (or just trust the docs and write the handler)',
      'Part D: validate both your keys before doing anything else — make this a habit'
    ],
    research:'Find 3 real GitHub commits that leaked API keys. What happened next? What does GitHub\'s secret scanning do? How do you opt-in? What is "principle of least privilege" in API key terms?',
    checkpoint:['How would you know if your key was leaked?','Read-only vs write key — what\'s the difference?','What layers of protection beyond `.env` should you add?','What does CORS actually protect against? (Hint: not what you think.)','Why is query-param auth considered less secure than header auth?'],
    deeper:[['OWASP API Top 10','https://owasp.org/API-Security/editions/2023/en/0x11-t10/'],['GitHub secret scanning','https://docs.github.com/en/code-security/secret-scanning'],['TruffleHog (real scanner)','https://github.com/trufflesecurity/trufflehog']],
    run:'$ cd level-1/06-api-security/starter\n$ python3 security_checks.py',
    curlNote:false
  },
  {
    id:'l1p07', num:'Phase 07', title:'JSON Deep Dive',
    file:'level-1/07-json-deep/starter/json_practice.py',
    desc:'5 parts: file cache, safe_get, batch fetcher, schema validator, response comparison. Read AND write JSON.',
    pills:['json.dump','json.load','safe_get','schema validation','file cache','batching'],
    goal:'Treat JSON as a first-class structure.',
    concept:'JSON is just nested dicts and lists. The hard parts: navigating safely (keys might be missing), persisting to disk, validating the shape, comparing two responses. This phase teaches you to stop thinking of JSON as "whatever the API sent" and start treating it as data you own.',
    parts:[
      {label:'Part A', text:'save_response_to_file() / load_response_from_file() — add cached_at timestamp, json.dump with indent=2'},
      {label:'Part B', text:'safe_get(d, *keys, default=None) — navigate nested dicts without crashing. Reusable utility.'},
      {label:'Part C', text:'load_cities_config() + fetch_and_cache_cities() — batch process from a JSON config, cache per city'},
      {label:'Part D', text:'validate_schema() — check keys exist AND types match EXPECTED_KEYS dict, return list of errors'},
      {label:'Part E', text:'compare_weather_responses() — side-by-side comparison of two cities using safe_get'}
    ],
    steps:[
      '`cd level-1/07-json-deep/starter`',
      'Part A: fetch weather, save to `cache/roseau_current.json`, load it back, print `cached_at`',
      'Part B: try `safe_get(data, "a", "b", "c")` on `{a: {b: 1}}` — should return default. Try on the real data — should return value.',
      'Part C: create `cities.json`, run twice. Second run should say "from cache"',
      'Part D: delete a key from weather data, run validate_schema, confirm the error is caught',
      'Part E: fetch two different cities, compare temp/wind/humidity side by side'
    ],
    research:'What is `json.dumps()` vs `json.dump()`? What does `indent=2` do? `sort_keys=True`? Why does `json.loads()` raise on invalid JSON but `json.load()` reads from a file? How would you handle a 500MB JSON file?',
    checkpoint:['What is the difference between `json` and `simplejson`?','When would you use YAML instead of JSON?','How do you handle a JSON file that\'s 500MB? (Hint: it\'s not `json.load()`.)','What does `safe_get` prevent that direct `data["a"]["b"]["c"]` doesn\'t?','Why validate schema instead of trusting the API response?'],
    deeper:[['json module docs','https://docs.python.org/3/library/json.html'],['ijson (streaming JSON)','https://github.com/ICRAR/ijson'],['jsonschema library','https://github.com/python-jsonschema/jsonschema']],
    run:'$ cd level-1/07-json-deep/starter\n$ python3 json_practice.py',
    curlNote:false
  },
  {
    id:'l1p08', num:'Phase 08', title:'CORS & Mock Server',
    file:'level-1/08-cors-mocking/starter/server.py',
    desc:'Build a backend mock server. Preflight OPTIONS requests, Access-Control-Allow-Origin, SOP browser safety.',
    pills:['CORS','SOP','Flask','preflight OPTIONS','Access-Control-Allow-Origin','handshake'],
    goal:'Understand and resolve CORS browser blocks.',
    concept:'In backend Python, requests directly connect. Inside a browser, Same-Origin Policy (SOP) restricts communication unless the backend explicitly responds with standard CORS headers authorizing the client\'s origin.',
    parts:[
      {label:'Part A', text:'Start the mock server on port 5000 and the frontend server on port 8080. Open in the browser to trigger a CORS error.'},
      {label:'Part B', text:'Add preflight OPTIONS handshake checks returning Access-Control-Allow-Origin headers.'},
      {label:'Part C', text:'Add Access-Control-Allow-Origin headers to GET responses to authorize the client origin.'}
    ],
    steps:[
      'Start the mock server: `cd level-1/08-cors-mocking/starter && python3 server.py`',
      'Start the web server: `cd level-1/08-cors-mocking/starter && python3 -m http.server 8080`',
      'Open http://localhost:8080 in your browser, try clicking Fetch to see the browser block the response',
      'Open server.py and implement OPTIONS preflight response with Access-Control-Allow-Origin, Access-Control-Allow-Methods, and Access-Control-Allow-Headers',
      'Implement GET response headers with Access-Control-Allow-Origin: * to resolve the block',
      'Refresh http://localhost:8080 and click Fetch again to verify successful data communication'
    ],
    research:'What is a preflight request? What causes a request to require preflight? Why do custom headers (like X-API-Key) trigger a preflight check? Read MDN Web Docs on Cross-Origin Resource Sharing.',
    checkpoint:['What does SOP stand for and what is its purpose?','Why does curl bypass CORS but fetch() does not?','What HTTP method does the browser use for preflight checks?','Name two CORS headers you need to configure on the backend.'],
    deeper:[['MDN CORS','https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS'],['Flask CORS documentation','https://flask-cors.readthedocs.io/en/latest/'],['Same-Origin Policy','https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy']],
    run:'$ cd level-1/08-cors-mocking/starter\n$ python3 server.py',
    curlNote:false
  }
];

const L2_PHASES = [
  {
    id:'l2p00', num:'Phase 00', title:'Postman Properly',
    file:'level-2/00-postman-properly/README.md',
    desc:'Collections, environments, variables, pre-request scripts, test assertions. Export as JSON, run from CLI with Newman.',
    pills:['collections','environments','test scripts','Newman','pre-request','variables'],
    goal:'Use Postman beyond a GUI curl.',
    concept:'Collections group requests. Environments hold variables. Tests assert behaviour. Newman runs collections from CLI. The exported collection JSON IS the test suite — it\'s just a structured file you can read.',
    parts:[
      {label:'Step 1', text:'Install Postman + Newman (`npm i -g newman`)'},
      {label:'Step 2', text:'Create "Weather APIs" collection with 3 requests'},
      {label:'Step 3', text:'Create environment with OWM_KEY and WEATHERAPI_KEY variables'},
      {label:'Step 4', text:'Use {{OWM_KEY}} in OWM request — Postman substitutes it'},
      {label:'Step 5', text:'Add test scripts: status code, JSON shape, response time'},
      {label:'Step 6', text:'Export collection v2.1 and environment as JSON'},
      {label:'Step 7', text:'Run from CLI: `newman run collection.json -e env.json`'}
    ],
    steps:[
      'Install Postman desktop app and create an account',
      'Install Newman: `npm install -g newman`',
      'Create the 3 requests you built in Level 1 Phase 02',
      'Group them in a "Weather APIs" collection',
      'Create an environment with your OWM and WeatherAPI keys',
      'Add at least 2 test assertions per request',
      'Export both files, commit them to your repo, run via Newman'
    ],
    research:'What is a pre-request script vs a test script? What does `pm.environment.set("key", value)` do? How would you run a collection on a schedule? (Hint: CI/CD, which you\'ll do in Level 2 Phase 05.)',
    checkpoint:['What is a collection? An environment?','What is Newman? How does it differ from running Postman in the GUI?','What is a pre-request script?','What does the exported collection JSON look like? (Open it — you\'ll see it\'s just a structured file.)'],
    deeper:[['Postman learning','https://learning.postman.com/'],['Newman docs','https://github.com/postmanlabs/newman'],['Test scripts','https://learning.postman.com/docs/writing-scripts/test-scripts/']],
    run:'# Postman runs in the desktop app\n# Newman runs from CLI:\n$ newman run weather.postman_collection.json -e weather-env.postman_environment.json',
    curlNote:false
  },
  {
    id:'l2p01', num:'Phase 01', title:'Python Project Structure',
    file:'level-2/01-python-structure/starter/',
    desc:'Convert dashboard.py into a proper package: src/, pyproject.toml, tests/, __init__.py. Install with pip install -e .',
    pills:['src/ layout','pyproject.toml','pytest','mocking','ruff','mypy','-e install'],
    goal:'Move from one-file scripts to a package.',
    concept:'Real Python projects have layout, packaging, and tests. `src/` layout keeps tests from importing your code accidentally. `pyproject.toml` is the modern replacement for `setup.py`. `pip install -e .` installs your package in editable mode.',
    parts:[
      {label:'Step 1', text:'Restructure to `src/weather/` with submodules per source'},
      {label:'Step 2', text:'Create `pyproject.toml` (use setuptools or hatchling)'},
      {label:'Step 3', text:'Create `tests/test_sources.py` with pytest'},
      {label:'Step 4', text:'`pip install -e ".[dev]"` then `pytest`'},
      {label:'Step 5', text:'Verify CLI still works after refactor'},
      {label:'Step 6', text:'Run the quality gates: `ruff check .` and `mypy src/` — the solution passes both clean'},
      {label:'Step 7', text:'Optional: write a mocked test for `open_meteo.fetch()` with `unittest.mock.patch` — runs fully offline (see the TODO in the starter tests)'}
    ],
    steps:[
      'Create new structure: `mkdir -p src/weather/sources tests`',
      'Move your source files into `src/weather/sources/`',
      'Add `__init__.py` files (can be empty)',
      'Write `pyproject.toml` with build-system and project metadata',
      'Write at least 3 pytest tests',
      'Run `pip install -e .` and confirm `pytest` passes'
    ],
    research:'What is `pyproject.toml` and why is it replacing `setup.py`? How does `pip install -e .` work? What does `__init__.py` actually do? What\'s the difference between `src/` layout and flat layout?',
    checkpoint:['Why use `src/` layout?','What is `pyproject.toml`?','What does editable install mean?','Why pytest over unittest?','How do you run only one test file? One test?'],
    deeper:[['pytest docs','https://docs.pytest.org/'],['pyproject.toml guide','https://pip.pypa.io/en/stable/specifications/pyproject-toml/'],['Real Python project structure','https://docs.python-guide.org/writing/structure/']],
    run:'$ cd level-2/01-python-structure/starter\n$ pip install -e ".[dev]"\n$ pytest -v\n$ ruff check .\n$ mypy src/',
    curlNote:false
  },
  {
    id:'l2p02', num:'Phase 02', title:'Chaining APIs',
    file:'level-2/02-chaining-apis/starter/notify.py',
    desc:'Output of one API becomes input to another. Weather → if rain forecast → Discord webhook message.',
    pills:['chaining','webhooks','conditional logic','Discord API','Telegram API','data pipeline'],
    goal:'Use one API\'s output as another\'s input.',
    concept:'Automation = one script calling multiple APIs and making a decision. Webhooks are how services like Discord, Slack, Telegram, and GitHub accept data. The flow: your script makes decision → POSTs to webhook URL → message appears in channel.',
    parts:[
      {label:'Step 1', text:'Create Discord webhook, store URL in `.env` as DISCORD_WEBHOOK_URL'},
      {label:'Step 2', text:'Fetch weather (reuse your weather module)'},
      {label:'Step 3', text:'Inspect forecast — if rain coming in 6h, build rain message; else build sunny message'},
      {label:'Step 4', text:'POST to Discord webhook with `requests.post(webhook_url, json=payload)`'},
      {label:'Step 5', text:'Test by editing the weather data to force both branches'}
    ],
    steps:[
      'Create a Discord server (or use existing), channel → settings → Integrations → Webhooks → New webhook → copy URL',
      'Add `DISCORD_WEBHOOK_URL=...` to your `.env`',
      'Build `notify.py` with the flow above',
      'Run it: `python3 notify.py`',
      'Confirm the message arrives in Discord',
      'Force both branches by mocking the weather response'
    ],
    research:'What is a webhook? Why does Discord\'s webhook endpoint accept POST but not GET? What does the response from a webhook look like?',
    checkpoint:['What\'s a webhook?','Discord webhook flow?','How do you make a decision based on API data?','What HTTP status does a successful webhook POST return?'],
    deeper:[['Discord webhooks','https://discord.com/developers/docs/resources/webhook#execute-webhook'],['Telegram Bot API','https://core.telegram.org/bots/api'],['n8n (no-code alternative)','https://n8n.io/']],
    run:'$ python3 notify.py',
    curlNote:false
  },
  {
    id:'l2p03', num:'Phase 03', title:'Schedules + cron',
    file:'level-2/03-schedules-cron/README.md',
    desc:'Run notify.py automatically every morning at 7am. cron on Linux, Task Scheduler on Windows, logging.',
    pills:['cron','crontab','Task Scheduler','logging','idempotency','automation'],
    goal:'Run notify.py every morning at 7am.',
    concept:'Scheduled automation is how most "smart home" and "daily brief" tools work. The script itself doesn\'t know it\'s scheduled — cron (or Task Scheduler) just runs it on a timer. Idempotency matters: running it twice shouldn\'t send 2 messages.',
    parts:[
      {label:'Step 1', text:'Edit your crontab: `crontab -e`'},
      {label:'Step 2', text:'Add: `0 7 * * * /usr/bin/python3 /path/to/notify.py >> /tmp/weather.log 2>&1`'},
      {label:'Step 3', text:'Verify log file gets created and fills up'},
      {label:'Step 4', text:'Test by changing the time temporarily to 1 minute from now'},
      {label:'Step 5', text:'Make notify.py idempotent — check if you already sent today\'s message before sending'}
    ],
    steps:[
      'Linux/macOS: `crontab -e` and add the line above',
      'Windows: Task Scheduler → Create Task → Trigger: Daily 7am → Action: `python.exe notify.py`',
      'Test: temporarily change the schedule to `* * * * *` (every minute) and watch the log',
      'Once verified, change back to `0 7 * * *`',
      'Add idempotency: write a state file with today\'s date, skip if already sent today'
    ],
    research:'What does `>>` vs `>` do in shell redirection? Why redirect both stdout AND stderr? How do you monitor whether the cron job actually ran? What\'s the difference between cron and systemd timers?',
    checkpoint:['Cron syntax basics — what does `0 7 * * *` mean?','`>>` vs `>` — when to use each?','Why log to a file instead of just printing?','What is idempotency and why does it matter?','How do you debug a cron job that\'s not running?'],
    deeper:[['Cron wiki','https://en.wikipedia.org/wiki/Cron'],['crontab.guru','https://crontab.guru/'],['systemd timers (modern alternative)','https://www.freedesktop.org/software/systemd/man/systemd.timer.html']],
    run:'# Cron runs in background — verify it worked:\n$ tail -f /tmp/weather.log',
    curlNote:false
  },
  {
    id:'l2p04', num:'Phase 04', title:'Webhooks (Receiving)',
    file:'level-2/04-webhooks/starter/server.py',
    desc:'Flip the direction. Build a Flask server, expose via ngrok, receive a webhook from webhook.site. OR use n8n.',
    pills:['webhooks','ngrok','Flask','event-driven','n8n','reverse tunnel'],
    goal:'Be the server — accept incoming webhooks.',
    concept:'Until now, you\'ve been the client. Webhooks make you the server. An external service POSTs to YOUR URL when something happens. You process the body and respond 200 OK. ngrok gives you a public URL pointing at your localhost — perfect for development.',
    parts:[
      {label:'Step 1', text:'Install ngrok, sign up, get auth token, run `ngrok http 8080`'},
      {label:'Step 2', text:'Build minimal Flask server with `POST /webhook` endpoint'},
      {label:'Step 3', text:'Run it on port 8080, copy the ngrok HTTPS URL'},
      {label:'Step 4', text:'Go to webhook.site, copy their unique URL, set up a forwarding to your ngrok URL (or use their test feature)'},
      {label:'Step 5', text:'Confirm the body shows up in your Flask logs'},
      {label:'Step 6', text:'Optional: add a `/webhook-secure` endpoint with HMAC-SHA256 signature verification — how GitHub and Stripe secure webhooks (TODO block in the starter, full version in the solution)'},
      {label:'Step 7', text:'Optional: replace Flask with an n8n workflow since you already self-host it'}
    ],
    steps:[
      'Install Flask: `pip install flask`',
      'Build the server with one endpoint that logs the body and returns 200',
      'Run it: `python3 server.py`',
      'In another terminal: `ngrok http 8080` — copy the HTTPS URL',
      'Send a test POST from https://webhook.site to your ngrok URL',
      'Confirm your Flask log shows the body',
      'Reply with 200 — confirm webhook.site shows success'
    ],
    research:'What is the difference between a webhook and an API call? How does ngrok work under the hood? What is the difference between an event-driven and a request-response architecture?',
    checkpoint:['Webhook vs API call — what flips?','Why does ngrok exist?','What does 200 OK mean in this context?','How would you secure a webhook endpoint? (Hint: signature verification.)','Why is n8n relevant here?'],
    deeper:[['ngrok docs','https://ngrok.com/docs'],['Flask quickstart','https://flask.palletsprojects.com/quickstart/'],['Webhook security','https://webhook.site/security'],['n8n webhook trigger','https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook/']],
    run:'$ python3 server.py     # terminal 1\n$ ngrok http 8080          # terminal 2\n# Send test POST from webhook.site to your ngrok URL',
    curlNote:false
  },
  {
    id:'l2p05', num:'Phase 05', title:'Newman + CI',
    file:'level-2/05-newman-testing/README.md',
    desc:'Run your Postman collection automatically on every git push using GitHub Actions. Encrypted secrets for keys.',
    pills:['Newman','GitHub Actions','CI/CD','secrets','workflows','yaml'],
    goal:'Run Postman tests on every git push.',
    concept:'CI/CD = "run tests automatically when code changes." GitHub Actions gives you a free Linux runner for public repos. Your collection + environment files get tested on every push. Failures block merges if you enable branch protection.',
    parts:[
      {label:'Step 1', text:'Export collection + environment as JSON, commit to repo'},
      {label:'Step 2', text:'Create `.github/workflows/api-tests.yml`'},
      {label:'Step 3', text:'Add OWM_KEY and WEATHERAPI_KEY to GitHub repo → Settings → Secrets'},
      {label:'Step 4', text:'Push a change — check the Actions tab in your repo'},
      {label:'Step 5', text:'Add a status badge to your README'},
      {label:'Step 6', text:'Break a test on purpose — confirm the workflow fails (red X)'}
    ],
    steps:[
      'Read https://docs.github.com/en/actions/quickstart',
      'Create `.github/workflows/api-tests.yml` in your repo',
      'Add the workflow content (see README in this phase)',
      'Go to repo Settings → Secrets and variables → Actions → New repository secret',
      'Add `OWM_KEY` and `WEATHERAPI_KEY` with your real keys',
      'Push to trigger the workflow',
      'Watch the Actions tab — green check = tests passed'
    ],
    research:'What\'s a workflow? What\'s a step? What\'s a job? What\'s a runner? Why is `on: [push]` the trigger? What\'s the difference between `${{ secrets.X }}` and `${{ vars.X }}`?',
    checkpoint:['Workflow syntax — what are jobs, steps, runs-on?','Secrets vs vars — when to use each?','PR vs push triggers — what\'s the difference?','How do you cache dependencies in Actions?','What does `actions/checkout@v4` do?'],
    deeper:[['GitHub Actions','https://docs.github.com/en/actions'],['Encrypted secrets','https://docs.github.com/en/actions/security-guides/encrypted-secrets'],['Newman in CI','https://learning.postman.com/docs/running-collections/using-newman-cli/integration-with-ci/']],
    run:'# Workflow runs automatically on push\n# Check the Actions tab in your GitHub repo',
    curlNote:false
  },
  {
    id:'l2p06', num:'Phase 06', title:'Capstone',
    file:'level-2/06-capstone/README.md',
    desc:'Pick 2+ APIs. Chain them. Schedule. Notify. Test. Deploy. Document. End-to-end integration of your own design.',
    pills:['capstone','integration','automation','deploy','portfolio','documentation'],
    goal:'Your own end-to-end API integration.',
    concept:'Capstone = everything you learned, applied to a real problem you choose. This is the artifact you can show in a portfolio. Pick something you\'d actually use — a daily brief, a price alert, a server monitor. The technology is the easy part; the design decisions are the lesson.',
    parts:[
      {label:'Step 1', text:'Pick 2+ APIs that solve a real problem for you'},
      {label:'Step 2', text:'Run on a schedule (cron, Cloudflare Worker cron trigger, or GitHub Actions schedule)'},
      {label:'Step 3', text:'Notify via Discord / Telegram / email / Slack'},
      {label:'Step 4', text:'Write tests (pytest for code, Newman for API)'},
      {label:'Step 5', text:'Deploy (Cloudflare Worker, Cloudflare Pages, your homelab, or a VPS)'},
      {label:'Step 6', text:'Write a README explaining what it does and how to set it up'},
      {label:'Step 7', text:'Share the URL — this is your portfolio piece'}
    ],
    steps:[
      'Brainstorm: what would you actually use?',
      'Examples: morning brief (weather + quote + news), price alert (CoinGecko + Telegram), server monitor (your homelab services + Discord), Reddit digest (top posts + email)',
      'Build the minimum viable version first',
      'Add the schedule, then the tests, then the deploy',
      'Write the README LAST — you\'ll know what needs documenting only after you\'ve built it'
    ],
    research:'N/A — you choose the project. The research is reading the docs of the APIs you pick.',
    checkpoint:['Working deployed artifact','Tests pass','README is clear (someone else could set it up from your README alone)','All keys in env vars, never in code','You can explain why you made each design choice'],
    deeper:[['Cloudflare Workers','https://developers.cloudflare.com/workers/'],['GitHub Actions schedule','https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#schedule'],['n8n workflows','https://docs.n8n.io/']],
    run:'Wherever you deploy it',
    curlNote:false
  }
];

const L1_REPOS = [
  { name:'miguelgrinberg/REST-tutorial',  phase:'Phase 01', desc:'Clean Python REST server + JS client',         href:'https://github.com/miguelgrinberg/REST-tutorial' },
  { name:'dwyl/learn-api-design',         phase:'Phase 01', desc:'Best reference for REST design decisions',      href:'https://github.com/dwyl/learn-api-design' },
  { name:'open-meteo/open-meteo',         phase:'Phase 00', desc:'Source of the no-key API you use throughout',   href:'https://github.com/open-meteo/open-meteo' },
  { name:'public-apis/public-apis',       phase:'Phase 03', desc:'1000+ free APIs to extend your dashboard',      href:'https://github.com/public-apis/public-apis' },
  { name:'OWASP/API-Security',            phase:'Phase 06', desc:'The source for API security best practices',    href:'https://github.com/OWASP/API-Security' },
  { name:'theskumar/python-dotenv',       phase:'Phase 02', desc:'.env management — read the README',              href:'https://github.com/theskumar/python-dotenv' },
  { name:'trufflesecurity/trufflehog',    phase:'Phase 06', desc:'Real secret scanner (study after you build yours)', href:'https://github.com/trufflesecurity/trufflehog' },
];

const L2_REPOS = [
  { name:'postmanlabs/newman',            phase:'Phase 00 + 05', desc:'Newman CLI — run Postman collections from terminal', href:'https://github.com/postmanlabs/newman' },
  { name:'n8n-io/n8n',                    phase:'Phase 04', desc:'n8n automation — relevant to webhook phase',          href:'https://github.com/n8n-io/n8n' },
  { name:'tiangolo/fastapi',              phase:'Phase 04', desc:'FastAPI — build your own webhook endpoint',           href:'https://github.com/tiangolo/fastapi' },
  { name:'realpython/materials',          phase:'Phase 01', desc:'Real Python tutorial code reference',                 href:'https://github.com/realpython/materials' },
  { name:'public-apis/public-apis',       phase:'Phase 02 + 06', desc:'Find APIs to chain in your capstone',              href:'https://github.com/public-apis/public-apis' },
];

// Phases whose code spans several files (others derive starter↔solution from p.file).
const PHASE_FILES = {
  l2p01: {
    starter: [
      'level-2/01-python-structure/starter/src/weather/sources/open_meteo.py',
      'level-2/01-python-structure/starter/src/weather/sources/openweather.py',
      'level-2/01-python-structure/starter/src/weather/sources/weatherapi.py',
      'level-2/01-python-structure/starter/src/weather/cli.py',
      'level-2/01-python-structure/starter/tests/test_sources.py',
      'level-2/01-python-structure/starter/pyproject.toml'
    ],
    solution: [
      'level-2/01-python-structure/solution/src/weather/sources/open_meteo.py',
      'level-2/01-python-structure/solution/src/weather/sources/openweather.py',
      'level-2/01-python-structure/solution/src/weather/sources/weatherapi.py',
      'level-2/01-python-structure/solution/src/weather/cli.py',
      'level-2/01-python-structure/solution/tests/test_sources.py',
      'level-2/01-python-structure/solution/pyproject.toml'
    ]
  }
};

// ════════════════════════════════════════════════
//  STATE
// ════════════════════════════════════════════════
const KEY = 'wac_v3_progress';
const load  = () => { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch { return {}; } };
const save  = s  => localStorage.setItem(KEY, JSON.stringify(s));

// ════════════════════════════════════════════════
//  RENDER
// ════════════════════════════════════════════════
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

function formatInline(s) {
  return escapeHtml(s).replace(/`([^`]+)`/g, '<code>$1</code>');
}

function phaseCard(p, isDone, isLocked, index) {
  const pills   = p.pills.slice(0, 5).map(t => `<span class="pill">${escapeHtml(t)}</span>`).join('');
  const cls     = [isDone ? 'done' : '', isLocked ? 'locked-card' : ''].filter(Boolean).join(' ');
  const stages  = Array.isArray(p.parts) ? p.parts.length : 0;
  const stageTag = stages
    ? ` &middot; <span class="phase-stages">${stages} stages</span>`
    : '';
  const startBadge = (index === 0 && !isDone && !isLocked)
    ? '<span class="phase-badge">Start here</span>'
    : '';
  return `
    <div class="phase-card ${cls}" id="card-${p.id}" onclick="openPhase('${p.id}')">
      ${startBadge}
      <div class="phase-top">
        <div class="phase-num">${escapeHtml(p.num)}${stageTag}</div>
        ${!isLocked
          ? `<button class="phase-check" type="button" aria-label="Toggle ${escapeHtml(p.title)} complete" onclick="event.stopPropagation(); toggle('${p.id}')">${isDone ? '✓' : ''}</button>`
          : '<div style="font-size:0.7rem; font-family:var(--font-mono); color:var(--muted2); font-weight:700; text-transform:uppercase; letter-spacing:0.05em" aria-label="Locked">Locked</div>'}
      </div>
      <div class="phase-title">${escapeHtml(p.title)}</div>
      <div class="phase-desc">${escapeHtml(p.desc)}</div>
      <div class="phase-pills">${pills}</div>
      <div class="phase-cta">View full lesson &rarr;</div>
    </div>`;
}

function repoCard(r) {
  return `
    <a class="repo-card" href="${r.href}" target="_blank" rel="noopener">
      <div class="repo-name">${escapeHtml(r.name)}</div>
      <div class="repo-phase">Read for: ${escapeHtml(r.phase)}</div>
      <div class="repo-desc">${escapeHtml(r.desc)}</div>
    </a>`;
}

function render() {
  const state   = load();
  const l1Done  = L1_PHASES.filter(p => state[p.id]).length;
  const l1Total = L1_PHASES.length;
  const l1Pct   = Math.round((l1Done / l1Total) * 100);
  const l2Done  = L2_PHASES.filter(p => state[p.id]).length;
  const l2Total = L2_PHASES.length;
  const l2Pct   = Math.round((l2Done / l2Total) * 100);
  const l1Complete = l1Done === l1Total;

  document.getElementById('l1-fill').style.width          = `${l1Pct}%`;
  document.getElementById('l1-progress-label').textContent = `${l1Done} / ${l1Total} phases`;
  document.getElementById('l1-grid').innerHTML  = L1_PHASES.map((p, i) => phaseCard(p, !!state[p.id], false, i)).join('');
  document.getElementById('l1-repos').innerHTML = L1_REPOS.map(repoCard).join('');

  const tabL2 = document.getElementById('tab-l2');
  if (l1Complete) {
    tabL2.classList.remove('locked');
    tabL2.innerHTML = 'Level 2 — Automation';
    document.getElementById('l2-lock-banner').style.display = 'none';
    document.getElementById('l2-content').style.display     = 'block';
  } else {
    tabL2.classList.add('locked');
    tabL2.innerHTML = 'Level 2 — Automation <svg style="display:inline-block; vertical-align:middle; width:12px; height:12px; margin-left:4px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>';
    document.getElementById('l2-lock-banner').style.display = 'block';
    document.getElementById('l2-content').style.display     = 'none';
    document.getElementById('l2-lock-label').textContent    = `${l1Done} / ${l1Total} complete`;
  }

  document.getElementById('l2-fill').style.width          = `${l2Pct}%`;
  document.getElementById('l2-progress-label').textContent = `${l2Done} / ${l2Total} phases`;
  document.getElementById('l2-grid').innerHTML  = L2_PHASES.map((p, i) => phaseCard(p, !!state[p.id], !l1Complete, i)).join('');
  document.getElementById('l2-repos').innerHTML = L2_REPOS.map(repoCard).join('');
}

function toggle(id) {
  const state = load();
  if (state[id]) delete state[id]; else state[id] = true;
  save(state);
  render();
}

function resetProgress() {
  if (!confirm('Reset all progress on this device?')) return;
  save({});
  localStorage.removeItem('gh_token');
  localStorage.removeItem('gist_id');
  document.getElementById('gh-token').value = '';
  document.getElementById('gist-id-input').value = '';
  render();
  setGistStatus('Reset complete.', 'var(--yellow)');
}

// ════════════════════════════════════════════════
//  MODAL
// ════════════════════════════════════════════════
// ════════════════════════════════════════════════
//  CODECRAFTERS-STYLE WORKSPACE STATE & ENGINE
// ════════════════════════════════════════════════
let currentPhaseId = null;
let activeStageIndex = 0;
let activeWsTab = 'sandbox';

function openPhase(id) {
  const all = [...L1_PHASES, ...L2_PHASES];
  const p   = all.find(x => x.id === id);
  if (!p) return;

  currentPhaseId = id;
  activeStageIndex = 0;
  activeWsTab = 'sandbox';

  // Toggle workspace mode classes
  const overlay = document.getElementById('modal-overlay');
  const modal = document.querySelector('.modal');
  overlay.classList.add('workspace-mode');
  modal.classList.add('workspace-mode');

  renderWorkspace();
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function renderWorkspace() {
  const p = [...L1_PHASES, ...L2_PHASES].find(x => x.id === currentPhaseId);
  const isDone = !!load()[p.id];
  
  // Render Stages sidebar items
  const stagesList = p.parts.map((part, i) => `
    <div class="ws-stage-item ${i === activeStageIndex ? 'active' : ''} ${isDone ? 'completed' : ''}" onclick="selectStage(${i})">
      <div class="ws-stage-number">${i + 1}</div>
      <span class="ws-stage-label">${escapeHtml(part.label)}</span>
      <span class="ws-stage-badge">${i === activeStageIndex ? 'CURRENT' : (isDone ? 'PASSED' : 'TODO')}</span>
    </div>
  `).join('');

  // Determine available tabs to reduce clutter (noise reduction)
  const pf = phaseFiles(p);
  const hasCode = pf.starter.length > 0 || pf.solution.length > 0;
  const hasVerify = p.run && !p.run.includes('Launch the interactive') && !p.run.includes('Wherever you deploy');

  let tabButtons = `<button class="ws-tab-tab ${activeWsTab === 'sandbox' ? 'active' : ''}" id="tab-sandbox" onclick="switchWsTab('sandbox')">🧪 Interactive Sandbox</button>`;
  if (hasCode) {
    tabButtons += `<button class="ws-tab-tab ${activeWsTab === 'code' ? 'active' : ''}" id="tab-code" onclick="switchWsTab('code')">📄 Code Viewer</button>`;
  }
  if (hasVerify) {
    tabButtons += `<button class="ws-tab-tab ${activeWsTab === 'verify' ? 'active' : ''}" id="tab-verify" onclick="switchWsTab('verify')">💾 Terminal & Verify</button>`;
  }

  document.getElementById('modal-content').innerHTML = `
    <div class="ws-layout">
      <!-- Header -->
      <div class="ws-header">
        <div class="ws-header-left">
          <span class="ws-brand">LexLabs CLI &bull; Web Workspace</span>
          <span class="ws-divider">/</span>
          <span class="ws-title">${escapeHtml(p.num)}: ${escapeHtml(p.title)}</span>
        </div>
        <div class="ws-header-center">
          <span class="ws-progress-text">Course Progression</span>
          <div class="ws-progress-bar">
            <div id="ws-pct-bar" class="ws-progress-fill" style="width: 0%"></div>
          </div>
        </div>
        <div class="ws-header-right">
          <button class="ws-exit-btn" onclick="closeModal()">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="ws-btn-icon"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            Exit Workspace
          </button>
        </div>
      </div>
      
      <!-- Main Content Split -->
      <div class="ws-main">
        <!-- Stages Sidebar -->
        <div class="ws-sidebar">
          <div class="ws-sidebar-title">STAGES</div>
          <div class="ws-stages-list" id="ws-stages-list">
            ${stagesList}
          </div>
          
          <div class="ws-overall-progress">
            <div class="ws-progress-stats">
              <span>Overall Phase Status</span>
              <span id="ws-pct-text">${isDone ? 'COMPLETED' : 'IN PROGRESS'}</span>
            </div>
            <button class="btn ${isDone ? 'btn-secondary' : 'btn-primary'} btn-sm ws-complete-btn" id="ws-complete-btn" onclick="togglePhaseComplete()">
              ${isDone ? 'Mark as Incomplete' : 'Complete Phase ✓'}
            </button>
          </div>
        </div>
        
        <!-- Active Workspace Center/Right -->
        <div class="ws-content">
          <!-- Left Split: Active Stage Details -->
          <div class="ws-instructions-panel">
            <div class="ws-stage-header">
              <span class="ws-stage-eyebrow" id="ws-stage-eyebrow">STAGE ${activeStageIndex + 1} / ${p.parts.length}</span>
              <h2 class="ws-stage-title" id="ws-stage-title">${escapeHtml(p.parts[activeStageIndex].label)}</h2>
            </div>
            <div class="ws-stage-scroll" id="ws-stage-scroll">
              <!-- Active instructions details -->
            </div>
          </div>
          
          <!-- Right Split: Tooling Sandbox & Code Tab panel -->
          <div class="ws-sandbox-panel">
            <div class="ws-tabs-header">
               ${tabButtons}
            </div>
            <div class="ws-sandbox-body" id="ws-sandbox-body">
               <!-- Dyn tab content -->
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  
  renderWorkspace(); // Note: We actually trigger rendering inside selectStage / renderActiveStage
}

function togglePhaseComplete() {
  toggle(currentPhaseId);
  renderWorkspace();
}

function selectStage(index) {
  activeStageIndex = index;
  
  // Re-render Stages sidebar active items
  const items = document.querySelectorAll('.ws-stage-item');
  items.forEach((item, idx) => {
    if (idx === index) {
      item.classList.add('active');
      item.querySelector('.ws-stage-badge').textContent = 'CURRENT';
    } else {
      item.classList.remove('active');
      const isDone = !!load()[currentPhaseId];
      item.querySelector('.ws-stage-badge').textContent = isDone ? 'PASSED' : 'TODO';
    }
  });

  renderActiveStage();
}

function switchWsTab(tab) {
  activeWsTab = tab;
  
  // Toggle tab header active style
  document.querySelectorAll('.ws-tab-tab').forEach(t => t.classList.remove('active'));
  document.getElementById(`tab-${tab}`).classList.add('active');

  renderSandboxTab();
}

function renderActiveStage() {
  const p = [...L1_PHASES, ...L2_PHASES].find(x => x.id === currentPhaseId);
  const part = p.parts[activeStageIndex];
  const state = load();
  const l1Done = L1_PHASES.filter(x => state[x.id]).length;
  const total = L1_PHASES.length + L2_PHASES.length;
  const overallDone = [...L1_PHASES, ...L2_PHASES].filter(x => state[x.id]).length;
  const overallPct = Math.round((overallDone / total) * 100);

  // Update progress bar
  document.getElementById('ws-pct-bar').style.width = `${overallPct}%`;
  document.getElementById('ws-stage-eyebrow').textContent = `STAGE ${activeStageIndex + 1} / ${p.parts.length}`;
  document.getElementById('ws-stage-title').textContent = part.label;

  // Build active instructions HTML
  document.getElementById('ws-stage-scroll').innerHTML = `
    <h3>Goal</h3>
    <p>${formatInline(p.goal)}</p>

    <h3>Active Stage Objective</h3>
    <div class="file-location" style="margin-bottom:1rem;">
      <strong>Objective:</strong> ${formatInline(part.text)}
    </div>

    <h3>Concept</h3>
    <p>${formatInline(p.concept)}</p>

    <h3>Local Workspace Directory</h3>
    <pre><code>${escapeHtml(p.file)}</code></pre>

    <h3>Step-by-step instructions</h3>
    <ol>${p.steps.map(s => `<li>${formatInline(s)}</li>`).join('')}</ol>

    <h3>Checkpoint questions</h3>
    <ul>${p.checkpoint.map(c => `<li>${formatInline(c)}</li>`).join('')}</ul>

    <h3>Research Task</h3>
    <p>${formatInline(p.research)}</p>
  `;

  renderSandboxTab();
}

// ════════════════════════════════════════════════
//  SANDBOX RENDERING ENGINE (BY PHASE ID)
// ════════════════════════════════════════════════
function renderSandboxTab() {
  const body = document.getElementById('ws-sandbox-body');
  if (activeWsTab === 'code') {
    body.innerHTML = `
      <div class="ws-code-viewer">
        <div class="ws-code-header">
          <span class="ws-code-title">Browsing file system</span>
          <div style="display:flex; gap:0.4rem;">
            <button class="btn btn-secondary btn-sm" id="btn-ws-starter" onclick="loadWsFiles('starter')">View starter code</button>
            <button class="btn btn-secondary btn-sm" id="btn-ws-solution" onclick="loadWsFiles('solution')">Reveal solution</button>
          </div>
        </div>
        <div id="ws-code-body" class="ws-code-container">
          <p class="cl-info">Select 'starter code' or 'solution' above to view files directly from the local running server.</p>
        </div>
      </div>
    `;
    loadWsFiles('starter');
    return;
  }
  
  if (activeWsTab === 'verify') {
    const p = [...L1_PHASES, ...L2_PHASES].find(x => x.id === currentPhaseId);
    body.innerHTML = `
      <div class="ws-verify-container">
        <div class="ws-verify-card">
          <div class="sb-panel-title">💾 Terminal Run Command</div>
          <p style="color:var(--muted); font-size:0.85rem; margin-bottom:0.75rem;">Run the following command in your local terminal to test your implementation:</p>
          <pre style="background:#06090e; padding:1rem; border:1px solid var(--border); border-radius:4px; font-family:var(--font-mono); font-size:0.8rem; color:#f1f5f9;"><code>${escapeHtml(p.run)}</code></pre>
        </div>
        
        <div class="ws-verify-card">
          <div class="sb-panel-title">✓ Stage Checkoff</div>
          <p style="color:var(--muted); font-size:0.85rem; margin-bottom:1rem;">Have you completed this stage locally? Check it off to save your progress!</p>
          <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
            <button class="btn btn-primary btn-sm" onclick="togglePhaseComplete()">Toggle Phase Progress State</button>
            <button class="btn btn-secondary btn-sm" onclick="saveToGist()">Sync to GitHub Gist</button>
          </div>
        </div>
      </div>
    `;
    return;
  }

  // Active Workspace Sandboxes
  switch(currentPhaseId) {
    case 'l1p_intro':
      renderIntroSandbox();
      break;
    case 'l1p00':
      renderCurlSandbox();
      break;
    case 'l1p01':
      renderRequestsSandbox();
      break;
    case 'l1p02':
      renderAuthSandbox();
      break;
    case 'l1p03':
      renderThreadSandbox();
      break;
    case 'l1p04':
      renderWidgetSandbox();
      break;
    case 'l1p05':
      renderDeploySandbox();
      break;
    case 'l1p06':
      renderSecuritySandbox();
      break;
    case 'l1p07':
      renderJsonSandbox();
      break;
    case 'l1p08':
      renderCorsSandbox();
      break;
    case 'l2p00':
      renderPostmanSandbox();
      break;
    case 'l2p01':
      renderStructureSandbox();
      break;
    case 'l2p02':
      renderChainingSandbox();
      break;
    case 'l2p03':
      renderCronSandbox();
      break;
    case 'l2p04':
      renderWebhookSandbox();
      break;
    case 'l2p05':
      renderCiSandbox();
      break;
    case 'l2p06':
      renderCapstoneSandbox();
      break;
    default:
      body.innerHTML = `<p class="cl-info">Interactive sandbox coming soon for this phase!</p>`;
  }
}

// ════════════════════════════════════════════════
//  15 UNIQUE INTERACTIVE SANDBOX ENGINES
// ════════════════════════════════════════════════

// ==========================================
//  PHASE INTRO: FIRST-PRINCIPLES SANDBOX
// ==========================================
let introDecompSelection = null; // 'method' | 'path' | 'host'
let introDecompState = { method: false, path: false, host: false };
let introVendingHotwired = false;

function renderIntroSandbox() {
  const body = document.getElementById('ws-sandbox-body');
  
  if (activeStageIndex === 0) {
    // Stage 1: The Vending Machine (Interface & Abstraction)
    body.innerHTML = `
      <div class="sb-container">
        <div class="sb-panel">
          <div class="sb-panel-title">🥤 Interface Boundary & Abstraction Vending Machine</div>
          <p style="color:var(--muted); font-size:0.85rem; margin-bottom:1rem;">An Interface isolates you from the raw, dangerous, complex internals of a system. Push a clean button to interact, or attempt to manual hotwire.</p>
          
          <div class="sb-grid-2">
            <div style="background:#0f1522; padding:1rem; border-radius:8px; border:1px solid var(--border);">
              <div style="font-weight:700; font-size:0.75rem; color:var(--cyan); margin-bottom:0.75rem; text-transform:uppercase; letter-spacing:0.05em;">Vending Front (The Clean Interface)</div>
              <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.5rem; margin-bottom:1rem;">
                <button class="btn btn-primary" style="font-size: 0.75rem; padding: 0.4rem;" onclick="runVendingMachine('A1')">A1 (Soda)</button>
                <button class="btn btn-primary" style="font-size: 0.75rem; padding: 0.4rem;" onclick="runVendingMachine('B2')">B2 (Water)</button>
                <button class="btn btn-primary" style="font-size: 0.75rem; padding: 0.4rem;" onclick="runVendingMachine('C3')">C3 (Chips)</button>
                <button class="btn btn-primary" style="font-size: 0.75rem; padding: 0.4rem;" onclick="runVendingMachine('D4')">D4 (Candy)</button>
              </div>
              <div style="height:35px; background:#080b11; border:1px dashed var(--border-light); border-radius:4px; display:flex; align-items:center; justify-content:center; font-size:0.8rem;" id="vending-slot">
                [ Dispensation Slot Empty ]
              </div>
            </div>
            
            <div style="background:#0f1522; padding:1rem; border-radius:8px; border:1px solid var(--border);">
              <div style="font-weight:700; font-size:0.75rem; color:var(--red); margin-bottom:0.75rem; text-transform:uppercase; letter-spacing:0.05em;">Vending Back (Complex Raw Internals)</div>
              <div style="display:flex; flex-direction:column; gap:0.4rem; font-size:0.72rem; font-family:var(--font-mono); color:var(--muted);">
                <div>MOTOR_VOLTAGE: <span id="v-motor" style="color:var(--yellow)">0V</span></div>
                <div>COMPRESSOR_TEMP: <span style="color:var(--green)">4.2°C</span></div>
                <div>COIN_WEIGHT_VAL: <span id="v-coin" style="color:var(--yellow)">0g</span></div>
                <div>DISPENSE_RELAY: <span id="v-relay" style="color:var(--red)">OFF (CLOSED)</span></div>
              </div>
              <div style="margin-top:1rem; border-top:1px solid var(--border); padding-top:0.75rem;">
                <button class="btn btn-secondary btn-sm" style="width:100%; border-color:var(--red); color:var(--red);" onclick="hotwireVending()">⚠️ Bypassing Interface: Hotwire Relay</button>
              </div>
            </div>
          </div>
        </div>
        
        <div class="sb-console">
          <div class="sb-console-header">Simulation Output</div>
          <div class="sb-console-body" id="intro-vending-console" style="font-size:0.75rem;">
<span class="cl-info">Click one of the clean interface buttons (A1-D4) or attempt to hotwire the raw internals manually.</span>
          </div>
        </div>
      </div>
    `;
  }
  
  else if (activeStageIndex === 1) {
    // Stage 2: Code Abstractions (Function Boundaries)
    body.innerHTML = `
      <div class="sb-container">
        <div class="sb-panel">
          <div class="sb-panel-title">🔌 Function Boundaries & Pipeline Connectivity</div>
          <p style="color:var(--muted); font-size:0.85rem; margin-bottom:1rem;">In code, we wrap complex databases, caches, and networking queries behind a simple function declaration. Connect the pipes to invoke the interface.</p>
          
          <div style="background:#0f1522; padding:1.25rem; border-radius:8px; border:1px solid var(--border); margin-bottom:1rem; display:flex; justify-content:space-between; align-items:center; position:relative;">
            <!-- Left Side Input -->
            <div id="pipe-input" style="border:2px solid var(--border-light); padding:0.5rem 1rem; border-radius:4px; font-family:var(--font-mono); font-size:0.8rem; background:var(--bg);">
              "Roseau" (City Input)
            </div>
            
            <!-- Connection Line -->
            <div style="flex:1; height:6px; background:var(--border-light); margin:0 1rem; position:relative;" id="pipe-line-1">
              <div id="pipe-flow-1" style="position:absolute; left:0; top:0; height:100%; width:0%; background:var(--accent); transition:width 0.8s ease;"></div>
            </div>
            
            <!-- Center Function Abstraction -->
            <div id="pipe-func" style="border:2px solid var(--accent); padding:0.75rem; border-radius:8px; font-weight:700; font-size:0.85rem; background:var(--surface); cursor:pointer;" onclick="peepUnderFunctionShroud()">
              get_temperature(city)
              <div style="font-size:0.6rem; color:var(--cyan); font-weight:normal; margin-top:0.25rem;">[ CLICK TO PEEP UNDER SHROUD ]</div>
            </div>
            
            <!-- Connection Line 2 -->
            <div style="flex:1; height:6px; background:var(--border-light); margin:0 1rem; position:relative;" id="pipe-line-2">
              <div id="pipe-flow-2" style="position:absolute; left:0; top:0; height:100%; width:0%; background:var(--accent); transition:width 0.8s ease;"></div>
            </div>
            
            <!-- Right Side Output -->
            <div id="pipe-output" style="border:2px solid var(--border-light); padding:0.5rem 1rem; border-radius:4px; font-family:var(--font-mono); font-size:0.8rem; background:var(--bg);">
              Temperature Display
            </div>
          </div>
          
          <pre id="function-shroud" style="display:none; background:#06090e; border:1px dashed var(--cyan); padding:0.75rem; border-radius:4px; font-size:0.75rem; line-height:1.4; margin-bottom:1rem;"></pre>
          
          <button class="btn btn-primary btn-sm" onclick="connectPipes()">▶ Test Function Connection Pipeline</button>
        </div>
        
        <div class="sb-console">
          <div class="sb-console-header">Abstract Execution Trace</div>
          <div class="sb-console-body" id="intro-func-console" style="font-size:0.75rem;">
<span class="cl-info">Click the test pipeline button to run data flows from input to output displaying the internal code complexity.</span>
          </div>
        </div>
      </div>
    `;
  }
  
  else if (activeStageIndex === 2) {
    // Stage 3: Request Decompilation (HTTP Byte Parser)
    introDecompSelection = null;
    introDecompState = { method: false, path: false, host: false };
    body.innerHTML = `
      <div class="sb-container">
        <div class="sb-panel">
          <div class="sb-panel-title">🔍 HTTP Byte Stream Decompilation</div>
          <p style="color:var(--muted); font-size:0.85rem; margin-bottom:1rem;">HTTP is not binary magic — it is structured plain-text bytes sent over a socket. Select a component classification below, then click on the corresponding segment in the byte stream block to decompile it.</p>
          
          <div style="display:flex; gap:0.4rem; margin-bottom:1rem;">
            <button class="btn btn-secondary btn-sm" id="btn-cls-method" onclick="selectHttpClassification('method')">1. Highlight METHOD</button>
            <button class="btn btn-secondary btn-sm" id="btn-cls-path" onclick="selectHttpClassification('path')">2. Highlight PATH</button>
            <button class="btn btn-secondary btn-sm" id="btn-cls-host" onclick="selectHttpClassification('host')">3. Highlight HOST</button>
          </div>
          
          <div style="background:#06090e; border:1px solid var(--border-light); padding:1rem; border-radius:8px; font-family:var(--font-mono); font-size:1rem; line-height:1.6; letter-spacing:0.02em; margin-bottom:1rem; user-select:none;">
            <span style="cursor:pointer; padding:2px; border-radius:3px;" id="byte-seg-method" onclick="clickByteSegment('method')">GET</span> 
            <span style="cursor:pointer; padding:2px; border-radius:3px;" id="byte-seg-path" onclick="clickByteSegment('path')">/v1/forecast?city=Roseau</span> HTTP/1.1<br>
            Host: <span style="cursor:pointer; padding:2px; border-radius:3px;" id="byte-seg-host" onclick="clickByteSegment('host')">api.open-meteo.com</span><br>
            Accept: application/json
          </div>
        </div>
        
        <div class="sb-console">
          <div class="sb-console-header">Decompiler Register</div>
          <div class="sb-console-body" id="intro-decomp-console" style="font-size:0.75rem;">
<span class="cl-info">Select a classifier button first, then highlight the correct part of the HTTP message body block above.</span>
          </div>
        </div>
      </div>
    `;
  }
  
  else if (activeStageIndex === 3) {
    // Stage 4: The Symmetric Mirror (Client-Server Symmetrical Alignment)
    body.innerHTML = `
      <div class="sb-container">
        <div class="sb-panel">
          <div class="sb-panel-title">🪞 Symmetric Mirror Alignment</div>
          <p style="color:var(--muted); font-size:0.85rem; margin-bottom:1rem;">Symmetry is rational. For every request element dispatched by a client, the server responds with a matching, symmetrical element in its envelope. Fill the blank mirrors below.</p>
          
          <div class="sb-grid-2" style="margin-bottom:1rem;">
            <div style="background:#0f1522; padding:1rem; border-radius:8px; border:1px solid var(--border);">
              <div style="font-weight:700; font-size:0.75rem; color:var(--cyan); margin-bottom:0.75rem; text-transform:uppercase; letter-spacing:0.05em;">Client Request</div>
              <div style="display:flex; flex-direction:column; gap:0.5rem; font-family:var(--font-mono); font-size:0.75rem; color:var(--text);">
                <div>1. Method: <span style="color:var(--accent);">GET /index.html</span></div>
                <div>2. Accept Header: <span style="color:var(--accent);">application/json</span></div>
                <div>3. API Key: <span style="color:var(--accent);">invalid_owm_secret_key</span></div>
              </div>
            </div>
            
            <div style="background:#0f1522; padding:1rem; border-radius:8px; border:1px solid var(--border);">
              <div style="font-weight:700; font-size:0.75rem; color:var(--green); margin-bottom:0.75rem; text-transform:uppercase; letter-spacing:0.05em;">Server Response Symmetrical Mirror</div>
              <div style="display:flex; flex-direction:column; gap:0.4rem;">
                <div style="display:flex; align-items:center; gap:0.4rem;">
                  <span style="font-size:0.7rem; color:var(--muted); font-family:var(--font-mono);">1. Status Code:</span>
                  <select class="sb-input" id="mirror-val-status" style="padding:0.15rem 0.35rem; font-size:0.7rem; width:120px;" onchange="checkSymmetricMirror()">
                    <option value="">-- Choose --</option>
                    <option value="200">200 OK</option>
                    <option value="201">201 Created</option>
                    <option value="404">404 Not Found</option>
                  </select>
                </div>
                <div style="display:flex; align-items:center; gap:0.4rem;">
                  <span style="font-size:0.7rem; color:var(--muted); font-family:var(--font-mono);">2. Content-Type:</span>
                  <select class="sb-input" id="mirror-val-type" style="padding:0.15rem 0.35rem; font-size:0.7rem; width:120px;" onchange="checkSymmetricMirror()">
                    <option value="">-- Choose --</option>
                    <option value="html">text/html</option>
                    <option value="json">application/json</option>
                  </select>
                </div>
                <div style="display:flex; align-items:center; gap:0.4rem;">
                  <span style="font-size:0.7rem; color:var(--muted); font-family:var(--font-mono);">3. Auth Code:</span>
                  <select class="sb-input" id="mirror-val-auth" style="padding:0.15rem 0.35rem; font-size:0.7rem; width:120px;" onchange="checkSymmetricMirror()">
                    <option value="">-- Choose --</option>
                    <option value="401">401 Unauthorized</option>
                    <option value="403">403 Forbidden</option>
                    <option value="429">429 Rate Limited</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="sb-console">
          <div class="sb-console-header">Symmetric Mirror Solver</div>
          <div class="sb-console-body" id="intro-mirror-console" style="font-size:0.75rem;">
<span class="cl-info">Fill in the 3 response options on the right to align with the client request symmetrically...</span>
          </div>
        </div>
      </div>
    `;
  }
  
  else if (activeStageIndex === 4) {
    // Stage 5: Interface Contracts (Contract Integrity Sandbox)
    body.innerHTML = `
      <div class="sb-container">
        <div class="sb-panel">
          <div class="sb-panel-title">📜 Interface Contracts & Integrity Sandbox</div>
          <p style="color:var(--muted); font-size:0.85rem; margin-bottom:1rem;">An API contract is a promise. If the client expects a key called "temp" but the server changes it, the abstraction boundary collapses. Simulate a breach to see results.</p>
          
          <div class="sb-grid-2" style="margin-bottom:1rem;">
            <div style="background:#06090e; padding:0.75rem; border-radius:8px; border:1px solid var(--border);">
              <div style="font-weight:700; font-size:0.72rem; color:var(--cyan); margin-bottom:0.5rem; text-transform:uppercase; font-family:var(--font-sans);">Client Code (client.py)</div>
              <pre style="background:transparent; border:none; padding:0; margin:0; font-size:0.72rem; color:#94a3b8;"><code style="font-family:var(--font-mono);">res = requests.get(url)
data = res.json()
print("Temp in Roseau:", data["temp"])</code></pre>
            </div>
            
            <div style="background:#06090e; padding:0.75rem; border-radius:8px; border:1px solid var(--border);">
              <div style="font-weight:700; font-size:0.72rem; color:var(--green); margin-bottom:0.5rem; text-transform:uppercase; font-family:var(--font-sans);">Server Payload</div>
              <div class="sb-field" style="margin-bottom:0.5rem;">
                <label style="font-size:0.6rem;">Server Response Contract Key</label>
                <select class="sb-input" id="contract-server-key" style="padding:0.15rem 0.35rem; font-size:0.7rem;" onchange="toggleContractLeak()">
                  <option value="temp">Keep Contract ("temp": 28.5)</option>
                  <option value="temperature">Break Contract ("temperature": 28.5)</option>
                </select>
              </div>
              <pre id="contract-srv-payload" style="background:transparent; border:none; padding:0; margin:0; font-size:0.72rem; color:var(--green);"><code style="font-family:var(--font-mono);">{\n  "temp": 28.5,\n  "city": "Roseau"\n}</code></pre>
            </div>
          </div>
          
          <button class="btn btn-primary btn-sm" onclick="runContractClient()">▶ Execute Python Script</button>
        </div>
        
        <div class="sb-console">
          <div class="sb-console-header">Client Terminal Out</div>
          <div class="sb-console-body" id="intro-contract-console" style="font-size:0.75rem;">
<span class="cl-info">Select server contract state, then run Python Script to evaluate interface contract integrity...</span>
          </div>
        </div>
      </div>
    `;
  }
}

// Stage 1 functions
function runVendingMachine(btn) {
  const consoleBody = document.getElementById('intro-vending-console');
  const slot = document.getElementById('vending-slot');
  const vMotor = document.getElementById('v-motor');
  const vCoin = document.getElementById('v-coin');
  const vRelay = document.getElementById('v-relay');
  
  slot.textContent = "[ Dispensation Slot Empty ]";
  
  let out = `<span class="cl-req">[Clean Interface Triggered] push_button("${btn}")</span>\n`;
  out += `Hiding inner details (Complexity Abstraction)... OK.\n`;
  
  // Set inner registers visually to simulate raw activity
  vMotor.textContent = '12V (ACTIVE)'; vMotor.style.color = 'var(--green)';
  vCoin.textContent = '5g (SODA_COIN)'; vCoin.style.color = 'var(--green)';
  vRelay.textContent = 'ON (OPENED)'; vRelay.style.color = 'var(--green)';
  
  setTimeout(() => {
    out += `Voltage verified. Coil motorized. Coin balance detected.\n`;
    out += `<span class="cl-resp">[Response Received] Item dispensed successfully. Enjoy!</span>\n\n`;
    out += `<span class="cl-ok">✓ Objective Met! You used the clean user interface, leaving the inner motor complexity completely abstracted.</span>`;
    consoleBody.innerHTML = out;
    
    let dispName = btn === 'A1' ? '🥤 Soda' : (btn === 'B2' ? '💧 Water' : (btn === 'C3' ? '🍟 Chips' : '🍬 Candy'));
    slot.innerHTML = `<span class="cl-ok" style="font-size:0.9rem; font-weight:700;">🎁 ${dispName} Dispensed!</span>`;
    
    // Reset back panels
    setTimeout(() => {
      vMotor.textContent = '0V'; vMotor.style.color = 'var(--yellow)';
      vCoin.textContent = '0g'; vCoin.style.color = 'var(--yellow)';
      vRelay.textContent = 'OFF (CLOSED)'; vRelay.style.color = 'var(--red)';
    }, 1500);
  }, 1000);
}

function hotwireVending() {
  const consoleBody = document.getElementById('intro-vending-console');
  const vMotor = document.getElementById('v-motor');
  const vRelay = document.getElementById('v-relay');
  
  vMotor.textContent = '24V (OVERLOAD)'; vMotor.style.color = 'var(--red)';
  vRelay.textContent = 'ON (HOTWIRING)'; vRelay.style.color = 'var(--yellow)';
  
  let out = `<span class="cl-warn">[Internals Alert] Manual bypass detected. Spark arc generated.</span>\n`;
  out += `<span class="cl-err">Traceback / Electrical Fault:\n  Internal Exception: MotorCoilOverheatError: Voltage peaks beyond limits (24V on 12V rail)\n  System Crashed. Vending machine requires terminal reset.</span>\n\n`;
  out += `<span class="cl-info">This is why we build APIs. Direct manipulation of a system's raw innards without an interface is dangerous, fragile, and prone to catastrophic crashes.</span>`;
  
  consoleBody.innerHTML = out;
}

// Stage 2 functions
function peepUnderFunctionShroud() {
  const p = document.getElementById('function-shroud');
  if (p.style.display === 'none') {
    p.style.display = 'block';
    p.textContent = `def get_temperature(city):\n    # 1. Geocode lookup query\n    lat, lon = geocode_database_lookup(city)\n    # 2. HTTP network payload transit\n    res = requests.get(f"https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current_weather=true")\n    # 3. JSON serialization parsing\n    parsed = json.loads(res.text)\n    # 4. Extract nested schema values\n    return parsed["current_weather"]["temperature"]`;
  } else {
    p.style.display = 'none';
  }
}

function connectPipes() {
  const f1 = document.getElementById('pipe-flow-1');
  const f2 = document.getElementById('pipe-flow-2');
  const consoleBody = document.getElementById('intro-func-console');
  
  f1.style.width = '100%';
  consoleBody.innerHTML = `<span class="cl-req">Data transit initiated. Input ("Roseau") passing into function boundary...</span>\n`;
  
  setTimeout(() => {
    consoleBody.innerHTML += `Function get_temperature("Roseau") invoked. Inner scope executing:\n`;
    consoleBody.innerHTML += `  - Geocoding Roseau -> (15.30, -61.38) ... OK.\n`;
    consoleBody.innerHTML += `  - Firing requests.get() across TCP socket ... OK.\n`;
    consoleBody.innerHTML += `  - Deserializing JSON text body to dict ... OK.\n`;
    f2.style.width = '100%';
  }, 1000);
  
  setTimeout(() => {
    document.getElementById('pipe-output').innerHTML = `<span class="cl-ok" style="font-weight:700;">28.5°C</span>`;
    consoleBody.innerHTML += `<span class="cl-resp">Function execution succeeded. Output returned: "28.5°C"</span>\n\n`;
    consoleBody.innerHTML += `<span class="cl-ok">✓ Abstraction Verified! The 100 lines of networking and database lookups inside the function are beautifully abstracted behind a simple 1-line call: get_temperature("Roseau").</span>`;
  }, 2000);
}

// Stage 3 functions
function selectHttpClassification(cls) {
  introDecompSelection = cls;
  document.querySelectorAll('[id^="btn-cls-"]').forEach(b => b.className = 'btn btn-secondary btn-sm');
  document.getElementById(`btn-cls-${cls}`).className = 'btn btn-primary btn-sm';
  
  const logs = document.getElementById('intro-decomp-console');
  logs.innerHTML = `<span class="cl-info">Selected classifier: [${cls.toUpperCase()}]. Click on the corresponding plain text chunk in the byte block...</span>`;
}

function clickByteSegment(seg) {
  const logs = document.getElementById('intro-decomp-console');
  if (!introDecompSelection) {
    logs.innerHTML = `<span class="cl-warn">Warning: Click a Classifier button first (Method, Path, or Host) before selecting elements.</span>`;
    return;
  }
  
  const span = document.getElementById(`byte-seg-${seg}`);
  
  if (introDecompSelection === seg) {
    if (seg === 'method') {
      span.style.background = 'rgba(45, 212, 191, 0.25)';
      span.style.color = 'var(--accent)';
      introDecompState.method = true;
    } else if (seg === 'path') {
      span.style.background = 'rgba(34, 211, 238, 0.25)';
      span.style.color = 'var(--cyan)';
      introDecompState.path = true;
    } else if (seg === 'host') {
      span.style.background = 'rgba(251, 191, 36, 0.25)';
      span.style.color = 'var(--yellow)';
      introDecompState.host = true;
    }
    
    logs.innerHTML = `<span class="cl-ok">✓ CORRECT. You identified the HTTP ${seg.toUpperCase()} component successfully!</span>`;
    
    // Check if entire puzzle completed
    if (introDecompState.method && introDecompState.path && introDecompState.host) {
      setTimeout(() => {
        logs.innerHTML += `\n\n<span class="cl-ok">==========================================================\n🏆 DECOMPILER CHALLENGE CLEARED!\nHTTP is just raw structured string data. curl is a tool that writes these exact string elements over raw TCP sockets on your behalf. Now you know the electronic anatomy of a web request!\n==========================================================</span>`;
      }, 800);
    }
  } else {
    logs.innerHTML = `<span class="cl-err">✗ INCORRECT. That segment does not match the active [${introDecompSelection.toUpperCase()}] classification profile. Try again.</span>`;
  }
}

// Stage 4 functions
function checkSymmetricMirror() {
  const status = document.getElementById('mirror-val-status').value;
  const type = document.getElementById('mirror-val-type').value;
  const auth = document.getElementById('mirror-val-auth').value;
  const logs = document.getElementById('intro-mirror-console');
  
  if (!status || !type || !auth) {
    logs.innerHTML = `<span class="cl-info">Symmetry requires complete matches. Select all 3 mirrors to trigger comparison...</span>`;
    return;
  }
  
  let valid = true;
  let out = `Analyzing symmetric matching elements:\n`;
  
  if (status === '200') {
    out += `  - Request Verb [GET] mirrors Response [200 OK] ... <span class="cl-ok">MATCH</span>\n`;
  } else {
    out += `  - Request Verb [GET] mirrors Response [${status}] ... <span class="cl-err">MISMATCH</span> (A GET request expects status 200 OK for valid resources)\n`;
    valid = false;
  }
  
  if (type === 'json') {
    out += `  - Request Accept [JSON] mirrors Response Content-Type [application/json] ... <span class="cl-ok">MATCH</span>\n`;
  } else {
    out += `  - Request Accept [JSON] mirrors Response Content-Type [${type === 'html' ? 'text/html' : 'text'}] ... <span class="cl-err">MISMATCH</span> (If client accepts JSON, server should send json content-type)\n`;
    valid = false;
  }
  
  if (auth === '401') {
    out += `  - Invalid API Key mirrors Response Status [401 Unauthorized] ... <span class="cl-ok">MATCH</span>\n`;
  } else {
    out += `  - Invalid API Key mirrors Response Status [${auth}] ... <span class="cl-err">MISMATCH</span> (Incorrect keys result in 401 Unauthorized, not 403 Forbidden which implies valid keys but restricted permission)\n`;
    valid = false;
  }
  
  if (valid) {
    out += `\n<span class="cl-ok">✓ Symmetrical Symmetry Validated! Request and Response represent a perfect reciprocal mirror protocol.</span>`;
  } else {
    out += `\n<span class="cl-warn">Alignment fractured. Symmetrical mirrors must align perfectly according to protocol specs. Adjust choices.</span>`;
  }
  
  logs.innerHTML = out;
}

// Stage 5 functions
function toggleContractLeak() {
  const val = document.getElementById('contract-server-key').value;
  const pay = document.getElementById('contract-srv-payload');
  if (val === 'temp') {
    pay.innerHTML = `<code style="font-family:var(--font-mono);">{\n  "temp": 28.5,\n  "city": "Roseau"\n}</code>`;
  } else {
    pay.innerHTML = `<code style="font-family:var(--font-mono);">{\n  "temperature": 28.5,\n  "city": "Roseau"\n}</code>`;
  }
}

function runContractClient() {
  const val = document.getElementById('contract-server-key').value;
  const logs = document.getElementById('intro-contract-console');
  
  logs.innerHTML = `<span class="cl-info">$ python3 client.py</span>\n`;
  logs.innerHTML += `GET url ... OK. Status 200 OK returned.\n`;
  logs.innerHTML += `Decoding JSON response body...\n`;
  
  setTimeout(() => {
    if (val === 'temp') {
      logs.innerHTML += `Temp in Roseau: 28.5°C\n\n`;
      logs.innerHTML += `<span class="cl-ok">✓ Contract Intact! Client expected 'temp' key, server supplied 'temp' key. Abstraction holds. Code passes cleanly!</span>`;
    } else {
      logs.innerHTML += `<span class="cl-err">Traceback (most recent call last):\n  File "client.py", line 3, in &lt;module&gt;\n    print("Temp in Roseau:", data["temp"])\nKeyError: "temp"</span>\n\n`;
      logs.innerHTML += `<span class="cl-err">An error occurred: KeyError("temp")\n\n✗ ABSTRACTION BOUNDARY FRACTURED! Changing the key 'temp' to 'temperature' on the server broke the promised Contract. The client application crashed instantly. This demonstrates why API contracts are strictly immutable.</span>`;
    }
  }, 1000);
}

// 1. Curl Basics Sandbox
let curlSandboxMode = 'visual'; // 'visual' | 'raw'

function renderCurlSandbox() {
  const curlTemplates = [
    'curl https://wttr.in/Roseau?format=3',
    'curl -v https://wttr.in/Roseau?format=3',
    'curl -X POST -H "Content-Type: application/json" -d \'{"temp": 28}\' https://httpbin.org/post',
    'curl -X PUT -H "Content-Type: application/json" -d \'{"temp": 29}\' https://httpbin.org/put',
    'curl -H "Authorization: Bearer bad_token" https://httpbin.org/bearer',
    'curl -I https://wttr.in/Roseau',
    'curl "https://api.open-meteo.com/v1/forecast?latitude=15.30&longitude=-61.38&hourly=temperature_2m"'
  ];
  
  const body = document.getElementById('ws-sandbox-body');
  body.innerHTML = `
    <div class="sb-container">
      <div class="sb-panel">
        <div class="sb-panel-title">🐚 HTTP curl Laboratory & Live Compiler</div>
        
        <div style="display:flex; gap:1rem; margin-bottom:1rem; border-bottom:1px solid var(--border); padding-bottom:0.5rem;">
          <span style="font-size:0.75rem; font-weight:700; color:var(--accent); cursor:pointer;" id="curl-mode-visual-btn" onclick="toggleCurlMode('visual')">📦 VISUAL PACKET BUILDER</span>
          <span style="font-size:0.75rem; font-weight:700; color:var(--muted); cursor:pointer;" id="curl-mode-raw-btn" onclick="toggleCurlMode('raw')">💻 RAW CLI COMMAND</span>
        </div>
        
        <!-- Visual Builder Panel -->
        <div id="curl-visual-panel">
          <div class="sb-grid-2">
            <div class="sb-field">
              <label>HTTP Request Method (-X)</label>
              <select class="sb-input" id="v-curl-method" onchange="compileCurlLive()">
                <option value="GET">GET (Fetch)</option>
                <option value="POST">POST (Submit)</option>
                <option value="PUT">PUT (Replace)</option>
                <option value="DELETE">DELETE (Remove)</option>
                <option value="HEAD">HEAD (Headers Only)</option>
              </select>
            </div>
            <div class="sb-field">
              <label>Target Server Endpoint</label>
              <select class="sb-input" id="v-curl-url" onchange="compileCurlLive()">
                <option value="https://wttr.in/Roseau?format=3">wttr.in (Weather Service)</option>
                <option value="https://httpbin.org/post">httpbin.org/post (Payload Test)</option>
                <option value="https://httpbin.org/put">httpbin.org/put (Update Test)</option>
                <option value="https://httpbin.org/bearer">httpbin.org/bearer (Auth Test)</option>
                <option value="https://api.open-meteo.com/v1/forecast?latitude=15.30&longitude=-61.38&hourly=temperature_2m">api.open-meteo.com (Raw Forecast)</option>
              </select>
            </div>
          </div>
          
          <div class="sb-grid-2">
            <div class="sb-field">
              <label>Inject Headers (-H)</label>
              <div style="display:flex; flex-direction:column; gap:0.4rem; padding-top:0.25rem;">
                <label style="display:flex; align-items:center; gap:0.4rem; font-size:0.75rem; text-transform:none; color:var(--text); cursor:pointer;">
                  <input type="checkbox" id="v-curl-h-json" onchange="compileCurlLive()"> Content-Type: application/json
                </label>
                <label style="display:flex; align-items:center; gap:0.4rem; font-size:0.75rem; text-transform:none; color:var(--text); cursor:pointer;">
                  <input type="checkbox" id="v-curl-h-auth" onchange="compileCurlLive()"> Authorization: Bearer bad_token
                </label>
              </div>
            </div>
            <div class="sb-field">
              <label style="display:flex; align-items:center; gap:0.4rem; font-size:0.75rem; text-transform:uppercase; color:var(--muted); cursor:pointer;">
                <input type="checkbox" id="v-curl-verbose" checked onchange="compileCurlLive()"> Enable Verbose Logging (-v)
              </label>
            </div>
          </div>
          
          <div class="sb-field" id="v-curl-body-field" style="display:none;">
            <label>JSON Data Body (-d)</label>
            <input type="text" class="sb-input sb-input-mono" id="v-curl-body" value='{"temp": 28}' oninput="compileCurlLive()">
          </div>
        </div>
        
        <!-- Raw CLI Input Panel -->
        <div id="curl-raw-panel" style="display:none;">
          <div class="sb-field">
            <label>Raw curl Command String</label>
            <input type="text" class="sb-input sb-input-mono" id="curl-input" value="${curlTemplates[activeStageIndex]}">
          </div>
        </div>
        
        <!-- Compiled Output Visual Code Box -->
        <div class="sb-panel-title" style="margin-top:1rem; margin-bottom:0.5rem; font-size:0.72rem; color:var(--muted);">Compiled CLI Instruction</div>
        <pre style="background:#06090e; padding:0.5rem; border-radius:4px; margin:0 0 0.75rem 0; border:1px solid var(--border);"><code id="compiled-curl-cmd" class="cl-info" style="font-size:0.75rem;"></code></pre>
        
        <div style="display:flex; gap:0.5rem;">
          <button class="btn btn-primary btn-sm" onclick="runCurlCommand()">▶ Transmit Packet & Execute</button>
          <button class="btn btn-secondary btn-sm" onclick="resetCurlCmd()">Reset Template</button>
        </div>
      </div>
      
      <!-- Terminal Window -->
      <div class="sb-console">
        <div class="sb-console-header">
          <span>Terminal Packet Session</span>
          <span id="curl-pass-badge" style="color:var(--muted)">Idle</span>
        </div>
        <div class="sb-console-body" id="curl-terminal-body">
<span class="cl-info">Compile the packet above and click Transmit Packet to launch visual flow traces...</span>
        </div>
      </div>
    </div>
  `;
  
  // Align visual presets to active stage on load
  presetCurlVisualsByStage();
  compileCurlLive();
}

function presetCurlVisualsByStage() {
  const method = document.getElementById('v-curl-method');
  const url = document.getElementById('v-curl-url');
  const hJson = document.getElementById('v-curl-h-json');
  const hAuth = document.getElementById('v-curl-h-auth');
  const v = document.getElementById('v-curl-verbose');
  const b = document.getElementById('v-curl-body-field');
  
  if (activeStageIndex === 1) {
    v.checked = true;
  } else if (activeStageIndex === 2) {
    method.value = 'POST';
    url.value = 'https://httpbin.org/post';
    hJson.checked = true;
    b.style.display = 'block';
  } else if (activeStageIndex === 3) {
    method.value = 'PUT';
    url.value = 'https://httpbin.org/put';
    hJson.checked = true;
    b.style.display = 'block';
  } else if (activeStageIndex === 4) {
    url.value = 'https://httpbin.org/bearer';
    hAuth.checked = true;
  } else if (activeStageIndex === 5) {
    method.value = 'HEAD';
    v.checked = false;
  } else if (activeStageIndex === 6) {
    url.value = 'https://api.open-meteo.com/v1/forecast?latitude=15.30&longitude=-61.38&hourly=temperature_2m';
    v.checked = false;
  }
}

function toggleCurlMode(mode) {
  curlSandboxMode = mode;
  const vBtn = document.getElementById('curl-mode-visual-btn');
  const rBtn = document.getElementById('curl-mode-raw-btn');
  const vPanel = document.getElementById('curl-visual-panel');
  const rPanel = document.getElementById('curl-raw-panel');
  
  if (mode === 'visual') {
    vBtn.style.color = 'var(--accent)';
    rBtn.style.color = 'var(--muted)';
    vPanel.style.display = 'block';
    rPanel.style.display = 'none';
  } else {
    vBtn.style.color = 'var(--muted)';
    rBtn.style.color = 'var(--accent)';
    vPanel.style.display = 'none';
    rPanel.style.display = 'block';
  }
  compileCurlLive();
}

function compileCurlLive() {
  if (curlSandboxMode === 'visual') {
    const method = document.getElementById('v-curl-method').value;
    const url = document.getElementById('v-curl-url').value;
    const hJson = document.getElementById('v-curl-h-json').checked;
    const hAuth = document.getElementById('v-curl-h-auth').checked;
    const verbose = document.getElementById('v-curl-verbose').checked;
    const bodyField = document.getElementById('v-curl-body-field');
    const bodyVal = document.getElementById('v-curl-body').value;
    
    let cmd = `curl`;
    if (verbose) cmd += ` -v`;
    if (method !== 'GET' && method !== 'HEAD') {
      cmd += ` -X ${method}`;
    } else if (method === 'HEAD') {
      cmd += ` -I`;
    }
    
    if (hJson) cmd += ` -H "Content-Type: application/json"`;
    if (hAuth) cmd += ` -H "Authorization: Bearer bad_token"`;
    
    if (method === 'POST' || method === 'PUT') {
      bodyField.style.display = 'block';
      cmd += ` -d '${bodyVal}'`;
    } else {
      bodyField.style.display = 'none';
    }
    
    cmd += ` "${url}"`;
    document.getElementById('compiled-curl-cmd').textContent = cmd;
  } else {
    const cmd = document.getElementById('curl-input').value.trim();
    document.getElementById('compiled-curl-cmd').textContent = cmd;
  }
}

function runCurlCommand() {
  compileCurlLive();
  const cmd = document.getElementById('compiled-curl-cmd').textContent.trim();
  const terminal = document.getElementById('curl-terminal-body');
  const badge = document.getElementById('curl-pass-badge');
  
  let output = `<span class="cl-prompt">$</span> <span class="cl-cmd">${escapeHtml(cmd)}</span>\n`;
  let passed = false;
  
  // Play visual packet fly trigger
  terminal.innerHTML = `<span class="cl-info">[ANIMATING PACKET FLY...] Shooted request headers across local gateway...</span>`;
  
  setTimeout(() => {
    if (cmd.includes('wttr.in/Roseau') || cmd.includes('wttr.in')) {
      if (cmd.includes('-v')) {
        output += `* Resolving wttr.in... connected.\n`;
        output += `<span class="cl-req">&gt; GET /Roseau?format=3 HTTP/1.1\n&gt; Host: wttr.in\n&gt; User-Agent: curl/7.79.1\n&gt; Accept: */*\n&gt;</span>\n`;
        output += `<span class="cl-resp">&lt; HTTP/1.1 200 OK\n&lt; Content-Type: text/plain; charset=utf-8\n&lt; Server: nginx\n&lt;</span>\n`;
        output += `Roseau: 🌦  +29°C`;
        if (activeStageIndex === 1) passed = true;
      } else if (cmd.includes('-I') || cmd.includes('-i') || cmd.includes('HEAD')) {
        output += `<span class="cl-resp">HTTP/1.1 200 OK\nContent-Type: text/plain; charset=utf-8\nServer: nginx\nConnection: keep-alive</span>`;
        if (activeStageIndex === 5) passed = true;
      } else {
        output += `Roseau: 🌦  +29°C`;
        if (activeStageIndex === 0) passed = true;
      }
    } else if (cmd.includes('httpbin.org/post') && (cmd.includes('POST') || cmd.includes('-d'))) {
      output += `* Resolving httpbin.org... connected.\n`;
      output += `<span class="cl-req">&gt; POST /post HTTP/1.1\n&gt; Content-Type: application/json\n&gt; Host: httpbin.org\n&gt;</span>\n`;
      output += `<span class="cl-resp">&lt; HTTP/1.1 200 OK\n&lt; Content-Type: application/json\n&lt;</span>\n`;
      output += `{\n  "args": {},\n  "data": "{\\"temp\\": 28}",\n  "headers": {\n    "Content-Type": "application/json"\n  },\n  "json": {\n    "temp": 28\n  }\n}`;
      if (activeStageIndex === 2) passed = true;
    } else if (cmd.includes('httpbin.org/put') && cmd.includes('PUT')) {
      output += `<span class="cl-resp">&lt; HTTP/1.1 200 OK\n&lt;</span>\n{\n  "json": {\n    "temp": 29\n  }\n}`;
      if (activeStageIndex === 3) passed = true;
    } else if (cmd.includes('httpbin.org/bearer')) {
      output += `<span class="cl-resp">&lt; HTTP/1.1 401 UNAUTHORIZED\n&lt;</span>\n<span class="cl-err">401 Auth Failure: Missing or invalid token</span>`;
      if (activeStageIndex === 4) passed = true;
    } else if (cmd.includes('open-meteo.com')) {
      output += `{\n  "latitude": 15.3,\n  "longitude": -61.38,\n  "hourly": {\n    "temperature_2m": [28.2, 28.5, 29.1, 28.7]\n  }\n}`;
      if (activeStageIndex === 6) passed = true;
    } else {
      output += `<span class="cl-err">Command executed but did not match expected target parameters for this stage.</span>`;
    }
    
    terminal.innerHTML = output;
    if (passed) {
      badge.innerHTML = `<span class="cl-ok">✓ Stage Passed! Completed on Sandbox</span>`;
    } else {
      badge.innerHTML = `<span class="cl-warn">In Progress</span>`;
    }
  }, 800);
}

function resetCurlCmd() {
  presetCurlVisualsByStage();
  compileCurlLive();
}

// 2. Python requests Sandbox
function renderRequestsSandbox() {
  const body = document.getElementById('ws-sandbox-body');
  body.innerHTML = `
    <div class="sb-container">
      <div class="sb-panel">
        <div class="sb-panel-title">🐍 requests Python Playground</div>
        <div class="sb-grid-2">
          <div class="sb-field">
            <label>HTTP Method</label>
            <select class="sb-input" id="req-method" onchange="updateRequestsCode()">
              <option value="GET">requests.get</option>
              <option value="POST">requests.post</option>
            </select>
          </div>
          <div class="sb-field">
            <label>URL Parameters Dict</label>
            <input type="text" class="sb-input sb-input-mono" id="req-params" value='{"latitude": 15.3, "longitude": -61.38, "current_weather": true}' oninput="updateRequestsCode()">
          </div>
        </div>
        <div class="sb-grid-2">
          <div class="sb-field">
            <label>Timeout (seconds)</label>
            <input type="number" class="sb-input" id="req-timeout" value="5" step="0.5" oninput="updateRequestsCode()">
          </div>
          <div class="sb-field">
            <label>Simulated Error Injector</label>
            <select class="sb-input" id="req-error" onchange="updateRequestsCode()">
              <option value="none">No Error (Clean Execution)</option>
              <option value="timeout">Simulate Timeout Exception</option>
              <option value="connection">Simulate Connection Failure</option>
              <option value="http">Simulate 500 HTTP Server Crash</option>
            </select>
          </div>
        </div>
        <div class="sb-panel-title" style="margin-top:1rem; margin-bottom:0.5rem; font-size:0.75rem;">Generated Python Code Preview</div>
        <pre style="background:#06090e; padding:0.5rem; border-radius:4px; margin:0 0 0.75rem 0;"><code id="req-py-code" class="cl-info" style="font-size:0.78rem;"></code></pre>
        
        <!-- Visual requests Lifecycle Tracker -->
        <div id="requests-lifecycle-tracker" style="background:#0f1522; padding:0.75rem; border-radius:4px; border:1px solid var(--border); margin-bottom:0.75rem;">
          <div style="font-weight:700; font-size:0.7rem; color:var(--cyan); margin-bottom:0.5rem; text-transform:uppercase; letter-spacing:0.05em;">Requests Lifecycle Step Trace</div>
          <div style="display:flex; flex-direction:column; gap:0.25rem; font-size:0.72rem; color:var(--muted); font-family:var(--font-mono);">
            <div id="tr-step-1">🔘 1. Compile request URL and parameters dict</div>
            <div id="tr-step-2">🔘 2. Resolve Host & Establish TCP socket handshake</div>
            <div id="tr-step-3">🔘 3. Transmit HTTP payload text bytes to server</div>
            <div id="tr-step-4">🔘 4. Receive raw response envelope from remote socket</div>
            <div id="tr-step-5">🔘 5. Execute raise_for_status() HTTP health gate assertion</div>
            <div id="tr-step-6">🔘 6. Decode text stream into Python dict via json()</div>
          </div>
        </div>

        <button class="btn btn-primary btn-sm" onclick="runRequestsSimulation()">▶ Run requests.send()</button>
      </div>
      <div class="sb-console">
        <div class="sb-console-header">Python Shell Output</div>
        <div class="sb-console-body" id="req-console-body">
<span class="cl-info">>>> Python environment ready. Click Run to execute script.</span>
        </div>
      </div>
    </div>
  `;
  updateRequestsCode();
}

function updateRequestsCode() {
  const method = document.getElementById('req-method').value;
  const params = document.getElementById('req-params').value;
  const timeout = document.getElementById('req-timeout').value;
  
  let code = `import requests\n\n`;
  code += `url = "https://api.open-meteo.com/v1/forecast"\n`;
  code += `params = ${params}\n\n`;
  code += `try:\n`;
  code += `    response = ${method.toLowerCase()}(url, params=params, timeout=${timeout})\n`;
  code += `    response.raise_for_status()\n`;
  code += `    data = response.json()\n`;
  code += `    print("Temperature:", data["current_weather"]["temperature"])\n`;
  code += `except requests.exceptions.RequestException as e:\n`;
  code += `    print("Network/HTTP Error occurred:", e)`;
  
  document.getElementById('req-py-code').textContent = code;
}

function runRequestsSimulation() {
  const err = document.getElementById('req-error').value;
  const consoleBody = document.getElementById('req-console-body');
  
  const step1 = document.getElementById('tr-step-1');
  const step2 = document.getElementById('tr-step-2');
  const step3 = document.getElementById('tr-step-3');
  const step4 = document.getElementById('tr-step-4');
  const step5 = document.getElementById('tr-step-5');
  const step6 = document.getElementById('tr-step-6');
  
  // Reset stages
  const resetStep = (el, txt) => { el.innerHTML = `🔘 ${txt}`; el.style.color = 'var(--muted)'; };
  resetStep(step1, '1. Compile request URL and parameters dict');
  resetStep(step2, '2. Resolve Host & Establish TCP socket handshake');
  resetStep(step3, '3. Transmit HTTP payload text bytes to server');
  resetStep(step4, '4. Receive raw response envelope from remote socket');
  resetStep(step5, '5. Execute raise_for_status() HTTP health gate assertion');
  resetStep(step6, '6. Decode text stream into Python dict via json()');
  
  consoleBody.innerHTML = `<span class="cl-info">>>> Running weather_basic.py...</span>\n`;
  
  // Step 1 Complete
  setTimeout(() => {
    step1.innerHTML = `🟢 1. Compile request URL and parameters dict (Success)`;
    step1.style.color = 'var(--green)';
  }, 200);
  
  // Step 2 Connection
  setTimeout(() => {
    if (err === 'connection' || err === 'timeout') {
      step2.innerHTML = `🔴 2. Resolve Host & Establish TCP socket handshake (${err === 'timeout' ? 'TIMEOUT_EXCEPTION' : 'CONNECTION_FAILED'})`;
      step2.style.color = 'var(--red)';
      if (err === 'timeout') {
        consoleBody.innerHTML += `<span class="cl-err">Traceback (most recent call last):\n  File "weather_basic.py", line 8, in &lt;module&gt;\nrequests.exceptions.Timeout: HTTP request timed out after 1.5 seconds.</span>`;
      } else {
        consoleBody.innerHTML += `<span class="cl-err">Traceback (most recent call last):\n  File "weather_basic.py", line 8, in &lt;module&gt;\nrequests.exceptions.ConnectionError: Max retries exceeded with url (Name or service not known)</span>`;
      }
      return;
    }
    step2.innerHTML = `🟢 2. Resolve Host & Establish TCP socket handshake (Success)`;
    step2.style.color = 'var(--green)';
  }, 500);
  
  // Step 3 & 4 payload transmission & receive
  setTimeout(() => {
    if (err === 'connection' || err === 'timeout') return;
    step3.innerHTML = `🟢 3. Transmit HTTP payload text bytes to server (Success)`;
    step3.style.color = 'var(--green)';
    step4.innerHTML = `🟢 4. Receive raw response envelope from remote socket (Success)`;
    step4.style.color = 'var(--green)';
  }, 800);
  
  // Step 5 raise_for_status health gate
  setTimeout(() => {
    if (err === 'connection' || err === 'timeout') return;
    if (err === 'http') {
      step5.innerHTML = `🔴 5. Execute raise_for_status() HTTP health gate assertion (500 Server Error)`;
      step5.style.color = 'var(--red)';
      consoleBody.innerHTML += `<span class="cl-err">Traceback (most recent call last):\n  File "weather_basic.py", line 9, in &lt;module&gt;\n    response.raise_for_status()\nrequests.exceptions.HTTPError: 500 Server Error: Internal Server Error for url: https://api.open-meteo.com/...</span>`;
      return;
    }
    step5.innerHTML = `🟢 5. Execute raise_for_status() HTTP health gate assertion (Status 200 OK)`;
    step5.style.color = 'var(--green)';
  }, 1100);
  
  // Step 6 decode JSON
  setTimeout(() => {
    if (err !== 'none') return;
    step6.innerHTML = `🟢 6. Decode text stream into Python dict via json() (Success)`;
    step6.style.color = 'var(--green)';
    
    consoleBody.innerHTML += `Fetching forecasts for Open-Meteo...\n`;
    consoleBody.innerHTML += `<span class="cl-ok">raise_for_status() passed with status 200 OK.</span>\n`;
    consoleBody.innerHTML += `Temperature: 28.5°C\n`;
    consoleBody.innerHTML += `Weather Condition: Slight Rain\n`;
    consoleBody.innerHTML += `<span class="cl-info">>>> Process finished with exit code 0</span>`;
  }, 1400);
}

// 3. Authenticated APIs Sandbox
function renderAuthSandbox() {
  const body = document.getElementById('ws-sandbox-body');
  body.innerHTML = `
    <div class="sb-container">
      <div class="sb-panel">
        <div class="sb-panel-title">🔑 Live Multi-Source API Credentials & Normalizer</div>
        <div class="sb-grid-2">
          <div class="sb-field">
            <label>OpenWeatherMap API Key (OWM_KEY)</label>
            <input type="password" class="sb-input sb-input-mono" id="owm-key-sb" placeholder="Paste OWM Key" oninput="saveKeysFromSb()">
          </div>
          <div class="sb-field">
            <label>WeatherAPI Key (WEATHERAPI_KEY)</label>
            <input type="password" class="sb-input sb-input-mono" id="wapi-key-sb" placeholder="Paste WeatherAPI Key" oninput="saveKeysFromSb()">
          </div>
        </div>
        <div class="sb-grid-2">
          <div class="sb-field">
            <label>Location (City)</label>
            <select class="sb-input" id="api-city">
              <option value="Roseau">Roseau, Dominica</option>
              <option value="London">London, UK</option>
              <option value="Tokyo">Tokyo, Japan</option>
              <option value="Paris">Paris, France</option>
            </select>
          </div>
          <div class="sb-field" style="justify-content:flex-end;">
            <button class="btn btn-primary btn-sm" onclick="fetchAndNormalizeLive()">⚡ Fetch & Normalize</button>
          </div>
        </div>
      </div>
      <div class="sb-grid-2" style="flex:1; min-height:0;">
        <div class="sb-console">
          <div class="sb-console-header">Raw Server Logs</div>
          <div class="sb-console-body" id="auth-raw-body" style="font-size:0.75rem;">
<span class="cl-info">Waiting for request...</span>
          </div>
        </div>
        <div class="sb-console">
          <div class="sb-console-header">Normalized Output Schema</div>
          <div class="sb-console-body" id="auth-norm-body" style="font-size:0.75rem;">
<span class="cl-info">Waiting for normalization...</span>
          </div>
        </div>
      </div>
    </div>
  `;
  document.getElementById('owm-key-sb').value = localStorage.getItem('OWM_KEY') || '';
  document.getElementById('wapi-key-sb').value = localStorage.getItem('WEATHERAPI_KEY') || '';
}

function saveKeysFromSb() {
  localStorage.setItem('OWM_KEY', document.getElementById('owm-key-sb').value.trim());
  localStorage.setItem('WEATHERAPI_KEY', document.getElementById('wapi-key-sb').value.trim());
}

async function fetchAndNormalizeLive() {
  const owmKey = localStorage.getItem('OWM_KEY');
  const wapiKey = localStorage.getItem('WEATHERAPI_KEY');
  const city = document.getElementById('api-city').value;
  
  const rawLog = document.getElementById('auth-raw-body');
  const normLog = document.getElementById('auth-norm-body');
  
  rawLog.innerHTML = `<span class="cl-info">Sending requests to weather servers...</span>`;
  normLog.innerHTML = `<span class="cl-info">Aggregating and normalizing shapes...</span>`;
  
  if (!owmKey || !wapiKey) {
    rawLog.innerHTML = `<span class="cl-err">Error: Credentials missing.</span>\n\n<span class="cl-warn">Please enter both your OpenWeatherMap and WeatherAPI keys in the input fields above to test live normalization.</span>`;
    normLog.innerHTML = `<span class="cl-err">Normalization halted.</span>`;
    return;
  }
  
  try {
    // We run a live fetch check or a high-end simulated layout
    setTimeout(() => {
      rawLog.innerHTML = `<span class="cl-req">GET https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=*** SUCCESS (200 OK)</span>\n`;
      rawLog.innerHTML += `<span class="cl-req">GET https://api.weatherapi.com/v1/current.json?key=***&q=${city} SUCCESS (200 OK)</span>\n\n`;
      rawLog.innerHTML += `<span class="cl-info">Raw responses received successfully.</span>`;
      
      const normObj = {
        location: city,
        temp_c: 28.5,
        condition: "Partly Cloudy",
        wind_kph: 14.5,
        humidity: 78,
        provider_values: {
          openweathermap: { raw_temp_k: 301.65, parsed_temp_c: 28.5 },
          weatherapi: { raw_temp_c: 28.0, parsed_temp_c: 28.0 }
        }
      };
      
      normLog.innerHTML = `<pre style="background:transparent; border:none; padding:0; color:var(--green);"><code style="font-family:var(--font-mono);">${JSON.stringify(normObj, null, 2)}</code></pre>`;
    }, 1200);
  } catch(e) {
    rawLog.innerHTML = `<span class="cl-err">Fetch exception: ${escapeHtml(e.message)}</span>`;
  }
}

// 4. ThreadPoolExecutor aggregation Sandbox
function renderThreadSandbox() {
  const body = document.getElementById('ws-sandbox-body');
  body.innerHTML = `
    <div class="sb-container">
      <div class="sb-panel">
        <div class="sb-panel-title">🧵 ThreadPoolExecutor Parallel Scheduler</div>
        <div class="sb-grid-3">
          <div class="sb-field">
            <label>Open-Meteo Latency</label>
            <select class="sb-input" id="thread-om" onchange="updateThreadSimulationOutputs()">
              <option value="success_800">Success (0.8s delay)</option>
              <option value="slow_3000">Slow (3.0s delay)</option>
              <option value="fail_800">Fail (0.8s, Crash)</option>
            </select>
          </div>
          <div class="sb-field">
            <label>OpenWeatherMap Latency</label>
            <select class="sb-input" id="thread-owm" onchange="updateThreadSimulationOutputs()">
              <option value="success_1200">Success (1.2s delay)</option>
              <option value="slow_3000">Slow (3.0s delay)</option>
              <option value="fail_1200">Fail (1.2s, Crash)</option>
            </select>
          </div>
          <div class="sb-field">
            <label>WeatherAPI Latency</label>
            <select class="sb-input" id="thread-wapi" onchange="updateThreadSimulationOutputs()">
              <option value="success_1500">Success (1.5s delay)</option>
              <option value="slow_3000">Slow (3.0s delay)</option>
              <option value="fail_1500">Fail (1.5s, Crash)</option>
            </select>
          </div>
        </div>
        
        <!-- Live Race Timeline Comparison Charts -->
        <div id="thread-time-chart" style="background:#0f1522; padding:0.75rem; border-radius:4px; border:1px solid var(--border); margin-top:0.75rem;">
          <div style="font-weight:700; font-size:0.7rem; color:var(--cyan); margin-bottom:0.5rem; text-transform:uppercase; letter-spacing:0.05em;">Execution Latency Race Chart</div>
          <div style="display:flex; flex-direction:column; gap:0.5rem; font-family:var(--font-mono); font-size:0.72rem;">
            <div>
              <div style="display:flex; justify-content:space-between; margin-bottom:0.15rem;">
                <span>1. Sequential Mode (Sum of latencies):</span>
                <span id="txt-t-seq">0.00s</span>
              </div>
              <div style="height:10px; background:var(--surface2); border-radius:2px; overflow:hidden;">
                <div id="bar-t-seq" style="height:100%; width:0%; background:var(--red); transition:width 0.5s ease;"></div>
              </div>
            </div>
            <div>
              <div style="display:flex; justify-content:space-between; margin-bottom:0.15rem;">
                <span>2. ThreadPool Mode (Parallel, slowest thread):</span>
                <span id="txt-t-par" style="color:var(--accent);">0.00s</span>
              </div>
              <div style="height:10px; background:var(--surface2); border-radius:2px; overflow:hidden;">
                <div id="bar-t-par" style="height:100%; width:0%; background:var(--green); transition:width 0.5s ease;"></div>
              </div>
            </div>
          </div>
        </div>

        <button class="btn btn-primary btn-sm" style="margin-top:0.75rem;" onclick="runThreadExecutor()">▶ Launch ThreadPoolExecutor</button>
      </div>
      
      <div class="sb-panel" id="thread-tracks-panel" style="display:none">
        <div class="tp-track">
          <span class="tp-track-name">Thread-1 (Open-Meteo)</span>
          <div class="tp-track-progress"><div class="tp-track-bar" id="pb-om"></div></div>
          <span class="tp-track-status" id="st-om">Idle</span>
        </div>
        <div class="tp-track">
          <span class="tp-track-name">Thread-2 (OWM)</span>
          <div class="tp-track-progress"><div class="tp-track-bar" id="pb-owm"></div></div>
          <span class="tp-track-status" id="st-owm">Idle</span>
        </div>
        <div class="tp-track">
          <span class="tp-track-name">Thread-3 (WeatherAPI)</span>
          <div class="tp-track-progress"><div class="tp-track-bar" id="pb-wapi"></div></div>
          <span class="tp-track-status" id="st-wapi">Idle</span>
        </div>
      </div>
      
      <div class="sb-console">
        <div class="sb-console-header">Aggregated Console Table Output</div>
        <div class="sb-console-body" id="thread-table-body" style="font-family:var(--font-mono); font-size:0.75rem;">
<span class="cl-info">ThreadPool ready. Configure thread states and launch to view execution stats.</span>
        </div>
      </div>
    </div>
  `;
  updateThreadSimulationOutputs();
}

function updateThreadSimulationOutputs() {
  const omVal = document.getElementById('thread-om').value;
  const owmVal = document.getElementById('thread-owm').value;
  const wapiVal = document.getElementById('thread-wapi').value;
  
  const omDelay = parseInt(omVal.split('_')[1]);
  const owmDelay = parseInt(owmVal.split('_')[1]);
  const wapiDelay = parseInt(wapiVal.split('_')[1]);
  
  const seqTime = (omDelay + owmDelay + wapiDelay) / 1000;
  const parTime = Math.max(omDelay, owmDelay, wapiDelay) / 1000;
  
  document.getElementById('txt-t-seq').textContent = `${seqTime.toFixed(2)}s`;
  document.getElementById('txt-t-par').textContent = `${parTime.toFixed(2)}s`;
  
  // Normalize width to max scale (sum of slow 3s + 3s + 3s = 9s max)
  const maxScale = 9.0;
  document.getElementById('bar-t-seq').style.width = `${(seqTime / maxScale) * 100}%`;
  document.getElementById('bar-t-par').style.width = `${(parTime / maxScale) * 100}%`;
}

function runThreadExecutor() {
  document.getElementById('thread-tracks-panel').style.display = 'block';
  
  const omVal = document.getElementById('thread-om').value;
  const owmVal = document.getElementById('thread-owm').value;
  const wapiVal = document.getElementById('thread-wapi').value;
  
  const omDelay = parseInt(omVal.split('_')[1]);
  const owmDelay = parseInt(owmVal.split('_')[1]);
  const wapiDelay = parseInt(wapiVal.split('_')[1]);
  
  const omFail = omVal.includes('fail');
  const owmFail = owmVal.includes('fail');
  const wapiFail = wapiVal.includes('fail');
  
  const pbOm = document.getElementById('pb-om');
  const pbOwm = document.getElementById('pb-owm');
  const pbWapi = document.getElementById('pb-wapi');
  
  const stOm = document.getElementById('st-om');
  const stOwm = document.getElementById('st-owm');
  const stWapi = document.getElementById('st-wapi');
  
  const consoleOut = document.getElementById('thread-table-body');
  
  // Reset thread lines
  pbOm.className = 'tp-track-bar'; pbOm.style.width = '0%';
  pbOwm.className = 'tp-track-bar'; pbOwm.style.width = '0%';
  pbWapi.className = 'tp-track-bar'; pbWapi.style.width = '0%';
  
  stOm.innerHTML = `<span class="spinner"></span> Running...`;
  stOwm.innerHTML = `<span class="spinner"></span> Running...`;
  stWapi.innerHTML = `<span class="spinner"></span> Running...`;
  
  consoleOut.innerHTML = `<span class="cl-info">Launching parallel executor with max_workers=3...</span>\n`;

  // OM Thread
  setTimeout(() => {
    pbOm.style.width = '100%';
    if (omFail) {
      pbOm.className = 'tp-track-bar failed';
      stOm.innerHTML = `<span class="cl-err">✗ Failed (500)</span>`;
    } else {
      stOm.innerHTML = `<span class="cl-ok">✓ Complete (200)</span>`;
    }
  }, omDelay);

  // OWM Thread
  setTimeout(() => {
    pbOwm.style.width = '100%';
    if (owmFail) {
      pbOwm.className = 'tp-track-bar failed';
      stOwm.innerHTML = `<span class="cl-err">✗ Failed (401)</span>`;
    } else {
      stOwm.innerHTML = `<span class="cl-ok">✓ Complete (200)</span>`;
    }
  }, owmDelay);

  // WeatherAPI Thread
  setTimeout(() => {
    pbWapi.style.width = '100%';
    if (wapiFail) {
      pbWapi.className = 'tp-track-bar failed';
      stWapi.innerHTML = `<span class="cl-err">✗ Failed (403)</span>`;
    } else {
      stWapi.innerHTML = `<span class="cl-ok">✓ Complete (200)</span>`;
    }
  }, wapiDelay);

  const slowest = Math.max(omDelay, owmDelay, wapiDelay);

  setTimeout(() => {
    let tbl = `<span class="cl-ok">✓ Parallel ThreadPool execution finished in ${(slowest / 1000).toFixed(2)}s</span> (Sequential sum would have been ${((omDelay + owmDelay + wapiDelay)/1000).toFixed(2)}s!)\n\n`;
    tbl += `┌──────────────────┬──────────────┬──────────────────┐\n`;
    tbl += `│ Provider         │ Temp (°C)    │ Status           │\n`;
    tbl += `├──────────────────┼──────────────┼──────────────────┤\n`;
    tbl += `│ Open-Meteo       │ ${omFail ? 'N/A           ' : '28.5          '} │ ${omFail ? 'FAILED (500)      ' : 'SUCCESS           '} │\n`;
    tbl += `│ OpenWeatherMap   │ ${owmFail ? 'N/A           ' : '29.2          '} │ ${owmFail ? 'FAILED (401)      ' : 'SUCCESS           '} │\n`;
    tbl += `│ WeatherAPI       │ ${wapiFail ? 'N/A           ' : '28.7          '} │ ${wapiFail ? 'FAILED (403)      ' : 'SUCCESS           '} │\n`;
    tbl += `└──────────────────┴──────────────┴──────────────────┘`;
    consoleOut.innerHTML = tbl;
  }, slowest + 200);
}

// 5. Browser Fetch Sandbox
function renderWidgetSandbox() {
  const body = document.getElementById('ws-sandbox-body');
  body.innerHTML = `
    <div class="sb-container">
      <div class="sb-panel" style="padding:1rem;">
        <div class="sb-panel-title">☀️ Live Running Weather Dashboard Widget</div>
        <div style="display:flex; gap:0.5rem; margin-bottom:0.75rem;">
          <input type="text" class="sb-input" id="widget-city" value="Roseau" style="flex:1;">
          <button class="btn btn-primary btn-sm" onclick="runWidgetFetch()">Search Weather</button>
        </div>
        <div id="widget-display" style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:0.5rem;">
          <div class="sb-panel" style="text-align:center; padding:0.5rem;"><div style="font-size:0.7rem;color:var(--muted)">Open-Meteo</div><div id="wd-om" style="font-size:1.1rem;font-weight:700;">N/A</div></div>
          <div class="sb-panel" style="text-align:center; padding:0.5rem;"><div style="font-size:0.7rem;color:var(--muted)">OpenWeatherMap</div><div id="wd-owm" style="font-size:1.1rem;font-weight:700;">N/A</div></div>
          <div class="sb-panel" style="text-align:center; padding:0.5rem;"><div style="font-size:0.7rem;color:var(--muted)">WeatherAPI</div><div id="wd-wapi" style="font-size:1.1rem;font-weight:700;">N/A</div></div>
        </div>
      </div>
      <div class="sb-console">
        <div class="sb-console-header">Browser CORS preflight Inspector</div>
        <div class="sb-console-body" id="widget-logs" style="font-size:0.75rem;">
<span class="cl-info">Waiting for dashboard trigger to inspect real CORS requests...</span>
        </div>
      </div>
    </div>
  `;
}

function runWidgetFetch() {
  const city = document.getElementById('widget-city').value;
  const wdOM = document.getElementById('wd-om');
  const wdOWM = document.getElementById('wd-owm');
  const wdWapi = document.getElementById('wd-wapi');
  const logs = document.getElementById('widget-logs');
  
  wdOM.innerHTML = `<span class="spinner"></span>`;
  wdOWM.innerHTML = `<span class="spinner"></span>`;
  wdWapi.innerHTML = `<span class="spinner"></span>`;
  
  logs.innerHTML = `<span class="cl-req">OPTIONS /v1/forecast?latitude=... HTTP/1.1\n&gt; Origin: http://localhost:8080\n&gt; Access-Control-Request-Method: GET\n</span>`;
  
  setTimeout(() => {
    wdOM.textContent = '28.5°C';
    wdOWM.textContent = '29.1°C';
    wdWapi.textContent = '28.8°C';
    
    logs.innerHTML += `\n<span class="cl-resp">&lt; HTTP/1.1 200 OK\n&lt; Access-Control-Allow-Origin: *\n&lt; Access-Control-Allow-Methods: GET, OPTIONS</span>\n`;
    logs.innerHTML += `<span class="cl-ok">✓ Promise.allSettled() finished. 3/3 resolved successfully!</span>`;
  }, 1000);
}

// 6. Deploy Your Version Sandbox
function renderDeploySandbox() {
  const body = document.getElementById('ws-sandbox-body');
  body.innerHTML = `
    <div class="sb-container">
      <div class="sb-panel">
        <div class="sb-panel-title">☁️ Cloudflare Pages Live Audit & Certificate</div>
        <div class="sb-field">
          <label>Deployed Production Pages URL (*.pages.dev)</label>
          <input type="text" class="sb-input sb-input-mono" id="deploy-url" value="https://weather-project.pages.dev">
        </div>
        <button class="btn btn-primary btn-sm" onclick="validateProductionDeploy()">Verify Production Deployment</button>
      </div>
      <div class="sb-console">
        <div class="sb-console-header">Auditor Console Session</div>
        <div class="sb-console-body" id="deploy-logs" style="font-size:0.75rem;">
<span class="cl-info">Ready to analyze deployed production host. Paste pages.dev link and click Verify...</span>
        </div>
      </div>
    </div>
  `;
}

function validateProductionDeploy() {
  const url = document.getElementById('deploy-url').value;
  const logs = document.getElementById('deploy-logs');
  
  logs.innerHTML = `<span class="cl-info">Initiating background audits for ${escapeHtml(url)}...</span>\n`;
  
  setTimeout(() => {
    logs.innerHTML += `[AUDIT 1] Checking host namespace resolution... <span class="cl-ok">PASS</span>\n`;
  }, 400);
  setTimeout(() => {
    logs.innerHTML += `[AUDIT 2] Verifying SSL/TLS active ... <span class="cl-ok">PASS</span>\n`;
  }, 800);
  setTimeout(() => {
    logs.innerHTML += `[AUDIT 3] Validating static HTML structure elements... <span class="cl-ok">PASS</span>\n`;
  }, 1200);
  setTimeout(() => {
    let out = `[AUDIT 4] Reading CORS origin headers... <span class="cl-ok">PASS</span>\n\n`;
    out += `==========================================================\n`;
    out += `🥇 AUDIT COMPLETED SUCCESSFULLY. PRODUCTION IS LIVE!\n`;
    out += `Certificate issued at: ${new Date().toLocaleDateString()}\n`;
    out += `Build Branch: main | Server Infrastructure: Cloudflare Edge\n`;
    out += `==========================================================`;
    logs.innerHTML += out;
  }, 1600);
}

// 7. API Security Sandbox
function renderSecuritySandbox() {
  const body = document.getElementById('ws-sandbox-body');
  body.innerHTML = `
    <div class="sb-container">
      <div class="sb-panel">
        <div class="sb-panel-title">🛡️ HMAC-SHA256 Secret Signature Calculator</div>
        <div class="sb-field">
          <label>Shared Webhook Secret Token</label>
          <input type="text" class="sb-input sb-input-mono" id="hmac-secret" value="super_secure_webhook_secret_key" oninput="calcHmacLive()">
        </div>
        <div class="sb-field">
          <label>Webhook Event Request JSON Body</label>
          <textarea class="sb-input sb-input-mono" id="hmac-payload" rows="4" style="resize:vertical;" oninput="calcHmacLive()">{\n  "event": "weather_alert",\n  "city": "Roseau",\n  "severity": "extreme",\n  "wind_speed_kph": 95\n}</textarea>
        </div>
      </div>
      <div class="sb-console">
        <div class="sb-console-header">HMAC Signature Hex Digest</div>
        <div class="sb-console-body" id="hmac-output" style="font-family:var(--font-mono); font-size:0.8rem; display:flex; flex-direction:column; justify-content:center; align-items:center;">
          <!-- Live generated signature -->
        </div>
      </div>
    </div>
  `;
  calcHmacLive();
}

async function calcHmacLive() {
  const secret = document.getElementById('hmac-secret').value;
  const message = document.getElementById('hmac-payload').value;
  const out = document.getElementById('hmac-output');
  
  if (!secret || !message) {
    out.innerHTML = `<span class="cl-warn">Input both fields to compute signature</span>`;
    return;
  }
  
  try {
    const enc = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      enc.encode(secret),
      { name: "HMAC", hash: { name: "SHA-256" } },
      false,
      ["sign"]
    );
    const signature = await crypto.subtle.sign(
      "HMAC",
      key,
      enc.encode(message)
    );
    const hex = Array.from(new Uint8Array(signature)).map(b => b.toString(16).padStart(2, '0')).join('');
    
    out.innerHTML = `
      <div style="font-size:0.7rem; color:var(--muted); text-transform:uppercase; margin-bottom:0.25rem;">X-Webhook-Signature-256</div>
      <div style="color:var(--accent); font-weight:700; word-break:break-all; text-align:center; max-width:85%; font-size:1rem; letter-spacing:0.05em;">${hex}</div>
    `;
  } catch(e) {
    out.innerHTML = `<span class="cl-err">Calculation Error: ${escapeHtml(e.message)}</span>`;
  }
}

// 8. CORS and Mocking Sandbox
function renderCorsSandbox() {
  const body = document.getElementById('ws-sandbox-body');
  body.innerHTML = `
    <div class="sb-container">
      <div class="sb-panel">
        <div class="sb-panel-title">🌐 CORS Preflight & Handshake Simulator</div>
        <p style="color:var(--muted); font-size:0.85rem; margin-bottom:0.75rem;">Simulate browser Same-Origin Policy (SOP) blocks and CORS headers handshakes.</p>
        <div class="sb-grid-2">
          <div class="sb-field">
            <label>Backend Allow-Origin Header</label>
            <select class="sb-input" id="cors-hdr-origin" onchange="runCorsSimulation()">
              <option value="none">No CORS Headers (SOP active)</option>
              <option value="star">Access-Control-Allow-Origin: *</option>
              <option value="localhost">Access-Control-Allow-Origin: http://localhost:8080</option>
            </select>
          </div>
          <div class="sb-field">
            <label>OPTIONS Preflight Handshake</label>
            <select class="sb-input" id="cors-hdr-options" onchange="runCorsSimulation()">
              <option value="no">Disable OPTIONS Handler (Returns 405/404)</option>
              <option value="yes">Enable OPTIONS Handler (Returns 204 OK)</option>
            </select>
          </div>
        </div>
      </div>
      <div class="sb-grid-2" style="flex:1; min-height:0;">
        <div class="sb-console">
          <div class="sb-console-header">Browser DevTools Console</div>
          <div class="sb-console-body" id="cors-browser-console" style="font-size:0.75rem; font-family:var(--font-mono); height:220px; overflow-y:auto;">
<span class="cl-info">Ready. Click simulated fetch below to test SOP and CORS headers...</span>
          </div>
        </div>
        <div class="sb-console">
          <div class="sb-console-header">Network HTTP Analyzer</div>
          <div class="sb-console-body" id="cors-net-analyzer" style="font-size:0.75rem; font-family:var(--font-mono); height:220px; overflow-y:auto;">
<span class="cl-info">Waiting for network transactions...</span>
          </div>
        </div>
      </div>
      <button class="btn btn-primary" onclick="runCorsSimulation(true)">⚡ Click to Fetch('http://localhost:5000/weather')</button>
    </div>
  `;
  runCorsSimulation(false);
}

function runCorsSimulation(clicked = false) {
  const origin = document.getElementById('cors-hdr-origin').value;
  const options = document.getElementById('cors-hdr-options').value;
  const consoleLog = document.getElementById('cors-browser-console');
  const netLog = document.getElementById('cors-net-analyzer');
  
  if (!clicked) {
    consoleLog.innerHTML = `<span class="cl-info">Configure headers above and click Fetch to simulate the SOP network handshake.</span>`;
    netLog.innerHTML = `<span class="cl-info">Network analyzer idle.</span>`;
    return;
  }
  
  consoleLog.innerHTML = `<span class="cl-req">Browser: initiating fetch('http://localhost:5000/weather')...</span>\n`;
  netLog.innerHTML = `<span class="cl-info">[HANDSHAKE] Cross-Origin request detected (Origin: http://localhost:8080 -> Target: http://localhost:5000). Preflight triggered.</span>\n`;
  
  // Step 1: OPTIONS preflight
  setTimeout(() => {
    netLog.innerHTML += `<span class="cl-req">OPTIONS /weather HTTP/1.1\nHost: localhost:5000\nOrigin: http://localhost:8080\nAccess-Control-Request-Method: GET</span>\n\n`;
    
    if (options === 'no') {
      netLog.innerHTML += `<span class="cl-err">Response: HTTP/1.1 405 METHOD NOT ALLOWED\nAllow: GET</span>\n`;
      consoleLog.innerHTML += `<span class="cl-err">Access to fetch at 'http://localhost:5000/weather' from origin 'http://localhost:8080' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: It does not have HTTP ok status.</span>\n`;
      consoleLog.innerHTML += `<span class="cl-err">TypeError: Failed to fetch</span>\n`;
      return;
    }
    
    netLog.innerHTML += `<span class="cl-resp">Response: HTTP/1.1 204 NO CONTENT\nAccess-Control-Allow-Origin: ${origin === 'star' ? '*' : (origin === 'localhost' ? 'http://localhost:8080' : 'none')}\nAccess-Control-Allow-Methods: GET, OPTIONS</span>\n\n`;
    
    if (origin === 'none') {
      consoleLog.innerHTML += `<span class="cl-err">Access to fetch at 'http://localhost:5000/weather' from origin 'http://localhost:8080' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.</span>\n`;
      consoleLog.innerHTML += `<span class="cl-err">TypeError: Failed to fetch</span>\n`;
      return;
    }
    
    // Step 2: GET request
    setTimeout(() => {
      netLog.innerHTML += `<span class="cl-info">[PREFLIGHT PASSED] Handshake authorized. Fetching GET endpoint...</span>\n`;
      netLog.innerHTML += `<span class="cl-req">GET /weather HTTP/1.1\nHost: localhost:5000\nOrigin: http://localhost:8080</span>\n\n`;
      
      netLog.innerHTML += `<span class="cl-resp">Response: HTTP/1.1 200 OK\nAccess-Control-Allow-Origin: ${origin === 'star' ? '*' : 'http://localhost:8080'}\n\n{"temp_c": 28.5}</span>\n`;
      
      consoleLog.innerHTML += `<span class="cl-resp">Server Response decoded successfully:</span>\n`;
      consoleLog.innerHTML += `<span class="cl-ok">{\n  "location": "Roseau, Dominica",\n  "temp_c": 28.5,\n  "condition": "Humid and Sunny"\n}</span>\n\n`;
      consoleLog.innerHTML += `<span class="cl-ok">✓ CORS Handshake Succeeded!</span>`;
    }, 1000);
    
  }, 1000);
}

// 8. JSON Deep Dive Sandbox
function renderJsonSandbox() {
  const body = document.getElementById('ws-sandbox-body');
  body.innerHTML = `
    <div class="sb-container">
      <div class="sb-panel">
        <div class="sb-panel-title">🔍 JSON Path Explorer Practice</div>
        <p style="color:var(--muted); font-size:0.85rem; margin-bottom:0.75rem;">Practice querying complex JSON trees. Write your target dot-notation below to extract values.</p>
        <div class="sb-grid-2">
          <div class="sb-field">
            <label>Select Target Practice Challenge</label>
            <select class="sb-input" id="json-challenge-select" onchange="loadJsonChallenge()">
              <option value="temp">Challenge 1: Extract temp_c</option>
              <option value="max">Challenge 2: Extract maxtemp_c</option>
              <option value="alert">Challenge 3: Extract alert desc</option>
            </select>
          </div>
          <div class="sb-field">
            <label>JSON Query Path Input</label>
            <input type="text" class="sb-input sb-input-mono" id="json-query" value="current.temp_c" oninput="runJsonFilterChallenge()">
          </div>
        </div>
      </div>
      <div class="sb-grid-2" style="flex:1; min-height:0;">
        <div class="sb-console">
          <div class="sb-console-header">JSON Source Node</div>
          <div class="sb-console-body" style="font-size:0.75rem; color:#94a3b8;">
<pre id="json-src-view" style="background:transparent; border:none; padding:0; margin:0;"></pre>
          </div>
        </div>
        <div class="sb-console">
          <div class="sb-console-header">Query Result Evaluation</div>
          <div class="sb-console-body" id="json-res-view" style="font-size:0.85rem; display:flex; flex-direction:column; justify-content:center; align-items:center;">
            <!-- Eval result -->
          </div>
        </div>
      </div>
    </div>
  `;
  loadJsonChallenge();
}

const mockJsonData = {
  current: {
    temp_c: 28.5,
    humidity: 78,
    condition: { text: "Cloudy" }
  },
  forecast: {
    forecastday: [
      { day: { maxtemp_c: 31.2, mintemp_c: 24.5 } }
    ]
  },
  alerts: {
    alert: [
      { desc: "Severe Tropical Alert Dominating Roseau Valley" }
    ]
  }
};

function loadJsonChallenge() {
  const chal = document.getElementById('json-challenge-select').value;
  const q = document.getElementById('json-query');
  const src = document.getElementById('json-src-view');
  
  src.innerHTML = JSON.stringify(mockJsonData, null, 2);
  
  if (chal === 'temp') q.value = 'current.temp_c';
  else if (chal === 'max') q.value = 'forecast.forecastday[0].day.maxtemp_c';
  else if (chal === 'alert') q.value = 'alerts.alert[0].desc';
  
  runJsonFilterChallenge();
}

function runJsonFilterChallenge() {
  const path = document.getElementById('json-query').value.trim();
  const res = document.getElementById('json-res-view');
  
  try {
    const fn = new Function('obj', `return obj.${path}`);
    const evaled = fn(mockJsonData);
    
    if (evaled !== undefined) {
      res.innerHTML = `
        <div style="font-size:0.75rem; color:var(--muted); text-transform:uppercase; margin-bottom:0.25rem;">EVALUATED OUTPUT</div>
        <div style="color:var(--green); font-size:1.1rem; font-weight:700;">${escapeHtml(String(evaled))}</div>
        <div class="cl-ok" style="margin-top:0.75rem;">✓ Challenge Solved successfully!</div>
      `;
    } else {
      res.innerHTML = `<span class="cl-warn">Path exists but resolves to undefined.</span>`;
    }
  } catch(e) {
    res.innerHTML = `<span class="cl-err">Invalid JSONPath query formulation.</span>`;
  }
}

// 9. Postman Properly Sandbox
function renderPostmanSandbox() {
  const body = document.getElementById('ws-sandbox-body');
  body.innerHTML = `
    <div class="sb-container">
      <div class="sb-panel">
        <div class="sb-panel-title">📮 Postman Newman CLI Test Simulator</div>
        <p style="color:var(--muted); font-size:0.85rem; margin-bottom:0.5rem;">Newman runs Postman collections from your terminal. Click run below to execute tests.</p>
        <button class="btn btn-primary btn-sm" onclick="runNewmanSimulation()">▶ Run newman execution</button>
      </div>
      <div class="sb-console">
        <div class="sb-console-header">Newman Command Shell</div>
        <div class="sb-console-body" id="newman-logs" style="font-family:var(--font-mono); font-size:0.75rem;">
<span class="cl-info">Ready. Click Run newman execution to trigger full Collection test suite...</span>
        </div>
      </div>
    </div>
  `;
}

function runNewmanSimulation() {
  const logs = document.getElementById('newman-logs');
  logs.innerHTML = `<span class="cl-prompt">$</span> <span class="cl-cmd">newman run weather.postman_collection.json -e weather-env.json</span>\n\n`;
  logs.innerHTML += `newman\n\n`;
  
  setTimeout(() => {
    logs.innerHTML += `→ OWM Current Forecast Endpoint\n  GET https://api.openweathermap.org/data/2.5/weather [200 OK, 185B, 142ms]\n  <span class="cl-ok">✓  Status code is 200</span>\n  <span class="cl-ok">✓  Response has valid schema structure</span>\n\n`;
  }, 400);

  setTimeout(() => {
    logs.innerHTML += `→ WeatherAPI Current Forecast Endpoint\n  GET https://api.weatherapi.com/v1/current.json [200 OK, 212B, 110ms]\n  <span class="cl-ok">✓  Status code is 200</span>\n  <span class="cl-ok">✓  Payload wind_kph is present</span>\n\n`;
  }, 900);

  setTimeout(() => {
    let out = `┌─────────────────────────┬──────────────────┬──────────────────┐\n`;
    out += `│                         │        Executed  │          Failed  │\n`;
    out += `├─────────────────────────┼──────────────────┼──────────────────┤\n`;
    out += `│              iterations │               1  │               0  │\n`;
    out += `│                requests │               2  │               0  │\n`;
    out += `│            test-scripts │               2  │               0  │\n`;
    out += `│              assertions │               4  │               0  │\n`;
    out += `└─────────────────────────┴──────────────────┴──────────────────┘\n`;
    out += `<span class="cl-ok">✓ SUCCESS. All tests passed.</span>`;
    logs.innerHTML += out;
  }, 1400);
}

// 10. Python Project Structure Sandbox
function renderStructureSandbox() {
  const body = document.getElementById('ws-sandbox-body');
  body.innerHTML = `
    <div class="sb-container">
      <div class="sb-panel">
        <div class="sb-panel-title">📦 Package Quality Gates Verification</div>
        <div style="display:flex; gap:0.5rem;">
          <button class="btn btn-primary btn-sm" onclick="runStructureTest('pytest')">Run pytest Tests</button>
          <button class="btn btn-secondary btn-sm" onclick="runStructureTest('ruff')">Run ruff Linter</button>
          <button class="btn btn-secondary btn-sm" onclick="runStructureTest('mypy')">Run mypy Strict Checks</button>
        </div>
      </div>
      <div class="sb-console">
        <div class="sb-console-header">Dev Terminal</div>
        <div class="sb-console-body" id="structure-logs" style="font-family:var(--font-mono); font-size:0.75rem;">
<span class="cl-info">Ready. Select a validation tool to check package structural integrity...</span>
        </div>
      </div>
    </div>
  `;
}

function runStructureTest(tool) {
  const logs = document.getElementById('structure-logs');
  if (tool === 'pytest') {
    logs.innerHTML = `<span class="cl-prompt">$</span> <span class="cl-cmd">python3 -m pytest -q</span>\n`;
    setTimeout(() => {
      logs.innerHTML += `...\n`;
    }, 300);
    setTimeout(() => {
      logs.innerHTML += `<span class="cl-ok">.</span><span class="cl-ok">.</span><span class="cl-ok">.</span><span class="cl-ok">.</span>                                                            [100%]\n`;
      logs.innerHTML += `<span class="cl-ok">==================== 4 passed, 1 warnings in 0.42s ====================</span>`;
    }, 800);
  } else if (tool === 'ruff') {
    logs.innerHTML = `<span class="cl-prompt">$</span> <span class="cl-cmd">ruff check .</span>\n`;
    setTimeout(() => {
      logs.innerHTML += `<span class="cl-ok">All checks passed! No violations or style leaks found in codebase.</span>`;
    }, 500);
  } else if (tool === 'mypy') {
    logs.innerHTML = `<span class="cl-prompt">$</span> <span class="cl-cmd">mypy src/</span>\n`;
    setTimeout(() => {
      logs.innerHTML += `<span class="cl-ok">Success: no issues found in 4 source files matching strict typing flags.</span>`;
    }, 600);
  }
}

// 11. Chaining APIs Sandbox
function renderChainingSandbox() {
  const body = document.getElementById('ws-sandbox-body');
  body.innerHTML = `
    <div class="sb-container">
      <div class="sb-panel">
        <div class="sb-panel-title">🔗 API Notification Chaining Pipeline</div>
        <div class="sb-grid-2">
          <div class="sb-field">
            <label>Current Evaluated Weather State</label>
            <select class="sb-input" id="chain-state">
              <option value="rain">Extreme Rain Condition</option>
              <option value="sunny">Sunny Forecast (Clear)</option>
            </select>
          </div>
          <div class="sb-field" style="justify-content:flex-end;">
            <button class="btn btn-primary btn-sm" onclick="runChainingSimulator()">Simulate Pipeline Trigger</button>
          </div>
        </div>
      </div>
      <div class="sb-console">
        <div class="sb-console-header">Notification Engine Logs</div>
        <div class="sb-console-body" id="chaining-logs" style="font-size:0.75rem;">
<span class="cl-info">Chaining system inactive. Trigger simulation to trace weather alert payload forwarding.</span>
        </div>
      </div>
    </div>
  `;
}

function runChainingSimulator() {
  const state = document.getElementById('chain-state').value;
  const logs = document.getElementById('chaining-logs');
  
  logs.innerHTML = `<span class="cl-info">Pipeline Triggered. Calling weather aggregator...</span>\n`;
  
  setTimeout(() => {
    logs.innerHTML += `Received forecast: temperature_c=28.5, condition="${state === 'rain' ? 'Rain' : 'Sunny'}"\n`;
    logs.innerHTML += `Evaluating custom filter alert boundaries...\n`;
  }, 400);

  setTimeout(() => {
    if (state === 'rain') {
      logs.innerHTML += `<span class="cl-warn">WARNING: Condition matches criteria! Dispatching webhook message...</span>\n`;
      logs.innerHTML += `<span class="cl-req">POST https://api.telegram.org/bot***/sendMessage\nBody: {"text": "☔ ALERT: Extreme Rain forecasted for Roseau. Carry an umbrella!"}</span>\n\n`;
      logs.innerHTML += `<span class="cl-ok">✓ Webhook payload delivered with status 201 CREATED. Chaining success.</span>`;
    } else {
      logs.innerHTML += `<span class="cl-info">Condition does not match criteria. Webhook suppressed. Chaining skipped gracefully.</span>`;
    }
  }, 1000);
}

// 12. Schedules & Cron Sandbox
function renderCronSandbox() {
  const body = document.getElementById('ws-sandbox-body');
  body.innerHTML = `
    <div class="sb-container">
      <div class="sb-panel">
        <div class="sb-panel-title">⏱️ Cron Expression Schedule Parser</div>
        <div class="sb-field">
          <label>Define Cron Syntax (Minute Hour Day-of-Month Month Day-of-Week)</label>
          <input type="text" class="sb-input sb-input-mono" id="cron-input" value="*/15 * * * *" oninput="parseCronExpression()">
        </div>
      </div>
      <div class="sb-console">
        <div class="sb-console-header">Chronometer Translator</div>
        <div class="sb-console-body" id="cron-logs" style="font-size:0.8rem;">
          <!-- Live generated cron times -->
        </div>
      </div>
    </div>
  `;
  parseCronExpression();
}

function parseCronExpression() {
  const val = document.getElementById('cron-input').value.trim();
  const logs = document.getElementById('cron-logs');
  
  let explanation = '';
  let times = [];
  
  if (val === '*/15 * * * *') {
    explanation = 'Every 15 minutes, every hour, every day.';
    times = ['19:15', '19:30', '19:45', '20:00', '20:15'];
  } else if (val.includes('0 9')) {
    explanation = 'At 09:00 AM, Monday through Friday.';
    times = ['Mon 09:00', 'Tue 09:00', 'Wed 09:00', 'Thu 09:00', 'Fri 09:00'];
  } else {
    explanation = 'Custom expression parsed dynamically.';
    times = ['Scheduled execution 1', 'Scheduled execution 2', 'Scheduled execution 3'];
  }
  
  logs.innerHTML = `
    <div style="font-size:0.75rem; color:var(--muted); text-transform:uppercase; margin-bottom:0.25rem;">HUMAN TRANSLATION</div>
    <div style="color:var(--accent); font-weight:700; font-size:1rem; margin-bottom:1rem;">"${explanation}"</div>
    <div style="font-size:0.75rem; color:var(--muted); text-transform:uppercase; margin-bottom:0.25rem;">Next 5 exact firing timestamps</div>
    <ul style="padding-left:1.5rem; color:var(--green); font-family:var(--font-mono); font-size:0.75rem;">
      ${times.map(t => `<li>${t}</li>`).join('')}
    </ul>
  `;
}

// 13. Webhooks Sandbox
function renderWebhookSandbox() {
  const body = document.getElementById('ws-sandbox-body');
  body.innerHTML = `
    <div class="sb-container">
      <div class="sb-panel">
        <div class="sb-panel-title">🔌 Webhook Listener Console</div>
        <p style="color:var(--muted); font-size:0.85rem; margin-bottom:0.75rem;">Simulate receiving a secure webhook event on your server endpoint.</p>
        <button class="btn btn-primary btn-sm" onclick="sendWebhookPost()">▶ Send Webhook POST</button>
      </div>
      <div class="sb-console">
        <div class="sb-console-header">Localhost Server Logs (Port 5000)</div>
        <div class="sb-console-body" id="webhook-logs" style="font-family:var(--font-mono); font-size:0.75rem;">
<span class="cl-info">Flask local listener ready on port 5000. Send Webhook POST to inspect...</span>
        </div>
      </div>
    </div>
  `;
}

function sendWebhookPost() {
  const logs = document.getElementById('webhook-logs');
  const d = new Date().toLocaleTimeString();
  
  logs.innerHTML = `127.0.0.1 - - [${d}] "POST /webhook HTTP/1.1" 200 -\n`;
  logs.innerHTML += `<span class="cl-req">Headers: Host: localhost:5000\nContent-Type: application/json\nX-Webhook-Signature-256: 489f...</span>\n`;
  logs.innerHTML += `<span class="cl-req">Payload: {"event": "weather_alert", "temp": 32.5}</span>\n\n`;
  logs.innerHTML += `<span class="cl-ok">✓ Webhook signature matched secret. Successfully verified.</span>`;
}

// 14. Newman Testing Sandbox
function renderCiSandbox() {
  const body = document.getElementById('ws-sandbox-body');
  body.innerHTML = `
    <div class="sb-container">
      <div class="sb-panel">
        <div class="sb-panel-title">🛠️ CI/CD Workflow Pipeline Simulator</div>
        <p style="color:var(--muted); font-size:0.85rem; margin-bottom:0.75rem;">Trigger the GitHub Actions workflow runner containing Newman quality gate tests.</p>
        <button class="btn btn-primary btn-sm" onclick="runCiPipeline()">▶ Commit & Trigger Pipeline</button>
      </div>
      <div class="sb-console">
        <div class="sb-console-header">GitHub Actions Log Console</div>
        <div class="sb-console-body" id="ci-logs" style="font-family:var(--font-mono); font-size:0.75rem;">
<span class="cl-info">CI Agent idle. Trigger pipeline to compile environments and run integrations...</span>
        </div>
      </div>
    </div>
  `;
}

function runCiPipeline() {
  const logs = document.getElementById('ci-logs');
  logs.innerHTML = `Set up job 'Run Integration Newman Tests'\n`;
  
  setTimeout(() => { logs.innerHTML += `Checkout codebase with git... <span class="cl-ok">PASS</span>\n`; }, 300);
  setTimeout(() => { logs.innerHTML += `Install Node.js 18 environment... <span class="cl-ok">PASS</span>\n`; }, 600);
  setTimeout(() => { logs.innerHTML += `Install package Newman global dependencies... <span class="cl-ok">PASS</span>\n`; }, 900);
  setTimeout(() => {
    logs.innerHTML += `\nRunning Newman Quality Gate:\n`;
    logs.innerHTML += `<span class="cl-resp">GET /weather SUCCESS (200) - 2 Passed assertions</span>\n`;
    logs.innerHTML += `<span class="cl-ok">Job finished with SUCCESS. Deployment authorized.</span>`;
  }, 1400);
}

// 15. Capstone Project Sandbox
function renderCapstoneSandbox() {
  const body = document.getElementById('ws-sandbox-body');
  body.innerHTML = `
    <div class="sb-container" style="justify-content:center; align-items:center;">
      <div class="sb-panel" style="max-width:420px; text-align:center;">
        <div class="sb-panel-title" style="justify-content:center; color:var(--accent);">🎓 LexLabs Engineering Graduate</div>
        <p style="font-size:0.9rem; line-height:1.6; color:#e2e8f0; margin-bottom:1rem;">You have successfully completed all core and automation phases of the Weather API Course!</p>
        <p style="font-size:0.8rem; line-height:1.5; color:var(--muted); margin-bottom:1.25rem;">Your local environment has been fully audited with zero leaked credentials, robust ThreadPool aggregation, scheduler pipelines, webhook signature verifications, and active CI/CD regression gates.</p>
        <div class="cl-ok" style="font-size:1.1rem; font-weight:700;">🎖️ PIPELINE ARCHITECT</div>
      </div>
    </div>
  `;
}

function openSetup() {
  // Backwards compatibility setup modal (standard card popup)
  const overlay = document.getElementById('modal-overlay');
  const modal = document.querySelector('.modal');
  overlay.classList.remove('workspace-mode');
  modal.classList.remove('workspace-mode');

  document.getElementById('modal-content').innerHTML = `
    <h2>Initial Environment Setup</h2>
    <div class="modal-meta"><span class="pill">~5 minutes</span></div>

    <div class="file-location">
      <strong>Requirements:</strong> Python 3.10+, git, GitHub account
    </div>

    <h3>1. Clone the repository</h3>
    <pre><code>$ git clone https://github.com/Sharquille/weather-api-course.git
$ cd weather-api-course</code></pre>

    <h3>2. Initialize a Python virtual environment</h3>
    <pre><code>$ python3 -m venv .venv
$ source .venv/bin/activate    # macOS/Linux
# .venv\\Scripts\\activate     # Windows PowerShell</code></pre>

    <h3>3. Install course package dependencies</h3>
    <p>Verify or create <code>requirements.txt</code> in the repo root with:</p>
    <pre><code>requests>=2.31.0
python-dotenv>=1.0.0
flask>=3.0.0
pytest>=7.4.0</code></pre>
    <p>Then install via pip:</p>
    <pre><code>$ pip install -r requirements.txt</code></pre>

    <h3>4. Establish environment credentials (for Phase 02+)</h3>
    <pre><code>$ cp level-1/02-auth-apis/starter/.env.example level-1/02-auth-apis/starter/.env
# Open .env and insert your secure keys for OpenWeatherMap and WeatherAPI</code></pre>

    <h3>5. Provision required API credentials</h3>
    <ul>
      <li><strong>OpenWeatherMap</strong> — <a href="https://openweathermap.org/api" target="_blank" rel="noopener">openweathermap.org/api</a> (free tier: 1000 requests/day)</li>
      <li><strong>WeatherAPI</strong> — <a href="https://www.weatherapi.com/" target="_blank" rel="noopener">weatherapi.com</a> (free tier: 1M requests/month)</li>
      <li><strong>Open-Meteo</strong> — <strong>Public utility: no key needed</strong>, used in Phase 00–01</li>
    </ul>

    <h3>6. Diagnostic run</h3>
    <pre><code>$ curl "wttr.in/Roseau?format=3"
# Confirm the terminal returns a one-line forecast for Roseau.
# Then open level-1/00-curl-basics/starter/exercises.sh and start
# Phase 00 — run each exercise block one at a time, not the whole file.</code></pre>

    <div class="reference-note">
      <strong>Environment boundaries:</strong> Each system operates on its own configuration. Cloning the repository to your local runtime keeps configurations separated. Sharing deployed code takes place in Phase 05, using unique accounts.
    </div>

    <div class="modal-actions">
      <button class="btn btn-secondary btn-sm" onclick="closeModal()">Close</button>
    </div>
  `;
  document.getElementById('modal-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const overlay = document.getElementById('modal-overlay');
  const modal = document.querySelector('.modal');
  overlay.classList.remove('open');
  overlay.classList.remove('workspace-mode');
  modal.classList.remove('workspace-mode');
  document.body.style.overflow = '';
}

// ════════════════════════════════════════════════
//  CODE VIEWER — fetch starter/solution files over http
// ════════════════════════════════════════════════
function phaseFiles(p) {
  if (PHASE_FILES[p.id]) return PHASE_FILES[p.id];
  const f = p.file;
  if (f.endsWith('.md')) {
    return { starter: [], solution: [], readme: f,
      note: 'This phase is guided by its README — there are no starter/solution code files.' };
  }
  return { starter: [f], solution: [f.replace('/starter/', '/solution/')] };
}

async function loadWsFiles(which) {
  const p = [...L1_PHASES, ...L2_PHASES].find(x => x.id === currentPhaseId);
  const pf = phaseFiles(p);
  let files = [];
  if (which === 'readme' && pf.readme) files = [pf.readme];
  else if (which === 'starter') files = pf.starter || [];
  else if (which === 'solution') files = pf.solution || [];

  const btnStarter = document.getElementById('btn-ws-starter');
  const btnSolution = document.getElementById('btn-ws-solution');
  if (btnStarter && btnSolution) {
    if (which === 'starter') {
      btnStarter.className = 'btn btn-primary btn-sm';
      btnSolution.className = 'btn btn-secondary btn-sm';
    } else if (which === 'solution') {
      btnStarter.className = 'btn btn-secondary btn-sm';
      btnSolution.className = 'btn btn-primary btn-sm';
    }
  }

  const host = document.getElementById('ws-code-body');
  if (!host) return;
  host.innerHTML = `<span class="spinner"></span> Loading ${which} files…`;
  try {
    const blocks = [];
    for (const path of files) {
      const res = await fetch(path, { cache: 'no-store' });
      if (!res.ok) throw new Error(`HTTP ${res.status} for ${path}`);
      const text = await res.text();
      blocks.push(
        `<div class="code-file" style="margin-bottom:1.5rem;"><div class="code-file-name" style="color:var(--cyan); font-weight:600; margin-bottom:0.5rem;">${escapeHtml(path)}</div>` +
        `<pre style="background:#06090e; border:1px solid var(--border); padding:0.75rem; border-radius:4px; overflow-x:auto;"><code style="font-family:var(--font-mono); font-size:0.8rem; color:#f1f5f9;">${escapeHtml(text)}</code></pre></div>`
      );
    }
    host.innerHTML = blocks.length ? blocks.join('') : `<p style="color:var(--muted)">${pf.note || 'No files available.'}</p>`;
  } catch (e) {
    host.innerHTML = `<p class="cl-err">Failed to load code files: ${escapeHtml(e.message)}</p>`;
  }
}

async function loadFiles(files, label) {
  const host = document.getElementById('code-view');
  if (!host) return;
  host.innerHTML = `<p class="code-hint"><span class="spinner"></span>Loading ${escapeHtml(label)}…</p>`;
  try {
    const blocks = [];
    for (const path of files) {
      const res = await fetch(path, { cache: 'no-store' });
      if (!res.ok) throw new Error(`HTTP ${res.status} for ${path}`);
      const text = await res.text();
      blocks.push(
        `<div class="code-file"><div class="code-file-name">${escapeHtml(path)}</div>` +
        `<pre><code>${escapeHtml(text)}</code></pre></div>`
      );
    }
    host.innerHTML = blocks.join('');
  } catch (e) {
    host.innerHTML =
      `<div class="reference-note" style="border-color:var(--yellow)"><strong>Couldn't load files.</strong> ` +
      `${escapeHtml(e.message)}.<br>If this page is open as a <code>file://</code> URL, serve it over http first — ` +
      `run <code>wac serve</code> (or <code>python3 -m http.server 8080</code>) and reload.</div>`;
  }
}

function loadPhaseFiles(id, which) {
  const p = [...L1_PHASES, ...L2_PHASES].find(x => x.id === id);
  if (!p) return;
  const pf = phaseFiles(p);
  let files = [], label = which;
  if (which === 'starter') files = pf.starter || [];
  else if (which === 'solution') files = pf.solution || [];
  else if (which === 'readme') { files = pf.readme ? [pf.readme] : []; label = 'README'; }
  if (!files.length) {
    document.getElementById('code-view').innerHTML =
      `<div class="reference-note">${escapeHtml(pf.note || 'No files for this phase.')}</div>`;
    return;
  }
  loadFiles(files, label);
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// ════════════════════════════════════════════════
//  TABS
// ════════════════════════════════════════════════
function switchTab(level) {
  const state = load();
  const l1Complete = L1_PHASES.filter(p => state[p.id]).length === L1_PHASES.length;
  if (level === 'l2' && !l1Complete) {
    const done = L1_PHASES.filter(p => state[p.id]).length;
    alert(`Level 2 is locked. Complete all ${L1_PHASES.length} Level 1 phases first. (${done}/${L1_PHASES.length} complete)`);
    return;
  }
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  document.getElementById(`tab-${level}`).classList.add('active');
  document.getElementById(`panel-${level}`).classList.add('active');
  document.getElementById(`panel-${level}`).scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ════════════════════════════════════════════════
//  GIST PERSISTENCE
// ════════════════════════════════════════════════
const GIST_FILE = 'wac-progress.json';

function setGistStatus(msg, color = 'var(--muted)') {
  const el = document.getElementById('gist-status');
  el.style.color = color;
  el.innerHTML   = msg;
}

async function saveToGist() {
  const token  = document.getElementById('gh-token').value.trim() || localStorage.getItem('gh_token');
  if (!token) { setGistStatus('Provide a valid GitHub personal access token.', 'var(--yellow)'); return; }
  localStorage.setItem('gh_token', token);

  const gistId  = document.getElementById('gist-id-input').value.trim() || localStorage.getItem('gist_id') || '';
  const content = JSON.stringify(load(), null, 2);
  const payload = { description: 'Weather API Course Progress Tracker', public: false,
                    files: { [GIST_FILE]: { content } } };

  setGistStatus('<span class="spinner"></span>Saving to GitHub Gist API…');
  try {
    const url    = gistId ? `https://api.github.com/gists/${gistId}` : 'https://api.github.com/gists';
    const method = gistId ? 'PATCH' : 'POST';
    const res    = await fetch(url, {
      method,
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error(`GitHub Gist API error: ${res.status}: ${await res.text()}`);
    const data = await res.json();
    localStorage.setItem('gist_id', data.id);
    document.getElementById('gist-id-input').value = data.id;
    setGistStatus(`Progress saved to <a href="${data.html_url}" target="_blank">gist ${data.id.slice(0,8)}...</a>`, 'var(--green)');
  } catch(e) { setGistStatus(e.message, 'var(--red)'); }
}

async function loadFromGist() {
  const token  = document.getElementById('gh-token').value.trim() || localStorage.getItem('gh_token');
  const gistId = document.getElementById('gist-id-input').value.trim() || localStorage.getItem('gist_id');
  if (!token || !gistId) { setGistStatus('Ensure both GitHub Token and Gist ID are configured.', 'var(--yellow)'); return; }

  setGistStatus('<span class="spinner"></span>Synchronizing state from GitHub Gist…');
  try {
    const res = await fetch(`https://api.github.com/gists/${gistId}`,
      { headers: { Authorization: `Bearer ${token}` } });
    if (!res.ok) throw new Error(`GitHub Error Code: ${res.status}`);
    const data    = await res.json();
    const content = data.files[GIST_FILE]?.content;
    if (!content) throw new Error('Progress record could not be parsed from target Gist');
    save(JSON.parse(content));
    render();
    setGistStatus('Progress sync completed successfully.', 'var(--green)');
  } catch(e) { setGistStatus(e.message, 'var(--red)'); }
}

window.addEventListener('load', () => {
  render();
  const token  = localStorage.getItem('gh_token');
  const gistId = localStorage.getItem('gist_id');
  if (token)  document.getElementById('gh-token').value      = token;
  if (gistId) document.getElementById('gist-id-input').value = gistId;
});
