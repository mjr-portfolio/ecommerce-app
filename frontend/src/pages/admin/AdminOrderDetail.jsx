import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

import Container from '../../components/Container'
import PageHeader from '../../components/ui/PageHeader'
import Section from '../../components/ui/Section'
import Button from '../../components/ui/Button'
import ButtonRow from '../../components/ui/ButtonRow'
import TextCenter from '../../components/ui/TextCenter'
import MessageContainer from '../../components/ui/MessageContainer'
import ErrorMessage from '../../components/ui/ErrorMessage'
import LoadingMessage from '../../components/ui/LoadingMessage'

import { TableWrapper, Table } from '../../components/ui/Table'

export default function AdminOrderDetail() {
    const { id } = useParams()

    const [order, setOrder] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const load = async () => {
            try {
                const res = await fetch(`/api/admin/orders/${id}`, {
                    credentials: 'include',
                })
                if (!res.ok) throw new Error('Failed to load order')

                const data = await res.json()
                setOrder(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        load()
    }, [id])

    const handleUpdate = async () => {
        try {
            const res = await fetch(`/api/admin/orders/${id}/status`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    status: order.status,
                }),
            })

            if (!res.ok) throw new Error('Failed to update status')
        } catch (err) {
            alert(err.message)
        }
    }

    const formatDate = isoString =>
        new Date(isoString).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        })

    const calcTotal = items =>
        items.reduce((sum, i) => sum + i.price * i.quantity, 0).toFixed(2)

    return (
        <Container>
            <Button as={Link} to="/admin/orders" size="sm">
                ← Back to Orders
            </Button>

            <PageHeader>Order #{id}</PageHeader>

            <Section size="lg">
                <MessageContainer>
                    {loading && (
                        <LoadingMessage>Loading Orders...</LoadingMessage>
                    )}
                    {error && <ErrorMessage>{error}</ErrorMessage>}
                </MessageContainer>

                {order && (
                    <>
                        <TextCenter>
                            <p>
                                <strong>Status:</strong> {order.status}
                            </p>
                            <p>
                                <strong>Date:</strong>{' '}
                                {formatDate(order.created_at)}
                            </p>
                            <p>
                                <strong>User:</strong> {order.user.name} (
                                {order.user.email})
                            </p>
                            <p>
                                <strong>Total Items:</strong>{' '}
                                {order.items.length}
                            </p>
                        </TextCenter>

                        <Section size="md">
                            <ButtonRow $justify="center">
                                <select
                                    style={{ padding: '0 20px' }}
                                    value={order.status}
                                    onChange={e =>
                                        setOrder({
                                            ...order,
                                            status: e.target.value,
                                        })
                                    }
                                >
                                    <option value="pending">pending</option>
                                    <option value="processing">
                                        processing
                                    </option>
                                    <option value="shipped">shipped</option>
                                    <option value="completed">completed</option>
                                    <option value="cancelled">cancelled</option>
                                </select>

                                <Button size="sm" onClick={handleUpdate}>
                                    Update Status
                                </Button>
                            </ButtonRow>
                        </Section>

                        <Section size="lg">
                            <TableWrapper>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Product</th>
                                            <th>Price (£)</th>
                                            <th>Qty</th>
                                            <th>Subtotal (£)</th>
                                            <th></th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {order.items.map(item => (
                                            <tr key={item.id}>
                                                <td>{item.product.name}</td>
                                                <td>{item.price.toFixed(2)}</td>
                                                <td>{item.quantity}</td>
                                                <td>
                                                    {(
                                                        item.price *
                                                        item.quantity
                                                    ).toFixed(2)}
                                                </td>
                                                <td>
                                                    <Button
                                                        as={Link}
                                                        size="sm"
                                                        to={`/products/${item.product.id}`}
                                                    >
                                                        View Product
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </TableWrapper>
                        </Section>

                        <TextCenter>
                            <h3>Total: £{calcTotal(order.items)}</h3>
                        </TextCenter>
                    </>
                )}
            </Section>
        </Container>
    )
}
