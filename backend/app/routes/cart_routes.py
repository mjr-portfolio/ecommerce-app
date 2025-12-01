from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app import db
from app.models import Cart, CartItem, Product, Order, OrderItem

cart_bp = Blueprint('cart', __name__, url_prefix='/api/cart')

def get_or_create_cart(user_id):
    cart = Cart.query.filter_by(user_id=user_id, status="open").first()
    if not cart:
        cart = Cart(user_id=user_id)
        db.session.add(cart)
        db.session.commit()
    return cart

def get_cart_item_or_404(cart_id, item_id, user_id):
    '''Return the cart item if it belongs to the user's open cart.'''
    item = CartItem.query.get_or_404(item_id)
    if item.cart.user_id != user_id or item.cart_id != cart_id:
        # Prevent users from editing or deleting other users' items
        from flask import abort
        abort(403, description="Not authorised to modify this cart item.")
    return item


@cart_bp.route('', methods=['GET'])
@login_required
def get_cart():
    cart = get_or_create_cart(current_user.id)
    return jsonify(cart.to_dict()), 200


@cart_bp.route('/count', methods=['GET'])
@login_required
def cart_count():
    cart = get_or_create_cart(current_user.id)
    count = sum(item.quantity for item in cart.items)
    return jsonify({"count": count}), 200


@cart_bp.route('/add', methods=['POST'])
@login_required
def add_to_cart():
    data = request.get_json()
    product_id = data.get('product_id')
    quantity = data.get('quantity', 1)

    product = Product.query.get_or_404(product_id)
    cart = get_or_create_cart(current_user.id)

    item = CartItem.query.filter_by(cart_id=cart.id, product_id=product.id).first()

    if item:
        item.quantity += quantity
        db.session.commit()
        return jsonify({
            "message": "Item quantity updated",
            "cart": cart.to_dict()
        }), 200

    item = CartItem(
        cart_id=cart.id,
        product_id=product.id,
        quantity=quantity,
        price=product.price
    )
    db.session.add(item)
    db.session.commit()

    return jsonify({
        "message": "Item added to cart",
        "cart": cart.to_dict()
    }), 201


@cart_bp.route('/update/<int:item_id>', methods=['PUT'])
@login_required
def update_cart_item(item_id):
    data = request.get_json()
    quantity = data.get('quantity', 1)

    cart = get_or_create_cart(current_user.id)
    item = get_cart_item_or_404(cart.id, item_id, current_user.id)

    item.quantity = quantity
    db.session.commit()
    return jsonify({"message": "Cart updated", "cart": item.cart.to_dict()}), 200


@cart_bp.route('/remove/<int:item_id>', methods=['DELETE'])
@login_required
def remove_item(item_id):
    cart = get_or_create_cart(current_user.id)
    item = get_cart_item_or_404(cart.id, item_id, current_user.id)

    db.session.delete(item)
    db.session.commit()
    return jsonify({"message": "Item removed", "cart": item.cart.to_dict()}), 200


@cart_bp.route('/clear', methods=['DELETE'])
@login_required
def clear_cart():
    cart = get_or_create_cart(current_user.id)
    if not cart.items:
        return jsonify({'message': 'Cart already empty'}), 200

    db.session.query(CartItem).filter_by(cart_id=cart.id).delete()
    db.session.commit()
    return jsonify({"message": "Cart cleared"}), 200


# Checkout (convert cart -> order)
@cart_bp.route('/checkout', methods=['POST'])
@login_required
def checkout():
    cart = get_or_create_cart(current_user.id)

    if not cart.items:
        return jsonify({"error": "Cart is empty"}), 400

    order = Order(user_id=current_user.id, status="completed")
    db.session.add(order)
    db.session.commit()  # commit early to generate order.id

    # Copy each cart item → order item
    for cart_item in cart.items:
        order_item = OrderItem(
            order_id=order.id,
            product_id=cart_item.product_id,
            quantity=cart_item.quantity,
            price=cart_item.price  # snapshot price from cart
        )
        db.session.add(order_item)

    cart.status = "checked_out"

    db.session.query(CartItem).filter_by(cart_id=cart.id).delete()
    db.session.commit()

    return jsonify({
        "message": "Order completed successfully",
        "order": order.to_dict()
    }), 201
