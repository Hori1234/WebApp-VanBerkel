from flask.views import MethodView
from . import bp
from backend.models.orders import Order, OrderSheet
from backend.extensions import roles_required
from .schemas import OrderSchema


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
