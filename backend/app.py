from flask import Flask
from flask_smorest import Api
from apispec.ext.marshmallow import MarshmallowPlugin
from flask_marshmallow import Marshmallow
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_migrate import Migrate
from backend.config import Config
from backend.api import register_api, custom_name_resolver as name_resolver

db = SQLAlchemy()
api = Api(
    spec_kwargs={
        'marshmallow_plugin': MarshmallowPlugin(
            schema_name_resolver=name_resolver
        )
    }
)
ma = Marshmallow()
login = LoginManager()
migrate = Migrate()


def create_app(config=Config):
    """
    Initializes the Flask app and Flask plugins.

    :param config: configuration for the flask application
    :type config: :class:`Config`
    :returns App: Flask application
    :rtype: :class:`Flask`
    """
    # Initialise app and configuration
    app = Flask(__name__)
    app.config.from_object(config)

    # Initialise flask plugins
    db.init_app(app)
    api.init_app(app)
    ma.init_app(app)
    login.init_app(app)
    migrate.init_app(app, db)
    register_api(api)

    # Set the user loader of flask-login, so it can load users
    # when they are logged in
    from backend.models.users import User

    @login.user_loader
    def user_loader(user_id):
        return User.query.get(user_id)

    return app
