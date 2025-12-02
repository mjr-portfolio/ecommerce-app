import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { api } from '../lib/api'

import Container from '../components/Container'
import { Card, CardBody, CardTitle, CardSeparator } from '../components/ui/Card'
import Button from '../components/ui/Button'
import PageHeader from '../components/ui/PageHeader'
import ErrorMessage from '../components/ui/ErrorMessage'
import LoadingMessage from '../components/ui/LoadingMessage'
import SuccessMessage from '../components/ui/SuccessMessage'
import MessageContainer from '../components/ui/MessageContainer'
import Section from '../components/ui/Section'

import styled from 'styled-components'

const ImageWrapper = styled.div`
    width: 100%;
    height: ${({ theme }) => theme.imageHeights.productDetail.desktop};
    border-radius: ${({ theme }) => theme.radius.md};
    margin-bottom: ${({ theme }) => theme.spacing.md};
    overflow: hidden;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        height: ${({ theme }) => theme.imageHeights.productDetail.mobile};
    }
`

const PriceBox = styled.div`
    padding: ${({ theme }) => theme.spacing.md};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.radius.md};
    background: ${({ theme }) => theme.colors.card};
    font-size: 1.2rem;
    font-weight: 600;
    text-align: center;
    margin: ${({ theme }) => theme.spacing.md} 0;
`

const Description = styled.p`
    margin-bottom: ${({ theme }) => theme.spacing.xs};
`

const StockText = styled.p`
    opacity: 0.8;
    margin-top: 0;
`

export default function ProductDetail({ user, fetchCartCount }) {
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [addedMessage, setAddedMessage] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await api(`/api/products/${id}`, {
                    auth: true,
                })

                setProduct(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchProduct()
    }, [id])

    const addToCart = async () => {
        if (!user) {
            navigate(`/login?next=${encodeURIComponent(`/products/${id}`)}`)
            return
        }

        setAddedMessage('Adding to cart...')

        try {
            const data = await api('/api/cart/add', {
                method: 'POST',
                body: { product_id: product.id, quantity: 1 },
                auth: true,
            })

            const qty =
                data.cart.items.find(i => i.product.id === product.id)
                    ?.quantity || 1

            setAddedMessage(`Added to cart (${qty} total)`)

            setTimeout(() => setAddedMessage(''), 2500)

            if (fetchCartCount) await fetchCartCount()
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <Container>
            <PageHeader>Product Details</PageHeader>

            <MessageContainer>
                {loading && <LoadingMessage>Loading Product...</LoadingMessage>}
                {error && <ErrorMessage>{error}</ErrorMessage>}
                {addedMessage && (
                    <SuccessMessage>{addedMessage}</SuccessMessage>
                )}
            </MessageContainer>

            {!loading && !error && product && (
                <Section size="lg">
                    <Card>
                        <CardBody>
                            <ImageWrapper>
                                <img
                                    src={
                                        product.image_url || '/placeholder.png'
                                    }
                                    alt={product.name}
                                />
                            </ImageWrapper>

                            <CardTitle>{product.name}</CardTitle>

                            <PriceBox>£{product.price.toFixed(2)}</PriceBox>

                            <CardSeparator />

                            <Description>{product.description}</Description>
                            <StockText>Stock: {product.stock}</StockText>

                            <Section size="md">
                                <Button
                                    onClick={addToCart}
                                    disabled={addedMessage}
                                    fullwidth
                                >
                                    {addedMessage
                                        ? 'Item Added'
                                        : 'Add to Cart'}
                                </Button>
                            </Section>

                            <Section size="sm">
                                <Link to="/products">
                                    <Button variant="secondary" fullwidth>
                                        Back to Products
                                    </Button>
                                </Link>
                            </Section>
                        </CardBody>
                    </Card>
                </Section>
            )}
        </Container>
    )
}
