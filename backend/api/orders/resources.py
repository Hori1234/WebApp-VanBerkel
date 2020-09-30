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
        order_sheet = OrderSheet.query\
            .get_or_404(sheet_id,
                        description="Order sheet not found")
        return order_sheet.orders

    @roles_required('planner', 'administrator')
    @bp.arguments(OrderSchema)
    @bp.response(OrderSchema)
    @bp.alt_response('NOT_FOUND', code=404)
    def post(self, order, sheet_id):
        order_sheet = OrderSheet.query \
            .get_or_404(sheet_id,
                        description="Order sheet not found")
        new_order = Order(**order)
        order_sheet.add_row(new_order)
        db.session.commit()
        return new_order


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

    @roles_required('planner', 'administrator')
    @bp.arguments(OrderSchema(partial=True))
    @bp.response(OrderSchema)
    @bp.alt_response('UNAUTHORIZED', code=401)
    @bp.alt_response('NOT_FOUND', code=404)
    @bp.alt_response('SERVICE_UNAVAILABLE', code=503)
    def patch(self, req, sheet_id, order_id):
        try:
            order = Order.query.get_or_404(
                (sheet_id, order_id), description='Order not found.')

            for k, v in req.items():
                if k != "other" and hasattr(order, k):
                    setattr(order, k, v)
                else:
                    order.others[k] = v
            db.session.commit()
            return order, 200
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
