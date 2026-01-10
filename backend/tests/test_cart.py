import pytest
from app.models import Cart

def test_get_cart_requires_login(client):
    res = client.get("/api/cart")
    assert res.status_code == 401


def test_get_cart_returns_empty_cart(user_client):
    res = user_client.get("/api/cart")
    data = res.get_json()

    assert res.status_code == 200
    assert data["items"] == []


def test_cart_count(user_client, product):
    # Initially empty cart → count = 0
    res = user_client.get("/api/cart/count")
    assert res.status_code == 200
    assert res.get_json()["count"] == 0

    user_client.post("/api/cart/add", json={
        "product_id": product.id,
        "quantity": 2
    })

    res = user_client.get("/api/cart/count")
    data = res.get_json()

    assert res.status_code == 200
    assert data["count"] == 2


def test_add_to_cart(user_client, user, product, app):
    payload = {
        "product_id": product.id,
        "quantity": 2
    }

    res = user_client.post("/api/cart/add", json=payload)
    assert res.status_code == 201

    with app.app_context():
        cart = Cart.query.filter_by(user_id=user.id).first()
        assert cart is not None
        assert len(cart.items) == 1
        assert cart.items[0].quantity == 2


def test_update_cart_item_quantity(user_client, user, product, app):
    # First add item
    user_client.post("/api/cart/add", json={
        "product_id": product.id,
        "quantity": 1
    })

    res = user_client.put(f"/api/cart/update/{product.id}", json={
        "quantity": 5
    })

    assert res.status_code == 200

    with app.app_context():
        cart = Cart.query.filter_by(user_id=user.id).first()
        assert cart.items[0].quantity == 5


def test_remove_from_cart(user_client, user, product, app):
    user_client.post("/api/cart/add", json={
        "product_id": product.id,
        "quantity": 1
    })

    res = user_client.delete(f"/api/cart/remove/{product.id}")
    assert res.status_code == 200

    with app.app_context():
        cart = Cart.query.filter_by(user_id=user.id).first()
        assert len(cart.items) == 0
