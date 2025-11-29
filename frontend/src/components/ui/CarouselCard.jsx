import { Link } from 'react-router-dom'
import styled from 'styled-components'

import Button from './Button'
import {
    ProductCard,
    ProductImage,
    ProductTitle,
    ProductExcerpt,
    ProductFooter,
} from './ProductCard'

export const CarouselCardWrapper = styled.div`
    width: 220px; /* ← important */
    flex: 0 0 auto;
`

export default function CarouselCard({ product }) {
    return (
        <CarouselCardWrapper>
            <ProductCard>
                <ProductImage>
                    <img
                        src={product.image_url || '/placeholder.png'}
                        alt={product.name}
                    />
                </ProductImage>

                <ProductTitle>{product.name}</ProductTitle>

                {product.description && (
                    <ProductExcerpt>{product.description}</ProductExcerpt>
                )}

                <ProductFooter>
                    <span>£{product.price.toFixed(2)}</span>

                    <Link to={`/products/${product.id}`}>
                        <Button variant="secondary">View</Button>
                    </Link>
                </ProductFooter>
            </ProductCard>
        </CarouselCardWrapper>
    )
}
