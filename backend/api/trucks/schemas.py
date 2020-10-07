from backend.app import ma
from marshmallow import INCLUDE, post_dump, post_load
from backend.models.trucks import Truck


class TruckSchema(ma.SQLAlchemyAutoSchema):
    """
    Serializes the order table to JSON
    """

    orders = ma.List(ma.Integer, load_only=True)
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

    @post_load
    def filter_none(self, obj, many, **kwargs):
        """
        Filters out None values in the columns unknown to the schema.
        """
        return {k: v for k, v in obj.items() if v is not None}
