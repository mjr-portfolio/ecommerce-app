import pytest
from app import db
from app.models import Order

def test_create_order_from_cart(user_client, product):
    user_client.post("/api/cart/add", json={
        "product_id": product.id,
        "quantity": 2
    })

    # Create order via checkout route
    res = user_client.post("/api/cart/checkout")
    assert res.status_code == 201

    data = res.get_json()
    assert "order" in data
    assert data["order"]["status"] == "completed"
    assert len(data["order"]["items"]) == 1
    assert data["order"]["items"][0]["quantity"] == 2



def test_list_user_orders(user_client, user, product):
    # Create an order
    user_client.post("/api/cart/add", json={
        "product_id": product.id,
        "quantity": 1
    })
    user_client.post("/api/cart/checkout")

    res = user_client.get("/api/orders")
    assert res.status_code == 200

    data = res.get_json()
    assert len(data) == 1
    assert data[0]["user_id"] == user.id


def test_get_single_order(user_client, product):
    # Create an order
    user_client.post("/api/cart/add", json={
        "product_id": product.id,
        "quantity": 1
    })
    create_res = user_client.post("/api/cart/checkout")
    order_id = create_res.get_json()["order"]["id"]

    res = user_client.get(f"/api/orders/{order_id}")
    assert res.status_code == 200

    data = res.get_json()
    assert data["id"] == order_id
    assert len(data["items"]) == 1


def test_user_cannot_access_other_users_orders(admin_client, user_client, product):
    # Admin creates an order
    admin_client.post("/api/cart/add", json={
        "product_id": product.id,
        "quantity": 1
    })
    create_res = admin_client.post("/api/cart/checkout")
    order_id = create_res.get_json()["order"]["id"]

    # Regular user tries to access
    res = user_client.get(f"/api/orders/{order_id}")

    assert res.status_code == 403


# Admin Order Tests

def test_admin_can_list_orders(user_client, admin_client, product):
    # user creates an order
    user_client.post("/api/cart/add", json={
        "product_id": product.id,
        "quantity": 1
    })
    user_client.post("/api/cart/checkout")

    # admin requests list
    res = admin_client.get("/api/admin/orders")

    assert res.status_code == 200
    data = res.get_json()
    assert len(data) == 1
    assert "item_count" in data[0]


def test_admin_get_order_detail(user_client, admin_client, product):
    # user creates an order
    user_client.post("/api/cart/add", json={
        "product_id": product.id,
        "quantity": 1
    })
    create_res = user_client.post("/api/cart/checkout")
    order_id = create_res.get_json()["order"]["id"]

    # admin requests single order
    res = admin_client.get(f"/api/admin/orders/{order_id}")
    assert res.status_code == 200

    data = res.get_json()
    assert data["id"] == order_id
    assert len(data["items"]) == 1


def test_admin_update_order_status(user_client, admin_client, product, app):
    # user created an order
    user_client.post("/api/cart/add", json={
        "product_id": product.id,
        "quantity": 1
    })
    create_res = user_client.post("/api/cart/checkout")
    order_id = create_res.get_json()["order"]["id"]

    #admin updates order status
    res = admin_client.put(f"/api/admin/orders/{order_id}/status", json={"status": "shipped"})
    assert res.status_code == 200

    with app.app_context():
        order = db.session.get(Order, order_id)
        assert order.status == "shipped"
