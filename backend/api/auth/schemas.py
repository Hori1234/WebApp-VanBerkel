from backend.app import ma
from backend.models.users import User


class LoginArguments(ma.SQLAlchemySchema):
    """
    Parameters needed for the login endpoint.
    """

    username = ma.auto_field(required=True)
    password = ma.String(required=True)
    remember = ma.Bool()

    class Meta:
        model = User
        ordered = True

