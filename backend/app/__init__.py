
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager
from flask_cors import CORS

db = SQLAlchemy()
migrate = Migrate()
login_manager = LoginManager()

def create_app(test_config=None):
    app = Flask(__name__)

    # Load default config
    app.config.from_object('app.config.Config')

    # Override with test config
    if test_config:
        app.config.update(test_config)

    # Normalize Postgres URLs (important for production hosts)
    uri = app.config.get("SQLALCHEMY_DATABASE_URI")
    if uri and uri.startswith("postgres://"):
        app.config["SQLALCHEMY_DATABASE_URI"] = uri.replace("postgres://", "postgresql://", 1)

    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    login_manager.init_app(app)

    # allow cross-origin with cookies
    CORS(app, supports_credentials=True, origins=[
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

    @login_manager.user_loader
    def load_user(user_id):
        return db.session.get(User, int(user_id))

    return app