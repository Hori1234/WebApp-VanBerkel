from backend.app import db
from sqlalchemy.sql import func


class OrderSheet(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    upload_date = db.Column(db.DateTime, server_default=func.now())
    orders = db.relationship('Order', backref='ordersheet',
                             cascade='all, delete-orphan')

    def add_rows(self, rows):
        self.orders.extend(rows)


class Order(db.Model):
    id = db.Column(db.Integer,
                   db.ForeignKey('order_sheet.id', ondelete='CASCADE'),
                   primary_key=True)
    order_number = db.Column(db.Integer, primary_key=True, autoincrement=False)
    inl_terminal = db.Column(db.String, nullable=False)
    latest_dep_time = db.Column(db.Integer, nullable=False)
    truck_type = db.Column(db.String, nullable=False)
    hierarchy = db.Column(db.Float, nullable=False)
    delivery_deadline = db.Column(db.Integer, nullable=False)
    driving_time = db.Column(db.Integer, nullable=False)
    process_time = db.Column(db.Integer, nullable=False)
    service_time = db.Column(db.Integer, nullable=False)
    others = db.Column(db.JSON)

    def __init__(self, order_number: int, inl_terminal: str,
                 latest_dep_time: str, truck_type: str, hierarchy: float,
                 delivery_deadline: int, driving_time: int, process_time: int,
                 service_time: int, **kwargs):
        self.order_number = order_number
        self.inl_terminal = inl_terminal
        self.latest_dep_time = latest_dep_time
        self.truck_type = truck_type
        self.hierarchy = hierarchy
        self.delivery_deadline = delivery_deadline
        self.driving_time = driving_time
        self.process_time = process_time
        self.service_time = service_time
        self.others = kwargs
