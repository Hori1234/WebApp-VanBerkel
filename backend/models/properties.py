from sqlalchemy.orm.collections import attribute_mapped_collection
from backend.plugins import db


class PropertiesMixin(object):
    # The name and value of the property, works for both trucks and orders.
    key = db.Column(db.String, primary_key=True)
    value = db.Column(db.String, nullable=False)


class TruckProperties(PropertiesMixin, db.Model):
    # The truck the property belongs to
    s_number = db.Column(db.Integer,
                         db.ForeignKey('truck.s_number',
                                       ondelete='CASCADE'),
                         primary_key=True)

    truck = db.relationship('Truck', backref=db.backref(
                'properties',
                collection_class=attribute_mapped_collection('key'),
                cascade='all, delete-orphan'))


class OrderProperties(PropertiesMixin, db.Model):
    # The order the property belongs to
    order_number = db.Column(db.Integer,
                             db.ForeignKey('order.order_number',
                                           ondelete='CASCADE'),
                             primary_key=True)

    order = db.relationship('Order', backref=db.backref(
        'properties',
        collection_class=attribute_mapped_collection('key'),
        cascade='all, delete-orphan'))
