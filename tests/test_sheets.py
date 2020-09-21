import pytest
import json
from backend.models.users import User


@pytest.fixture(autouse=True)
def setup_db(db, client):
    """
    Setup the database for the current test.

    After the test has been run, the database is rolled back.

    :param `SQLAlchemy` db: The ORM for this test.
    :param client: The test client for this test
    """
    user = User(username='Midas Bergveen',
                password='w8woord',
                role='planner')
    db.session.add(user)

    data = dict(
        username=user.username,
        password='w8woord',
        remember=True
    )

    client.post('/api/auth/login',
                data=json.dumps(data),
                content_type='application/json')

    yield

    db.session.rollback()


def upload_truck_availability_sheet(client, file):
    """
    Uploads truck availability sheet to the server.

    :param client: The test client to make the request with
    :return: The response of the server
    """
    data = dict(
        file=(open(file, 'rb'),
              'truck_availability_test.xlsx'),
        type='truck_availability'
    )

    return client.post('/api/sheets/',
                       content_type='multipart/form-data',
                       data=data)


def upload_order_sheet(client, file):
    """
    Uploads order sheet to the server.

    :param client: The test client to make the request with
    :return: The response of the server
    """
    data = dict(
        file=(open(file, 'rb'),
              'order_list_10rows.xlsx'),
        type='order_list'
    )

    return client.post('/api/sheets/',
                       content_type='multipart/form-data',
                       data=data)


@pytest.mark.skip('Not implemented yet')
def test_upload_success(client):
    rv = upload_truck_availability_sheet(client,
                                         './data/truck_availability_test.xlsx')
    assert rv.status_code == 201


@pytest.mark.skip('Not implemented yet')
def test_upload_fail(client):
    rv = upload_truck_availability_sheet(client,
                                         './data/truck_availability_wrong.xlsx')
    assert rv.status_code == 400
    assert len(rv.get_json()['errors']) > 0
