import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import Container from '../components/Container'
import PageHeader from '../components/ui/PageHeader'
import Section from '../components/ui/Section'
import Button from '../components/ui/Button'
import MessageContainer from '../components/ui/MessageContainer'
import ErrorMessage from '../components/ui/ErrorMessage'
import LoadingMessage from '../components/ui/LoadingMessage'
import TextCenter from '../components/ui/TextCenter'
import {
    OrderCard,
    OrderHeader,
    OrderId,
    OrderStatus,
    OrderMeta,
    OrderFooter,
} from '../components/ui/OrderCard'

export default function Orders() {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await fetch('/api/orders', {
                    credentials: 'include',
                })

                const data = await res.json()
                if (!res.ok)
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

    const renderOrderList = () =>
        orders.map(order => {
            const itemCount = order.items.reduce(
                (sum, item) => sum + item.quantity,
                0
            )

            return (
                <OrderCard key={order.id}>
                    <OrderHeader>
                        <OrderId>Order #{order.id}</OrderId>
                        <OrderStatus>Status: {order.status}</OrderStatus>
                    </OrderHeader>

                    <OrderMeta>
                        Date: {new Date(order.created_at).toLocaleString()}
                        <br />
                        Total Items: {itemCount}
                    </OrderMeta>

                    <OrderFooter>
                        <Link to={`/orders/${order.id}`}>
                            <Button>View Details</Button>
                        </Link>
                    </OrderFooter>
                </OrderCard>
            )
        })

    return (
        <Container>
            <PageHeader>Your Orders</PageHeader>

            <MessageContainer>
                {loading && <LoadingMessage>Loading Orders...</LoadingMessage>}
                {error && <ErrorMessage>{error}</ErrorMessage>}
            </MessageContainer>

            {!loading && !error && orders.length === 0 && (
                <Section size="lg">
                    <TextCenter>
                        <p>You haven’t placed any orders yet.</p>
                        <Link to="/products">
                            <Button>Browse Products</Button>
                        </Link>
                    </TextCenter>
                </Section>
            )}

            {!loading && !error && orders.length > 0 && (
                <Section size="lg">{renderOrderList()}</Section>
            )}
        </Container>
    )
}
