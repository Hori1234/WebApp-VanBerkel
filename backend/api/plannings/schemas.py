from backend.app import ma
from backend.models.planning import Planning


class PlanningSchema(ma.SQLAlchemyAutoSchema):

    class Meta:
        model = Planning
        include_fk = True
