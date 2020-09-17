import pytest
import json


def login(client, username, password):
    # tries to log in with these credentials.
    data = dict(
        username=username,
        password=password,
        remember=True
    )

    return client.post('/api/auth/login',
                       data=json.dumps(data),
                       content_type='application/json')


def logout(client):
    # tries to log out
    return client.post('/api/auth/logout')


def test_login_logout_normal(app, client, db):
    rv = login(client, 'Midas Bergveen', 'w8woord')
    assert rv.status_code == 200  # should be logged in

    rv = logout(client)
    assert rv.status_code == 200  # should be logged out


def test_login_wrong_credentials(app, client, db):
    rv = login(client, 'Midas Bergveen', 'wrongPassword')
    assert rv.status_code == 401  # should not be logged in

    rv = login(client, 'Wrong Username', 'w8woord')
    assert rv.status_code == 401  # should not be logged in

    rv = login(client, 'Wrong Username', 'wrongPassword')
    assert rv.status_code == 401  # should not be logged in

    rv = logout(client)
    assert rv.status_code == 401  # do we need to test this?


def test_login_case_sensitive_username(app, client, db):
    rv = login(client, 'midas bergveen', 'w8woord')
    assert rv.status_code == 200  # should be logged in


def test_login_case_sensitive_password(app, client, db):
    rv = login(client, 'Midas Bergveen', 'W8woorD')
    assert rv.status_code == 401  # should not be logged in
