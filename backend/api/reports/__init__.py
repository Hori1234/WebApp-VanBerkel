from backend.extensions import Blueprint

# import is done after creating the blueprint to prevent cycling imports
from . import resources  # noqa: E402 F401
