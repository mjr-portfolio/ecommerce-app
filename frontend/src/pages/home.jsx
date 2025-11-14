import React from 'react'
import { Link } from 'react-router-dom'

function Home({ user }) {
    return (
        <div style={{ padding: '20px' }}>
            <h1>Welcome to the Store</h1>

            <p>A simple e-commerce demo built with React + Flask.</p>

            <div style={{ marginTop: '20px' }}>
                <Link to="/products">
                    <button style={{ marginRight: '10px' }}>
                        Browse Products
                    </button>
                </Link>

                {user ? (
                    <>
                        <Link to="/cart">
                            <button style={{ marginRight: '10px' }}>
                                View Cart
                            </button>
                        </Link>

                        <Link to="/orders">
                            <button style={{ marginRight: '10px' }}>
                                View Orders
                            </button>
                        </Link>

                        <Link to="/profile">
                            <button>My Account</button>
                        </Link>
                    </>
                ) : (
                    <>
                        <Link to="/login">
                            <button>Login</button>
                        </Link>

                        <Link to="/profile">
                            <button>Register</button>
                        </Link>
                    </>
                )}
            </div>
        </div>
    )
}

export default Home
