import React from 'react'
import { Link } from 'react-router-dom'

function Navbar({ user }) {
    return (
        <nav
            style={{
                padding: '10px 20px',
                borderBottom: '1px solid #ddd',
                marginBottom: '20px',
            }}
        >
            <Link to="/" style={{ marginRight: '15px' }}>
                Home
            </Link>
            <Link to="/products" style={{ marginRight: '15px' }}>
                Products
            </Link>
            {user ? (
                <>
                    <Link to="/cart" style={{ marginRight: '15px' }}>
                        Cart
                    </Link>
                    <Link to="/orders" style={{ marginRight: '15px' }}>
                        Orders
                    </Link>
                    <Link to="/profile">Profile</Link>
                </>
            ) : (
                <>
                    <Link to="/login" style={{ marginRight: '15px' }}>
                        Login
                    </Link>
                    <Link to="/register">Register</Link>
                </>
            )}
        </nav>
    )
}

export default Navbar
