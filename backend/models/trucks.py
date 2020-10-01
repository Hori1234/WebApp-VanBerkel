from backend.app import db
from sqlalchemy.sql import func
from sqlalchemy.ext.orderinglist import ordering_list
import datetime
from sqlalchemy.ext.mutable import MutableDict


class TruckSheet(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    upload_date = db.Column(db.DateTime, server_default=func.now())
    trucks = db.relationship('Truck', backref='trucksheet',
                             collection_class=ordering_list(
                                 "s_number", count_from=1),
                             cascade='all, delete-orphan')

    def add_rows(self, rows):
        self.trucks.extend(rows)


class Truck(db.Model):
    id = db.Column(db.Integer,
                   db.ForeignKey('truck_sheet.id', ondelete='CASCADE'),
                   primary_key=True)
    truck_id = db.Column(db.String, nullable=False)
    s_number = db.Column(db.Integer, primary_key=True)
    availability = db.Column(db.Boolean, nullable=False)
    truck_type = db.Column(db.String, nullable=False)
    business_type = db.Column(db.String, nullable=False)
    terminal = db.Column(db.String, nullable=False)
    hierarchy = db.Column(db.Float, nullable=False)
    use_cost = db.Column(db.Float, nullable=False)
    date = db.Column(db.Date, nullable=False)
    starting_time = db.Column(db.Time, nullable=False)
    others = db.Column(MutableDict.as_mutable(db.JSON))

    def __init__(self, truck_id: str, availability: bool,
                 truck_type: str, business_type: str, terminal: str,
                 hierarchy: float, use_cost: float, date: datetime.date,
                 starting_time: datetime.time, **kwargs):
        self.truck_id = truck_id
        self.availability = availability
        self.truck_type = truck_type
        self.business_type = business_type
        self.terminal = terminal
        self.hierarchy = hierarchy
        self.use_cost = use_cost
        self.date = date
        self.starting_time = starting_time
        self.others = kwargs
