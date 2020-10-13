import datetime
from flask import current_app
from sqlalchemy.sql import func
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm.collections import attribute_mapped_collection
from backend.app import db


class TruckSheet(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    upload_date = db.Column(db.DateTime, server_default=func.now())
    trucks = db.relationship('Truck', backref='trucksheet',
                             cascade='all, delete-orphan')

    @hybrid_property
    def column_names(self):
        property_names = TruckProperties.query.\
            with_entities(TruckProperties.key).join(Truck)\
            .filter(Truck.sheet_id == self.id).distinct().all()
        property_names = {name: name for name, in property_names}
        standard_names = {'s_number': 'S Number',
                          'truck_id': 'Truck ID',
                          'availability': 'Availability',
                          'truck_type': 'Truck type',
                          'business_type': 'Business type',
                          'terminal': 'Terminal',
                          'hierarchy': 'Hierarchy',
                          'use_cost': 'Use cost',
                          'date': 'Date',
                          'starting': 'Starting time'}
        return {**standard_names, **property_names}

    def add_row(self, truck):
        self.trucks.append(truck)

    def add_rows(self, rows):
        self.trucks.extend(rows)


class Truck(db.Model):
    s_number = db.Column(db.Integer, primary_key=True)
    sheet_id = db.Column(db.Integer,
                         db.ForeignKey('truck_sheet.id', ondelete='CASCADE'))
    truck_id = db.Column(db.String, nullable=False)
    availability = db.Column(db.Boolean, nullable=False)
    truck_type = db.Column(db.String, nullable=False)
    business_type = db.Column(db.String, nullable=False)
    terminal = db.Column(db.String, nullable=False)
    hierarchy = db.Column(db.Float, nullable=False)
    use_cost = db.Column(db.Float, nullable=False)
    date = db.Column(db.Date, nullable=False)
    starting_time = db.Column(db.Time, nullable=False)
    others = association_proxy('properties',
                               'value',
                               creator=lambda k, v:
                               TruckProperties(key=k, value=v))

    orders = db.relationship('Order', backref='truck')

    def __init__(self, truck_id: str, availability: bool,
                 truck_type: str, business_type: str, terminal: str,
                 hierarchy: float, use_cost: float, date: datetime.date,
                 starting_time: datetime.time, sheet_id: int = None, **kwargs):
        self.sheet_id = sheet_id
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

    @db.validates('terminal')
    def validate_terminal(self, key, value):
        terminals = current_app.config['TERMINALS']
        if value.upper() not in terminals:
            raise ValueError(
                f"Terminal base must be one of {', '.join(terminals[:-1])} "
                f"or {terminals[-1]}"
            )
        return value.upper()

    @db.validates('truck_type')
    def validate_truck_type(self, key, value):
        trucks = current_app.config['TRUCK_TYPES']
        if value.lower() not in trucks:
            raise ValueError(
                f"Truck type must be one of {', '.join(trucks[:-1])} "
                f"or {trucks[-1]}"
            )
        return value.lower()


class TruckProperties(db.Model):
    s_number = db.Column(db.Integer,
                         db.ForeignKey('truck.s_number',
                                       ondelete='CASCADE'),
                         primary_key=True)
    key = db.Column(db.String, primary_key=True)
    value = db.Column(db.String, nullable=False)

    truck = db.relationship(Truck, backref=db.backref(
                'properties',
                collection_class=attribute_mapped_collection('key'),
                cascade='all, delete-orphan'))
