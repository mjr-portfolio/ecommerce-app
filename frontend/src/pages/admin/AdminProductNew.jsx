import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import Container from '../../components/Container'
import PageHeader from '../../components/ui/PageHeader'
import Section from '../../components/ui/Section'
import Button from '../../components/ui/Button'

import AdminProductForm from '../../components/admin/AdminProductForm'
import MessageContainer from '../../components/ui/MessageContainer'
import ErrorMessage from '../../components/ui/ErrorMessage'

export default function AdminProductNew() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async e => {
        e.preventDefault()
        setError('')
        setLoading(true)

        const form = new FormData(e.target)

        const productData = {
            name: form.get('name'),
            price: parseFloat(form.get('price')),
            stock: parseInt(form.get('stock'), 10),
            image_url: form.get('image_url') || null,
            description: form.get('description') || '',
        }

        try {
            const res = await fetch('/api/admin/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(productData),
            })

            if (!res.ok) {
                const data = await res.json()
                throw new Error(data.error || 'Failed to create product')
            }

            navigate('/admin/products')
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Container>
            <Button as={Link} to="/admin/products" size="sm">
                ← Back to Products
            </Button>
            <PageHeader title="Admin - Add New Product">
                Admin – Add New Product
            </PageHeader>

            <Section size="lg">
                <MessageContainer>
                    {loading && <p>Saving...</p>}
                    {error && <ErrorMessage>{error}</ErrorMessage>}
                </MessageContainer>

                <AdminProductForm
                    submitLabel="Save Changes"
                    onSubmit={handleSubmit}
                />
            </Section>
        </Container>
    )
}
