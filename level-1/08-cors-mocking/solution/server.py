import json
from flask import Flask, jsonify, request, make_response

app = Flask(__name__)

MOCK_WEATHER = {
    "location": "Roseau, Dominica",
    "temp_c": 28.5,
    "condition": "Humid and Sunny",
    "humidity": 78,
    "wind_kph": 12.0
}

@app.route("/weather", methods=["GET", "OPTIONS"])
def get_weather():
    # Handle preflight OPTIONS request
    if request.method == "OPTIONS":
        response = make_response()
        response.headers["Access-Control-Allow-Origin"] = "*"
        response.headers["Access-Control-Allow-Methods"] = "GET, OPTIONS"
        response.headers["Access-Control-Allow-Headers"] = "Content-Type"
        response.status_code = 204
        return response

    # Handle standard GET request
    response = make_response(jsonify(MOCK_WEATHER))
    response.headers["Access-Control-Allow-Origin"] = "*"
    return response

if __name__ == "__main__":
    print("Backend Mock Server active on http://localhost:5000")
    print("Fetch URL: http://localhost:5000/weather")
    app.run(port=5000, debug=True)
