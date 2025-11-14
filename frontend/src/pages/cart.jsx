import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Cart() {
    const [cart, setCart] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    // Fetch cart on mount
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

    // Update item quantity
    const updateQuantity = async (itemId, quantity) => {
        try {
            if (quantity < 1) {
                // Automatically delete item if quantity hits 0
                return removeItem(itemId)
            }

            const response = await fetch(`/api/cart/update/${itemId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ quantity }),
            })

            const data = await response.json()
            if (!response.ok)
                throw new Error(data.error || 'Failed to update item')

            setCart(data.cart)
        } catch (err) {
            setError(err.message)
        }
    }

    // Remove item
    const removeItem = async itemId => {
        try {
            const response = await fetch(`/api/cart/remove/${itemId}`, {
                method: 'DELETE',
                credentials: 'include',
            })

            const data = await response.json()
            if (!response.ok)
                throw new Error(data.error || 'Failed to remove item')

            setCart(data.cart)
        } catch (err) {
            setError(err.message)
        }
    }

    // Clear entire cart
    const clearCart = async () => {
        try {
            const response = await fetch('/api/cart/clear', {
                method: 'DELETE',
                credentials: 'include',
            })

            const data = await response.json()
            if (!response.ok)
                throw new Error(data.error || 'Failed to clear cart')

            // After clearing, re-fetch the updated empty cart
            setCart(prev => ({ ...prev, items: [] }))
        } catch (err) {
            setError(err.message)
        }
    }

    // Navigate to checkout
    const goToCheckout = () => {
        navigate('/checkout')
    }

    // Loading state
    if (loading) return <p>Loading cart...</p>

    // Error state
    if (error) return <p style={{ color: 'red' }}>Error: {error}</p>

    // Empty cart
    if (cart.items.length === 0)
        return (
            <div>
                <h2>Your Cart</h2>
                <p>Your cart is empty.</p>
            </div>
        )

    return (
        <div>
            <h2>Your Cart</h2>

            {cart.items.map(item => (
                <div
                    key={item.id}
                    style={{
                        borderBottom: '1px solid #ddd',
                        padding: '10px 0',
                        marginBottom: '10px',
                    }}
                >
                    <h3>{item.product.name}</h3>
                    <p>{item.product.description}</p>
                    <p>Price: £{item.price.toFixed(2)}</p>

                    <div
                        style={{
                            display: 'flex',
                            gap: '10px',
                            alignItems: 'center',
                        }}
                    >
                        <button
                            onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                            }
                        >
                            -
                        </button>

                        <span>{item.quantity}</span>

                        <button
                            onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                            }
                        >
                            +
                        </button>
                    </div>

                    <button
                        style={{ marginTop: '8px' }}
                        onClick={() => removeItem(item.id)}
                    >
                        Remove Item
                    </button>
                </div>
            ))}

            <hr />

            <h3>
                Total: £
                {cart.items
                    .reduce((sum, item) => sum + item.price * item.quantity, 0)
                    .toFixed(2)}
            </h3>

            <button style={{ marginRight: '10px' }} onClick={clearCart}>
                Clear Cart
            </button>

            <button style={{ marginRight: '10px' }} onClick={goToCheckout}>
                Proceed to Checkout
            </button>

            <Link to="/products">
                <button>Continue Shopping</button>
            </Link>
        </div>
    )
}

export default Cart
