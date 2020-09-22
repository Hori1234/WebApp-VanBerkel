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
        file_2 = file.pop('file_2', None)

        try:
            missing_columns = None
            for Parser in (TruckAvailabilityParser, OrderListParser):
                parser = Parser(file_1)
                if len(parser.check_required_columns()) != 0:
                    if missing_columns:
                        if len(parser.check_required_columns()) \
                                < len(missing_columns):
                            missing_columns = parser.check_required_columns()
                        if len(missing_columns) >= 5:
                            abort(400,
                                  message="Spreadsheet is not recognized.",
                                  status="BAD REQUEST")
                        else:
                            abort(400,
                                  errors={i: "Column is missing."
                                          for i in missing_columns},
                                  status="BAD REQUEST"
                                  )
                    else:
                        missing_columns = parser.check_required_columns()
                        continue
                if len(parser.check_unique_columns()) != 0:
                    abort(400,
                          errors={i: "Column contains duplicate values."
                                  for i in parser.check_unique_columns()},
                          status="BAD REQUEST"
                          )
                data = parser.parse()
        except XLRDError:
            abort(400,
                  message="File type not supported."
                  )
        except ValidationError as e:
            return abort(
                400,
                errors=e.normalized_messages(),
                status="BAD REQUEST"
            )

        return '', 200
