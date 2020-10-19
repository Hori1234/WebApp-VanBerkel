from backend.app import ma
from backend.models.orders import OrderSheet


class SheetSchema(ma.SQLAlchemyAutoSchema):

    class Meta:
        model = OrderSheet
