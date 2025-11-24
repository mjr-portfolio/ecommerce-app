import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

import useIsMobile from '../hook/useIsMobile'

import Container from '../components/Container'
import PageHeader from '../components/ui/PageHeader'
import Section from '../components/ui/Section'
import Button from '../components/ui/Button'
import ButtonRow from '../components/ui/ButtonRow'
import MessageContainer from '../components/ui/MessageContainer'
import ErrorMessage from '../components/ui/ErrorMessage'

import OrderSummaryCard from '../components/orders/OrderSummaryCard'
import OrderItemRow from '../components/orders/OrderItemRow'
import OrderTotals from '../components/orders/OrderTotals'

function OrderDetail() {
    const { id } = useParams()
    const [order, setOrder] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const isMobile = useIsMobile()

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

    const total =
        order?.items?.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        ) || 0

    return (
        <Container>
            <PageHeader>Order Details</PageHeader>

            <MessageContainer>
                {loading && <p>Loading order...</p>}
                {error && <ErrorMessage>{error}</ErrorMessage>}
            </MessageContainer>

            {!loading && !error && !order && (
                <Section>
                    <p>Order not found.</p>
                </Section>
            )}

            {!loading && !error && order && (
                <>
                    <Section size="md">
                        <OrderSummaryCard
                            id={order.id}
                            status={order.status}
                            date={order.created_at}
                        />
                    </Section>

                    <Section size="md">
                        {order.items.map(item => (
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
                            <ButtonRow>
                                <Link to="/products">
                                    <Button fullwidth>Continue Shopping</Button>
                                </Link>

                                <Link to="/orders">
                                    <Button fullwidth variant="secondary">
                                        Back to Orders
                                    </Button>
                                </Link>
                            </ButtonRow>
                        ) : (
                            <ButtonRow>
                                <Link to="/orders">
                                    <Button variant="secondary">
                                        Back to Orders
                                    </Button>
                                </Link>

                                <Link to="/products">
                                    <Button>Continue Shopping</Button>
                                </Link>
                            </ButtonRow>
                        )}
                    </Section>
                </>
            )}
        </Container>
    )
}

export default OrderDetail
