from openpyxl import Workbook
import datetime
from backend.app import db
from backend.api.orders.schemas import OrderSchema
from backend.models.trucks import Truck, TruckSheet


def init():
    book = Workbook()
    sheet = book.active
    now = datetime.strftime("%x")

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

    # book.save(filename="")


def get_trucks(orders):
    trucklist = Truck.query.filter(orders.notnull)
    print(trucklist)
