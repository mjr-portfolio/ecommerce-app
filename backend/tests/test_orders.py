import pytest
from app import db
from app.models import Order
from werkzeug.security import generate_password_hash

def login_as(client, user):
    return client.post("/api/auth/login", json={
        "email": user.email,
        "password": "password123"
    })

# -------------------------------------------------------

def test_create_order_from_cart(client, user, product):
    login_as(client, user)

    client.post("/api/cart/add", json={
        "product_id": product.id,
        "quantity": 2
    })

    # Create order via checkout route
    res = client.post("/api/cart/checkout")
    assert res.status_code == 201

    data = res.get_json()
    assert "order" in data
    assert data["order"]["status"] == "completed"
    assert len(data["order"]["items"]) == 1
    assert data["order"]["items"][0]["quantity"] == 2



def test_list_user_orders(client, user, product):
    login_as(client, user)

    # Create an order
    client.post("/api/cart/add", json={
        "product_id": product.id,
        "quantity": 1
    })
    client.post("/api/cart/checkout")

    res = client.get("/api/orders")
    assert res.status_code == 200

    data = res.get_json()
    assert len(data) == 1
    assert data[0]["user_id"] == user.id


def test_get_single_order(client, user, product):
    login_as(client, user)

    # Create an order
    client.post("/api/cart/add", json={
        "product_id": product.id,
        "quantity": 1
    })
    create_res = client.post("/api/cart/checkout")
    order_id = create_res.get_json()["order"]["id"]

    res = client.get(f"/api/orders/{order_id}")
    assert res.status_code == 200

    data = res.get_json()
    assert data["id"] == order_id
    assert len(data["items"]) == 1


def test_user_cannot_access_other_users_orders(client, user, admin, product):
    login_as(client, admin)

    # Admin creates an order
    client.post("/api/cart/add", json={
        "product_id": product.id,
        "quantity": 1
    })
    create_res = client.post("/api/cart/checkout")
    order_id = create_res.get_json()["order"]["id"]

    # Regular user tries to access
    login_as(client, user)
    res = client.get(f"/api/orders/{order_id}")

    assert res.status_code == 403


# Admin Order Tests

def test_admin_can_list_orders(client, admin, product, user):
    login_as(client, user)

    # user creates an order
    client.post("/api/cart/add", json={
        "product_id": product.id,
        "quantity": 1
    })
    client.post("/api/cart/checkout")

    # admin requests list
    login_as(client, admin)
    res = client.get("/api/admin/orders")

    assert res.status_code == 200
    data = res.get_json()
    assert len(data) == 1
    assert "item_count" in data[0]


def test_admin_get_order_detail(client, admin, product, user):
    login_as(client, user)

    # user creates an order
    client.post("/api/cart/add", json={
        "product_id": product.id,
        "quantity": 1
    })
    create_res = client.post("/api/cart/checkout")
    order_id = create_res.get_json()["order"]["id"]

    login_as(client, admin)

    res = client.get(f"/api/admin/orders/{order_id}")
    assert res.status_code == 200

    data = res.get_json()
    assert data["id"] == order_id
    assert len(data["items"]) == 1


def test_admin_update_order_status(client, admin, product, user, app):
    login_as(client, user)

    # user created an order
    client.post("/api/cart/add", json={
        "product_id": product.id,
        "quantity": 1
    })
    create_res = client.post("/api/cart/checkout")
    order_id = create_res.get_json()["order"]["id"]

    login_as(client, admin)

    res = client.put(f"/api/admin/orders/{order_id}/status", json={"status": "shipped"})
    assert res.status_code == 200

    with app.app_context():
        order = db.session.get(Order, order_id)
        assert order.status == "shipped"
