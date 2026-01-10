import json
from app.models import User
from werkzeug.security import check_password_hash

def test_register_success(client, app):
    payload = {
        "email": "newuser@example.com",
        "name": "New User",
        "password": "password123"
    }

    res = client.post("/api/auth/register", json=payload)
    data = res.get_json()

    assert res.status_code == 201
    assert "user" in data
    assert data["user"]["email"] == "newuser@example.com"

    # ensure user exists in DB
    with app.app_context():
        u = User.query.filter_by(email="newuser@example.com").first()
        assert u is not None
        assert check_password_hash(u.password_hash, "password123")


def test_register_duplicate_email(client, user): # user passed in to call the fixture to make sure its there to check against
    # user fixture already created user@example.com
    payload = {
        "email": "user@example.com",
        "name": "Someone",
        "password": "pass"
    }

    res = client.post("/api/auth/register", json=payload)
    data = res.get_json()

    assert res.status_code == 400
    assert "error" in data


def test_login_success(client, user):
    payload = {"email": user.email, "password": "password123"}

    res = client.post("/api/auth/login", json=payload)
    data = res.get_json()

    assert res.status_code == 200
    assert "user" in data
    assert data["user"]["email"] == user.email


def test_login_invalid_password(client, user):
    payload = {"email": user.email, "password": "wrongpass"}

    res = client.post("/api/auth/login", json=payload)
    data = res.get_json()

    assert res.status_code == 401
    assert "error" in data


def test_login_unknown_email(client):
    payload = {"email": "unknown@example.com", "password": "pass"}

    res = client.post("/api/auth/login", json=payload)
    data = res.get_json()

    assert res.status_code == 401
    assert "error" in data


def test_logout(user_client):
    # user_client is logged in via the fixture
    res = user_client.post("/api/auth/logout")

    assert res.status_code == 200
    assert res.get_json()["message"] == "User logged out successfully"


def test_me_authenticated(user_client):
    res = user_client.get("/api/auth/me")
    data = res.get_json()

    assert res.status_code == 200
    assert "user" in data
    assert data["user"]["email"] == "user@example.com"


def test_me_unauthenticated(client):
    res = client.get("/api/auth/me")
    assert res.status_code == 401  # because @jwt_required
