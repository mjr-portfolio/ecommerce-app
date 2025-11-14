from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app import db
from app.models import Order

order_bp = Blueprint('orders', __name__, url_prefix='/api/orders')

# Get all orders for current user
@order_bp.route('/', methods=['GET'])
@login_required
def get_orders():
    orders = Order.query.filter_by(user_id=current_user.id).order_by(Order.created_at.desc()).all()
    return jsonify([order.to_dict() for order in orders]), 200


# Get a single order by ID
@order_bp.route('/<int:order_id>', methods=['GET'])
@login_required
def get_order(order_id):
    order = Order.query.get_or_404(order_id)

    # Security check — prevent access to other users' orders
    if order.user_id != current_user.id:
        return jsonify({"error": "Not authorised to view this order"}), 403

    return jsonify(order.to_dict()), 200

