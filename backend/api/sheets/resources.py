from flask.views import MethodView
from flask_smorest import abort
import pandas as pd
from xlrd import XLRDError
from backend.extensions import roles_required
from . import bp
from .schemas import FileSchema


@bp.route('/')
class Sheets(MethodView):

    @roles_required('planner', 'administrator')
    @bp.arguments(FileSchema, location='files')
    @bp.response(code=200)
    @bp.response("BAD_REQUEST", code=400)
    def post(self, file):
        """
        Parses the orders and truck availability sheets files.
        """
        file_1 = file.pop('file_1')  # file_1 is required, so is always here
        file_2 = file.pop('file_2', None)

        try:
            df_1 = pd.read_excel(file_1)
            if file_2:
                df_2 = pd.read_excel(file_2)
        except XLRDError:
            abort(400, "File type not supported.")

        return '', 200
