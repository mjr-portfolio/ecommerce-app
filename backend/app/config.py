
import os

# Get absolute path to the folder where config.py lives
basedir = os.path.abspath(os.path.dirname(__file__))

class Config:
    DEBUG = os.getenv("FLASK_DEBUG", "0") == "1"
    SECRET_KEY = os.getenv("SECRET_KEY", "dev-secret-key")
    # Absolute path to the database file
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'ecommerce.db')