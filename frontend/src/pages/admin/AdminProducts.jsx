import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../../lib/api'

import Container from '../../components/Container'
import PageHeader from '../../components/ui/PageHeader'
import Section from '../../components/ui/Section'
import Grid from '../../components/ui/Grid'
import Button from '../../components/ui/Button'
import ButtonRow from '../../components/ui/ButtonRow'
import MessageContainer from '../../components/ui/MessageContainer'
import ErrorMessage from '../../components/ui/ErrorMessage'
import LoadingMessage from '../../components/ui/LoadingMessage'

import {
    Card,
    CardHeader,
    CardTitle,
    CardSubtitle,
    CardFooter,
} from '../../components/ui/Card'

export default function AdminProducts() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await api('/api/admin/products', { auth: true })

                setProducts(data)
            } catch (err) {
                setError(err.message || 'Error loading products')
            } finally {
                setLoading(false)
            }
        }

        fetchProducts()
    }, [])

    const handleDelete = async id => {
        if (!window.confirm('Are you sure?')) return

        try {
            await api(`/api/admin/products/${id}`, {
                method: 'DELETE',
                auth: true,
            })

            setProducts(products.filter(p => p.id !== id))
        } catch (err) {
            alert(err.message)
        }
    }

    return (
        <Container>
            <Button as={Link} to="/admin" size="sm">
                ← Back to Admin Home
            </Button>
            <PageHeader title="Admin – Products">Admin – Products</PageHeader>

            <Section size="lg">
                <ButtonRow $justify="center">
                    <Button as={Link} to="/admin/products/new">
                        Add New Product
                    </Button>
                </ButtonRow>

                <MessageContainer>
                    {loading && <LoadingMessage>Loading...</LoadingMessage>}
                    {error && <ErrorMessage>{error}</ErrorMessage>}
                </MessageContainer>

                {!loading && !error && (
                    <Grid>
                        {products.map(product => (
                            <Card key={product.id}>
                                <CardHeader>
                                    <CardTitle>{product.name}</CardTitle>
                                    <CardSubtitle>
                                        £{product.price.toFixed(2)} —{' '}
                                        {product.stock} in stock
                                    </CardSubtitle>
                                </CardHeader>

                                <CardFooter>
                                    <Button
                                        as={Link}
                                        to={`/admin/products/${product.id}/edit`}
                                    >
                                        Edit
                                    </Button>

                                    <Button
                                        variant="danger"
                                        onClick={() => handleDelete(product.id)}
                                    >
                                        Delete
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </Grid>
                )}
            </Section>
        </Container>
    )
}
