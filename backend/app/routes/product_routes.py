from flask import Blueprint, request, jsonify
from app import db
from app.models import Product

product_bp = Blueprint('products', __name__, url_prefix='/api/products')

# ---------------------------
# Get all products
# ---------------------------
@product_bp.route('/', methods=['GET'])
def get_products():
    products = Product.query.all()
    return jsonify([p.to_dict() for p in products]), 200

# ---------------------------
# Get a single product by ID
# ---------------------------
@product_bp.route('/<int:product_id>', methods=['GET'])
def get_product(product_id):
    product = Product.query.get_or_404(product_id)
    return jsonify(product.to_dict()), 200

# ---------------------------
# Create a new product (admin use)
# ---------------------------
@product_bp.route('/', methods=['POST'])
def create_product():
    data = request.get_json()

    # Basic validation
    if not data or not data.get('name') or not data.get('price'):
        return jsonify({'error': 'Name and price are required'}), 400

    product = Product(
        name=data['name'],
        description=data.get('description'),
        price=data['price'],
        stock=data.get('stock', 0)
    )

    db.session.add(product)
    db.session.commit()

    return jsonify({'message': 'Product created', 'id': product.id}), 201


# ---------------------------
# Update an existing product by id (admin use)
# ---------------------------
@product_bp.route('/<int:product_id>', methods=['PUT'])
def update_product(product_id):
    product = Product.query.get_or_404(product_id)
    data = request.get_json()

    if not data:
        return jsonify({'error': 'No update data provided'}), 400

    # Update allowed fields if present in request
    product.name = data.get('name', product.name)
    product.description = data.get('description', product.description)
    product.price = data.get('price', product.price)
    product.stock = data.get('stock', product.stock)

    db.session.commit()

    return jsonify({
        'message': f'Product {product.id} updated successfully.',
        'product': product.to_dict()
    }), 200


# ---------------------------
# Delete a product by id (admin use)
# ---------------------------
@product_bp.route('/<int:product_id>', methods=['DELETE'])
def delete_product(product_id):
    product = Product.query.get_or_404(product_id)

    db.session.delete(product)
    db.session.commit()

    return jsonify({'message': f'Product {product.name} deleted successfully'}), 200
