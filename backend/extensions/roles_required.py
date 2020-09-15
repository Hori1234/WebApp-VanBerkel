from flask import current_app, request
from flask_login import current_user
from flask_login.config import EXEMPT_METHODS
from functools import wraps


def roles_required(*roles):
    """
    Decorator to deny access to a view function if the user is not logged in or does not have the roles
    specified in `roles`.

    In case the user is not logged in or does not have one of the roles required, the function will return
    the :attr:`LoginManager.unauthorized` callback.

    Adapted from login_required from Flask-Login

    :param roles: the roles that are allowed to access the view function
    :type roles: list of strings
    """

    def wrapper(func):

        @wraps(func)
        def decorated_view(*args, **kwargs):
            if request.method in EXEMPT_METHODS:
                return func(*args, **kwargs)
            elif current_app.config.get('LOGIN_DISABLED'):
                return func(*args, **kwargs)
            elif not current_user.is_authenticated:
                return current_app.login_manager.unauthorized()

            # the user should have one of the roles required for this view
            elif current_user.role not in roles:
                return current_app.login_manager.unauthorized()

            # in case the user is logged in and has the right role, return
            # the view function
            return func(*args, **kwargs)

        return decorated_view

    return wrapper
