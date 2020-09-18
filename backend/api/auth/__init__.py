from backend.extensions import Blueprint

bp = Blueprint('authentication',
               'authentication',
               description='Authenticate and manage users')

# import is done after creating the blueprint to prevent cycling imports
from . import resources  # noqa: E402 F401
