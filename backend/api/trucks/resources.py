from flask.views import MethodView
from . import bp
from backend.models.trucks import Truck, TruckSheet
from backend.extensions import roles_required
from .schemas import TruckSchema
from backend.app import db
from sqlalchemy.exc import SQLAlchemyError
from flask_smorest import abort


@bp.route('/<int:sheet_id>')
class Trucks(MethodView):
    @roles_required('planner', 'administrator')
    @bp.response(TruckSchema(many=True))
    @bp.alt_response('NOT_FOUND', code=404)
    def get(self, sheet_id):
        truck_sheet = TruckSheet.query.get_or_404(sheet_id)
        return truck_sheet.trucks

    @roles_required('planner', 'administrator')
    @bp.arguments(TruckSchema)
    @bp.response(TruckSchema)
    def post(self, truck, sheet_id):
        # TODO: Does not work yet
        truck = Truck(id=sheet_id, **truck)
        return truck


@bp.route('/<int:sheet_id>/<int:truck_id>')
class TruckByID(MethodView):
    @roles_required('planner', 'administrator')
    @bp.response(code=204)
    @bp.alt_response('UNAUTHORIZED', code=401)
    @bp.alt_response('NOT_FOUND', code=404)
    @bp.alt_response('SERVICE_UNAVAILABLE', code=503)
    def delete(self, sheet_id, truck_id):

        try:
            truck = Truck.query.get_or_404(
                (sheet_id, truck_id), description='Truck not found.')
            db.session.delete(truck)
            db.session.commit()
            return "", 204
        except SQLAlchemyError:
            abort(503,
                  message='Something went wrong on the server.',
                  status='Service Unavailable')

    @roles_required('planner', 'administrator')
    @bp.response(TruckSchema)
    @bp.alt_response('NOT_FOUND', code=404)
    def get(self, sheet_id, truck_id):
        truck = Truck.query.get_or_404((sheet_id, truck_id))
        return truck

    @roles_required('planner', 'administrator')
    @bp.arguments(TruckSchema(partial=True))
    @bp.response(TruckSchema)
    @bp.alt_response('UNAUTHORIZED', code=401)
    @bp.alt_response('NOT_FOUND', code=404)
    @bp.alt_response('SERVICE_UNAVAILABLE', code=503)
    def patch(self, req, sheet_id, truck_id):
        try:
            truck = Truck.query.get_or_404(
                (sheet_id, truck_id), description='Truck not found.')

            for k, v in req.items():
                if k != "others" and hasattr(truck, k):
                    setattr(truck, k, v)
                else:
                    truck.others[k] = v
            db.session.commit()
            return truck, 200
        except ValueError as e:
            # Some values of the arguments are not allowed
            abort(400,
                  message=str(e),
                  status="Bad Request"
                  )
        except SQLAlchemyError:
            # The database is unavailable
            abort(503,
                  message='Something went wrong on the server.',
                  status='SERVICE UNAVAILABLE')
