from functools import wraps
from flask import abort
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models import User

def admin_required(f):
    @wraps(f)
    @jwt_required()
    def decorated_function(*args, **kwargs):
        user_id = int(get_jwt_identity())
        user = User.query.get(user_id)

        if not user or not user.is_admin:
            abort(403)

        return f(*args, **kwargs)
    return decorated_function
