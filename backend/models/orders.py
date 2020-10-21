import datetime as dt
from flask import current_app
from marshmallow import ValidationError
from flask_smorest import abort
from flask_sqlalchemy import BaseQuery
from sqlalchemy.event import listens_for
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.ext.associationproxy import association_proxy
from backend.app import db
from backend.extensions import validate_truck_type, validate_terminal
from .mixins.ValidationMixin import ValidationMixin
from .trucks import Truck
from .properties import OrderProperties


class OrderQuery(BaseQuery):

    def get_all_or_404(self, list_of_ids):
        # Get all objects with ids from the list
        order_objects = self.filter(
            Order.order_number.in_(list_of_ids)) \
            .all()
        # if not all object were found, return 404
        if len(order_objects) != len(list_of_ids):
            abort(404,
                  message='Not all orders were found!',
                  status='Not Found')
        return order_objects


class Order(ValidationMixin, db.Model):
    query_class = OrderQuery

    order_number = db.Column(db.Integer, primary_key=True)
    sheet_id = db.Column(db.Integer,
                         db.ForeignKey('order_sheet.id', ondelete='CASCADE'))
    inl_terminal = db.Column(db.String, nullable=False)
    truck_type = db.Column(db.String, nullable=False)
    truck_id = db.Column(db.Integer,
                         db.ForeignKey('truck.s_number'))
    departure_time = db.Column(db.Time)
    hierarchy = db.Column(db.Float, nullable=False)
    delivery_deadline = db.Column(db.Time, nullable=False)
    driving_time = db.Column(db.Integer, nullable=False)
    process_time = db.Column(db.Integer, nullable=False)
    others = association_proxy('properties',
                               'value',
                               creator=lambda k, v:
                               OrderProperties(key=k, value=v))

    def __init__(self, inl_terminal: str, truck_type: str, hierarchy: float,
                 delivery_deadline: dt.time, driving_time: int,
                 process_time: int, sheet_id: int = None,
                 truck_id: int = None, departure_time: dt.time = None,
                 **kwargs):
        self.id = sheet_id
        self.inl_terminal = inl_terminal
        self.truck_type = truck_type
        self.hierarchy = hierarchy
        self.delivery_deadline = delivery_deadline
        self.driving_time = driving_time
        self.process_time = process_time
        self.truck_id = truck_id
        self.departure_time = departure_time
        self.others = kwargs

    @db.validates('departure_time')
    def validate_departure_time(self, key, value):
        if value is None:
            return None
        if value > self.latest_dep_time:
            raise ValueError(
                f'The latest departure time for this order is '
                f'{self.latest_dep_time.strftime("%H:%M")}, the truck cannot '
                f'depart at {value.strftime("%H:%M")}.'
            )
        if self.truck is None:
            truck = Truck.query.get_or_404(self.truck_id)
        else:
            truck = self.truck
        if value < truck.starting_time:
            raise ValueError(
                f'The truck\'s starting time is '
                f'{truck.starting_time.strftime("%H:%M")}, which is later'
                f' than the set departure time {value.strftime("%H:%M")}.'
            )
        return value

    @db.validates('truck', 'truck_id')
    def validate_truck(self, key, truck):
        if truck is None:
            return None

        # If `truck` is a key, get the truck associated
        if key == 'truck_id':
            truck = Truck.query.get_or_404(truck)

        truck_types = current_app.config['TRUCK_TYPES']

        # Check if the truck can carry out the order
        if truck_types.index(truck.truck_type) \
                < truck_types.index(self.truck_type):
            raise ValueError(
                f'The truck assigned to this order cannot carry out this order'
                f': The truck type is {truck.truck_type}, which cannot carry '
                f'out {self.truck_type} orders.'
            )

        # Return either the truck or the key
        if key == 'truck_id':
            return truck.s_number
        return truck

    @hybrid_property
    def service_time(self):
        return 2*self.driving_time + self.process_time

    @hybrid_property
    def latest_dep_time(self):
        time_as_date = dt.datetime.combine(dt.date(1, 1, 1),
                                           self.delivery_deadline)
        return (time_as_date - dt.timedelta(minutes=self.driving_time)).time()

    @hybrid_property
    def end_time(self):
        time_as_date = dt.datetime.combine(dt.date(1, 1, 1),
                                           self.departure_time)
        return (time_as_date +
                dt.timedelta(minutes=self.service_time)).time()


@listens_for(Order.truck_id, 'set')
def update_departure_time(target, truck, oldvalue, initiator):
    """
    Sets Order.departure_time to null if truck_id was set to null.
    """
    if truck is None and oldvalue is not None:
        target.departure_time = None
