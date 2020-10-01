from backend.app import ma
from backend.models.orders import OrderSheet
from flask_smorest.fields import Upload


class FileSchema(ma.Schema):
    """
    Parameters for the schema file upload.
    """
    file_1 = Upload(required=True)


class SheetSchema(ma.SQLAlchemyAutoSchema):

    class Meta:
        model = OrderSheet
