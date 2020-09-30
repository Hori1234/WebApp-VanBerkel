from backend.app import ma
from marshmallow import INCLUDE, post_dump
from backend.models.orders import Order


class OrderSchema(ma.SQLAlchemyAutoSchema):
    """
    Serializes the order table to JSON
    """

    latest_dep_time = ma.Integer()
    service_time = ma.Integer()

    class Meta:
        model = Order
        ordered = True
        dump_only = ('order_number', 'latest_dep_time', 'service_time', 'others')
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