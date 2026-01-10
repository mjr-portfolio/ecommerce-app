import pytest
from app import db
from app.models import Product
from werkzeug.security import generate_password_hash

@pytest.fixture()
def admin_user(app): # Custom product admin defined to not break other tests that may use the base admin from conftest.py
    """Create an admin user."""
    from app.models import User

    u = User(
        email="admin@example.com",
        name="Admin User",
        password_hash=generate_password_hash("password123"),
        is_admin=True
    )
    db.session.add(u)
    db.session.commit()
    return u

# -------------------------------------------------

# Public routes

def test_get_all_products(client, product): # product passed in to call the fixture to make sure there is always 1 product
    res = client.get("/api/products")
    data = res.get_json()

    assert res.status_code == 200
    assert isinstance(data, list)
    assert len(data) == 1
    assert data[0]["name"] == "Test Product"


def test_get_single_product(client, product):
    res = client.get(f"/api/products/{product.id}")
    data = res.get_json()

    assert res.status_code == 200
    assert data["id"] == product.id
    assert data["name"] == "Test Product"


def test_get_product_not_found(client):
    res = client.get("/api/products/9999")
    assert res.status_code == 404


# Admin routes (create/update/delete)
def test_admin_create_product(admin_client):
    payload = {
        "name": "New Product",
        "price": 12.50,
        "stock": 3,
        "description": "Created via admin",
        "image_url": "/images/new.jpg"
    }

    res = admin_client.post("/api/admin/products", json=payload)
    data = res.get_json()

    assert res.status_code == 201
    assert data["name"] == "New Product"

    with admin_client.application.app_context():
        p = Product.query.filter_by(name="New Product").first()
        assert p is not None
        assert p.price == 12.50


def test_admin_update_product(admin_client, product):
    payload = { "name": "Updated Name" }

    res = admin_client.put(f"/api/admin/products/{product.id}", json=payload)
    data = res.get_json()

    assert res.status_code == 200
    assert data["name"] == "Updated Name"

    with admin_client.application.app_context():
        p = db.session.get(Product, product.id)
        assert p.name == "Updated Name"


def test_admin_delete_product(client, admin_client, product):
    res = admin_client.delete(f"/api/admin/products/{product.id}")
    assert res.status_code == 200

    with admin_client.application.app_context():
        p = db.session.get(Product, product.id)
        assert p is None


# Permission test

def test_non_admin_cannot_create_product(user_client):
    """Normal users should NOT access admin endpoints."""

    res = user_client.post("/api/admin/products", json={
        "name": "Nope",
        "price": 1,
        "stock": 1
    })

    assert res.status_code == 403
