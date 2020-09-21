from flask.views import MethodView
from flask_login import login_user, logout_user, current_user
from sqlalchemy import func
from backend.extensions import roles_required
from flask_smorest import abort
from . import bp
from .schemas import LoginArguments, AccountInfo
from backend.models.users import User


@bp.route('/login')
class Login(MethodView):

    @bp.arguments(LoginArguments)
    @bp.response(AccountInfo, headers={
        "Set-Cookie":
            {"schema": {"type": "string",
                        "example": "session=abcdefg123456; Path=/; HttpOnly"
                        },
             "description": "Setting the authorization cookie"
             }
    })
    @bp.alt_response('UNAUTHORIZED', code=401)
    def post(self, args):
        """
        Logs users into the system.
        """
        # get arguments from the request
        username = args.pop('username')
        password = args.pop('password')
        remember = args.pop('remember')

        # try find the user in the database
        user = User.query.filter(
            func.lower(User.username) == username.lower()
        ).first()

        # check if the user exists and if the provided password is correct
        if user is None or not user.check_password(password):
            abort(401, message='Username and/or password are wrong.')

        # sets the session (and remember me) cookie(s) on the browser
        login_user(user, remember)

        return user


@bp.route('/logout')
class Logout(MethodView):

    @roles_required("view-only", "planner", "administrator")
    @bp.response(code=204)
    @bp.alt_response('UNAUTHORIZED', code=401)
    def post(self):
        """
        Logs out the currently logged in user.

        Required roles: any
        """
        logout_user()
        return 204


@bp.route('/user')
class Users(MethodView):

    @roles_required("view-only", "planner", "administrator")
    @bp.response(AccountInfo)
    @bp.alt_response('UNAUTHORIZED', code=401)
    def get(self):
        """
        Checks the currently logged in user. Returns the account if the user
        is logged in.

        Required roles: any
        """
        return current_user
