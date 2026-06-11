"""
Level 2 / Phase 04 - Webhook receiver (starter).
"""

import logging

from flask import Flask, jsonify, request

app = Flask(__name__)
logging.basicConfig(level=logging.INFO)


@app.route("/webhook", methods=["POST"])
def webhook():
    """
    TODO:
    1. Get JSON with request.get_json(silent=True).
    2. Log the payload with app.logger.info().
    3. Return jsonify({"status": "received"}), 200.
    """
    raise NotImplementedError


# TODO (Optional/Advanced): Implement a cryptographically verified webhook endpoint
# This teaches you how Stripe, GitHub, and Slack secure their public webhooks.
#
# @app.route("/webhook-secure", methods=["POST"])
# def webhook_secure():
#     # 1. Read signature header (e.g., 'X-Hub-Signature-256')
#     # 2. Compute expected HMAC-SHA256 signature using request.get_data() and a shared secret
#     # 3. Use hmac.compare_digest(expected, given) to verify
#     # 4. If mismatch, return 403. Otherwise, log payload and return 200 OK.
#     raise NotImplementedError


@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "healthy"}), 200


if __name__ == "__main__":
    print("Starting webhook receiver on http://localhost:8080")
    app.run(host="0.0.0.0", port=8080, debug=True)
