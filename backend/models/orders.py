from backend.app import db
from sqlalchemy.sql import func
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm.collections import attribute_mapped_collection


class OrderSheet(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    upload_date = db.Column(db.DateTime, server_default=func.now())
    orders = db.relationship('Order', backref='ordersheet',
                             cascade='all, delete-orphan')

    def add_row(self, order):
        self.orders.append(order)

    def add_rows(self, rows):
        self.orders.extend(rows)


class Order(db.Model):
    order_number = db.Column(db.Integer, primary_key=True)
    sheet_id = db.Column(db.Integer,
                         db.ForeignKey('order_sheet.id', ondelete='CASCADE'))
    inl_terminal = db.Column(db.String, nullable=False)
    truck_type = db.Column(db.String, nullable=False)
    truck_id = db.Column(db.Integer,
                         db.ForeignKey('truck.s_number'))
    departure_time = db.Column(db.Integer)
    hierarchy = db.Column(db.Float, nullable=False)
    delivery_deadline = db.Column(db.Integer, nullable=False)
    driving_time = db.Column(db.Integer, nullable=False)
    process_time = db.Column(db.Integer, nullable=False)
    others = association_proxy('properties',
                               'value',
                               creator=lambda k, v:
                               OrderProperties(key=k, value=v))

    def __init__(self, inl_terminal: str, truck_type: str, hierarchy: float,
                 delivery_deadline: int, driving_time: int, process_time: int,
                 sheet_id: int = None, truck_id: int = None, **kwargs):
        self.id = sheet_id
        self.inl_terminal = inl_terminal
        self.truck_type = truck_type
        self.truck_id = truck_id
        self.hierarchy = hierarchy
        self.delivery_deadline = delivery_deadline
        self.driving_time = driving_time
        self.process_time = process_time
        self.others = kwargs

    @hybrid_property
    def service_time(self):
        return 2*self.driving_time + self.process_time

    @hybrid_property
    def latest_dep_time(self):
        return self.delivery_deadline - self.driving_time


class OrderProperties(db.Model):
    order_number = db.Column(db.Integer,
                             db.ForeignKey('order.order_number',
                                           ondelete='CASCADE'),
                             primary_key=True)
    key = db.Column(db.String, primary_key=True)
    value = db.Column(db.String, nullable=False)

    order = db.relationship(Order, backref=db.backref(
        'properties',
        collection_class=attribute_mapped_collection('key'),
        cascade='all, delete-orphan'))
