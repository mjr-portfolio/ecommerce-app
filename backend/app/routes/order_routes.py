from flask import Blueprint, jsonify
from app import db
from app.models import Order

from flask_jwt_extended import jwt_required, get_jwt_identity

order_bp = Blueprint('orders', __name__, url_prefix='/api/orders')


@order_bp.route('', methods=['GET'])
@jwt_required()
def get_orders():
    user_id = int(get_jwt_identity())
    
    orders = Order.query.filter_by(user_id=user_id).order_by(Order.created_at.desc()).all()
    return jsonify([order.to_dict() for order in orders]), 200


@order_bp.route('/<int:order_id>', methods=['GET'])
@jwt_required()
def get_order(order_id):
    user_id = int(get_jwt_identity())

    order = Order.query.get_or_404(order_id)

    if order.user_id != user_id:
        return jsonify({"error": "Not authorised to view this order"}), 403

    return jsonify(order.to_dict()), 200

