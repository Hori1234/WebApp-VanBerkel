import pytest
from backend.app import db as test_db
from backend.app import create_app
from backend.models.users import User
from backend.config import Config


class TestingConfig(Config):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = 'sqlite://'


@pytest.fixture
def app():
    app = create_app()
    context = app.app_context()
    context.push()
    return app


@pytest.fixture
def client(app):
    return app.test_client()


@pytest.fixture
def db(app):
    test_db.init_app(app)
    test_db.create_all()
    return test_db
