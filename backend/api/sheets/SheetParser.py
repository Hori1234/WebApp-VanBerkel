from abc import ABC
from typing import Type
from marshmallow import validates, Schema, INCLUDE, EXCLUDE
from marshmallow.exceptions import ValidationError
from marshmallow.fields import String, Integer, Boolean, Float
from pandas import read_excel, notnull
from backend.extensions import TimeValidation as Time, DateValidation as Date


class TruckAvailabilitySchema(Schema):
    """
    The required contents of the truck availability sheet.

    On top of type checking, the schema will also validate that
    the truck_type string is one of 'terminal', 'regional' or 'port' and
    that the terminal string is one of 'ITV', 'KAT' or 'OSS'.

    Any additional columns in the data will also be parsed,
    but will not be tested against type.
    """

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
        """
        Validates the truck type input.

        Raises a `ValidationError` if val is not one of 'terminal', 'regional'
        or 'port'. This check is case insensitive.

        :param val: the value of the column.
        :type val: str
        :raises :class:`marshmallow.exceptions.ValidationError`: if
                `val.lower()` is not `terminal`, `regional` or `port`.
        """""
        if val.lower() not in ['terminal', 'regional', 'port']:
            raise ValidationError('Truck type must be one of '
                                  'terminal, regional or port.')

    @validates('terminal')
    def validate_terminal(self, val):
        """
        Validates the terminal input.

        Raises a `ValidationError` if val is not one of 'KAT', 'ITV'
        or 'OSS'. This check is case insensitive.

        :param val: the value of the column.
        :type val: str
        :raises :class:`marshmallow.exceptions.ValidationError`: if
        `val.lower()` is not `itv`, `kat` or `oss`.
        """""
        if val.lower() not in ['itv', 'kat', 'oss']:
            raise ValidationError('Terminal base must be one of '
                                  'ITV, KAT or OSS.')


class OrderListSchema(Schema):
    """
    The required contents of the order list sheet.

    On top of type checking, the schema will also validate that
    the truck_type string is one of 'terminal', 'regional' or 'port' and
    that the inl_terminal string is one of 'ITV', 'KAT' or 'OSS'.

    Any additional columns in the data will also be parsed,
    but will not be tested against type.
    """
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
    # """
    # Validates the terminal input.
    #
    # Raises a `ValidationError` if val is not one of 'KAT', 'ITV'
    # or 'OSS'. This check is case insensitive.
    #
    # :param `str` val: the value of the column
    # """""
    #     if val.lower() not in ['itv', 'kat', 'oss']:
    #         raise ValidationError('Terminal base must be one of '
    #                               'ITV, KAT or OSS.')

    @validates('truck_type')
    def validate_truck_type(self, val):
        """
        Validates the truck type input.

        :param val: the value of the column
        :type val: str
        :raises :class:`marshmallow.exceptions.ValidationError`: if
        `val.lower()` is not `terminal`, `regional` or `port`.
        """""
        if val.lower() not in ['terminal', 'regional', 'port']:
            raise ValidationError('Truck type must be one of '
                                  'terminal, regional or port.')


class SheetParser(ABC):
    """
    Base class for parsing spreadsheet files and validating them.

    :param file: The spreadsheet file.
    :type file: :class:`Werkzeug.FileStorage`, alternatively, a file like
                object that is supported by :meth:`Pandas.read_excel`
    """

    unique_columns: set
    """Set of column names in which the values need to be unique."""
    required_columns: set
    """Set of column names in which all values are required."""
    schema: Type[Schema]
    """:class:`marshmallow.Schema` which validates the data
    on typing and missing values."""

    def __init__(self, file):
        """Constructor method"""
        self.dataframe = self.get_dataframe(file)

    def check_required_columns(self):
        """
        Checks for each required column in `required_columns` if it is present
        is the excel sheet.

        :return: The names of the columns that are missing.
        :rtype: set
        """
        return self.required_columns.difference(self.dataframe.columns)

    def check_unique_columns(self):
        """
        Checks for each unique column in `unique_columns` if the values in the
        column are unique.

        :return: The names of the columns that contain duplicate values.
        :rtype: set
        """
        not_unique = set()
        for column in self.unique_columns:
            if not self.dataframe[column].is_unique:
                not_unique.add(column)
        return not_unique

    def parse(self):
        """
        Parses and validates the data from the file into a `List[dict]`.

        This list contains a dictionary for each row. In case the data of the
        spreadsheet can be converted to an internal Python object, the
        data will get converted.

        The dictionary of each row has keys for each column that has been
        parsed. The value belonging to that key is the value of that column
        in the row of the dictionary.

        :raises :class:`marshmallow.exceptions.ValidationError`:
                  If the Marshmallow validation failed.
        :return: The data that has been parsed and validated.
        :rtype: `List[dict]`
        """
        data_dict = [{k: v for k, v in row.items() if notnull(v)}
                     for row in self.dataframe.to_dict(orient='records')]
        return self.schema(many=True).load(data_dict)

    @staticmethod
    def get_dataframe(file, *args, **kwargs):
        """
        Converts the data in `file` to a `:class:Pandas.DataFrame`.

        :param file: The file to be parsed.
        :type file: :class:`werkzeug.FileStorage`, alternatively, a file like
                object that is supported by :meth:`pandas.read_excel`
        :param args: Additional arguments to send to :meth:`Pandas.read_excel`.
        :param kwargs: Additional keyword arguments to send
                       to :meth:`pandas.read_excel`
        :raises :class:`xldr.XLDRError`: if `file` is not a spreadsheet file.
        :return: A :class:`pandas.DataFrame` containing the data from `file`.
        :rtype: :class:`pandas.DataFrame`
        """
        return read_excel(file, *args, **kwargs)


class TruckAvailabilityParser(SheetParser):
    """
    Parses the truck availability sheet.
    """
    unique_columns = {'Truck ID', 'Truck S No'}
    required_columns = {'Truck ID', 'Truck S No', 'Availability of truck',
                        'Truck type', 'Terminal Base', 'Truck Hierarchy',
                        'Truck Use Cost', 'Starting time', 'Date'}
    schema = TruckAvailabilitySchema


class OrderListParser(SheetParser):
    """
    Parses the order list sheet.
    """
    unique_columns = {'Order Number'}
    required_columns = {'Order Number', 'Latest Dep Time', 'truck type',
                        'Hierarchy', 'Delivery Deadline', 'driving time',
                        'proces time', 'service time'}
    schema = OrderListSchema
