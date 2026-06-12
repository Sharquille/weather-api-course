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
    # TODO 1: Implement the preflight handshake check.
    # When a browser makes a cross-origin request, it sends an OPTIONS request
    # first (preflight) to check what methods and headers are allowed.
    # If request.method == "OPTIONS", return a 204 response with headers:
    #   - Access-Control-Allow-Origin: *
    #   - Access-Control-Allow-Methods: GET, OPTIONS
    #   - Access-Control-Allow-Headers: Content-Type
    if request.method == "OPTIONS":
        response = make_response()
        # Add your headers here
        response.status_code = 204
        return response

    # TODO 2: Authorize standard GET requests.
    # Create a JSON response for GET requests. In order for the browser to read it,
    # you must attach the header 'Access-Control-Allow-Origin' with value '*'
    # or the specific frontend origin 'http://localhost:8080'.
    response = make_response(jsonify(MOCK_WEATHER))
    # Add your header here to resolve CORS errors
    return response

if __name__ == "__main__":
    print("Backend Mock Server active on http://localhost:5000")
    print("Fetch URL: http://localhost:5000/weather")
    app.run(port=5000, debug=True)
