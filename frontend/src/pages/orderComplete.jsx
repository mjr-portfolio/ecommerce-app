import React from 'react'
import { Link } from 'react-router-dom'

function OrderComplete() {
    return (
        <div style={{ padding: '20px' }}>
            <h2>Your order is complete!</h2>

            <p>
                Thank you for your purchase. Your order has been successfully
                processed.
            </p>

            <div style={{ marginTop: '20px' }}>
                <Link to="/orders">
                    <button style={{ marginRight: '10px' }}>
                        View My Orders
                    </button>
                </Link>

                <Link to="/products">
                    <button>Continue Shopping</button>
                </Link>
            </div>
        </div>
    )
}

export default OrderComplete
