from flask import Flask, jsonify
import logging
from config import Config


def create_app(config=Config):
    """
    Initializes the Flask app and Flask plugins.

    :param Config config: configuration for the flask application
    :returns Flask App app: Flask application
    """
    app = Flask(__name__)

    return app


# The flask app variable, which flask looks for when running the server with 'flask run'
app = create_app()


# setup logging based on environment
if app.config['ENV'] == "production":
    logging.basicConfig(level=logging.INFO)
else:
    logging.basicConfig(level=logging.DEBUG)
