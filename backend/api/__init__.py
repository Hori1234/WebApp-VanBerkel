def register_api(api):
    """Registers all the namespaces to the api."""

    # import all blueprints
    # this is done in the function to prevent cycled imports
    from .auth import bp as auth_bp

    # register all blueprints
    api.register_blueprint(auth_bp, url_prefix='/api/auth/')
