from backend.app import ma
from marshmallow import INCLUDE, post_dump
from backend.models.orders import Order, OrderSheet


class OrderSchema(ma.SQLAlchemyAutoSchema):
    """
    Serializes the order table to JSON
    """

    latest_dep_time = ma.Time()
    service_time = ma.Integer()
    truck_id = ma.Integer(allow_none=True)
    others = ma.Dict(dump_only=True)

    class Meta:
        model = Order
        ordered = True
        dump_only = ('order_number',
                     'latest_dep_time',
                     'service_time')
        unknown = INCLUDE

    @post_dump
    def flatten_others(self, obj, many, **kwargs):
        """
        Flattens the others field of an order
        """
        for k, v in obj['others'].items():
            obj[k] = v
        obj.pop('others')
        return obj


class OrderTableSchema(ma.SQLAlchemySchema):

    orders = ma.Nested(OrderSchema, many=True)
    column_names = ma.Dict()

    class Meta:
        model = OrderSheet


class TimeLineSchemaOthers(ma.Schema):
    container_id = ma.String(default=None, attribute='Container')
    address = ma.String(default=None, attribute='Address')
    booking_id = ma.String(default=None, attribute='Booking')
    client = ma.String(default=None, attribute='Client')


class TimeLineSchema(ma.SQLAlchemySchema):

    truck_id = ma.Integer()
    departure_time = ma.Time()
    end_time = ma.Time()
    others = ma.Nested(TimeLineSchemaOthers)
    order_type = ma.String(attribute='truck_type')

    class Meta:
        model = OrderSheet

    @post_dump
    def flatten_others(self, obj, many, **kwargs):
        """
        Flattens the others field of an order
        """
        for k, v in obj['others'].items():
            obj[k] = v
        obj.pop('others')
        return obj
