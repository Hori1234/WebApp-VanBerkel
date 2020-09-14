from flask_smorest import Blueprint

bp = Blueprint('authentication', 'authentication', description='Authenticate and manage users')

from . import authentication
