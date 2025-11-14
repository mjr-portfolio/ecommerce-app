import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'

function ProductDetail({ user }) {
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [message, setMessage] = useState()

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
            const redirectTo = `/products/${id}`
            navigate(`/login?next=${encodeURIComponent(redirectTo)}`)
            return
        }

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

            setMessage('Item added to cart') // or toast if you add one later
        } catch (err) {
            setError(err.message)
        }
    }

    if (loading) return <p>Loading product...</p>
    if (error) return <p style={{ color: 'red' }}>Error: {error}</p>
    if (!product) return <p>Product not found.</p>

    return (
        <div>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Price: £{product.price.toFixed(2)}</p>
            <p>Stock: {product.stock}</p>
            <div style={{ marginTop: '20px' }}>
                <button onClick={addToCart}>Add to Cart</button>
            </div>
            <div style={{ marginTop: '20px' }}>
                <Link to="/products">
                    <button>Back to Products</button>
                </Link>
            </div>
        </div>
    )
}

export default ProductDetail
