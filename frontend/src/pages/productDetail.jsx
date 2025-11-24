import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'

import { productImages } from '../utils/productImages'

import Container from '../components/Container'
import { Card, CardBody, CardTitle, CardSeparator } from '../components/ui/Card'
import Button from '../components/ui/Button'
import PageHeader from '../components/ui/PageHeader'
import ErrorMessage from '../components/ui/ErrorMessage'
import SuccessMessage from '../components/ui/SuccessMessage'
import MessageContainer from '../components/ui/MessageContainer'
import Section from '../components/ui/Section'

import styled from 'styled-components'

const ImageWrapper = styled.div`
    width: 100%;
    height: ${({ theme }) => theme.imageHeights.productDetail.desktop};
    border-radius: ${({ theme }) => theme.radius.md};
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

function ProductDetail({ user }) {
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [addedMessage, setAddedMessage] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`/api/products/${id}`, {
                    credentials: 'include',
                })

                const data = await response.json()
                if (!response.ok)
                    throw new Error(data.error || 'Failed to fetch product')

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
            const response = await fetch('/api/cart/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ product_id: product.id, quantity: 1 }),
            })

            const data = await response.json()
            if (!response.ok)
                throw new Error(data.error || 'Failed to add to cart')

            const qty =
                data.cart.items.find(i => i.product.id === product.id)
                    ?.quantity || 1

            setAddedMessage(`Added to cart (${qty} total)`)

            setTimeout(() => setAddedMessage(''), 2500)
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <Container>
            <PageHeader>Product Details</PageHeader>

            <MessageContainer>
                {loading && <p>Loading product...</p>}
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
                                    src={productImages[product.id]}
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

export default ProductDetail
