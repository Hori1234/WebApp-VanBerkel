from backend.app import ma
from marshmallow import validates
from marshmallow.exceptions import ValidationError
from marshmallow.fields import String, Integer, Boolean, Float, DateTime, Time
from flask_smorest.fields import Upload


class FileSchema(ma.Schema):
    file_1 = Upload(required=True)
    file_2 = Upload()


class TruckAvailabilitySchema(ma.Schema):

    id = String(data_key='Truck ID', required=True)
    s_number = Integer(data_key='Truck S No', required=True)
    availability = Boolean(data_key='Availability of truck', required=True)
    truck_type = String(data_key='Truck type', required=True)
    business_type = String(data_key='business Type')
    driver = String(data_key='Driver')
    terminal = String(data_key='Terminal Base', required=True)
    owner = String(data_key='Owner')
    hierarchy = Float(data_key='Truck Hierarchy', required=True)
    use_cost = Float(data_key='Truck Use Cost', required=True)
    date = DateTime(data_key='Date', required=True)
    starting_time = Time(data_key='Starting time', required=True)
    remarks = String(data_key='Remarks', allow_none=True)

    @validates('truck_type')
    def validate_truck_type(self, val):
        if val.lower() not in ['terminal', 'regional', 'port']:
            raise ValidationError('Truck type must be one of '
                                  'terminal, regional or port.')

    @validates('terminal')
    def validate_terminal(self, val):
        if val.lower() not in ['itv', 'kat', 'oss']:
            raise ValidationError('Terminal base must be one of '
                                  'ITV, KAT or OSS.')
