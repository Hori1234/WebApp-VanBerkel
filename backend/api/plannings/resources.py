from flask.views import MethodView
from flask_smorest import abort
from flask_login import current_user
from . import bp
from .schemas import PlanningSchema
from backend.app import db
from backend.extensions import roles_required
from backend.models.planning import Planning
from backend.models.trucks import TruckSheet
from backend.models.orders import OrderSheet


@bp.route('/')
class Plannings(MethodView):

    @roles_required('view-only', 'planner', 'administrator')
    @bp.response(PlanningSchema(many=True))
    @bp.paginate()
    def get(self, pagination_parameters):
        # Get a list of plannings according to the page
        # and page_size parameters
        pagination = Planning.query. \
            order_by(Planning.published_on.desc()). \
            paginate(
                page=pagination_parameters.page,
                per_page=pagination_parameters.page_size)

        # Set the total number of plannings
        # for the X-Pagination header in the response
        pagination_parameters.item_count = pagination.total

        return pagination.items


@bp.route('/<truck_sheet_id>/<order_sheet_id>')
class PlanningByID(MethodView):

    @roles_required('view-only', 'planner', 'administrator')
    @bp.response(PlanningSchema)
    @bp.alt_response('NOT_FOUND', code=404)
    def get(self, truck_sheet_id, order_sheet_id):
        try:
            truck_sheet = TruckSheet.query \
                .get_or_404(int(truck_sheet_id),
                            description='Truck sheet not found')
        except ValueError:
            if truck_sheet_id == 'latest':
                truck_sheet = TruckSheet.query \
                    .order_by(TruckSheet.upload_date.desc()) \
                    .first_or_404()
            else:
                return abort(404, message='Truck sheet not found')

        try:
            order_sheet = OrderSheet.query \
                .get_or_404(int(order_sheet_id),
                            description='Order sheet not found')
        except ValueError:
            if order_sheet_id == 'latest':
                order_sheet = OrderSheet.query \
                    .order_by(OrderSheet.upload_date.desc()) \
                    .first_or_404()
            else:
                return abort(404, message='Truck sheet not found')

        return Planning.query.get_or_404((truck_sheet.id, order_sheet.id))

    @roles_required('planner', 'administrator')
    @bp.response(PlanningSchema)
    @bp.alt_response('BAD_REQUEST', code=400)
    @bp.alt_response('NOT_FOUND', code=404)
    def post(self, truck_sheet_id, order_sheet_id):
        try:
            truck_sheet = TruckSheet.query \
                .get_or_404(int(truck_sheet_id),
                            description='Truck sheet not found')
        except ValueError:
            if truck_sheet_id == 'latest':
                truck_sheet = TruckSheet.query \
                    .order_by(TruckSheet.upload_date.desc()) \
                    .first_or_404()
            else:
                return abort(404, message='Truck sheet not found')

        try:
            order_sheet = OrderSheet.query \
                .get_or_404(int(order_sheet_id),
                            description='Order sheet not found')
        except ValueError:
            if order_sheet_id == 'latest':
                order_sheet = OrderSheet.query \
                    .order_by(OrderSheet.upload_date.desc()) \
                    .first_or_404()
            else:
                return abort(404, message='Order sheet not found')

        if truck_sheet.planning is None and order_sheet.planning is None:
            planning = Planning(truck_sheet.id,
                                order_sheet.id,
                                current_user.id)
            db.session.add(planning)
            db.session.commit()
            return planning
        abort(400,
              message='Truck sheet or order sheet is already '
                      'used in a published planning')
