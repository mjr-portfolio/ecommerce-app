import pytest
from app.models import Cart
from werkzeug.security import generate_password_hash

def login_as(client, user):
    return client.post("/api/auth/login", json={
        "email": user.email,
        "password": "password123"
    })

# -----------------------------------------------------

def test_get_cart_requires_login(client):
    res = client.get("/api/cart")
    assert res.status_code == 401


def test_get_cart_returns_empty_cart(client, user):
    login_as(client, user)

    res = client.get("/api/cart")
    data = res.get_json()

    assert res.status_code == 200
    assert data["items"] == []


def test_cart_count(client, user, product):
    login_as(client, user)

    # Initially empty cart → count = 0
    res = client.get("/api/cart/count")
    assert res.status_code == 200
    assert res.get_json()["count"] == 0

    client.post("/api/cart/add", json={
        "product_id": product.id,
        "quantity": 2
    })

    res = client.get("/api/cart/count")
    data = res.get_json()

    assert res.status_code == 200
    assert data["count"] == 2


def test_add_to_cart(client, user, product, app):
    login_as(client, user)

    payload = {
        "product_id": product.id,
        "quantity": 2
    }

    res = client.post("/api/cart/add", json=payload)
    assert res.status_code == 201

    with app.app_context():
        cart = Cart.query.filter_by(user_id=user.id).first()
        assert cart is not None
        assert len(cart.items) == 1
        assert cart.items[0].quantity == 2


def test_update_cart_item_quantity(client, user, product, app):
    login_as(client, user)

    # First add item
    client.post("/api/cart/add", json={
        "product_id": product.id,
        "quantity": 1
    })

    res = client.put(f"/api/cart/update/{product.id}", json={
        "quantity": 5
    })

    assert res.status_code == 200

    with app.app_context():
        cart = Cart.query.filter_by(user_id=user.id).first()
        assert cart.items[0].quantity == 5


def test_remove_from_cart(client, user, product, app):
    login_as(client, user)

    client.post("/api/cart/add", json={
        "product_id": product.id,
        "quantity": 1
    })

    res = client.delete(f"/api/cart/remove/{product.id}")
    assert res.status_code == 200

    with app.app_context():
        cart = Cart.query.filter_by(user_id=user.id).first()
        assert len(cart.items) == 0
