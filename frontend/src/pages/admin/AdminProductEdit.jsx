import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { api } from '../../lib/api'

import Container from '../../components/Container'
import PageHeader from '../../components/ui/PageHeader'
import Section from '../../components/ui/Section'
import Button from '../../components/ui/Button'
import ButtonRow from '../../components/ui/ButtonRow'

import AdminProductForm from '../../components/admin/AdminProductForm'
import MessageContainer from '../../components/ui/MessageContainer'
import ErrorMessage from '../../components/ui/ErrorMessage'
import LoadingMessage from '../../components/ui/LoadingMessage'

export default function AdminProductEdit() {
    const { id } = useParams()
    const navigate = useNavigate()

    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const loadProduct = async () => {
            try {
                const data = await api(`/api/admin/products/${id}`, {
                    auth: true,
                })

                setProduct(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        loadProduct()
    }, [id])

    const handleSubmit = async e => {
        e.preventDefault()
        setError('')

        const form = new FormData(e.target)
        const updateData = {
            name: form.get('name'),
            price: parseFloat(form.get('price')),
            stock: parseInt(form.get('stock'), 10),
            image_url: form.get('image_url') || null,
            description: form.get('description') || '',
        }

        try {
            await api(`/api/admin/products/${id}`, {
                method: 'PUT',
                body: updateData,
                auth: true,
            })

            navigate('/admin/products')
        } catch (err) {
            setError(err.message)
        }
    }

    const handleDelete = async () => {
        if (!window.confirm('Delete this product?')) return
        try {
            await api(`/api/admin/products/${id}`, {
                method: 'DELETE',
                auth: true,
            })

            navigate('/admin/products')
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <Container>
            <Button as={Link} to="/admin/products" size="sm">
                ← Back to Products
            </Button>
            <PageHeader title="Admin - Edit Product">
                Admin – Edit Product
            </PageHeader>

            <Section size="lg">
                <MessageContainer>
                    {loading && <LoadingMessage>Loading...</LoadingMessage>}
                    {error && <ErrorMessage>{error}</ErrorMessage>}
                </MessageContainer>

                {product && (
                    <>
                        <AdminProductForm
                            product={product}
                            submitLabel="Save Changes"
                            onSubmit={handleSubmit}
                        />

                        <ButtonRow>
                            <Button variant="danger" onClick={handleDelete}>
                                Delete Product
                            </Button>
                        </ButtonRow>
                    </>
                )}
            </Section>
        </Container>
    )
}
