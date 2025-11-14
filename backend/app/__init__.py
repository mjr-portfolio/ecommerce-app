
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager
from flask_cors import CORS

db = SQLAlchemy()
migrate = Migrate()
login_manager = LoginManager()

def create_app():
    app = Flask(__name__)
    app.config.from_object('app.config.Config')

    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    login_manager.init_app(app)

    CORS(app, supports_credentials=True)  # <--- allow cross-origin with cookies

    # Import blueprints
    from app.routes.auth_routes import auth_bp
    from app.routes.product_routes import product_bp
    from app.routes.cart_routes import cart_bp
    from app.routes.order_routes import order_bp

    # Register blueprints
    app.register_blueprint(auth_bp)
    app.register_blueprint(product_bp)
    app.register_blueprint(cart_bp)
    app.register_blueprint(order_bp)

    @app.route('/')
    def index():
        return {'message': 'Hello — the API is up!'}
    
    # Making sure Alembic sees the models correctly
    from app import models

    from app.models import User  # import here to avoid circular imports

    @login_manager.user_loader
    def load_user(user_id):
        return User.query.get(int(user_id))

    return app