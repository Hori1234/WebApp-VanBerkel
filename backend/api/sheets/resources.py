from flask.views import MethodView
from flask_smorest import abort
from xlrd import XLRDError
from marshmallow.exceptions import ValidationError
from backend.extensions import roles_required
from . import bp
from .schemas import FileSchema
from .SheetParser import TruckAvailabilityParser, OrderListParser


@bp.route('/')
class Sheets(MethodView):

    @roles_required('planner', 'administrator')
    @bp.arguments(FileSchema, location='files')
    @bp.response(code=200)
    @bp.alt_response("BAD_REQUEST", code=400)
    def post(self, file):
        """
        Parses the orders and truck availability sheets files.
        """
        file_1 = file.pop('file_1')  # file_1 is required, so is always here
        # file_2 = file.pop('file_2', None)

        try:
            missing_columns = None  # stores the missing columns of a parser

            for Parser in (TruckAvailabilityParser, OrderListParser):
                parser = Parser(file_1)  # instantiate the parser

                # Check if all required columns are in the excel sheet
                if len(parser.check_required_columns()) != 0:

                    if missing_columns:
                        # If the second parser also failed to parse

                        # Find the parser with the least missing columns
                        if len(parser.check_required_columns()) \
                                < len(missing_columns):
                            missing_columns = parser.check_required_columns()

                        # If there are 5 or more missing columns, we report
                        # that we didn't recognize the spreadsheet
                        if len(missing_columns) >= 5:
                            abort(400,
                                  message="Spreadsheet is not recognized.",
                                  status="Bad Request")

                        # If there are less than 5 columns missing, we report
                        # the missing columns.
                        else:
                            abort(422,
                                  errors={i: "Column is missing."
                                          for i in missing_columns},
                                  status="Unprocessable Entity"
                                  )
                    else:
                        # store the missing columns and try the next parser
                        missing_columns = parser.check_required_columns()
                        continue

                # check if the unique columns contain duplicate values
                if len(parser.check_unique_columns()) != 0:
                    abort(422,
                          errors={i: "Column contains duplicate values."
                                  for i in parser.check_unique_columns()},
                          status="Unprocessable Entity"
                          )

                # parse the data using a Marshmallow schema
                parser.parse()
        except XLRDError:
            # The file could not be read by the spreadsheet parser
            abort(400,
                  message="File type not supported."
                  )
        except ValidationError as e:
            # The data in the spreadsheet does not have the right type
            # or is missing
            return abort(
                422,
                errors=e.normalized_messages(),
                status="Unprocessable Entity"
            )

        return '', 200
