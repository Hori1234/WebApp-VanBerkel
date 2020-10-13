from flask.views import MethodView
from . import bp
from backend.models.orders import Order, OrderSheet
from backend.extensions import roles_required
from .schemas import OrderSchema, OrderTableSchema
from backend.app import db
from flask_smorest import abort

# TODO: Write a method to do sheet ID or latest in a query class


@bp.route('/sheet/<sheet_id_or_latest>')
class Orders(MethodView):

    @roles_required('planner', 'administrator')
    @bp.response(OrderTableSchema)
    @bp.alt_response('UNAUTHORIZED', code=401)
    @bp.alt_response('NOT_FOUND', code=404)
    def get(self, sheet_id_or_latest):
        """
        Get a list of orders from an order sheet.

        In case `sheet_id_or_latest` is `latest`, the most recently uploaded
        order sheet will be used.

        Required roles: planner, administrator
        """
        try:
            # Try to parse the sheet_id to an int and get the order sheet
            order_sheet = OrderSheet.query\
                .get_or_404(int(sheet_id_or_latest),
                            description="Order sheet not found")
        except ValueError:
            # The sheet_id is not an integer, so check if it is `latest`
            if sheet_id_or_latest == 'latest':
                # Get the most recently uploaded sheet
                order_sheet = OrderSheet.query\
                    .order_by(OrderSheet.upload_date.desc())\
                    .first_or_404()
            else:
                # Can't understand which sheet is requested
                return abort(404, message='Order sheet not found')
        return order_sheet

    @roles_required('planner', 'administrator')
    @bp.arguments(OrderSchema)
    @bp.response(OrderSchema)
    @bp.alt_response('UNAUTHORIZED', code=401)
    @bp.alt_response('NOT_FOUND', code=404)
    def post(self, order, sheet_id_or_latest):
        """
        Create a new order in an order list.

        In case `sheet_id_or_latest` is `latest`, the most recently uploaded
        order sheet will be used.

        The request can contain any key value pair.
        If the key is not known, a new field will be created for it.

        Required roles: planner, administrator
        """
        try:
            # Try to parse the sheet_id to an int and get the order sheet
            order_sheet = OrderSheet.query \
                .get_or_404(int(sheet_id_or_latest),
                            description="Order sheet not found")
        except ValueError:
            # The sheet_id is not an integer, so check if it is `latest`
            if sheet_id_or_latest == 'latest':
                # Get the most recently uploaded sheet
                order_sheet = OrderSheet.query\
                    .order_by(OrderSheet.upload_date.desc())\
                    .first_or_404()
            else:
                # Can't understand which sheet is requested
                return abort(404, 'Order sheet not found')

        # Filter any None value in the request
        order = {k: v for k, v in order.items() if v is not None}

        # Create a new order with all parameters
        try:
            new_order = Order(**order)

            # Add the order to the order sheet
            order_sheet.add_row(new_order)
            db.session.commit()
            return new_order
        except ValueError as e:
            # Some values of the arguments are not allowed
            abort(400,
                  message=str(e),
                  status="Bad Request")


@bp.route('/<int:order_id>')
class OrderByID(MethodView):

    @roles_required('planner', 'administrator')
    @bp.response(OrderSchema)
    @bp.alt_response('UNAUTHORIZED', code=401)
    @bp.alt_response('NOT_FOUND', code=404)
    @bp.alt_response('SERVICE_UNAVAILABLE', code=503)
    def get(self, order_id):
        """
        Get a specific order on an order sheet.

        Required roles: planner, administrator
        """

        # try to get the order from the orders table
        order = Order.query.get_or_404(
            order_id,
            description="Order not found")
        return order

    @roles_required('planner', 'administrator')
    @bp.response(code=204)
    @bp.alt_response('UNAUTHORIZED', code=401)
    @bp.alt_response('NOT_FOUND', code=404)
    @bp.alt_response('SERVICE_UNAVAILABLE', code=503)
    def delete(self, order_id):
        """
        Delete a specific order from an order sheet.

        When an order is deleted, the other orders will get a new id assigned.

        Required roles: planner, administrator
        """

        # try to get the order from the orders table
        order = Order.query.get_or_404(
            order_id,
            description='Order not found')
        # delete the order
        db.session.delete(order)
        db.session.commit()
        return "", 204

    @roles_required('planner', 'administrator')
    @bp.arguments(OrderSchema(partial=True))
    @bp.response(OrderSchema)
    @bp.alt_response('BAD_REQUEST', code=400)
    @bp.alt_response('UNAUTHORIZED', code=401)
    @bp.alt_response('NOT_FOUND', code=404)
    @bp.alt_response('SERVICE_UNAVAILABLE', code=503)
    def patch(self, req, order_id):
        """
        Change a specific order from an order sheet.

        The request can contain any key value pair except the key 'others'.
        If the key is not known, a new field will be created for it.

        Required roles: planner, administrator
        """
        try:
            # Try to parse the sheet_id to an int and get the order
            order = Order.query.get_or_404(
                order_id,
                description='Order not found')

            # Iterate over the keys and values in the request
            for k, v in req.items():
                if k != "others" and hasattr(order, k):
                    # If the key has a column (except 'others')
                    # in the database, change it
                    setattr(order, k, v)
                else:
                    # If the key doesn't have column,
                    # place it in the other columns
                    # if the value is null,
                    # remove the key from the truck
                    if k in order.others and v is None:
                        del order.others[k]
                    elif v is not None:
                        order.others[k] = v

            db.session.commit()
            return order, 200
        except ValueError as e:
            # Some values of the arguments are not allowed
            abort(400,
                  message=str(e),
                  status="Bad Request"
                  )
