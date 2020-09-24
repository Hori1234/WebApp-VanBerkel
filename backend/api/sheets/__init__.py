from backend.extensions import Blueprint

bp = Blueprint('sheets',
               'sheets',
               description='Upload and parse sheets')

# import is done after creating the blueprint to prevent cycling imports
from . import resources  # noqa: E402 F401
