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
    db.session.commit()

    data = dict(
        username=user.username,
        password='w8woord',
        remember=True
    )

    client.post('/api/auth/login',
                data=json.dumps(data),
                content_type='application/json')


def upload_one_sheet(client, file):
    """
    Uploads a single sheet to the server.

    :param client: The test client to make the request with
    :param file: The file meant to be uploaded
    :return: The response of the server
    """
    data = dict(
        file_1=(open(file, 'rb'),
                'sheet.xlsx')
    )

    return client.post('/api/sheets/',
                       content_type='multipart/form-data',
                       data=data)


def test_upload_ta_success(client):
    """
    Test just a truck availability sheet
    """
    rv = upload_one_sheet(client,
                          './tests/data/truck_availability_test.xlsx')
    assert rv.status_code == 200


def test_upload_orders_success(client):
    """
    Test just an order sheet
    """
    rv = upload_one_sheet(client,
                          './tests/data/order_sheet_test.xlsx')
    assert rv.status_code == 200


def test_upload_ta_missing_column(client):
    """
    Test a single truck availability sheet with a missing column
    """
    rv = upload_one_sheet(client,
                          './tests/data/truck_availability_missing_column.xlsx')

    assert rv.status_code == 422
    # something to assert that the columns are missing


def test_upload_ta_duplicates_in_columns(client):
    """
    Test a single truck availability sheet with duplicates in columns
    """
    rv = upload_one_sheet(client,
                          './tests/data/truck_availability_duplicate_columns.xlsx')

    assert rv.status_code == 422
    # something to assert that the columns contain duplicates


def test_upload_ta_missing_values(client):
    """
    Test a single truck availability sheet with missing values
    """
    rv = upload_one_sheet(client,
                          './tests/data/truck_availability_missing_values.xlsx')

    assert rv.status_code == 422
    # something to assert that the columns have missing data


def test_upload_ta_data_validation_terminal(client):
    """
    Test a single truck availability sheet with incorrect terminals
    """
    rv = upload_one_sheet(client,
                          './tests/data/truck_availability_wrong_terminals.xlsx')

    assert rv.status_code == 422
    # something to assert that the column contained incorrect values


def test_upload_ta_data_validation_trucktype(client):
    """
    Test a single truck availability sheet with incorrect truck types
    """
    rv = upload_one_sheet(client,
                          './tests/data/truck_availability_wrong_trucktype.xlsx')

    assert rv.status_code == 422
    # something to assert that the column contained incorrect values


def test_upload_ta_data_validation_datetime(client):
    """
    Test a single truck availability sheet with incorrect dates
    """
    rv = upload_one_sheet(client,
                          './tests/data/truck_availability_wrong_dates.xlsx')

    assert rv.status_code == 422
    # something to assert that the column contained incorrect values


def test_upload_ta_data_validation_numbers(client):
    """
    Test a single truck availability sheet with incorrect numbers
    """
    rv = upload_one_sheet(client,
                          './tests/data/truck_availability_wrong_numbers.xlsx')

    assert rv.status_code == 422
    # something to assert that the column contained incorrect values


def test_upload_order_column_missing(client):
    """
    Test a single order sheet with missing columns
    """
    rv = upload_one_sheet(client,
                          './tests/data/order_sheet_missing_column.xlsx')

    assert rv.status_code == 422
    # something to assert that the column was missing


def test_upload_order_missing_values(client):
    """
    Test a single order sheet with missing values
    """
    rv = upload_one_sheet(client,
                          './tests/data/order_sheet_missing_values.xlsx')

    assert rv.status_code == 422
    # something to assert that the values were missing


def test_upload_order_duplicate_values(client):
    """
    Test a single order sheet with duplicate values
    """
    rv = upload_one_sheet(client,
                          './tests/data/order_sheet_duplicate_values.xlsx')

    assert rv.status_code == 422


def test_upload_order_data_validation_terminal(client):
    """
    Test a single order sheet with incorrect terminals
    """
    rv = upload_one_sheet(client,
                          './tests/data/order_sheet_wrong_terminals.xlsx')

    assert rv.status_code == 422
    # something to assert that the values were wrong


def test_upload_order_data_validation_trucktype(client):
    """
    Test a single order sheet with incorrect truck types
    """
    rv = upload_one_sheet(client,
                          './tests/data/order_sheet_wrong_trucktype.xlsx')

    assert rv.status_code == 422
    # something to assert that the values were wrong


def test_upload_order_data_validation_numbers(client):
    """
    Test a single order sheet with incorrect numbers
    """
    rv = upload_one_sheet(client,
                          './tests/data/order_sheet_wrong_numbers.xlsx')

    assert rv.status_code == 422
    # something to assert that the values were wrong


def test_upload_one_but_it_is_a_pdf(client):
    """
    Test a single upload with a pdf instead of a sheet
    """
    rv = upload_one_sheet(client,
                          './tests/data/not_a_spreadsheet.pdf')

    assert rv.status_code == 400
    # something to assert that this is not a spreadsheet


def test_upload_one_but_it_is_not_right(client):
    """
    Test a single upload with something that is neither
    """
    rv = upload_one_sheet(client,
                          './tests/data/stardew valley.xlsx')

    assert rv.status_code == 400
    # something to assert that it's not one of the sheets


