from backend.app import ma
from backend.models.users import User


class LoginArguments(ma.SQLAlchemySchema):
    """
    Parameters needed for the login endpoint.
    """

    username = ma.auto_field(required=True,
                             description="The username of the user to login")
    password = ma.String(required=True,
                         format='password',
                         description="The password of the user to login")
    remember = ma.Bool(description="Whether the user should stay logged in "
                                   "after exiting the web application")

    class Meta:
        model = User
        ordered = True


class AccountInfo(ma.SQLAlchemySchema):
    """
    Account response object to a successful login request.
    """

    id = ma.auto_field(description="The ID of the user",
                       dump_only=True)
    username = ma.auto_field(description="The username of the user",
                             required=True)
    password = ma.String(description="The password of the user",
                         load_only=True,
                         required=True)
    role = ma.auto_field(description="The role of the user",
                         required=True)

    class Meta:
        model = User
        ordered = True


class AccountChange(ma.SQLAlchemySchema):
    """
    Account parameters for changing an account.
    """

    username = ma.auto_field(description="The username of the user",
                             required=False)
    password = ma.String(description="The password of the user",
                         required=False)
    role = ma.auto_field(description="The role of the user",
                         required=False)

    class Meta:
        model = User
        ordered = True
