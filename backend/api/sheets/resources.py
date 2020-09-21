from flask.views import MethodView
from backend.extensions import roles_required
from . import bp
from .schemas import FileSchema


@bp.route('/')
class Sheets(MethodView):

    @roles_required('planner', 'administrator')
    @bp.arguments(FileSchema, location='files')
    @bp.response(code=200)
    def post(self, file):
        """
        Parses the orders and truck availability sheets files.
        """
        file_1 = file.pop('file_1')  # file_1 is required, so is always here
        file_2 = file.pop('file_2', None)
        return '', 200
