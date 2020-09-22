from marshmallow import validates, Schema, INCLUDE, EXCLUDE
from marshmallow.exceptions import ValidationError
from marshmallow.fields import String, Integer, Boolean, Float
from pandas import read_excel, notnull
from backend.extensions import TimeValidation as Time, DateValidation as Date


class TruckAvailabilitySchema(Schema):

    id = String(data_key='Truck ID', required=True)
    s_number = Integer(data_key='Truck S No', required=True)
    availability = Boolean(data_key='Availability of truck', required=True)
    truck_type = String(data_key='Truck type', required=True)
    business_type = String(data_key='business Type')
    terminal = String(data_key='Terminal Base', required=True)
    hierarchy = Float(data_key='Truck Hierarchy', required=True)
    use_cost = Float(data_key='Truck Use Cost', required=True)
    date = Date(data_key='Date', required=True)
    starting_time = Time(data_key='Starting time', required=True)

    class Meta:
        unknown = INCLUDE

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


class OrderListSchema(Schema):
    order_number = Integer(data_key='Order Number', required=True)
    # inl_terminal = String(data_key='Inl. ter.') TODO Check if required
    latest_dep_time = Integer(data_key='Latest Dep Time', required=True)
    truck_type = String(data_key='truck type', required=True)
    hierarchy = Float(data_key='Hierarchy', required=True)
    delivery_deadline = Float(data_key='Delivery Deadline', required=True)
    driving_time = Integer(data_key='driving time', required=True)
    process_time = Integer(data_key='proces time', required=True)
    service_time = Float(data_key='service time', required=True)

    class Meta:
        unknown = EXCLUDE

    # @validates('inl_terminal')
    # def validate_terminal(self, val):
    #     if val.lower() not in ['itv', 'kat', 'oss']:
    #         raise ValidationError('Terminal base must be one of '
    #                               'ITV, KAT or OSS.')

    @validates('truck_type')
    def validate_truck_type(self, val):
        if val.lower() not in ['terminal', 'regional', 'port']:
            raise ValidationError('Truck type must be one of '
                                  'terminal, regional or port.')


class SheetParser:
    unique_columns = set()
    required_columns = set()
    Schema = Schema  # TODO: I don't think this makes any sense

    def __init__(self, file):
        self.dataframe = self.get_dataframe(file)

    def check_required_columns(self):
        return self.required_columns.difference(self.dataframe.columns)

    def check_unique_columns(self):
        not_unique = set()
        for column in self.unique_columns:
            if not self.dataframe[column].is_unique:
                not_unique.add(column)
        return not_unique

    def parse(self):
        data_dict = [{k: v for k, v in row.items() if notnull(v)}
                     for row in self.dataframe.to_dict(orient='records')]
        return self.Schema(many=True).load(data_dict)

    @staticmethod
    def get_dataframe(file, *args, **kwargs):
        return read_excel(file, *args, **kwargs)


class TruckAvailabilityParser(SheetParser):
    unique_columns = {'Truck ID', 'Truck S No'}
    required_columns = {'Truck ID', 'Truck S No', 'Availability of truck',
                        'Truck type', 'Terminal Base', 'Truck Hierarchy',
                        'Truck Use Cost', 'Starting time', 'Date'}
    Schema = TruckAvailabilitySchema


class OrderListParser(SheetParser):
    unique_columns = {'Order Number'}
    required_columns = {'Order Number', 'Latest Dep Time', 'truck type',
                        'Hierarchy', 'Delivery Deadline', 'driving time',
                        'proces time', 'service time'}
    Schema = OrderListSchema
