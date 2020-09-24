from backend.app import ma
from flask_smorest.fields import Upload


class FileSchema(ma.Schema):
    """
    Parameters for the schema file upload.
    """
    file_1 = Upload(required=True)
