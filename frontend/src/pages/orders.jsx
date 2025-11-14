import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Orders() {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('/api/orders', {
                    credentials: 'include',
                })

                const data = await response.json()
                if (!response.ok)
                    throw new Error(data.error || 'Failed to load orders')

                setOrders(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchOrders()
    }, [])

    if (loading) return <p>Loading orders...</p>

    if (error) return <p style={{ color: 'red' }}>Error: {error}</p>

    if (orders.length === 0)
        return (
            <div>
                <h2>Your Orders</h2>
                <p>You haven't placed any orders yet.</p>
                <Link to="/products">
                    <button>Start Shopping</button>
                </Link>
            </div>
        )

    return (
        <div>
            <h2>Your Orders</h2>

            {orders.map(order => (
                <div
                    key={order.id}
                    style={{
                        border: '1px solid #ddd',
                        padding: '15px',
                        marginBottom: '15px',
                        borderRadius: '6px',
                    }}
                >
                    <h3>Order #{order.id}</h3>
                    <p>Status: {order.status}</p>
                    <p>Date: {new Date(order.created_at).toLocaleString()}</p>

                    <p>
                        Total Items:{' '}
                        {order.items.reduce(
                            (sum, item) => sum + item.quantity,
                            0
                        )}
                    </p>

                    <Link to={`/orders/${order.id}`}>
                        <button>View Details</button>
                    </Link>
                </div>
            ))}
        </div>
    )
}

export default Orders
