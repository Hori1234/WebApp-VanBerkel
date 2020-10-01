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
        """
        Get a list of truck from a truck sheet.

        In case `sheet_id_or_latest` is `latest`, the most recently uploaded
        truck sheet will be used.

        Required roles: planner, administrator
        """
        try:
            # Try to parse the sheet_id to an int and get the truck sheet
            truck_sheet = TruckSheet.query\
                .get_or_404(int(sheet_id_or_latest),
                            description='Truck sheet not found')
        except ValueError:
            # The sheet_id is not an integer, so check if it is `latest`
            if sheet_id_or_latest == 'latest':
                # Get the most recently uploaded sheet
                truck_sheet = TruckSheet.query\
                    .order_by(TruckSheet.upload_date.desc())\
                    .first_or_404()
            else:
                # Can't understand which sheet is requested
                abort(404, message='Truck sheet not found')
                return
        return truck_sheet.trucks

    @roles_required('planner', 'administrator')
    @bp.arguments(TruckSchema)
    @bp.response(TruckSchema)
    def post(self, truck, sheet_id_or_latest):
        """
        Create a new truck in a truck list.

        In case `sheet_id_or_latest` is `latest`, the most recently uploaded
        truck sheet will be used.

        The request can contain any key value pair.
        If the key is not known, a new field will be created for it.

        Required roles: planner, administrator
        """
        try:
            # Try to parse the sheet_id to an int and get the truck sheet
            truck_sheet = TruckSheet.query \
                .get_or_404(int(sheet_id_or_latest),
                            description='Truck sheet not found')
        except ValueError:
            # The sheet_id is not an integer, so check if it is `latest`
            if sheet_id_or_latest == 'latest':
                # Get the most recently uploaded sheet
                truck_sheet = TruckSheet.query \
                    .order_by(TruckSheet.upload_date.desc()) \
                    .first_or_404()
            else:
                # Can't understand which sheet is requested
                abort(404, message='Truck sheet not found')
                return
        # Create a new truck with all parameters
        new_truck = Truck(**truck)

        # Reorder the truck ids, in case an order was deleted
        # outside of the application
        truck_sheet.trucks.reorder()
        db.session.flush()

        # Add the truck to the truck sheet
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
        """
        Get a specific truck on a truck sheet.

        In case `sheet_id_or_latest` is `latest`, the most recently uploaded
        truck sheet will be used.

        Required roles: planner, administrator
        """
        try:
            # Try to parse the sheet_id to an int and get the truck
            truck = Truck.query.get_or_404(
                (int(sheet_id_or_latest), truck_id),
                description='Truck not found')
        except ValueError:
            # The sheet_id is not an integer, so check if it is `latest`
            if sheet_id_or_latest == 'latest':
                # Check the truck id on the most recently uploaded sheet
                latest_upload = db.session.query(
                    func.max(TruckSheet.upload_date))
                truck = Truck.query \
                    .join(TruckSheet, Truck.trucksheet) \
                    .filter(and_(TruckSheet.upload_date == latest_upload,
                                 Truck.s_number == truck_id)) \
                    .first_or_404()
            else:
                # Can't understand which sheet is requested
                abort(404, message='Truck not found')
                return
        except SQLAlchemyError:
            abort(503,
                  message='Something went wrong on the server.',
                  status='Service Unavailable')
            return
        return truck

    # TODO: make delete idempotent
    @roles_required('planner', 'administrator')
    @bp.response(code=204)
    @bp.alt_response('UNAUTHORIZED', code=401)
    @bp.alt_response('NOT_FOUND', code=404)
    @bp.alt_response('SERVICE_UNAVAILABLE', code=503)
    def delete(self, sheet_id_or_latest, truck_id):
        """
        Delete a specific truck from a truck sheet.

        In case `sheet_id_or_latest` is `latest`, the most recently uploaded
        truck sheet will be used.

        When a truck is deleted, the other trucks will get a new id assigned.

        WARNING: currently this function is not idempotent.

        Required roles: planner, administrator
        """
        try:
            # Try to parse the sheet_id to an int and get the truck sheet
            truck_sheet = TruckSheet.query.get_or_404(
                int(sheet_id_or_latest),
                description='Truck not found')
        except ValueError:
            # The sheet_id is not an integer, so check if it is `latest`
            if sheet_id_or_latest == 'latest':
                # Check the truck id on the most recently uploaded sheet
                truck_sheet = TruckSheet.query \
                    .order_by(TruckSheet.upload_date.desc()) \
                    .first_or_404()
            else:
                # Can't understand which sheet is requested
                abort(404, message='Truck not found')
                return
        except SQLAlchemyError:
            abort(503,
                  message='Something went wrong on the server.',
                  status='Service Unavailable')
            return

        try:
            # Delete through the truck sheet, so it can rearrange the truck
            # no's of the trucks
            db.session.delete(truck_sheet.trucks[truck_id - 1])
            db.session.flush()  # make changes to the database
            db.session.refresh(truck_sheet)  # refresh the sheet in memory
            truck_sheet.trucks.reorder()  # reorder the truck no's of the sheet
            db.session.commit()
            return "", 204
        except IndexError:
            abort(404, message='Truck not found')

    @roles_required('planner', 'administrator')
    @bp.arguments(TruckSchema(partial=True))
    @bp.response(TruckSchema)
    @bp.alt_response('UNAUTHORIZED', code=401)
    @bp.alt_response('NOT_FOUND', code=404)
    @bp.alt_response('SERVICE_UNAVAILABLE', code=503)
    def patch(self, req, sheet_id_or_latest, truck_id):
        """
        Change a specific truck from a truck sheet.

        In case `sheet_id_or_latest` is `latest`, the most recently uploaded
        truck sheet will be used.

        The request can contain any key value pair except the key 'others'.
        If the key is not known, a new field will be created for it.

        Required roles: planner, administrator
        """
        try:
            # Try to parse the sheet_id to an int and get the truck
            truck = Truck.query.get_or_404((int(sheet_id_or_latest), truck_id))
        except ValueError:
            # The sheet_id is not an integer, so check if it is `latest`
            if sheet_id_or_latest == 'latest':
                # Check the truck id on the most recently uploaded sheet
                latest_upload = db.session.query(
                    func.max(TruckSheet.upload_date))
                truck = Truck.query \
                    .join(TruckSheet, Truck.trucksheet) \
                    .filter(and_(TruckSheet.upload_date == latest_upload,
                                 Truck.s_number == truck_id)) \
                    .first_or_404()
            else:
                # Can't understand which sheet is requested
                abort(404)
                return

        try:
            # Iterate over the keys and values in the request
            for k, v in req.items():
                if k != "others" and hasattr(truck, k):
                    # If the key has a column (except 'others')
                    # in the database, change it
                    setattr(truck, k, v)
                else:
                    # If the key doesn't have column,
                    # place it in the other columns
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
