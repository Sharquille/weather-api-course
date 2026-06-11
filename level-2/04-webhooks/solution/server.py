"""
Level 2 / Phase 04 - Webhook receiver (solution).
"""

import logging
from datetime import datetime, timezone
import hmac
import hashlib

from flask import Flask, jsonify, request

app = Flask(__name__)
logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")

# Shared secret key with the sender to cryptographically verify requests
WEBHOOK_SHARED_SECRET = b"super-secret-key-shared-with-sender"


def verify_signature(data: bytes, signature: str) -> bool:
    """Validate webhook authenticity using HMAC-SHA256."""
    expected_signature = hmac.new(
        WEBHOOK_SHARED_SECRET, 
        msg=data, 
        digestmod=hashlib.sha256
    ).hexdigest()
    # Use hmac.compare_digest to protect against timing attacks
    return hmac.compare_digest(expected_signature, signature)


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


@app.route("/webhook-secure", methods=["POST"])
def webhook_secure():
    """
    Exposes a cryptographically secured webhook endpoint.
    Expects signature in 'X-Hub-Signature-256' header.
    """
    signature = request.headers.get("X-Hub-Signature-256")
    if not signature:
        app.logger.warning("Rejected webhook: Missing X-Hub-Signature-256 header")
        return jsonify({"error": "Missing signature"}), 401
        
    raw_body = request.get_data()
    if not verify_signature(raw_body, signature):
        app.logger.warning("Rejected webhook: Invalid cryptographic signature")
        return jsonify({"error": "Invalid signature"}), 403
        
    payload = request.get_json(silent=True) or {}
    app.logger.info("Secured Webhook Verified! payload: %s", payload)
    return (
        jsonify(
            {
                "status": "verified & processed",
                "processed_at": datetime.now(timezone.utc).isoformat(),
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
