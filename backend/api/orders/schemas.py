from backend.app import ma
from marshmallow import INCLUDE, post_dump
from backend.models.orders import Order


class OrderSchema(ma.SQLAlchemyAutoSchema):
    """
    Serializes the order table to JSON
    """

    class Meta:
        model = Order
        ordered = True
        dump_only = ('order_number', )
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
