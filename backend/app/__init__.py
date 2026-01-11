
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from flask_jwt_extended import JWTManager

db = SQLAlchemy()
migrate = Migrate()

def create_app(test_config=None):
    app = Flask(__name__)

    app.config["JWT_TOKEN_LOCATION"] = ["headers"]
    app.config["JWT_HEADER_NAME"] = "Authorization"
    app.config["JWT_HEADER_TYPE"] = "Bearer"

    # Load default config
    app.config.from_object('app.config.Config')

    # Override with test config
    if test_config:
        app.config.update(test_config)

    # Init jwt after config is loaded
    jwt = JWTManager(app)

    # Normalize Postgres URLs (important for production hosts)
    uri = app.config.get("SQLALCHEMY_DATABASE_URI")
    if uri and uri.startswith("postgres://"):
        app.config["SQLALCHEMY_DATABASE_URI"] = uri.replace("postgres://", "postgresql://", 1)

    if not app.config.get("SECRET_KEY"):
        raise RuntimeError("SECRET_KEY not set")

    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)

    # allow cross-origin with cookies
    CORS(app, supports_credentials=True, origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://ecommerce-app-omega-ruby.vercel.app",
        "https://www.ecommerce-app-omega-ruby.vercel.app"
    ])

    from app.routes.auth_routes import auth_bp
    from app.routes.product_routes import product_bp
    from app.routes.cart_routes import cart_bp
    from app.routes.order_routes import order_bp
    from app.routes.admin_routes import admin_bp

    app.register_blueprint(auth_bp)
    app.register_blueprint(product_bp)
    app.register_blueprint(cart_bp)
    app.register_blueprint(order_bp)
    app.register_blueprint(admin_bp)

    @app.route('/')
    def index():
        return {'message': 'Hello — the API is up!'}
    
    # Making sure Alembic sees the models correctly
    from app import models

    from app.models import User  # import here to avoid circular imports

    return app