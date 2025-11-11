from flask import Blueprint, request, jsonify
from app import db
from app.models import User
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import login_user, logout_user, login_required, current_user

auth_bp = Blueprint('auth', __name__)

# --- Registration ---
@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    name = data.get('name')

    if User.query.filter_by(email=email).first():
        return jsonify({'error': 'Email already exists'}), 400

    new_user = User(
        email=email,
        password_hash=generate_password_hash(password),
        name=name
    )

    db.session.add(new_user)
    db.session.commit()

    login_user(new_user)

    return jsonify({
        'user': {
            'id': new_user.id,
            'email': new_user.email,
            'name': new_user.name,
            'created_at': new_user.created_at.isoformat()
        }
    }), 201

# --- Login ---
@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()

    if not user or not check_password_hash(user.password_hash, password):
        return jsonify({'error': 'Invalid email or password'}), 401

    login_user(user)

    return jsonify({
        'user': {
            'id': user.id,
            'email': user.email,
            'name': user.name,
            'created_at': user.created_at.isoformat()
        }
    }), 200

# --- Logout ---
@auth_bp.route('/logout', methods=['POST'])
@login_required
def logout():
    logout_user()

    return jsonify({'message': 'User logged out successfully'}), 200


# ----------------------------
# Current User Route (for testing)
# ----------------------------
@auth_bp.route('/me', methods=['GET'])
@login_required
def me():
    return jsonify({
        'user': {
            'id': current_user.id,
            'email': current_user.email,
            'name': current_user.name,
            'created_at': current_user.created_at.isoformat()
        }
    }), 200


