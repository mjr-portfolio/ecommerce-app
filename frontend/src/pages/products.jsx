import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { productImages } from '../utils/productImages'

import Container from '../components/Container'
import PageHeader from '../components/ui/PageHeader'
import MessageContainer from '../components/ui/MessageContainer'
import ErrorMessage from '../components/ui/ErrorMessage'
import Grid from '../components/ui/Grid'
import Button from '../components/ui/Button'
import Section from '../components/ui/Section'
import {
    ProductCard,
    ProductImage,
    ProductTitle,
    ProductExcerpt,
    ProductFooter,
} from '../components/ui/ProductCard'

function Products() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('/api/products', {
                    credentials: 'include',
                })

                const data = await response.json()

                if (!response.ok)
                    throw new Error(data.error || 'Failed to fetch products')

                setProducts(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchProducts()
    }, [])

    return (
        <Container>
            <PageHeader>Products</PageHeader>

            <MessageContainer>
                {loading && <p>Loading products...</p>}
                {error && <ErrorMessage>{error}</ErrorMessage>}
            </MessageContainer>

            {!loading && !error && products.length === 0 && (
                <Section size="lg">
                    <p>No products found.</p>
                    <Link to="/products">
                        <Button>Refresh</Button>
                    </Link>
                </Section>
            )}

            {!loading && !error && products.length > 0 && (
                <Grid>
                    {products.map(product => (
                        <ProductCard key={product.id}>
                            <ProductImage>
                                <img
                                    src={productImages[product.id]}
                                    alt={product.name}
                                />
                            </ProductImage>

                            <ProductTitle>{product.name}</ProductTitle>

                            <ProductExcerpt>
                                {product.description}
                            </ProductExcerpt>

                            <ProductFooter>
                                £{product.price.toFixed(2)}
                                <Link to={`/products/${product.id}`}>
                                    <Button fullwidth>View Details</Button>
                                </Link>
                            </ProductFooter>
                        </ProductCard>
                    ))}
                </Grid>
            )}
        </Container>
    )
}

export default Products
