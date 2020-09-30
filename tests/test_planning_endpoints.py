from datetime import datetime

import pytest
import json

from backend.models import trucks
from backend.models import orders
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

    data = dict(
        file_1=(open('data/truck_availability_test.xlsx', 'rb'),
                'sheet.xlsx')
    )

    client.post('/api/sheets/', content_type='multipart/form-data', data=data)

    data2 = dict(
        file_1=(open('data/order_sheet_test.xlsx', 'rb'),
                'sheet.xlsx')
    )

    client.post('/api/sheets/', content_type='multipart/form-data', data=data2)


def get_order(client, db, order_id):
    """
    returns the order specified.
    :param client: The test client to make the request with
    :param db: The database to search in
    :param order_id: The id of the order to find
    :return: Order with id=id
    """


def get_truck(client, db, truck_id):
    """
    returns the truck specified.
    :param client: The test client to make the request with
    :param db: The database to search in
    :param truck_id: The id of the truck to find
    :return: truck with id=id
    """


def post_order(client, db, **kwargs):
    """
    attempts to add the specified order
    :param client: the client to make the request with
    :param db: the database to put the order in
    :param kwargs: the details of the order to add
    :return:
    """


def post_truck(client, db, **kwargs):
    """
    attempts to add the specified truck
    :param client: the client to make the request with
    :param db: the database to put the order in
    :param kwargs: the details of the truck to add
    :return:
    """


def patch_order(client, db, order_id, **kwargs):
    """
    attempts to change the specified row in order
    :param client: the client to make the request with
    :param db: the database to make the alteration in
    :param order_id: the id of the order to change
    :param kwargs: the data that needs to be changed
    :return:
    """


def patch_truck(client, db, truck_id, **kwargs):
    """
    attempts to change the specified row in truck
    :param client: the client to make the request with
    :param db: the database to make the alteration in
    :param truck_id: the id of the truck to change
    :param kwargs: the data that needs to be changed
    :return:
    """


def get_orders(client, db, sheet_id):
    """
    retrieves the orders associated with the specified sheet
    :param client: the client to make the request with
    :param db: the database to pull the info from
    :param sheet_id: the sheet to get the info from
    :return: a list of all order associated with the specified sheet
    """


def get_trucks(client, db, sheet_id):
    """
    retrieves the trucks associated with the specified sheet
    :param client: the client to make the request with
    :param db: the database to pull the info from
    :param sheet_id: the sheet to get the info from
    :return: a list of all trucks associated with the specified sheet
    """


def delete_order(client, db, order_id):
    """
    deletes the specified order from the database
    :param client: the client to make the request
    :param db: the database to delete from
    :param order_id: the order to be deleted
    :return:
    """


def delete_truck(client, db, order_id):
    """
    deletes the specified truck from the database
    :param client: the client to make the request
    :param db: the database to delete from
    :param order_id: the truck to be deleted
    :return:
    """


def get_order_sheet(client, db):
    """
    retrieves all uploaded order sheets
    :param client: the client to make the request
    :param db: the database to pull from
    :return: a list of all order sheets in the database
    """


def get_truck_sheet(client, db):
    """
    retrieves all uploaded truck sheets
    :param client: the client to make the request
    :param db: the database to pull from
    :return: a list of all truck sheets in the database
    """


@pytest.mark.skip('not implemented yet')
def test_order(client, db):
    rv = get_order(client, db, 1)

    assert rv.status_code == 200
    assert rv.order_number == 1


@pytest.mark.skip('not implemented yet')
def test_order_wrong(client, db):
    rv = get_order(client, db, 1000000)

    assert rv.status_code == 404


@pytest.mark.skip('not implemented yet')
def test_truck(client, db):
    rv = get_truck(client, db, 1)

    assert rv.status_code == 200
    assert rv.s_number == 1


@pytest.mark.skip('not implemented yet')
def test_truck_wrong(client, db):
    rv = get_truck(client, db, 1000000)

    assert rv.status_code == 404


@pytest.mark.skip('not implemented yet')
def test_orders(client, db):
    rv = get_orders(client, db, 1)

    assert rv.status_code == 200
    assert len(rv) > 0


@pytest.mark.skip('not implemented yet')
def test_orders_wrong(client, db):
    rv = get_orders(client, db, 20)

    assert rv.status_code == 404


@pytest.mark.skip('not implemented yet')
def test_trucks(client, db):
    rv = get_trucks(client, db, 1)

    assert rv.status_code == 200
    assert len(rv) > 0


@pytest.mark.skip('not implemented yet')
def test_trucks_wrong(client, db):
    rv = get_trucks(client, db, 20)

    assert rv.status_code == 404


@pytest.mark.skip('not implemented yet')
def test_order_sheets(client, db):
    rv = get_order_sheet(client, db)

    assert rv.status_code == 200
    assert len(rv) > 0


@pytest.mark.skip('not implemented yet')
def test_truck_sheets(client, db):
    rv = get_truck_sheet(client, db)

    assert rv.status_code == 200
    assert len(rv) > 0


@pytest.mark.skip('not implemented yet')
def test_patch_order(client, db):
    data = dict(
        truck_type='regional',
        inl_terminal='KAT'
    )
    rv = patch_order(client, db, 1, data)

    assert rv.status_code == 200
    assert orders.Order.query.get_or_404(
        id=1,
        order_number=1,
        truck_type='regional',
        inl_terminal='KAT')


@pytest.mark.skip('not implemented yet')
def test_patch_order_invalid(client, db):
    data = dict(
        truck_type='big',
        inl_terminal='DOG'
    )
    rv = patch_order(client, db, 1, data)

    assert rv.status_code == 400


@pytest.mark.skip('not implemented yet')
def test_patch_order_wrong(client, db):
    rv = patch_order(client, db, 10000)

    assert rv.status_code == 404


@pytest.mark.skip('not implemented yet')
def test_patch_truck(client, db):
    data = dict(
        truck_type='port',
        terminal='KAT'
    )
    rv = patch_truck(client, db, 1, data)

    assert rv.status_code == 200
    assert trucks.Truck.query.get_or_404(
        id=1,
        s_number=1,
        truck_type='port',
        terminal='KAT')


@pytest.mark.skip('not implemented yet')
def test_patch_truck_invalid(client, db):
    data = dict(
        truck_type='medium',
        terminal='SAD'
    )
    rv = patch_truck(client, db, 1, data)

    assert rv.status_code == 400


@pytest.mark.skip('not implemented yet')
def test_patch_truck_wrong(client, db):
    rv = patch_truck(client, db, 100000)

    assert rv.status_code == 404


@pytest.mark.skip('not implemented yet')
def test_post_order(client, db):
    data = dict(
        id=1, order_number=134, inl_terminal='ITV', latest_dep_time=1000,
        truck_type='port', hierarchy=3, delivery_deadline=1300,
        driving_time=10, process_time=1, service_time=2
    )
    rv = post_order(client, db, data)
    assert rv.status_code == 200
    assert orders.Order.query.get_or_404(
        id=1, order_number=134
    )


@pytest.mark.skip('not implemented yet')
def test_post_order_invalid(client, db):
    data = dict(
        id=1, order_number=134, inl_terminal='BAD', latest_dep_time='1000',
        truck_type='great', hierarchy='3', delivery_deadline='1300',
        driving_time='10', process_time='1', service_time='21'
    )
    rv = post_order(client, db, data)
    assert rv.status_code == 400


@pytest.mark.skip('not implemented yet')
def test_post_truck(client, db):
    data = dict(
        id=1, truck_id='45-TBD-1', s_number=50, availability=True,
        truck_type='terminal', business_type='ITV', terminal='ITV',
        hierarchy=2, use_cost=17, date=datetime.date(2020, 10, 24),
        starting_time=datetime.time(12, 10, 30)
    )
    rv = post_truck(client, db, data)

    assert rv.status_code == 200
    assert trucks.Truck.query.get_or_404(
        id=1, s_number=50, date=datetime.date(2020, 20, 24)
    )


@pytest.mark.skip('not implemented yet')
def test_post_truck_invalid(client, db):
    data = dict(
        id=1, truck_id=17, s_number=50, availability='bananas',
        truck_type='Sand', business_type=53, terminal='DUCK',
        hierarchy='2', use_cost='17', date=2017,
        starting_time=12
    )
    rv = post_truck(client, db, data)
    assert rv.status_code == 400


@pytest.mark.skip('not implemented yet')
def test_delete_order(client, db):
    rv = delete_order(client, db, 1)

    assert rv.status_code == 200


@pytest.mark.skip('not implemented yet')
def test_delete_order_wrong(client, db):
    rv = delete_order(client, db, 100000)

    assert rv.status_code == 404


@pytest.mark.skip('not implemented yet')
def test_delete_truck(client, db):
    rv = delete_truck(client, db, 1)

    assert rv.status_code == 200


@pytest.mark.skip('not implemented yet')
def test_delete_truck(client, db):
    rv = delete_truck(client, db, 100000)

    assert rv.status_code == 404
