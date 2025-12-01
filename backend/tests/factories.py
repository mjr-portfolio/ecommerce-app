from app import db
from app.models import Product, Order, OrderItem, Cart, CartItem
from datetime import datetime, UTC


def create_product(
    name="Test Product",
    price=9.99,
    stock=10,
    description="A test product",
    image_url=""
):
    p = Product(
        name=name,
        price=price,
        stock=stock,
        description=description,
        image_url=image_url,
        created_at=datetime.now(UTC)
    )
    db.session.add(p)
    db.session.commit()
    return p


def create_order(user, status="pending"):
    o = Order(
        user_id=user.id,
        status=status,
        created_at=datetime.now(UTC)
    )
    db.session.add(o)
    db.session.commit()
    return o


def add_order_item(order, product, quantity=1, price=None):
    item = OrderItem(
        order_id=order.id,
        product_id=product.id,
        quantity=quantity,
        price=price or product.price,
    )
    db.session.add(item)
    db.session.commit()
    return item


def create_cart(user):
    c = Cart(
        user_id=user.id,
        status="open",
        created_at=datetime.now(UTC)
    )
    db.session.add(c)
    db.session.commit()
    return c


def add_cart_item(cart, product, quantity=1):
    item = CartItem(
        cart_id=cart.id,
        product_id=product.id,
        quantity=quantity,
        price=product.price,
    )
    db.session.add(item)
    db.session.commit()
    return item
