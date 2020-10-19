from flask_smorest import abort
from flask.views import MethodView
from sqlalchemy import func, and_
from . import bp
from openpyxl import Workbook
import time
from backend.app import db
from backend.api.orders.schemas import OrderSchema
from backend.models.trucks import Truck, TruckSheet
from backend.models.orders import Order, OrderSheet
from backend.extensions import roles_required


@bp.route('/firstrides/<sheet_id_or_latest>')
class FirstRides(MethodView):

    @roles_required('planner', 'administrator')
    def get(self, sheet_id_or_latest):
        """
        Get a workbook containing a first rides report from an order sheet.

        In case 'sheet_id_or_latest is 'latest', the most recently uploaded
        order sheet will be used.
        """
        print('fuck')
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
                return abort(404, message='Order sheet not found')

        sheet_id = order_sheet.id

        subq = db.session.query(
            Order.truck_id,
            func.min(Order.departure_time).label('mintime')
        ).group_by(Order.truck_id).filter(Order.sheet_id == sheet_id) \
            .subquery()

        first_orders = db.session.query(Order).join(
            subq,
            and_(
                Order.truck_id == subq.c.truck_id,
                Order.departure_time == subq.c.mintime
            )
        ).all()

        print(first_orders)

        book = Workbook()
        sheet = book.active
        now = time.strftime("%x")

        sheet['A1'] = now
        sheet['C4'] = 'Sno'
        sheet['D4'] = 'Driver Name'
        sheet['E4'] = 'Truck ID'
        sheet['F4'] = 'Terminal'
        sheet['G4'] = 'chassis'
        sheet['H4'] = 'Starting Time'
        sheet['I4'] = 'Delivery Deadline'
        sheet['J4'] = 'Customer'
        sheet['K4'] = 'Container No.'
        sheet['L4'] = 'City'
        sheet['M4'] = 'Container Type'
        sheet['N4'] = 'Shipping company'
        sheet['O4'] = 'Remarks'

        count = 4
        for order in first_orders:
            count = count + 1

            sheet.cell(row=count, column=3).value = \
                order.truck.s_number  # s number
            sheet.cell(row=count, column=4).value = \
                order.truck.others.get('Driver', '')   # driver
            sheet.cell(row=count, column=5).value = \
                order.truck.truck_id  # truck id
            sheet.cell(row=count, column=6).value = \
                order.inl_terminal  # terminal
            sheet.cell(row=count, column=7).value = \
                ''  # chassis?
            sheet.cell(row=count, column=8).value = \
                order.departure_time  # dep time
            sheet.cell(row=count, column=9).value = \
                order.delivery_deadline  # deadline
            sheet.cell(row=count, column=10).value = \
                order.others.get('Client', '')  # client
            sheet.cell(row=count, column=11).value = \
                order.others.get('Container', '')  # container number
            sheet.cell(row=count, column=12).value = \
                order.others.get('City', '')  # city
            sheet.cell(row=count, column=13).value = \
                order.others.get('Unit type', '')  # container type
            sheet.cell(row=count, column=14).value = \
                order.others.get('Ship. comp.', '')  # shipping company
            sheet.cell(row=count, column=15).value = \
                order.truck.others.get('Remarks', '')  # remarks

        book.save(filename='first-rides.xlsx')
        return '', 200
