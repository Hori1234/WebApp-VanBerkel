from datetime import datetime

import pytest
import json

from backend.models import trucks
from backend.models import orders
from backend.models.users import User
import datetime


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

    for i in range(2):
        data = dict(
            file_1=(open('./tests/data/truck_availability_test.xlsx', 'rb'),
                    'sheet.xlsx')
        )

        client.post('/api/sheets/', content_type='multipart/form-data',
                    data=data)

        data2 = dict(
            file_1=(open('./tests/data/order_sheet_test.xlsx', 'rb'),
                    'sheet.xlsx')
        )

        client.post('/api/sheets/', content_type='multipart/form-data',
                    data=data2)

    # The above two files are uploaded at pretty much the same time, so it is
    # not defined which one is the latest
    orders.OrderSheet.query.get(2).upload_date += datetime.timedelta(hours=1)
    trucks.TruckSheet.query.get(2).upload_date += datetime.timedelta(hours=1)


def get_order(client, order_id):
    """
    returns the order specified.
    :param client: The test client to make the request with
    :param order_id: The id of the order to find
    :return: Order with id=id
    """
    return client.get(f'/api/orders/{order_id}')


def get_truck(client, truck_id):
    """
    returns the truck specified.
    :param client: The test client to make the request with
    :param truck_id: The id of the truck to find
    :return: truck with id=id
    """
    return client.get(f'/api/trucks/{truck_id}')


def post_order(client, sheet_id, **kwargs):
    """
    attempts to add the specified order
    :param client: the client to make the request with
    :param sheet_id: the sheet to add the order to
    :param kwargs: the details of the order to add
    :return:
    """
    return client.post(f'/api/orders/sheet/{sheet_id}',
                       data=json.dumps(kwargs),
                       content_type='application/json')


def post_truck(client, sheet_id, **kwargs):
    """
    attempts to add the specified truck
    :param client: the client to make the request with
    :param sheet_id: the sheet to add the truck to
    :param kwargs: the details of the truck to add
    :return:
    """
    return client.post(f'/api/trucks/sheet/{sheet_id}',
                       data=json.dumps(kwargs),
                       content_type='application/json')


def patch_order(client, order_id, **kwargs):
    """
    attempts to change the specified row in order
    :param client: the client to make the request with
    :param order_id: the id of the order to change
    :param kwargs: the data that needs to be changed
    :return:
    """
    return client.patch(f'/api/orders/{order_id}',
                        data=json.dumps(kwargs),
                        content_type='application/json')


def patch_truck(client, truck_id, **kwargs):
    """
    attempts to change the specified row in truck
    :param client: the client to make the request with
    :param sheet_id: the id of the sheet
    :param truck_id: the id of the truck to change
    :param kwargs: the data that needs to be changed
    :return:
    """
    return client.patch(f'/api/trucks/{truck_id}',
                        data=json.dumps(kwargs),
                        content_type='application/json')


def get_orders(client, sheet_id):
    """
    retrieves the orders associated with the specified sheet
    :param client: the client to make the request with
    :param sheet_id: the sheet to get the info from
    :return: a list of all order associated with the specified sheet
    """
    return client.get(f'/api/orders/sheet/{sheet_id}')


def get_trucks(client, sheet_id):
    """
    retrieves the trucks associated with the specified sheet
    :param client: the client to make the request with
    :param sheet_id: the sheet to get the info from
    :return: a list of all trucks associated with the specified sheet
    """
    return client.get(f'/api/trucks/sheet/{sheet_id}')


def delete_order(client, order_id):
    """
    deletes the specified order from the database
    :param client: the client to make the request
    :param order_id: the order to be deleted
    :return:
    """
    return client.delete(f'/api/orders/{order_id}')


def delete_truck(client, truck_id):
    """
    deletes the specified truck from the database
    :param client: the client to make the request
    :param truck_id: the truck to be deleted
    :return:
    """
    return client.delete(f'/api/trucks/{truck_id}')


def get_order_sheet(client, page=1, page_size=10):
    """
    retrieves all uploaded order sheets
    :param client: the client to make the request
    :param page: page of the request
    :param page_size: number of items per page
    :return: a list of all order sheets in the database
    """
    pagination_params = dict(
        page=page,
        page_size=page_size
    )
    return client.get('/api/sheets/orders', query_string=pagination_params)


def get_truck_sheet(client, page=1, page_size=10):
    """
    retrieves all uploaded truck sheets
    :param client: the client to make the request
    :param page: page of the request
    :param page_size: number of items per page
    :return: a list of all order sheets in the database
    """
    pagination_params = dict(
        page=page,
        page_size=page_size
    )
    return client.get('/api/sheets/trucks', query_string=pagination_params)


def test_order(client, db):
    rv = get_order(client, 1)

    assert rv.status_code == 200
    data = rv.get_json()
    assert data['order_number'] == 1


def test_order_wrong(client, db):
    rv = get_order(client, 1000000)

    assert rv.status_code == 404


def test_truck(client, db):
    rv = get_truck(client, 1)

    assert rv.status_code == 200
    data = rv.get_json()
    assert data['s_number'] == 1


def test_truck_wrong(client, db):
    rv = get_truck(client, 1000000)

    assert rv.status_code == 404


def test_orders(client, db):
    rv = get_orders(client, 1)

    assert rv.status_code == 200
    data = rv.get_json()
    assert len(data) > 0


def test_orders_wrong(client, db):
    rv = get_orders(client, 20)

    assert rv.status_code == 404


def test_trucks(client, db):
    rv = get_trucks(client, 1)

    assert rv.status_code == 200
    data = rv.get_json()
    assert len(data) > 0


def test_trucks_wrong(client, db):
    rv = get_trucks(client, 20)

    assert rv.status_code == 404


def test_order_sheets(client, db):
    rv = get_order_sheet(client, page=2, page_size=1)

    assert rv.status_code == 200
    data = rv.get_json()
    assert len(data) == 1
    assert data[0]['id'] == 1


def test_truck_sheets(client, db):
    rv = get_truck_sheet(client, page=2, page_size=1)

    assert rv.status_code == 200
    data = rv.get_json()
    assert len(data) == 1
    assert data[0]['id'] == 1


def test_patch_order(client, db):
    data = dict(
        truck_type='regional',
        inl_terminal='KAT',
        fun='YES'
    )
    rv = patch_order(client, 1, **data)

    assert rv.status_code == 200
    order = orders.Order.query.get(1)
    assert order.truck_type == 'regional'
    assert order.inl_terminal == 'KAT'


@pytest.mark.skip('not implemented yet')
def test_patch_order_invalid(client, db):
    data = dict(
        truck_type='big',
        inl_terminal='DOG'
    )
    rv = patch_order(client, 1, **data)

    assert rv.status_code == 400


def test_patch_order_wrong(client, db):
    rv = patch_order(client, 10000)

    assert rv.status_code == 404


def test_patch_truck(client, db):
    data = dict(
        truck_type='port',
        terminal='KAT'
    )
    rv = patch_truck(client, 1, **data)

    assert rv.status_code == 200
    truck = trucks.Truck.query.get_or_404(1)
    assert truck.truck_type == 'port'
    assert truck.terminal == 'KAT'


@pytest.mark.skip('not implemented yet')
def test_patch_truck_invalid(client, db):
    data = dict(
        truck_type='medium',
        terminal='SAD'
    )
    rv = patch_truck(client, 1, **data)

    assert rv.status_code == 400


def test_patch_truck_wrong(client, db):
    rv = patch_truck(client, 100000)

    assert rv.status_code == 404


def test_post_order(client, db):
    data = dict(
        inl_terminal='ITV', latest_dep_time=1000,
        truck_type='port', hierarchy=3, delivery_deadline=1300,
        driving_time=10, process_time=1, service_time=2
    )
    rv = post_order(client, 1, **data)
    assert rv.status_code == 200
    data = rv.get_json()
    order = orders.Order.query.get_or_404(data['order_number'])
    assert order.hierarchy == 3


@pytest.mark.skip('not implemented yet')
def test_post_order_invalid(client, db):
    data = dict(
        inl_terminal='BAD', latest_dep_time='1000',
        truck_type='great', hierarchy='3', delivery_deadline='1300',
        driving_time='10', process_time='1', service_time='21'
    )
    rv = post_order(client, 1, **data)
    assert rv.status_code == 404


def test_post_truck(client, db):
    data = dict(
        truck_id='45-TBD-1', availability=True,
        truck_type='terminal', business_type='ITV', terminal='ITV',
        hierarchy=2, use_cost=17, date='2020-10-01',
        starting_time='15:30'
    )
    rv = post_truck(client, 1, **data)

    assert rv.status_code == 200
    data = rv.get_json()
    truck = trucks.Truck.query.get_or_404(data['s_number'])
    assert truck.hierarchy == 2


@pytest.mark.skip('not implemented yet')
def test_post_truck_invalid(client, db):
    data = dict(
        truck_id=17, availability='bananas',
        truck_type='Sand', business_type=53, terminal='DUCK',
        hierarchy='2', use_cost='17', date='2020-10-01',
        starting_time='15:30'
    )
    rv = post_truck(client, 1, **data)
    assert rv.status_code == 400


def test_delete_order(client, db):
    rv = delete_order(client, 1)

    assert rv.status_code == 204


def test_delete_order_wrong(client, db):
    rv = delete_order(client, 100000)

    assert rv.status_code == 404


def test_delete_truck(client, db):
    rv = delete_truck(client, 1)

    assert rv.status_code == 204


def test_delete_truck_wrong(client, db):
    rv = delete_truck(client, 100000)

    assert rv.status_code == 404


def test_get_order_sheet_latest(client, db):
    rv = get_orders(client, 'latest')

    assert rv.status_code == 200
    data = rv.get_json()
    assert len(data) > 0


def test_get_order_sheet_not_latest(client, db):
    rv = get_orders(client, 'first')

    assert rv.status_code == 404


def test_new_order_latest(client, db):
    data = dict(
        inl_terminal='ITV', latest_dep_time=1000,
        truck_type='port', hierarchy=3, delivery_deadline=1300,
        driving_time=10, process_time=1, service_time=2
    )
    rv = post_order(client, 'latest', **data)

    assert rv.status_code == 200
    data = rv.get_json()
    order = orders.Order.query.get_or_404(data['order_number'])
    assert order.hierarchy == 3


def test_new_order_not_latest(client, db):
    data = dict(
        inl_terminal='ITV', latest_dep_time=1000,
        truck_type='port', hierarchy=3, delivery_deadline=1300,
        driving_time=10, process_time=1, service_time=2
    )
    rv = post_order(client, 'same dude', **data)

    assert rv.status_code == 404


def test_get_truck_sheet_latest(client, db):
    rv = get_trucks(client, 'latest')

    assert rv.status_code == 200
    data = rv.get_json()
    assert len(data) > 0


def test_get_truck_sheet_not_latest(client, db):
    rv = get_trucks(client, 'your mom')

    assert rv.status_code == 404


def test_new_truck_latest(client, db):
    data = dict(
        truck_id='45-TBD-1', availability=True,
        truck_type='terminal', business_type='ITV', terminal='ITV',
        hierarchy=2, use_cost=17, date='2020-10-01',
        starting_time='15:30'
    )
    rv = post_truck(client, 'latest', **data)

    assert rv.status_code == 200
    data = rv.get_json()
    truck = trucks.Truck.query.get_or_404(data['s_number'])
    assert truck.hierarchy == 2


def test_new_truck_not_latest(client, db):
    data = dict(
        truck_id='45-TBD-1', availability=True,
        truck_type='terminal', business_type='ITV', terminal='ITV',
        hierarchy=2, use_cost=17, date='2020-10-01',
        starting_time='15:30'
    )
    rv = post_truck(client, 'more testing = more better', **data)

    assert rv.status_code == 404


def test_new_truck_with_orders(client, db):
    data = dict(
        truck_id='45-TBD-1', availability=True,
        truck_type='terminal', business_type='ITV', terminal='ITV',
        hierarchy=2, use_cost=17, date='2020-10-01',
        starting_time='15:30', orders=[1, 2, 3]
    )
    rv = post_truck(client, 1, **data)

    assert rv.status_code == 200


def test_new_truck_with_wrong_orders(client, db):
    data = dict(
        truck_id='45-TBD-1', availability=True,
        truck_type='terminal', business_type='ITV', terminal='ITV',
        hierarchy=2, use_cost=17, date='2020-10-01',
        starting_time='15:30', orders=[1, 2, 30000]
    )
    rv = post_truck(client, 1, **data)

    assert rv.status_code == 404


def test_patch_truck_with_orders(client, db):
    data = dict(
        truck_type='port', orders=[1, 2]
    )
    rv = patch_truck(client, 1, **data)

    assert rv.status_code == 200


def test_patch_truck_with_wrong_orders(client, db):
    data = dict(
        truck_type='port', orders=[1, 200000]
    )
    rv = patch_truck(client, 1, **data)

    assert rv.status_code == 404
