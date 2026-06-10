#!/usr/bin/env bash
set -euo pipefail

echo "=== Exercise 1: Plain GET ==="
curl -s "https://wttr.in/Roseau?format=3"

echo
echo "=== Exercise 2: JSON response with Accept header ==="
curl -s -H "Accept: application/json" "https://wttr.in/Roseau?format=j1" | head -40

echo
echo "=== Exercise 3: Verbose HTTP conversation ==="
curl -v -s "https://api.open-meteo.com/v1/forecast?latitude=15.30&longitude=-61.39&current=temperature_2m" >/dev/null

echo
echo "=== Exercise 4: POST JSON to httpbin ==="
curl -s -X POST "https://httpbin.org/post" \
  -H "Content-Type: application/json" \
  -d '{"city":"Roseau","source":"weather-api-course"}'

echo
echo "=== Exercise 5: PUT and DELETE ==="
curl -s -X PUT "https://httpbin.org/put" \
  -H "Content-Type: application/json" \
  -d '{"city":"Roseau","status":"updated"}'
curl -s -X DELETE "https://httpbin.org/delete"

echo
echo "=== Exercise 6: Expected 401 auth failure ==="
curl -s -i -H "Authorization: Bearer fake-token" "https://httpbin.org/bearer"

echo
echo "=== Exercise 7: Hourly forecast ==="
curl -s "https://api.open-meteo.com/v1/forecast?latitude=15.30&longitude=-61.39&hourly=temperature_2m&forecast_days=1" | head -50

echo
echo "=== All exercises complete ==="
