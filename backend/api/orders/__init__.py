from backend.extensions import Blueprint

bp = Blueprint('orders',
               'orders',
               description='Request and change orders')

# import is done after creating the blueprint to prevent cycling imports
from . import resources  # noqa: E402 F401
