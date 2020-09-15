from flask.views import MethodView
from flask_login import login_user, logout_user
from backend.extensions.roles_required import roles_required
from . import bp
from .schemas import LoginArguments
from backend.models.users import User


@bp.route('/login')
class Login(MethodView):

    @bp.arguments(LoginArguments)
    @bp.response(code=200)
    def post(self, args):
        # get arguments from the request
        username = args.pop('username')
        password = args.pop('password')
        remember = args.pop('remember')

        # try find the user in the database
        user = User.query.filter_by(username=username).first()

        # check if the user exists and if the provided password is correct
        if not user or not user.check_password(password):
            return "Username and/or password are wrong", 404

        login_user(user, remember)  # sets the session (and remember me) cookie(s) on the browser

        return "", 200


@bp.route('/logout')
class Logout(MethodView):

    @bp.response(code=200)
    def post(self):
        logout_user()
        return "", 200
