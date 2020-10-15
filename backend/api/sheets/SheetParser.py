import abc
import re
from typing import Type
import datetime
from flask import current_app
from marshmallow import validates, Schema, INCLUDE
from marshmallow.exceptions import ValidationError
from marshmallow.fields import String, Integer, Boolean, Float
from pandas import read_excel, notnull
from backend.extensions import TimeValidation as Time, DateValidation as Date
from backend.models.orders import Order, OrderSheet
from backend.models.trucks import Truck, TruckSheet
from backend.app import db


class TruckAvailabilitySchema(Schema):
    """
    The required contents of the truck availability sheet.

    On top of type checking, the schema will also validate that
    the truck_type string is one of 'terminal', 'regional' or 'port' and
    that the terminal string is one of 'ITV', 'KAT' or 'OSS'.

    Any additional columns in the data will also be parsed,
    but will not be tested against type.
    """

    truck_id = String(data_key='Truck ID', required=True)
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
        """
        trucks = current_app.config['TRUCK_TYPES']
        if val.lower() not in trucks:
            raise ValidationError(
                f"Truck type must be one of {', '.join(trucks[:-1])} "
                f"or {trucks[-1]}"
            )

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
        """
        terminals = current_app.config['TERMINALS']
        if val.upper() not in terminals:
            raise ValidationError(
                f"Terminal base must be one of {', '.join(terminals[:-1])} "
                f"or {terminals[-1]}"
            )


class OrderListSchema(Schema):
    """
    The required contents of the order list sheet.

    On top of type checking, the schema will also validate that
    the truck_type string is one of 'terminal', 'regional' or 'port' and
    that the inl_terminal string is one of 'ITV', 'KAT' or 'OSS'.

    Any additional columns in the data will also be parsed,
    but will not be tested against type.
    """
    inl_terminal = String(data_key='Inl* ter*', required=True)
    truck_type = String(data_key='truck type', required=True)
    hierarchy = Float(data_key='Hierarchy', required=True)
    delivery_deadline = Time(data_key='Delivery Deadline', required=True)
    driving_time = Integer(data_key='driving time', required=True)
    process_time = Integer(data_key='proces time', required=True)

    class Meta:
        unknown = INCLUDE

    @validates('inl_terminal')
    def validate_terminal(self, val):
        """
        Validates the terminal input.

        Raises a `ValidationError` if val is not one of 'KAT', 'ITV'
        or 'OSS'. This check is case insensitive.

        :param val: the value of the column
        :type val: str
        :raises :class:`marshmallow.exceptions.ValidationError`: if
        `val.lower()` is not `itv`, `kat` or `oss`.
        """
        terminals = current_app.config['TERMINALS']
        if val.upper() not in terminals:
            raise ValidationError(
                f"Terminal must be one of {', '.join(terminals[:-1])} "
                f"or {terminals[-1]}"
            )

    @validates('truck_type')
    def validate_truck_type(self, val):
        """
        Validates the truck type input.

        :param val: the value of the column
        :type val: str
        :raises :class:`marshmallow.exceptions.ValidationError`: if
        `val.lower()` is not `terminal`, `regional` or `port`.
        """
        trucks = current_app.config['TRUCK_TYPES']
        if val.lower() not in trucks:
            raise ValidationError(
                f"Truck type must be one of {', '.join(trucks[:-1])} "
                f"or {trucks[-1]}"
            )


class SheetParser(abc.ABC):
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
    ignored_columns: set
    """Set of column names which will be ignored."""
    schema: Type[Schema]
    """:class:`marshmallow.Schema` which validates the data
    on typing and missing values."""
    sheet_table: Type[db.Model]
    """:class:`flask_sqlalchemy.Model` Table that stores the data sheets"""
    row_table: Type[db.Model]
    """:class:`flask_sqlalchemy.Model`
    Table that stores the rows of the data sheets"""

    def __init__(self, file, *args, **kwargs):
        """Constructor method"""
        self.dataframe = self.get_dataframe(file, *args, **kwargs)

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
        data_dict = [{k: self.convert_time(v)
                      for k, v in row.items() if notnull(v)}
                     for row in self.dataframe.to_dict(orient='records')]
        return self.post_parse(self.schema(many=True).load(data_dict))

    @classmethod
    def get_dataframe(cls, file, *args, **kwargs):
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
        raw_df = read_excel(file,
                        usecols=lambda x: x not in cls.ignored_columns,
                        *args, **kwargs)
        if raw_df.columns.hasnans:
            print(raw_df)
            df = raw_df
        else:
            for i, row in raw_df.iterrows():
                if row.notnull().all():
                    df = raw_df.iloc[(i + 1):].reset_index(drop=True)
                    df.columns = list(raw_df.iloc[i])
                    break
        seen = dict()
        new_columns = []

        for c in df.columns:
            if c in seen:
                seen[c] += 1
                new_columns.append(f'{c} ({seen[c]})')
            else:
                seen[c] = 0
                new_columns.append(c)
        df.columns = new_columns
        return cls.post_dataframe(df)

    @staticmethod
    def post_dataframe(dataframe):
        """
        Template method to edit the dataframe before parsing for sub classes.

        :param dataframe: Result of reading `file` using pandas
        :type dataframe: :class:`pandas.DataFrame`
        :return: The (edited) dataframe
        :rtype: :class:`pandas.DataFrame`
        """
        return dataframe

    @staticmethod
    def post_parse(data):
        """
        Template method to edit the parsed data.

        :param data: The parsed data
        :type data: List[Dict]
        :return: The (edited) data
        :rtype: List[Dict]
        """
        return data

    @staticmethod
    def convert_time(value):
        if isinstance(value, datetime.time):
            return value.strftime('%H:%M')
        return value


class TruckAvailabilityParser(SheetParser):
    """
    Parses the truck availability sheet.
    """
    unique_columns = {'Truck ID'}
    required_columns = {'Truck ID', 'Availability of truck',
                        'Truck type', 'Terminal Base', 'Truck Hierarchy',
                        'Truck Use Cost', 'Starting time', 'Date'}
    ignored_columns = {'Truck S No'}
    schema = TruckAvailabilitySchema
    sheet_table = TruckSheet
    row_table = Truck


class OrderListParser(SheetParser):
    """
    Parses the order list sheet.
    """
    unique_columns = {}
    required_columns = {'Inl* ter*',
                        'truck type', 'Hierarchy', 'Delivery Deadline',
                        'driving time', 'proces time'}
    ignored_columns = {'Order Number', 'service time', 'Latest Dep Time'}
    schema = OrderListSchema
    sheet_table = OrderSheet
    row_table = Order

    def __init__(self, file):
        super().__init__(file, converters={'Delivery Deadline':
                                               self.round_float_to_int})

    @staticmethod
    def round_float_to_int(x):
        """
        Rounds a float to an integer if x is a float
        :param x: number to round
        :type x: float
        :return: number
        :rtype: int
        """
        if isinstance(x, float):
            return round(x)
        return x

    @staticmethod
    def post_dataframe(dataframe):
        # Change duplicate column names to read more easily
        # Example: 'Truck.1' is changed to 'Truck (1)'
        dataframe.columns = [re.sub(r'[.](\d+)', r' (\g<1>)', i)
                             for i in dataframe.columns]

        # Replace '.' with another character, as Marshmallow thinks that
        # a key, value item 'a.b': 'c' means {'a': {'b': 'c'}}
        dataframe.columns = [re.sub(r'[.]', '*', i) for i in dataframe.columns]
        return dataframe

    @staticmethod
    def post_parse(data):
        # Change back the replaced character in :meth:`post_dataframe`
        # to '.'
        for i in data:
            # Keys are the old column names, values are the new column names
            key_replacements = {}

            # Find new column names
            for key in i.keys():
                new_name = re.sub(r'[*]', r'.', key)
                key_replacements[key] = new_name

            # Replace old column names
            for key, new_name in key_replacements.items():
                i[new_name] = i.pop(key)

        return data
