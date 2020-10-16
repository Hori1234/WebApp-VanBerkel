from backend.extensions import Blueprint

bp = Blueprint('trucks',
               'trucks',
               description='Request and change truck availability')

# import is done after creating the blueprint to prevent cycling imports
from . import resources  # noqa: E402 F401
