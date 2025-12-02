import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import useIsMobile from '../hook/useIsMobile'
import { api } from '../lib/api'

import Container from '../components/Container'
import PageHeader from '../components/ui/PageHeader'
import Section from '../components/ui/Section'
import Button from '../components/ui/Button'
import ButtonRow from '../components/ui/ButtonRow'
import MessageContainer from '../components/ui/MessageContainer'
import ErrorMessage from '../components/ui/ErrorMessage'
import LoadingMessage from '../components/ui/LoadingMessage'
import TextCenter from '../components/ui/TextCenter'

import OrderSummaryCard from '../components/orders/OrderSummaryCard'
import OrderItemRow from '../components/orders/OrderItemRow'
import OrderTotals from '../components/orders/OrderTotals'

export default function Checkout({ fetchCartCount }) {
    const [cart, setCart] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [confirming, setConfirming] = useState(false)

    const navigate = useNavigate()
    const isMobile = useIsMobile()

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const data = await api('/api/cart', { auth: true })

                setCart(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchCart()
    }, [])

    const handleCheckout = async () => {
        setConfirming(true)
        try {
            await api('/api/cart/checkout', {
                method: 'POST',
                auth: true,
            })

            navigate('/order-complete')

            if (fetchCartCount) await fetchCartCount()
        } catch (err) {
            setError(err.message)
        } finally {
            setConfirming(false)
        }
    }

    const total =
        cart?.items?.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        ) || 0

    return (
        <Container>
            <PageHeader>Checkout</PageHeader>

            <MessageContainer>
                {loading && <LoadingMessage>Loading...</LoadingMessage>}
                {error && <ErrorMessage>{error}</ErrorMessage>}
            </MessageContainer>

            {!loading && !error && cart?.items?.length === 0 && (
                <Section>
                    <TextCenter>Your cart is empty.</TextCenter>
                </Section>
            )}

            {!loading && !error && cart?.items?.length > 0 && (
                <>
                    <Section size="md">
                        <OrderSummaryCard
                            checkout={true}
                            date={new Date()}
                            status={`${cart.items.length} Items`}
                        />
                    </Section>

                    <Section size="md">
                        {cart.items.map(item => (
                            <OrderItemRow key={item.id} item={item} />
                        ))}
                    </Section>

                    <Section size="md">
                        <OrderTotals
                            subtotal={total}
                            total={total}
                            shipping="Free"
                        />
                    </Section>

                    <Section size="md">
                        {isMobile ? (
                            <ButtonRow $justify="end">
                                <Button
                                    onClick={handleCheckout}
                                    disabled={confirming}
                                    size="lg"
                                >
                                    {confirming
                                        ? 'Processing...'
                                        : 'Confirm Order'}
                                </Button>

                                <Link to="/cart">
                                    <Button fullwidth variant="secondary">
                                        Back to Cart
                                    </Button>
                                </Link>
                            </ButtonRow>
                        ) : (
                            <ButtonRow $justify="end">
                                <Link to="/cart">
                                    <Button variant="secondary">
                                        Back to Cart
                                    </Button>
                                </Link>

                                <Button
                                    onClick={handleCheckout}
                                    disabled={confirming}
                                    size="lg"
                                >
                                    {confirming
                                        ? 'Processing...'
                                        : 'Confirm Order'}
                                </Button>
                            </ButtonRow>
                        )}
                    </Section>
                </>
            )}
        </Container>
    )
}
