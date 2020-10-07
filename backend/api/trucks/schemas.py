from backend.app import ma
from marshmallow import INCLUDE, post_dump
from backend.models.trucks import Truck


class TruckSchema(ma.SQLAlchemyAutoSchema):
    """
    Serializes the order table to JSON
    """

    class Meta:
        model = Truck
        ordered = True
        dump_only = ('s_number', )
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
