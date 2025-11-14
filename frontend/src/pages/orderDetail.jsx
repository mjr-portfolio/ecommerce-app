import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

function OrderDetail() {
    const { id } = useParams()
    const [order, setOrder] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await fetch(`/api/orders/${id}`, {
                    credentials: 'include',
                })

                const data = await response.json()
                if (!response.ok)
                    throw new Error(data.error || 'Failed to load order')

                setOrder(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchOrder()
    }, [id])

    if (loading) return <p>Loading order...</p>

    if (error) return <p style={{ color: 'red' }}>Error: {error}</p>

    if (!order) return <p>Order not found.</p>

    const total = order.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    )

    return (
        <div>
            <h2>Order #{order.id}</h2>
            <p>Status: {order.status}</p>
            <p>Date: {new Date(order.created_at).toLocaleString()}</p>

            <h3>Items</h3>

            {order.items.map(item => (
                <div
                    key={item.id}
                    style={{
                        borderBottom: '1px solid #ddd',
                        padding: '10px 0',
                        marginBottom: '10px',
                    }}
                >
                    <h4>{item.product.name}</h4>
                    <p>Qty: {item.quantity}</p>
                    <p>Price: £{item.price.toFixed(2)}</p>
                    <p>
                        Product Total: £
                        {(item.price * item.quantity).toFixed(2)}
                    </p>
                </div>
            ))}

            <h3>Total: £{total.toFixed(2)}</h3>

            <div style={{ marginTop: '20px' }}>
                <Link to="/orders">
                    <button style={{ marginRight: '10px' }}>
                        Back to Orders
                    </button>
                </Link>

                <Link to="/products">
                    <button>Continue Shopping</button>
                </Link>
            </div>
        </div>
    )
}

export default OrderDetail
