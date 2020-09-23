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


def upload_one_sheet(client, file):
    """
    Uploads a single sheet to the server.

    :param client: The test client to make the request with
    :param file: The file meant to be uploaded
    :return: The response of the server
    """
    data = dict(
        file_1=(open(file, 'rb'),
                'truck_availability_test.xlsx')
    )

    return client.post('/api/sheets/',
                       content_type='multipart/form-data',
                       data=data)


def upload_two_sheets(client, file1, file2):
    """
    Uploads

    :param client: The test client to make the request with
    :param file1: The first file meant to be uploaded
    :param file2: The second file meant to be uploaded
    :return: The response of the server
    """
    data = dict(
        file_1=(open(file1, 'rb'), 'truck_availability_test.xlsx'),
        file_2=(open(file2, 'rb'), 'order_list_test.xlsx')
    )

    return client.post('/api/sheets/',
                       content_type='multipart/form-data',
                       data=data)


def test_upload_success(client):
    rv = upload_one_sheet(client,
                          './tests/data/truck_availability_test.xlsx')
    assert rv.status_code == 200


def test_upload_fail(client):
    rv = upload_one_sheet(client,
                          './tests/data/truck_availability_wrong.xlsx')
    assert rv.status_code == 400
    assert len(rv.get_json()['errors']) > 0


def test_upload_two(client):
    rv = upload_two_sheets(client,
                           './tests/data/truck_availability_test.xlsx',
                           './tests/data/order_list_10rows.xlsx')

    assert rv.status_code == 200
