import pytest
import json
from backend.models.users import User


@pytest.fixture(autouse=True, scope='function')
def setup_db(db, client):
    """
    Setup the database for the current test.

    After the test has been run, the database is rolled back.

    :param client:
    :param `SQLAlchemy` db: The ORM for this test.
    """
    user = User(username='Midas Bergveen',
                password='w8woord',
                role='administrator')
    db.session.add(user)
    user1 = User(username='Twan van Broekhoven',
                 password='SomethingClever',
                 role='administrator')
    db.session.add(user1)
    db.session.commit()

    data = dict(
        username=user.username,
        password='w8woord',
        remember=True
    )

    client.post('/api/auth/login',
                data=json.dumps(data),
                content_type='application/json')


def remove_user(client, userID):
    """
    Removes the given user from the database
    :param client: the client
    :param userID: the user to be deleted
    :return: 204 if successful, 404 if user was not found, 400 if user is logged in
    """
    return client.delete(f'/api/auth/user/{userID}')


def add_user(client, **kwargs):
    """
    Adds a user with given username, password and role
    :param client: the client
    :return: the created user, 201 if successful
    """
    return client.post('/api/auth/user',
                       data=json.dumps(kwargs),
                       content_type='application/json')


def change_user_details(client, userid, **kwargs):
    """
    Changes the details of an existing user
    :param client:
    :param userid: the user whose details need changing
    :param kwargs: the details that need to be changed
    :return:
    """
    return client.patch(f'/api/auth/user/{userid}',
                        data=json.dumps(kwargs),
                        content_type='application/json')


def get_user_list(client, page, per_page):
    """
    Gets the list of all users in the database
    :param client:
    :param page: the page to be shown
    :param per_page: the amount of users per page
    :return:
    """
    pagedetails = dict(
        page=page,
        page_size=per_page
    )
    return client.get('/api/auth/users', query_string=pagedetails)


def test_create_account(client):
    rv = add_user(client,
                  username="Bernard",
                  password="wachtzin",
                  role="view-only")

    assert rv.status_code == 201
    data = rv.get_json()
    assert data['username'] == "Bernard"
    assert data['role'] == "view-only"
    assert 'id' in data


def test_create_incomplete_account(client):
    rv = add_user(client,
                  username="Bernhardt",
                  role="planner")

    assert rv.status_code == 422
    assert 'password' in rv.get_json()['errors']['json']


def test_create_wrong_role(client):
    rv = add_user(client,
                  username="morris",
                  password="Teststststs",
                  role="god-king")

    assert rv.status_code == 400
    assert 'message' in rv.get_json()


def test_create_duplicate_user(client):
    rv = add_user(client,
                  username="Twan van Broekhoven",
                  password="irrelevant",
                  role="view-only")

    assert rv.status_code == 400
    assert 'message' in rv.get_json()


def test_delete_account(client):
    rv = remove_user(client, 2)

    assert rv.status_code == 204


def test_delete_nonexistent_account(client):
    rv = remove_user(client, 300)

    assert rv.status_code == 404


def test_delete_own_account(client):
    rv = remove_user(client, 1)

    assert rv.status_code == 400


def test_change_information(client):
    rv = change_user_details(client, 2,
                             username="Broek van Twanhoven",
                             password="somethingdumb",
                             role="planner")

    assert rv.status_code == 200
    data = rv.get_json()
    assert data['username'] == "Broek van Twanhoven"
    assert data['role'] == "planner"
    assert 'id' in data


def test_change_information_duplicate(client):
    rv = change_user_details(client, 2,
                             username="Midas Bergveen")

    assert rv.status_code == 400


def test_change_information_bad_role(client):
    rv = change_user_details(client, 2,
                             role="the-worst")

    assert rv.status_code == 400


def test_change_own_information(client):
    rv = change_user_details(client, 1,
                             username="Morris Roozen",
                             role="view-only")

    assert rv.status_code == 400


def test_change_non_existent_account(client):
    rv = change_user_details(client, 300,
                             username="zeus the mighty")

    assert rv.status_code == 404


def test_get_user_list(client):
    rv = get_user_list(client, 1, 10)
    data = rv.get_json()

    assert rv.status_code == 200
    assert len(data) == 2
    assert data[0]['username'] == "Midas Bergveen"


def test_get_too_many_users(client):
    rv = get_user_list(client, 2, 10)

    assert rv.status_code == 404
