from app import create_app, db
from app.models import Product

# Initialise the app context
app = create_app()

sample_products = [
    {
        "name": "Wireless Headphones",
        "description": "Noise-cancelling over-ear headphones with 30-hour battery life.",
        "price": 89.99,
        "stock": 15
    },
    {
        "name": "Mechanical Keyboard",
        "description": "RGB backlit mechanical keyboard with tactile switches.",
        "price": 59.99,
        "stock": 25
    },
    {
        "name": "USB-C Docking Station",
        "description": "7-in-1 hub with HDMI, USB 3.0, and SD card reader support.",
        "price": 44.50,
        "stock": 40
    },
    {
        "name": "Wireless Gaming Mouse",
        "description": "High DPI mouse with programmable buttons and RGB lighting.",
        "price": 34.99,
        "stock": 30
    },
    {
        "name": "1080p Web Camera",
        "description": "Full HD webcam with built-in stereo microphone and privacy shutter.",
        "price": 49.99,
        "stock": 18
    },
    {
        "name": "Portable SSD 1TB",
        "description": "Ultra-fast USB 3.2 Gen 2 external solid state drive.",
        "price": 119.99,
        "stock": 12
    },
    {
        "name": "Smart LED Light Strip",
        "description": "Customisable RGB light strip with voice control support.",
        "price": 24.99,
        "stock": 50
    },
    {
        "name": "Bluetooth Speaker",
        "description": "Compact waterproof speaker with 10-hour battery life.",
        "price": 39.99,
        "stock": 22
    },
    {
        "name": "Noise Cancelling Earbuds",
        "description": "True wireless earbuds with adaptive noise cancellation.",
        "price": 79.99,
        "stock": 20
    },
    {
        "name": "27-inch 4K Monitor",
        "description": "Ultra HD display with HDR support and thin bezel design.",
        "price": 299.99,
        "stock": 10
    }
]

with app.app_context():
    db.session.query(Product).delete() # Can delete all products first or just add to - choosing to delete for a clean db to test with
    db.session.commit()

    # Add new products
    db.session.add_all([Product(**p) for p in sample_products])
    db.session.commit()

    print(f"Seeded {len(sample_products)} products successfully!")
