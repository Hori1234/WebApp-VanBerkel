from backend.app import ma
from marshmallow import INCLUDE, post_dump
from backend.api.orders.schemas import OrderSchema
from backend.models.trucks import Truck, TruckSheet


class TruckSchema(ma.SQLAlchemyAutoSchema):
    """
    Serializes the order table to JSON
    """

    orders = ma.Nested(OrderSchema,
                       many=True,
                       only=('order_number', 'departure_time'),
                       load_only=True)
    others = ma.Dict(dump_only=True)

    class Meta:
        model = Truck
        ordered = True
        dump_only = ('s_number', )
        unknown = INCLUDE

    @post_dump
    def flatten_others(self, obj, many, **kwargs):
        """
        Flattens the others field of an order.
        """
        for k, v in obj['others'].items():
            obj[k] = v
        obj.pop('others')
        return obj


class TruckTableSchema(ma.SQLAlchemySchema):

    trucks = ma.Nested(TruckSchema, many=True)
    column_names = ma.Dict()

    class Meta:
        model = TruckSheet
