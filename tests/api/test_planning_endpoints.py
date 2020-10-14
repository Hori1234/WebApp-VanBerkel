import datetime
from pathlib import Path
import pytest
import json

from backend.models import trucks
from backend.models import orders


def get_file_path(file):
    return Path(__file__).parent / 'data' / file


@pytest.fixture(autouse=True)
def setup_db(setup_users, login_user, create_db_without_users, client):
    """
    Setup the database for the current test.
    """

    for i in range(2):
        data = dict(
            file_1=(open(get_file_path('truck_availability_test.xlsx'), 'rb'),
                    'sheet.xlsx')
        )

        client.post('/api/sheets/', content_type='multipart/form-data',
                    data=data)

        data2 = dict(
            file_1=(open(get_file_path('order_sheet_test.xlsx'), 'rb'),
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

def get_timeline(client, sheet_id):
    """
    Gets the parameters to create a timeline of the orders assignment
    :param client: the client to make the request
    :param sheet_id: the id of the order sheet to make a timeline of
    :return:
    """
    return client.get(f'/api/orders/timeline/{sheet_id}')

# GET ORDER TESTS


def test_get_order(client, db):
    """
    Tests the intended use of the get order endpoint.
    """
    rv = get_order(client, 1)

    assert rv.status_code == 200
    data = rv.get_json()
    assert data['order_number'] == 1


def test_get_order_invalid(client, db):
    """
    Tests the get order endpoint but with an invalid order number.
    """
    rv = get_order(client, 1000000)

    assert rv.status_code == 404

# GET TRUCK TESTS


def test_get_truck(client, db):
    """
    Tests the intended use of the get truck endpoint.
    """
    rv = get_truck(client, 1)

    assert rv.status_code == 200
    data = rv.get_json()
    assert data['s_number'] == 1


def test_get_truck_invalid(client, db):
    """
    Tests the get truck endpoint but with an invalid truck id.
    """
    rv = get_truck(client, 1000000)

    assert rv.status_code == 404

# GET ORDERS TESTS


def test_get_orders(client, db):
    """
    Tests the intended use of the get orders endpoint.
    """
    rv = get_orders(client, 1)

    assert rv.status_code == 200
    data = rv.get_json()
    assert len(data) > 0


def test_get_orders_invalid(client, db):
    """
    Tests the get orders endpoint but with invalid order numbers.
    """
    rv = get_orders(client, 20)

    assert rv.status_code == 404


def test_get_order_sheet_latest(client, db):
    """
    Tests the intended use of the get order sheet latest endpoint.
    """
    rv = get_orders(client, 'latest')

    assert rv.status_code == 200
    data = rv.get_json()
    assert len(data) > 0


def test_get_order_sheet_not_latest(client, db):
    """
    Tests the get order sheet latest endpoint but not with the latest sheet.
    """
    rv = get_orders(client, 'first')

    assert rv.status_code == 404

# GET TRUCKS TESTS


def test_get_trucks(client, db):
    """
    Tests the intended use of the get trucks endpoint.
    """
    rv = get_trucks(client, 1)

    assert rv.status_code == 200
    data = rv.get_json()
    assert len(data) > 0


def test_get_trucks_invalid(client, db):
    """
    Tests the get trucks endpoint but with a invalid trucks.
    """
    rv = get_trucks(client, 20)

    assert rv.status_code == 404


def test_get_truck_sheet_latest(client, db):
    """
    Tests the intended use of the get truck sheet latest endpoint.
    """
    rv = get_trucks(client, 'latest')

    assert rv.status_code == 200
    data = rv.get_json()
    assert len(data) > 0


def test_get_truck_sheet_not_latest(client, db):
    """
    Tests the truck sheet latest endpoint but not with the latest sheet.
    """
    rv = get_trucks(client, 'test')

    assert rv.status_code == 404


# PATCH ORDER TESTS


def test_patch_order(client, db):
    """
    Tests the intended use of the patch order endpoint.
    """
    request = dict(
        truck_type='regional',
        inl_terminal='KAT',
        SomethingNew='TEST',
        SomethingNewAlso=None
    )
    rv = patch_order(client, 1, **request)

    assert rv.status_code == 200
    order = orders.Order.query.get(1)
    assert order.truck_type == 'regional'
    assert order.inl_terminal == 'KAT'
    assert order.others['SomethingNew'] == 'TEST'
    assert 'SomethingNewAlso' not in order.others


def test_patch_order_remove_others(client, db):
    """
    Tests the patch order endpoint but when you remove data one of the
    not required columns that then the order is still valid.
    """
    request = dict(
        Container=None
    )
    rv = patch_order(client, 1, **request)
    assert rv.status_code == 200
    order = orders.Order.query.get(1)
    assert 'Container' not in order.others


def test_patch_order_invalid(client, db):
    """
    Tests the patch order endpoint but when you remove or change data one of the
    required columns that then the order is not correct or acceptable anymore.
    """
    request = dict(
        truck_type='big',
        inl_terminal='DOG'
    )
    rv = patch_order(client, 1, **request)

    assert rv.status_code == 400


def test_patch_order_wrong(client, db):
    """
    Tests the patch order endpoint but with a non-existing order number.
    """
    rv = patch_order(client, 10000)

    assert rv.status_code == 404


def test_patch_order_set_truck_id(client, db):
    """
    Tests the patch order when setting and removing a truck_id and departure
    time.
    """
    request = dict(
        truck_id=14,
        departure_time='12:30'
    )
    rv = patch_order(client, 1, **request)

    # truck has been added
    assert rv.status_code == 200
    assert rv.get_json()['truck_id'] == 14
    assert rv.get_json()['departure_time'] == '12:30:00'

    order = orders.Order.query.get(1)
    truck = trucks.Truck.query.get(14)
    # also been changed in the database
    assert order.departure_time.strftime('%H:%M') == '12:30'
    assert order.truck == truck

    request2 = dict(
        truck_id=None
    )
    rv2 = patch_order(client, 1, **request2)

    # truck has been removed from the order
    assert rv2.status_code == 200
    assert rv2.get_json()['truck_id'] is None
    assert rv2.get_json()['departure_time'] is None
    assert order.truck is None
    assert order.departure_time is None


@pytest.mark.parametrize('departure_time', ('2:00', '23:59'))
def test_patch_order_departure_time_invalid(client, departure_time):
    """
    Tests if an error response is given after setting the departure time
    later than the latest departure time of the order or earlier than the
    starting time of the assigned truck.
    """
    request = dict(
        truck_id=14,
        departure_time=departure_time,
    )

    rv2 = patch_order(client, 1, **request)

    assert rv2.status_code == 400
    assert 'message' in rv2.get_json()
    message = rv2.get_json()['message']
    assert departure_time in message
    if departure_time == '2:00':
        assert 'starting time' in message
    else:
        assert 'latest departure time' in message


def test_patch_order_invalid_truck(client):
    """
    Tests if an error response is given after assigning a truck to an order
    it cannot carry out.
    """
    request = dict(
        truck_id=1,
        departure_time='8:00'
    )

    rv2 = patch_order(client, 1, **request)

    assert rv2.status_code == 400
    assert 'message' in rv2.get_json()
    assert 'terminal' in rv2.get_json()['message']
    assert 'port' in rv2.get_json()['message']

# PATCH TRUCK TESTS


def test_patch_truck(client, db):
    """
    Tests the intended use of the patch truck endpoint.
    """
    request = dict(
        truck_type='port',
        terminal='KAT',
        SomethingNew='NEW!',
        SomethingNewAlso=None
    )
    rv = patch_truck(client, 1, **request)

    assert rv.status_code == 200
    truck = trucks.Truck.query.get(1)
    assert truck.truck_type == 'port'
    assert truck.terminal == 'KAT'
    assert truck.others['SomethingNew'] == 'NEW!'
    assert 'SomethingNewAlso' not in truck.others


def test_patch_truck_remove_others(client, db):
    """
    Tests the patch truck endpoint but when you remove data one of the
    not required columns that then the truck is still valid.
    """
    request = dict(
        Driver=None,
    )

    rv = patch_truck(client, 1, **request)
    assert rv.status_code == 200

    truck = trucks.Truck.query.get(1)
    assert 'Driver' not in truck.others


def test_patch_truck_invalid(client, db):
    """
    Tests the patch truck endpoint but when you remove data one of the
    required columns that then the truck is not valid anymore.
    """
    request = dict(
        truck_type='medium',
        terminal='SAD'
    )
    rv = patch_truck(client, 1, **request)

    assert rv.status_code == 400


def test_patch_truck_wrong(client, db):
    """
    Tests the patch truck endpoint but with a wrong truck id.
    """
    rv = patch_truck(client, 100000)

    assert rv.status_code == 404


def test_patch_truck_with_orders(client, db):
    """
    Tests the intended use of the patch truck endpoint with an associated
    order.
    """
    request = dict(
        truck_type='port',
        orders=[dict(
            order_number=1,
            departure_time='12:30'
        ), dict(
            order_number=24,
            departure_time='10:00'
        )
        ]
    )
    rv = patch_truck(client, 1, **request)

    assert rv.status_code == 200

    truck = trucks.Truck.query.get(1)
    assert truck.truck_type == 'port'
    assert len(truck.orders) == 2
    assert truck.orders[0].order_number == 1


def test_patch_truck_with_wrong_orders(client, db):
    """
    Tests the patch truck endpoint with a wrongly associated order.
    """
    request = dict(
        truck_type='port',
        orders=[dict(
            order_number=1,
            departure_time='12:30'
        ), dict(
            order_number=1000,
            departure_time='10:00'
        )
        ]
    )
    rv = patch_truck(client, 1, **request)

    assert rv.status_code == 404


# POST ORDER TESTS


def test_post_order(client, db):
    """
    Tests the intended use of the post order endpoint.
    """
    request = dict(
        inl_terminal='ITV', latest_dep_time=1000,
        truck_type='port', hierarchy=3, delivery_deadline='20:00',
        driving_time=10, process_time=1, service_time=2
    )
    rv = post_order(client, 1, **request)
    assert rv.status_code == 200
    data = rv.get_json()
    order = orders.Order.query.get_or_404(data['order_number'])
    assert order.hierarchy == 3


def test_post_order_invalid_truck_type(client, db):
    """
    Tests the post order endpoint but with an invalid truck type.
    """
    request = dict(
        inl_terminal='KAT', latest_dep_time=1000,
        truck_type='TEST', hierarchy=3, delivery_deadline='20:00',
        driving_time=10, process_time=1, service_time=21
    )
    rv = post_order(client, 1, **request)
    assert rv.status_code == 400


def test_post_order_invalid_terminal(client, db):
    """
    Tests the post order endpoint but with an invalid terminal.
    """
    request = dict(
        inl_terminal='TEST', latest_dep_time=1000,
        truck_type='Port', hierarchy=3, delivery_deadline='20:00',
        driving_time=10, process_time=1, service_time=21
    )
    rv = post_order(client, 1, **request)
    assert rv.status_code == 400


def test_post_order_latest(client, db):
    """
    Tests the intended post order latest endpoint.
    """
    request = dict(
        inl_terminal='ITV', latest_dep_time=1000,
        truck_type='port', hierarchy=3, delivery_deadline='20:00',
        driving_time=10, process_time=1, service_time=2
    )
    rv = post_order(client, 'latest', **request)

    assert rv.status_code == 200
    data = rv.get_json()
    order = orders.Order.query.get_or_404(data['order_number'])
    assert order.hierarchy == 3


def test_post_order_not_latest(client, db):
    """
    Tests the post order latest endpoint but not the latest.
    """
    request = dict(
        inl_terminal='ITV', latest_dep_time=1000,
        truck_type='port', hierarchy=3, delivery_deadline='20:00',
        driving_time=10, process_time=1, service_time=2
    )
    rv = post_order(client, 'same dude', **request)

    assert rv.status_code == 404

# POST TRUCK TESTS


def test_post_truck(client, db):
    """
    Tests the intended use of the post truck endpoint.
    """
    request = dict(
        truck_id='45-TBD-1', availability=True,
        truck_type='terminal', business_type='ITV', terminal='ITV',
        hierarchy=2, use_cost=17, date='2020-10-01',
        starting_time='15:30'
    )
    rv = post_truck(client, 1, **request)

    assert rv.status_code == 200
    data = rv.get_json()
    truck = trucks.Truck.query.get(data['s_number'])
    assert truck.hierarchy == 2


def test_post_truck_invalid_truck_type(client, db):
    """
    Tests the post truck endpoint but with an invalid truck type.
    """
    request = dict(
        truck_id='45-TBD-1', availability=True,
        truck_type='Sand', business_type='test', terminal='KAT',
        hierarchy=2, use_cost=17, date='2020-10-01',
        starting_time='15:30'
    )
    rv = post_truck(client, 1, **request)
    assert rv.status_code == 400


def test_post_truck_invalid_terminal(client, db):
    """
    Tests the post truck endpoint but with an invalid terminal.
    """
    request = dict(
        truck_id='45-TBD-1', availability=True,
        truck_type='terminal', business_type='ITV', terminal='TEST',
        hierarchy=2, use_cost=17, date='2020-10-01',
        starting_time='15:30'
    )
    rv = post_truck(client, 1, **request)
    assert rv.status_code == 400


def test_post_truck_latest(client, db):
    """
    Tests the intended use of the post truck latest endpoint.
    """
    request = dict(
        truck_id='45-TBD-1', availability=True,
        truck_type='terminal', business_type='ITV', terminal='ITV',
        hierarchy=2, use_cost=17, date='2020-10-01',
        starting_time='15:30'
    )
    rv = post_truck(client, 'latest', **request)

    assert rv.status_code == 200
    data = rv.get_json()
    truck = trucks.Truck.query.get_or_404(data['s_number'])
    assert truck.hierarchy == 2


def test_post_truck_not_latest(client, db):
    """
    Tests the post truck latest endpoint but not the latest.
    """
    request = dict(
        truck_id='45-TBD-1', availability=True,
        truck_type='terminal', business_type='ITV', terminal='ITV',
        hierarchy=2, use_cost=17, date='2020-10-01',
        starting_time='15:30'
    )
    rv = post_truck(client, 'more testing = more better', **request)

    assert rv.status_code == 404


def test_post_truck_with_orders(client, db):
    """
    Tests the intended use of the post truck endpoint with an associated list
    of order numbers.
    """
    request = dict(
        truck_id='45-TBD-1', availability=True,
        truck_type='port', business_type='ITV', terminal='ITV',
        hierarchy=2, use_cost=17, date='2020-10-01',
        starting_time='10:00',
        orders=[dict(
            order_number=1,
            departure_time='12:30'
        ), dict(
            order_number=24,
            departure_time='10:00'
        )
        ]
    )
    rv = post_truck(client, 1, **request)

    assert rv.status_code == 200


def test_post_truck_with_wrong_orders(client, db):
    """
    Tests the post truck endpoint but with a list of order numbers that is
    invalid.
    """
    request = dict(
        truck_id='45-TBD-1', availability=True,
        truck_type='terminal', business_type='ITV', terminal='ITV',
        hierarchy=2, use_cost=17, date='2020-10-01',
        starting_time='15:30',
        orders=[dict(
            order_number=1,
            departure_time='12:30'
        ), dict(
            order_number=10000,
            departure_time='10:00'
        )
        ]

    )
    rv = post_truck(client, 1, **request)

    assert rv.status_code == 404


# DELETE ORDER TESTS


def test_delete_order(client, db):
    """
    Tests the intended use of the delete order endpoint.
    """
    rv = delete_order(client, 1)

    assert rv.status_code == 204

    # Check if order was deleted
    order = orders.Order.query.get(1)
    assert order is None

    # Check if there are any orders left
    order_list = orders.Order.query.filter_by(sheet_id=1).all()
    assert len(order_list) > 0


def test_delete_order_wrong(client, db):
    """
    Tests the delete order endpoint but with an invalid order number.
    """
    rv = delete_order(client, 100000)

    assert rv.status_code == 404

# DELETE TRUCK TESTS


def test_delete_truck(client, db):
    """
    Tests the intended use of the delete truck endpoint.
    """
    rv = delete_truck(client, 1)

    assert rv.status_code == 204

    # Check if the truck was deleted
    truck = trucks.Truck.query.get(1)
    assert truck is None

    # Check if there are any trucks left
    truck_list = trucks.Truck.query.filter_by(sheet_id=1).all()
    assert len(truck_list) > 0


def test_delete_truck_wrong(client, db):
    """
    Teststhe delete truck endpoint but with an invalid truck id.
    """
    rv = delete_truck(client, 100000)

    assert rv.status_code == 404


def test_delete_then_post_truck(client, db):
    """
    Tests the post truck endpoint after a truck is deleted.
    """
    request = dict(
        truck_id='45-TBD-1', availability=True,
        truck_type='port', business_type='ITV', terminal='ITV',
        hierarchy=2, use_cost=17, date='2020-10-01',
        starting_time='10:00',
        orders=[dict(
            order_number=1,
            departure_time='12:30'
        ), dict(
            order_number=24,
            departure_time='10:00'
        )
        ]
    )
    rv = delete_truck(client, 1)
    assert rv.status_code == 204

    rv2 = post_truck(client, 'latest', **request)
    assert rv2.status_code == 200

    data = rv2.get_json()
    truck = trucks.Truck.query.get(data['s_number'])
    assert truck.truck_id == '45-TBD-1'
    assert truck.use_cost == 17


def test_delete_then_post_order(client, db):
    """
    Tests the post order endpoint after an order is deleted.
    """
    request = dict(
        inl_terminal='ITV', latest_dep_time=1000,
        truck_type='port', hierarchy=3, delivery_deadline='20:00',
        driving_time=10, process_time=1, service_time=2
    )
    rv = delete_order(client, 2)
    assert rv.status_code == 204

    rv2 = post_order(client, 'latest', **request)
    assert rv2.status_code == 200

    data = rv2.get_json()
    order = orders.Order.query.get(data['order_number'])
    assert order.inl_terminal == 'ITV'
    assert order.process_time == 1

# TEST GET TIMELINE


@pytest.mark.parametrize('sheet_id', (2, 'latest'))
def test_get_timeline(client, db, sheet_id):
    """
    Tests the get timeline endpoint with correct sheet id identifiers
    """
    # Assign truck to order
    request = dict(
        truck_id=14,
        departure_time='08:00:00',
        Address='testStreet'
    )
    request['truck type'] = 'port'

    rv2 = patch_order(client, 141, **request)
    assert rv2.status_code == 200

    rv = get_timeline(client, sheet_id)
    assert rv.status_code == 200

    data = rv.get_json()
    expected = dict(
        address=request['Address'],
        booking_id='167617B',
        client=None,
        container_id='SEGU 628854 7',
        departure_time=request['departure_time'],
        truck_id=request['truck_id'],
        order_type=request['truck type'],
        end_time="13:00:00"
    )
    assert len(data) == 133
    assert expected in data


@pytest.mark.parametrize('sheet_id', ('random', 3))
def test_get_timeline_wrong_sheet(client, sheet_id):
    """
    Tests the get timeline endpoint with wrong sheet id identifiers
    """
    rv = get_timeline(client, sheet_id)
    assert rv.status_code == 404
