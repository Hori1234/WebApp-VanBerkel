from apispec.ext.marshmallow import common


def register_api(api):
    """
    Registers all blueprint to the API.

    Also adds the security scheme to the API documentation.

    :param api: The API flask plugin
    :type api: :class:`flask_smorest.Api`
    """

    # import all blueprints
    # this is done in the function to prevent cycled imports
    from .auth import bp as auth_bp
    from .sheets import bp as sheets_bp
    from .orders import bp as orders_bp
    from .trucks import bp as trucks_bp
    from .reports import bp as reports_bp

    # register all blueprints
    api.register_blueprint(auth_bp, url_prefix='/api/auth/')
    api.register_blueprint(sheets_bp, url_prefix='/api/sheets/')
    api.register_blueprint(orders_bp, url_prefix='/api/orders/')
    api.register_blueprint(trucks_bp, url_prefix='/api/trucks/')
    api.register_blueprint(reports_bp, url_prefix='/api/reports/')

    # document security scheme of the API (for the OpenAPI 3.0+ spec)
    api.spec.components.security_scheme(
        "cookieAuth", {"type": "apiKey",
                       "description":
                           "This API can be accessed using "
                           "cookie authentication with a basic login",
                       "in": "cookie",
                       "name": "session"
                       }
    )


def custom_name_resolver(schema):
    """
    Creates names for Marshmallow schemas in documentation.

    In case a schema is created using partial=`True`, `Partial-`
    will be added in front of the its name.

    In case a schema name ends with `Schema`, the `Schema` part
    is removed from the name.

    Adapted from https://github.com/marshmallow-code/apispec/pull/476/

    :param schema: Schema to name
    :type schema: `marshmallow.Schema`
    :return: The documented name for the schema
    :rtype: str
    """
    # Get an instance of the schema
    schema_instance = common.resolve_schema_instance(schema)
    if schema_instance.partial:
        prefix = "Patch-"
    elif schema_instance.only:
        prefix = "Partial-"
    else:
        prefix = ""

    # Get the class of the instance
    schema_cls = common.resolve_schema_cls(schema)
    name = prefix + schema_cls.__name__

    if name.endswith("Schema"):
        return name[:-6] or name
    return name
