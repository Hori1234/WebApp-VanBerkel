import os
from backend.app import db
from backend.models.users import User
import pytest

from backend.api.auth.resources import Login, Logout


@pytest.fixture
def client():
    with flaskr.app.test_client() as client:
        with flaskr.app.app_context():
            flaskr.init_db()
        yield client

    os.close(db_fd)
    os.unlink(flaskr.app.config['DATABASE'])


def login(client, username, password):
    # tries to log in with these credentials.
    return client.post('/api/auth/login', data={'username': username, 'password': password, 'remember': False})


def logout(client):
    # tries to log out
    return client.post('/api/auth/logout')


def test_login_logout_normal(client):
    rv = login(client, 'Midas Bergveen', 'w8woord')
    assert rv.status_code == 200  # find a way to validate login

    rv = logout(client)
    assert rv.status_code == 200  # find a way to validate logout


def test_login_wrong_credentials(client):
    rv = login(client, 'Midas Bergveen', 'wrongPassword')
    assert rv.status_code == 401  # find a way to validate not logging in

    rv = login(client, 'Wrong Username', 'w8woord')
    assert rv.status_code == 401  # find a way to validate not logging in

    rv = login(client, 'Wrong Username', 'wrongPassword')
    assert rv.status_code == 401  # find a way to validate not logging in

    rv = logout(client)
    assert rv.status_code == 401  # do we need to test this?


def test_login_case_sensitive_username(client):
    rv = login(client, 'midas bergveen', 'w8woord')
    assert rv.status_code == 200  # successful login


def test_login_case_sensitive_password(client):
    rv = login(client, 'Midas Bergveen', 'W8woorD')
    assert rv.status_code == 401  # password incorrect
