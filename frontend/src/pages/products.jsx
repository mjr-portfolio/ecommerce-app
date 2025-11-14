import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Products() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('/api/products/', {
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

    if (loading) return <p>Loading products...</p>
    if (error) return <p style={{ color: 'red' }}>Error: {error}</p>

    return (
        <div>
            <h2>Products</h2>
            {products.length === 0 ? (
                <p>No products found.</p>
            ) : (
                <ul>
                    {products.map(p => (
                        <li key={p.id}>
                            <Link to={`/products/${p.id}`}>
                                {p.name} — £{p.price.toFixed(2)}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default Products
