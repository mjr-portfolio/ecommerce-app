from flask import Blueprint, jsonify, request
from app import db
from app.models import Product
from app.utils.decorators import admin_required

admin_bp = Blueprint('admin', __name__, url_prefix='/api/admin')

@admin_bp.route('/products', methods=['GET'])
@admin_required
def admin_list_products():
    products = Product.query.all()
    return jsonify([p.to_dict() for p in products]), 200

@admin_bp.route('/products/<int:product_id>', methods=['GET'])
@admin_required
def admin_get_product(product_id):
    product = Product.query.get_or_404(product_id)
    return product.to_dict(), 200

@admin_bp.route('/products', methods=['POST'])
@admin_required
def admin_create_product():
    data = request.get_json()

    name = data.get('name')
    price = data.get('price')
    stock = data.get('stock')
    description = data.get('description')
    image_url = data.get('image_url')

    if not name or price is None or stock is None:
        return {'error': 'Name, price and stock are required.'}, 400

    product = Product(
        name=name,
        price=price,
        stock=stock,
        description=description,
        image_url=image_url,
    )

    db.session.add(product)
    db.session.commit()

    return product.to_dict(), 201

@admin_bp.route('/products/<int:product_id>', methods=['PUT'])
@admin_required
def admin_update_product(product_id):
    product = Product.query.get_or_404(product_id)
    data = request.get_json()

    product.name = data.get('name', product.name)
    product.price = data.get('price', product.price)
    product.stock = data.get('stock', product.stock)
    product.description = data.get('description', product.description)
    product.image_url = data.get('image_url', product.image_url)

    db.session.commit()

    return product.to_dict(), 200

@admin_bp.route('/products/<int:product_id>', methods=['DELETE'])
@admin_required
def admin_delete_product(product_id):
    product = Product.query.get_or_404(product_id)

    db.session.delete(product)
    db.session.commit()

    return {'message': 'Product deleted'}, 200


@admin_bp.route('/orders', methods=['GET'])
@admin_required
def admin_list_orders():
    from app.models import Order  # avoid circular import

    orders = Order.query.order_by(Order.created_at.desc()).all()

    data = []
    for order in orders:
        data.append({
            "id": order.id,
            "user": {
                "id": order.user.id,
                "email": order.user.email,
                "name": order.user.name
            },
            "status": order.status,
            "created_at": order.created_at.isoformat(),
            "item_count": len(order.items)
        })

    return jsonify(data), 200


@admin_bp.route('/orders/<int:order_id>', methods=['GET'])
@admin_required
def admin_get_order(order_id):
    from app.models import Order  # avoid circular import

    order = Order.query.get_or_404(order_id)

    items = []
    for item in order.items:
        items.append({
            "id": item.id,
            "quantity": item.quantity,
            "price": item.price,
            "product": {
                "id": item.product.id,
                "name": item.product.name,
                "image_url": item.product.image_url,
                "price": item.product.price
            }
        })

    data = {
        "id": order.id,
        "status": order.status,
        "created_at": order.created_at.isoformat(),
        "user": {
            "id": order.user.id,
            "email": order.user.email,
            "name": order.user.name
        },
        "items": items
    }

    return jsonify(data), 200


@admin_bp.route('/orders/<int:order_id>/status', methods=['PUT'])
@admin_required
def admin_update_order_status(order_id):
    from app.models import Order  # avoid circular import

    order = Order.query.get_or_404(order_id)

    data = request.get_json()
    new_status = data.get("status")

    allowed_statuses = ["pending", "processing", "shipped", "completed", "cancelled"]

    if new_status not in allowed_statuses:
        return {"error": "Invalid status"}, 400

    order.status = new_status
    db.session.commit()

    return jsonify({"message": "Status updated", "status": new_status}), 200

