from backend.app import ma
from backend.models.orders import OrderSheet


class ReportSchema(ma.SQLAlchemyAutoSchema):

    class Meta:
        model = OrderSheet
