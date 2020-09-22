from backend.app import ma
from flask_smorest.fields import Upload


class FileSchema(ma.Schema):
    file_1 = Upload(required=True)
    file_2 = Upload()



