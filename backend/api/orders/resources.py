from flask.views import MethodView
from . import bp
from backend.models.orders import Order, OrderSheet
from backend.extensions import roles_required
from .schemas import OrderSchema
from backend.app import db
from sqlalchemy.exc import SQLAlchemyError
from flask_smorest import abort


@bp.route('/<int:sheet_id>')
class Orders(MethodView):
    @roles_required('planner', 'administrator')
    @bp.response(OrderSchema(many=True))
    @bp.alt_response('NOT_FOUND', code=404)
    def get(self, sheet_id):
        order_sheet = OrderSheet.query.get_or_404(sheet_id)
        return order_sheet.orders

    @roles_required('planner', 'administrator')
    @bp.arguments(OrderSchema)
    @bp.response(OrderSchema)
    def post(self, order, sheet_id):
        # TODO: Does not work yet
        order = Order(id=sheet_id, **order)
        return order


@bp.route('/<int:sheet_id>/<int:order_id>')
class OrderByID(MethodView):
    @roles_required('planner', 'administrator')
    @bp.response(code=204)
    @bp.alt_response('UNAUTHORIZED', code=401)
    @bp.alt_response('NOT_FOUND', code=404)
    @bp.alt_response('SERVICE_UNAVAILABLE', code=503)
    def delete(self, sheet_id, order_id):

        try:
            order = Order.query.get_or_404(
                (sheet_id, order_id), description='Order not found.')
            db.session.delete(order)
            db.session.commit()
            return "", 204
        except SQLAlchemyError:
            abort(503,
                  message='Something went wrong on the server.',
                  status='Service Unavailable')



