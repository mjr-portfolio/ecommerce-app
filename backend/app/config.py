import os

# Get absolute path to the folder where config.py lives
basedir = os.path.abspath(os.path.dirname(__file__))

class Config:
    DEBUG = os.getenv("FLASK_DEBUG", "0") == "1"
    SECRET_KEY = os.getenv("SECRET_KEY")
    if not SECRET_KEY:
        raise RuntimeError("SECRET_KEY not set")
    
    SESSION_COOKIE_SECURE = True
    SESSION_COOKIE_HTTPONLY = True
    SESSION_COOKIE_SAMESITE = "None"
    
    # Prefer DATABASE_URL / SQLALCHEMY_DATABASE_URI if provided
    SQLALCHEMY_DATABASE_URI = os.getenv(
        "SQLALCHEMY_DATABASE_URI",
        os.getenv(
            "DATABASE_URL",
            'sqlite:///' + os.path.join(basedir, 'ecommerce.db')  # fallback for local
        )
    )

    SQLALCHEMY_TRACK_MODIFICATIONS = False
