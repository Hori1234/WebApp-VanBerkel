import pytest
from backend.app import db as _db
from backend.app import create_app
from backend.config import Config


class TestingConfig(Config):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = 'sqlite://'


@pytest.fixture(scope='session')
def app():
    _app = create_app(TestingConfig)
    context = _app.app_context()
    context.push()

    yield _app

    context.pop()


@pytest.fixture(scope='session')
def client(app):
    return app.test_client()


@pytest.fixture(scope='session')
def db(app):
    _db.create_all()

    yield _db

    _db.session.close()
    _db.drop_all()
