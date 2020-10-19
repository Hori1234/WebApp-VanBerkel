from backend.extensions import Blueprint

bp = Blueprint('plannings',
               'plannings',
               description='Publish and view plannings')

# import is done after creating the blueprint to prevent cycling imports
from . import resources  # noqa: E402 F401
