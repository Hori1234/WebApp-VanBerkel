from backend.app import ma
from marshmallow import INCLUDE, post_dump
from backend.models.orders import Order, OrderSheet


class OrderSchema(ma.SQLAlchemyAutoSchema):
    """
    Serializes the order table to JSON
    """

    latest_dep_time = ma.Integer()
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
