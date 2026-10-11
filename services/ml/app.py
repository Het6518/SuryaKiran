"""
Flask API — Solar Inverter Fault Prediction
Node.js sends POST /predict → runs ML pipeline → returns JSON with 4 predictions

Refactored to use modular Flask Blueprints for clean architecture.
"""

import os
import sys

# The pipeline prints ✓/▶/⚠ progress lines; on Windows a cp1252 stdout (e.g. output
# redirected to a log) raises UnicodeEncodeError and fails every request.
for _stream in (sys.stdout, sys.stderr):
    if hasattr(_stream, "reconfigure"):
        _stream.reconfigure(encoding="utf-8", errors="replace")

from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv

# Load the shared repo-root .env first, then a service-local .env (if any) on top
_HERE = os.path.dirname(os.path.abspath(__file__))
load_dotenv(os.path.join(_HERE, "..", "..", ".env"))
load_dotenv(os.path.join(_HERE, ".env"), override=True)

# Import Blueprints
from ml_routes import ml_bp
from chat_routes import chat_bp

def create_app():
    app = Flask(__name__)
    CORS(app)

    # Register isolated modules
    app.register_blueprint(ml_bp)
    app.register_blueprint(chat_bp)
    from forecast import forecast_bp
    app.register_blueprint(forecast_bp)

    return app

if __name__ == "__main__":
    app = create_app()
    port = int(os.environ.get("ML_PORT", 5001))
    debug = os.environ.get("ML_DEBUG", "0") == "1"
    app.run(host="0.0.0.0", port=port, debug=debug)
