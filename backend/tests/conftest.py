import pytest
from app import create_app, db
from app.models import User, Product
from werkzeug.security import generate_password_hash


@pytest.fixture()
def app():
    """
    Create a fresh Flask app per test, using an in-memory SQLite DB.
    """

    app = create_app({
        "TESTING": True,
        "SQLALCHEMY_DATABASE_URI": "sqlite:///:memory:",
        "SQLALCHEMY_TRACK_MODIFICATIONS": False,
        "WTF_CSRF_ENABLED": False,
    })

    with app.app_context():
        db.create_all()
        yield app
        db.session.remove()
        db.drop_all()


@pytest.fixture()
def client(app):
    """Unauthenticated test client."""
    return app.test_client()


@pytest.fixture()
def user(app): # app passed in to make sure the app fixture is created
    """Create a normal user and return the object."""
    u = User(
        email="user@example.com",
        name="Regular User",
        password_hash=generate_password_hash("password123"),
        is_admin=False
    )
    db.session.add(u)
    db.session.commit()
    return u


@pytest.fixture()
def admin(app): # app passed in to make sure the app fixture is created
    """Create an admin user."""
    u = User(
        email="admin@example.com",
        name="Admin User",
        password_hash=generate_password_hash("password123"),
        is_admin=True
    )
    db.session.add(u)
    db.session.commit()
    return u


@pytest.fixture()
def product(app):
    """Create a sample product."""
    p = Product(
        name="Test Product",
        description="A product",
        price=9.99,
        stock=5,
        image_url="/images/test.jpg"
    )
    db.session.add(p)
    db.session.commit()
    return p


@pytest.fixture()
def user_client(app, user):
    """
    Returns a test client already logged in as a normal user.
    """

    client = app.test_client()

    res = client.post("/api/auth/login", json={
        "email": user.email,
        "password": "password123"
    })

    token = res.get_json()["access_token"]

    # Attach token to future requests
    client.environ_base["HTTP_AUTHORIZATION"] = f"Bearer {token}"

    return client


@pytest.fixture()
def admin_client(app, admin):
    """
    Returns a test client already logged in as an admin.
    """

    client = app.test_client()

    res = client.post("/api/auth/login", json={
        "email": admin.email,
        "password": "password123"
    })

    token = res.get_json()["access_token"]

    # Attach token to future requests
    client.environ_base["HTTP_AUTHORIZATION"] = f"Bearer {token}"

    return client
