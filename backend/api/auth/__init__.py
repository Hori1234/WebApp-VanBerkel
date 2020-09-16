from backend.extensions import Blueprint

bp = Blueprint('authentication', 'authentication', description='Authenticate and manage users')

from . import resources
