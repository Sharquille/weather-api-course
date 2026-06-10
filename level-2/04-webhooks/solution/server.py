"""
Level 2 / Phase 04 - Webhook receiver (solution).
"""

import logging
from datetime import datetime, timezone

from flask import Flask, jsonify, request

app = Flask(__name__)
logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")


@app.route("/webhook", methods=["POST"])
def webhook():
    payload = request.get_json(silent=True) or {}
    app.logger.info("Received webhook payload: %s", payload)
    app.logger.info("Headers: %s", dict(request.headers))
    return (
        jsonify(
            {
                "status": "received",
                "received_at": datetime.now(timezone.utc).isoformat(),
            }
        ),
        200,
    )


@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "healthy"}), 200


if __name__ == "__main__":
    print("Starting webhook receiver on http://localhost:8080")
    print("In another terminal, run: ngrok http 8080")
    app.run(host="0.0.0.0", port=8080, debug=True)
