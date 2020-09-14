from flask import Flask
from flask_smorest import Api
from flask_marshmallow import Marshmallow
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_migrate import Migrate
import logging
from backend.config import Config
from backend.api import register_api

db = SQLAlchemy()
api = Api()
ma = Marshmallow()
login = LoginManager()
migrate = Migrate()


def create_app(config=Config):
    """
    Initializes the Flask app and Flask plugins.

    :param Config config: configuration for the flask application
    :returns Flask App app: Flask application
    """
    app = Flask(__name__)
    app.config.from_object(config)

    db.init_app(app)
    api.init_app(app)
    ma.init_app(app)
    login.init_app(app)
    migrate.init_app(app, db)
    register_api(api)

    from backend.models.users import User

    @login.user_loader
    def user_loader(user_id):
        return User.query.get(user_id)

    return app


# The flask app variable, which flask looks for when running the server with 'flask run'
app = create_app()


# setup logging based on environment
if app.config['ENV'] == "production":
    logging.basicConfig(level=logging.INFO)
else:
    logging.basicConfig(level=logging.DEBUG)
