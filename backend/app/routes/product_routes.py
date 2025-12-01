from flask import Blueprint, request, jsonify
from app import db
from app.models import Product

product_bp = Blueprint('products', __name__, url_prefix='/api/products')


@product_bp.route('', methods=['GET'])
def get_products():
    products = Product.query.all()
    return jsonify([p.to_dict() for p in products]), 200


@product_bp.route('/<int:product_id>', methods=['GET'])
def get_product(product_id):
    product = Product.query.get_or_404(product_id)
    return jsonify(product.to_dict()), 200
