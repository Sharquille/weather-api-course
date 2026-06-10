#!/usr/bin/env bash
# =============================================================
# Level 1 — Phase 00: curl Exercises (STARTER)
# Run each block one at a time.
# READ the output before moving to the next block.
# Do NOT run them all at once.
# =============================================================

# =============================================================
# EXERCISE 1 — Plain text weather (no key, no signup)
# What to notice: the API responds differently based on
# what you ask for. Same URL, different output.
# =============================================================
echo "=== Exercise 1: Plain text ==="
# TODO: run this and observe the output
curl "wttr.in/Roseau?format=3"
echo ""

# Now ask for JSON instead
# TODO: what does -H do here? What is "Accept" telling the server?
curl -H "Accept: application/json" "wttr.in/Roseau?format=j1" | head -30
echo ""


# =============================================================
# EXERCISE 2 — See the full HTTP conversation
# What to notice: lines starting with > are YOUR request.
# Lines starting with < are the SERVER'S response headers.
# =============================================================
echo "=== Exercise 2: Full HTTP conversation (-v) ==="
# TODO: run this. Find the status code in the output. Write it in your notes.md
curl -v "https://api.open-meteo.com/v1/forecast?latitude=15.30&longitude=-61.39&current=temperature_2m" 2>&1 | head -40
echo ""


# =============================================================
# EXERCISE 3 — POST request (sending data TO the API)
# GET = read something. POST = send something.
# httpbin.org echoes your request back — perfect for learning.
# =============================================================
echo "=== Exercise 3: POST with JSON body ==="
# TODO: run this. What does the response show you?
# What is -X doing? What is -d doing? What is Content-Type telling the server?
curl -s -X POST https://httpbin.org/post \
  -H "Content-Type: application/json" \
  -d '{"city": "Roseau", "learner": "YOUR_NAME_HERE"}'
echo ""


# =============================================================
# EXERCISE 4 — PUT and DELETE
# REST uses different HTTP methods for different actions:
# GET=read, POST=create, PUT=replace, PATCH=update, DELETE=remove
# =============================================================
echo "=== Exercise 4a: PUT request ==="
# TODO: run this. What would PUT be used for in a real weather app?
curl -s -X PUT https://httpbin.org/put \
  -H "Content-Type: application/json" \
  -d '{"id": 1, "city": "Roseau", "updated": true}'
echo ""

echo "=== Exercise 4b: DELETE request ==="
# TODO: run this. What does the Authorization header look like in the response?
curl -s -X DELETE https://httpbin.org/delete \
  -H "Authorization: Bearer fake-token-123"
echo ""


# =============================================================
# EXERCISE 5 — Auth header (you EXPECT a 401 — that is correct)
# 401 = Unauthorized. Your key is wrong or missing.
# 403 = Forbidden. Your key is valid but you don't have permission.
# These are different. Write the difference in your notes.md
# =============================================================
echo "=== Exercise 5: Auth failure (expect 401) ==="
# TODO: run this. Read the response body carefully.
# Then change FAKE_TOKEN to "wrong_key_123" — what changes?
curl -s -H "Authorization: Bearer FAKE_TOKEN" \
  "https://api.openweathermap.org/data/2.5/weather?q=Roseau"
echo ""


# =============================================================
# EXERCISE 6 — HEAD request (headers only, no body)
# =============================================================
echo "=== Exercise 6: HEAD request (response headers only) ==="
# TODO: run this. What information can you get from headers alone?
# Is the API alive? What content type does it return?
curl -I "https://api.open-meteo.com/v1/forecast?latitude=15.30&longitude=-61.39&current=temperature_2m"
echo ""


# =============================================================
# EXERCISE 7 — YOUR TURN (Research Task)
# Before running this block, go read the Open-Meteo docs:
# https://open-meteo.com/en/docs
#
# Find the parameter that returns HOURLY data instead of current.
# Fill in the TODO below to get hourly temperature for next 24 hours.
# =============================================================
echo "=== Exercise 7: Hourly forecast (you fill this in) ==="
# TODO: replace the URL below to return hourly temperature data
# Hint: you need to change "current" to something else
# and add a "forecast_days" parameter
curl -s "https://api.open-meteo.com/v1/forecast?latitude=15.30&longitude=-61.39&TODO_FILL_THIS_IN" | head -50
echo ""

echo "=== All exercises complete ==="
echo "Answer the checkpoint questions in README.md before moving on."
