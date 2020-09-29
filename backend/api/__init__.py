def register_api(api):
    """Registers all the namespaces to the api."""

    # import all blueprints
    # this is done in the function to prevent cycled imports
    from .auth import bp as auth_bp
    from .sheets import bp as sheets_bp
    from .orders import bp as orders_bp

    # register all blueprints
    api.register_blueprint(auth_bp, url_prefix='/api/auth/')
    api.register_blueprint(sheets_bp, url_prefix='/api/sheets/')
    api.register_blueprint(orders_bp, url_prefix='/api/orders/')

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
