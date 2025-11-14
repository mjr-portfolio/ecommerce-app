import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Checkout() {
    const [cart, setCart] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [confirming, setConfirming] = useState(false)
    const navigate = useNavigate()

    // Fetch cart on load
    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await fetch('/api/cart', {
                    credentials: 'include',
                })

                const data = await response.json()
                if (!response.ok)
                    throw new Error(data.error || 'Failed to load cart')

                setCart(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchCart()
    }, [])

    // Confirm checkout
    const handleCheckout = async () => {
        setConfirming(true)

        try {
            const response = await fetch('/api/cart/checkout', {
                method: 'POST',
                credentials: 'include',
            })

            const data = await response.json()
            if (!response.ok) throw new Error(data.error || 'Checkout failed')

            // Redirect to the order complete screen
            navigate('/order-complete')
        } catch (err) {
            setError(err.message)
        } finally {
            setConfirming(false)
        }
    }

    if (loading) return <p>Loading checkout...</p>

    if (error) return <p style={{ color: 'red' }}>Error: {error}</p>

    if (!cart || cart.items.length === 0)
        return (
            <div>
                <h2>Checkout</h2>
                <p>Your cart is empty.</p>
            </div>
        )

    const total = cart.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    )

    return (
        <div>
            <h2>Checkout</h2>

            <h3>Order Summary</h3>

            {cart.items.map(item => (
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

            <Link to="/cart">
                <button>Back to Cart</button>
            </Link>

            <button onClick={handleCheckout} disabled={confirming}>
                {confirming ? 'Processing...' : 'Confirm Order'}
            </button>
        </div>
    )
}

export default Checkout
