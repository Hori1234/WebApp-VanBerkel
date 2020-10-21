from backend.app import ma
from backend.models import Planning


class PlanningSchema(ma.SQLAlchemyAutoSchema):

    class Meta:
        model = Planning
        include_fk = True
