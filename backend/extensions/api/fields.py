from marshmallow.fields import Date, Time
import datetime as dt
from pandas import Timestamp


class DateValidation(Date):

    def _deserialize(self, value, attr, data, **kwargs):
        if isinstance(value, Timestamp):
            return value.to_pydatetime()
        if isinstance(value, dt.date):
            return value
        return super()._deserialize(value, attr, data)


class TimeValidation(Time):

    def _deserialize(self, value, attr, data, **kwargs):
        if isinstance(value, dt.time):
            return value
        return super()._deserialize(value, attr, data)