from flask.views import MethodView
from . import bp
from backend.models.trucks import Truck, TruckSheet
from backend.extensions import roles_required
from .schemas import TruckSchema
from backend.app import db
from sqlalchemy import func, and_
from sqlalchemy.exc import SQLAlchemyError
from flask_smorest import abort


@bp.route('/<sheet_id_or_latest>')
class Trucks(MethodView):
    @roles_required('planner', 'administrator')
    @bp.response(TruckSchema(many=True))
    @bp.alt_response('NOT_FOUND', code=404)
    def get(self, sheet_id_or_latest):
        try:
            truck_sheet = TruckSheet.query\
                .get_or_404(int(sheet_id_or_latest))
        except ValueError:
            if sheet_id_or_latest == 'latest':
                truck_sheet = TruckSheet.query\
                    .order_by(TruckSheet.upload_date.desc())\
                    .first_or_404()
            else:
                abort(404)
                return
        return truck_sheet.trucks

    @roles_required('planner', 'administrator')
    @bp.arguments(TruckSchema)
    @bp.response(TruckSchema)
    def post(self, truck, sheet_id_or_latest):
        try:
            truck_sheet = TruckSheet.query\
                .get_or_404(int(sheet_id_or_latest),
                            description="Order sheet not found")
        except ValueError:
            if sheet_id_or_latest == 'latest':
                truck_sheet = TruckSheet.query\
                    .order_by(TruckSheet.upload_date.desc())\
                    .first_or_404()
            else:
                abort(404)
                return
        new_truck = Truck(**truck)
        truck_sheet.add_row(new_truck)
        db.session.commit()
        return new_truck


@bp.route('/<sheet_id_or_latest>/<int:truck_id>')
class TruckByID(MethodView):

    @roles_required('planner', 'administrator')
    @bp.response(TruckSchema)
    @bp.alt_response('UNAUTHORIZED', code=401)
    @bp.alt_response('NOT_FOUND', code=404)
    @bp.alt_response('SERVICE_UNAVAILABLE', code=503)
    def get(self, sheet_id_or_latest, truck_id):
        try:
            truck = Truck.query.get_or_404((int(sheet_id_or_latest), truck_id))
        except ValueError:
            if sheet_id_or_latest == 'latest':
                latest_upload = db.session.query(
                    func.max(TruckSheet.upload_date))
                truck = Truck.query \
                    .join(TruckSheet, Truck.trucksheet) \
                    .filter(and_(TruckSheet.upload_date == latest_upload,
                                 Truck.s_number == truck_id)) \
                    .first_or_404()
            else:
                abort(404)
                return
        except SQLAlchemyError:
            abort(503,
                  message='Something went wrong on the server.',
                  status='Service Unavailable')
            return
        return truck

    @roles_required('planner', 'administrator')
    @bp.response(code=204)
    @bp.alt_response('UNAUTHORIZED', code=401)
    @bp.alt_response('NOT_FOUND', code=404)
    @bp.alt_response('SERVICE_UNAVAILABLE', code=503)
    def delete(self, sheet_id_or_latest, truck_id):
        try:
            truck = Truck.query.get_or_404((int(sheet_id_or_latest), truck_id))
        except ValueError:
            if sheet_id_or_latest == 'latest':
                latest_upload = db.session.query(
                    func.max(TruckSheet.upload_date))
                truck = Truck.query \
                    .join(TruckSheet, Truck.trucksheet) \
                    .filter(and_(TruckSheet.upload_date == latest_upload,
                                 Truck.s_number == truck_id)) \
                    .first_or_404()
            else:
                abort(404)
                return
        except SQLAlchemyError:
            abort(503,
                  message='Something went wrong on the server.',
                  status='Service Unavailable')
            return
        db.session.delete(truck)
        db.session.commit()
        return "", 204

    @roles_required('planner', 'administrator')
    @bp.arguments(TruckSchema(partial=True))
    @bp.response(TruckSchema)
    @bp.alt_response('UNAUTHORIZED', code=401)
    @bp.alt_response('NOT_FOUND', code=404)
    @bp.alt_response('SERVICE_UNAVAILABLE', code=503)
    def patch(self, req, sheet_id_or_latest, truck_id):
        try:
            truck = Truck.query.get_or_404((int(sheet_id_or_latest), truck_id))
        except ValueError:
            if sheet_id_or_latest == 'latest':
                latest_upload = db.session.query(
                    func.max(TruckSheet.upload_date))
                truck = Truck.query \
                    .join(TruckSheet, Truck.trucksheet) \
                    .filter(and_(TruckSheet.upload_date == latest_upload,
                                 Truck.s_number == truck_id)) \
                    .first_or_404()
            else:
                abort(404)
                return

        try:
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
