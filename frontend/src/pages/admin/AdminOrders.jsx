import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../../lib/api'

import Container from '../../components/Container'
import PageHeader from '../../components/ui/PageHeader'
import Section from '../../components/ui/Section'
import Button from '../../components/ui/Button'
import MessageContainer from '../../components/ui/MessageContainer'
import ErrorMessage from '../../components/ui/ErrorMessage'
import LoadingMessage from '../../components/ui/LoadingMessage'

import { TableWrapper, Table } from '../../components/ui/Table'

export default function AdminOrders() {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const loadOrders = async () => {
            try {
                const data = await api('/api/admin/orders', { auth: true })

                setOrders(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        loadOrders()
    }, [])

    const formatDate = isoString =>
        new Date(isoString).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        })

    return (
        <Container>
            <Button as={Link} to="/admin" size="sm">
                ← Back to Admin Home
            </Button>
            <PageHeader>Admin – Orders</PageHeader>
            <Section size="lg">
                <MessageContainer>
                    {loading && (
                        <LoadingMessage>Loading Orders...</LoadingMessage>
                    )}
                    {error && <ErrorMessage>{error}</ErrorMessage>}
                </MessageContainer>

                {!loading && !error && orders.length === 0 && (
                    <p>No orders found.</p>
                )}

                {!loading && !error && orders.length > 0 && (
                    <TableWrapper>
                        <Table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>User</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th>Items</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(order => (
                                    <tr key={order.id}>
                                        <td>{order.id}</td>
                                        <td>{order.user.name}</td>
                                        <td>{formatDate(order.created_at)}</td>
                                        <td>{order.status}</td>
                                        <td>{order.item_count}</td>
                                        <td>
                                            <Button
                                                as={Link}
                                                size="sm"
                                                to={`/admin/orders/${order.id}`}
                                            >
                                                View
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </TableWrapper>
                )}
            </Section>
        </Container>
    )
}
