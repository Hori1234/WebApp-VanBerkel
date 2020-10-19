from backend.extensions import Blueprint

bp = Blueprint('reports',
               'reports',
               description='Get report like first rides assignment')

# import is done after creating the blueprint to prevent cycling imports
from . import resources  # noqa: E402 F401