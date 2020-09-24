import pytest
import os
from backend.app import db as _db
from backend.app import create_app
from backend.config import Config


class TestingConfig(Config):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URI') or 'sqlite://'


@pytest.fixture(scope='session')
def app():
    """
    Creates a new Flask application for each test.

    :returns Iterator[Flask App] _app: The Flask application for the test
    """
    _app = create_app(TestingConfig)
    context = _app.app_context()
    context.push()

    yield _app

    context.pop()


@pytest.fixture
def client(app):
    """
    Creates a test client for each new Flask App.

    This client can be used for making requests
    to the endpoints of the Flask App.


    :param Flask App app: The Flask application for the test
    :returns client: testing client
    """
    return app.test_client()


@pytest.fixture
def db(app):
    """"
    Creates a database for the test.

    The location of the database is given in the config
    of the Flask app

    :param Flask App app: The Flask application for the test
    :returns Iterator[`SQLAlchemy`] db: ORM for the database
    """
    _db.create_all()

    yield _db

    _db.session.close()
    _db.drop_all()

