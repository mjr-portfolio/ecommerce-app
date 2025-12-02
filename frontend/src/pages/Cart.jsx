import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import useIsMobile from '../hook/useIsMobile'

import Container from '../components/Container'
import PageHeader from '../components/ui/PageHeader'
import Section from '../components/ui/Section'
import MessageContainer from '../components/ui/MessageContainer'
import ErrorMessage from '../components/ui/ErrorMessage'
import LoadingMessage from '../components/ui/LoadingMessage'
import Button from '../components/ui/Button'
import ButtonRow from '../components/ui/ButtonRow'
import TextCenter from '../components/ui/TextCenter'

import CartItemRow from '../components/cart/CartItemRow'
import OrderTotals from '../components/orders/OrderTotals'

export default function Cart({ fetchCartCount }) {
    const [cart, setCart] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const isMobile = useIsMobile()

    const fetchCart = async () => {
        try {
            const res = await fetch('/api/cart', {
                credentials: 'include',
            })

            const data = await res.json()
            if (!res.ok) throw new Error(data.error || 'Failed to load cart')

            setCart(data)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCart()
    }, [])

    const increase = item => updateItem(item.id, item.quantity + 1)
    const decrease = item =>
        item.quantity > 1 ? updateItem(item.id, item.quantity - 1) : null

    const updateItem = async (itemId, quantity) => {
        try {
            const res = await fetch(`/api/cart/update/${itemId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ quantity }),
            })

            const data = await res.json()
            if (!res.ok) throw new Error(data.error || 'Failed to update item')

            setCart(data.cart)

            if (fetchCartCount) await fetchCartCount()
        } catch (err) {
            setError(err.message)
        }
    }

    const removeItem = async item => {
        try {
            const res = await fetch(`/api/cart/remove/${item.id}`, {
                method: 'DELETE',
                credentials: 'include',
            })

            const data = await res.json()
            if (!res.ok) throw new Error(data.error || 'Failed to remove item')

            setCart(data.cart)

            if (fetchCartCount) await fetchCartCount()
        } catch (err) {
            setError(err.message)
        }
    }

    const clearCart = async () => {
        try {
            const res = await fetch('/api/cart/clear', {
                method: 'DELETE',
                credentials: 'include',
            })

            const data = await res.json()
            if (!res.ok) throw new Error(data.error || 'Failed to clear cart')

            setCart(prev => ({ ...prev, items: [] }))

            if (fetchCartCount) await fetchCartCount()
        } catch (err) {
            setError(err.message)
        }
    }

    const total =
        cart?.items?.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        ) || 0

    return (
        <Container>
            <PageHeader>Your Cart</PageHeader>

            <MessageContainer>
                {loading && <LoadingMessage>Loading Cart...</LoadingMessage>}
                {error && <ErrorMessage>{error}</ErrorMessage>}
            </MessageContainer>

            {!loading && !error && cart?.items?.length === 0 && (
                <Section>
                    <TextCenter>
                        <p>Your cart is empty.</p>
                        <Link to="/products">
                            <Button>Browse Products</Button>
                        </Link>
                    </TextCenter>
                </Section>
            )}

            {!loading && !error && cart?.items?.length > 0 && (
                <>
                    <Section size="lg">
                        {cart.items.map(item => (
                            <CartItemRow
                                key={item.id}
                                item={item}
                                onIncrease={increase}
                                onDecrease={decrease}
                                onRemove={removeItem}
                            />
                        ))}
                    </Section>

                    <Section size="lg">
                        <OrderTotals
                            subtotal={total}
                            total={total}
                            shipping="Free"
                        />
                    </Section>

                    <Section size="lg">
                        {isMobile ? (
                            <ButtonRow>
                                <Link to="/checkout">
                                    <Button fullwidth size="lg">
                                        Checkout
                                    </Button>
                                </Link>

                                <Link to="/products">
                                    <Button fullwidth variant="secondary">
                                        Continue Shopping
                                    </Button>
                                </Link>

                                <Button
                                    fullwidth
                                    variant="danger"
                                    onClick={clearCart}
                                >
                                    Clear Cart
                                </Button>
                            </ButtonRow>
                        ) : (
                            <ButtonRow $justify="end">
                                <Button variant="danger" onClick={clearCart}>
                                    Clear Cart
                                </Button>

                                <Link to="/products">
                                    <Button variant="secondary">
                                        Continue Shopping
                                    </Button>
                                </Link>

                                <Link to="/checkout">
                                    <Button size="lg">Checkout</Button>
                                </Link>
                            </ButtonRow>
                        )}
                    </Section>
                </>
            )}
        </Container>
    )
}
