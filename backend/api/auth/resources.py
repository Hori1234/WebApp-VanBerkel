from flask.views import MethodView
from flask_login import login_user, logout_user, current_user
from sqlalchemy import func
from sqlalchemy.exc import IntegrityError, SQLAlchemyError
from backend.app import db
from backend.extensions import roles_required
from flask_smorest import abort
from . import bp
from .schemas import LoginArguments, AccountInfo, AccountChange
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

    @roles_required("administrator")
    @bp.arguments(AccountInfo)
    @bp.response(AccountInfo, code=201)
    @bp.alt_response('BAD_REQUEST', code=400)
    @bp.alt_response('UNAUTHORIZED', code=401)
    @bp.alt_response('SERVICE_UNAVAILABLE', code=503)
    def post(self, req):
        """
        Creates a new user. Returns the account of the newly created user.

        Required roles: Administrator
        """
        try:
            # Try create a new user with the given arguments
            user = User(**req)
            db.session.add(user)
            db.session.commit()
            return user, 201
        except ValueError as e:
            # Some values of the arguments are not allowed
            abort(400,
                  message=str(e),
                  status="BAD REQUEST"
                  )
        except IntegrityError:
            # Username has already been taken. This is detected by the database
            abort(400,
                  message='Username has already been taken.',
                  status='BAD REQUEST')
        except SQLAlchemyError:
            # The database is unavailable
            abort(503,
                  message='Something went wrong on the server.',
                  status='SERVICE UNAVAILABLE')


@bp.route('/user/<int:user_id>')
class UserByID(MethodView):

    @roles_required("administrator")
    @bp.arguments(AccountChange)
    @bp.response(AccountInfo)
    @bp.alt_response('BAD_REQUEST', code=400)
    @bp.alt_response('UNAUTHORIZED', code=401)
    @bp.alt_response('NOT_FOUND', code=404)
    @bp.alt_response('SERVICE_UNAVAILABLE', code=503)
    def put(self, req, user_id):
        """
        Change the information of a user.

        Required roles: Administrator
        """
        try:
            # Find the user with user_id or respond with a 404
            user = User.query.get_or_404(user_id,
                                         description='User not found.')

            # The user is not able to change their own role
            if user == current_user and 'role' in req:
                abort(400,
                      message='You cannot change your own role',
                      status='BAD REQUEST')

            # For each argument in the request,
            # change the attribute of the user to the new value
            for k, v in req.items():
                setattr(user, k, v)

            db.session.commit()
            return user, 200
        except ValueError as e:
            # Some values of the arguments are not allowed
            abort(400,
                  message=str(e),
                  status="BAD REQUEST"
                  )
        except IntegrityError:
            # Username has already been taken. This is detected by the database
            abort(400,
                  message='Username has already been taken.',
                  status='BAD REQUEST')
        except SQLAlchemyError:
            # The database is unavailable
            abort(503,
                  message='Something went wrong on the server.',
                  status='SERVICE UNAVAILABLE')

    @roles_required("administrator")
    @bp.response(code=204)
    @bp.alt_response('UNAUTHORIZED', code=401)
    @bp.alt_response('NOT_FOUND', code=404)
    @bp.alt_response('SERVICE_UNAVAILABLE', code=503)
    def delete(self, user_id):
        """
        Delete a user from the system.

        The user cannot delete their own account. When the user tries,
        status code 400 is returned.
        Required roles: Administrator
        """
        try:
            # Find the user with user_id or respond with a 404
            user = User.query.get_or_404(user_id,
                                         description='User not found.')

            # The user cannot delete their own account
            if user == current_user:
                abort(400,
                      message='You cannot delete your own account.',
                      status='BAD REQUEST')

            # Delete the user
            db.session.delete(user)
            db.session.commit()
            return "", 204
        except SQLAlchemyError:
            # The database is unavailable
            abort(503,
                  message='Something went wrong on the server.',
                  status='SERVICE UNAVAILABLE')


@bp.route('/users')
class UserList(MethodView):

    @roles_required("administrator")
    @bp.response(AccountInfo(many=True))
    @bp.alt_response('UNAUTHORIZED', code=401)
    @bp.alt_response('NOT_FOUND', code=404)
    @bp.paginate()
    def get(self, pagination_parameters):
        """
        Get a list of users in the system.

        The list is served in pages. These can be controlled using
        the parameters in the query string.
        Roles required: Administrator
        """
        # Get a list of users according to the page and page_size parameters
        pagination = User.query.paginate(
            page=pagination_parameters.page,
            per_page=pagination_parameters.page_size)

        # Set the total number of users
        # for the X-Pagination header in the response
        pagination_parameters.item_count = pagination.total

        return pagination.items
