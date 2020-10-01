from flask.views import MethodView
from . import bp
from backend.models.orders import Order, OrderSheet
from backend.extensions import roles_required
from .schemas import OrderSchema
from backend.app import db
from sqlalchemy import func, and_
from sqlalchemy.exc import SQLAlchemyError
from flask_smorest import abort

# TODO: Write a method to do sheet ID or latest in a query class


@bp.route('/<sheet_id_or_latest>')
class Orders(MethodView):

    @roles_required('planner', 'administrator')
    @bp.response(OrderSchema(many=True))
    @bp.alt_response('UNAUTHORIZED', code=401)
    @bp.alt_response('NOT_FOUND', code=404)
    def get(self, sheet_id_or_latest):
        try:
            order_sheet = OrderSheet.query\
                .get_or_404(int(sheet_id_or_latest),
                            description="Order sheet not found")
        except ValueError:
            if sheet_id_or_latest == 'latest':
                order_sheet = OrderSheet.query\
                    .order_by(OrderSheet.upload_date.desc())\
                    .first_or_404()
            else:
                abort(404)
                return
        return order_sheet.orders

    @roles_required('planner', 'administrator')
    @bp.arguments(OrderSchema)
    @bp.response(OrderSchema)
    @bp.alt_response('UNAUTHORIZED', code=401)
    @bp.alt_response('NOT_FOUND', code=404)
    def post(self, order, sheet_id_or_latest):
        try:
            order_sheet = OrderSheet.query \
                .get_or_404(int(sheet_id_or_latest),
                            description="Order sheet not found")
        except ValueError:
            if sheet_id_or_latest == 'latest':
                order_sheet = OrderSheet.query\
                    .order_by(OrderSheet.upload_date.desc())\
                    .first_or_404()
            else:
                abort(404)
                return
        new_order = Order(**order)
        order_sheet.add_row(new_order)
        db.session.commit()
        return new_order


@bp.route('/<sheet_id_or_latest>/<int:order_id>')
class OrderByID(MethodView):

    @roles_required('planner', 'administrator')
    @bp.response(OrderSchema)
    @bp.alt_response('UNAUTHORIZED', code=401)
    @bp.alt_response('NOT_FOUND', code=404)
    @bp.alt_response('SERVICE_UNAVAILABLE', code=503)
    def get(self, sheet_id_or_latest, order_id):
        try:
            order = Order.query.get_or_404((int(sheet_id_or_latest), order_id))
        except ValueError:
            if sheet_id_or_latest == 'latest':
                latest_upload = db.session.query(
                    func.max(OrderSheet.upload_date))
                order = Order.query \
                    .join(OrderSheet, Order.ordersheet) \
                    .filter(and_(OrderSheet.upload_date == latest_upload,
                                 Order.order_number == order_id)) \
                    .first_or_404()
            else:
                abort(404)
                return
        except SQLAlchemyError:
            abort(503,
                  message='Something went wrong on the server.',
                  status='Service Unavailable')
            return
        return order

    @roles_required('planner', 'administrator')
    @bp.response(code=204)
    @bp.alt_response('UNAUTHORIZED', code=401)
    @bp.alt_response('NOT_FOUND', code=404)
    @bp.alt_response('SERVICE_UNAVAILABLE', code=503)
    def delete(self, sheet_id_or_latest, order_id):

        try:
            order = Order.query.get_or_404(
                (int(sheet_id_or_latest), order_id),
                description='Order not found.')
        except ValueError:
            if sheet_id_or_latest == 'latest':
                latest_upload = db.session.query(
                    func.max(OrderSheet.upload_date))
                order = Order.query \
                    .join(OrderSheet, Order.ordersheet) \
                    .filter(and_(OrderSheet.upload_date == latest_upload,
                                 Order.order_number == order_id)) \
                    .first_or_404()
            else:
                abort(404)
                return
        except SQLAlchemyError:
            abort(503,
                  message='Something went wrong on the server.',
                  status='Service Unavailable')
            return
        db.session.delete(order)
        db.session.commit()
        return "", 204

    @roles_required('planner', 'administrator')
    @bp.arguments(OrderSchema(partial=True))
    @bp.response(OrderSchema)
    @bp.alt_response('UNAUTHORIZED', code=401)
    @bp.alt_response('NOT_FOUND', code=404)
    @bp.alt_response('SERVICE_UNAVAILABLE', code=503)
    def patch(self, req, sheet_id_or_latest, order_id):
        try:
            order = Order.query.get_or_404(
                (int(sheet_id_or_latest), order_id),
                description='Order not found.')
        except ValueError:
            if sheet_id_or_latest == 'latest':
                latest_upload = db.session.query(
                    func.max(OrderSheet.upload_date))
                order = Order.query \
                    .join(OrderSheet, Order.ordersheet) \
                    .filter(and_(OrderSheet.upload_date == latest_upload,
                                 Order.order_number == order_id)) \
                    .first_or_404()
            else:
                abort(404)
                return

        try:
            for k, v in req.items():
                if k != "others" and hasattr(order, k):
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
