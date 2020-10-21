from backend.plugins import ma
from backend.models import Planning


class PlanningSchema(ma.SQLAlchemyAutoSchema):
    # this class is left intentionally empty

    class Meta:
        # Defines which model to use
        model = Planning
        include_fk = True
