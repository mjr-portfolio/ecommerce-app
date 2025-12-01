import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { lightTheme } from '../src/theme/theme'

import {
    ProductCard,
    ProductTitle,
    ProductImage,
    ProductExcerpt,
    ProductFooter,
} from '../src/components/ui/ProductCard'

import { BrowserRouter } from 'react-router-dom'
import Button from '../src/components/ui/Button'

// Helper to wrap components with theme + router
const renderWithProviders = ui => {
    return render(
        <BrowserRouter>
            <ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>
        </BrowserRouter>
    )
}

describe('ProductCard component', () => {
    test('renders product content', () => {
        const product = {
            id: 1,
            name: 'Nordic Mug',
            description: 'Perfect for winter coffee.',
            price: 12.99,
            image_url: '/test.jpg',
        }

        renderWithProviders(
            <ProductCard>
                <ProductImage>
                    <img src={product.image_url} alt={product.name} />
                </ProductImage>

                <ProductTitle>{product.name}</ProductTitle>

                <ProductExcerpt>{product.description}</ProductExcerpt>

                <ProductFooter>
                    £{product.price}
                    <Button to={`/products/${product.id}`}>View Details</Button>
                </ProductFooter>
            </ProductCard>
        )

        expect(screen.getByText('Nordic Mug')).toBeInTheDocument()
        expect(
            screen.getByText('Perfect for winter coffee.')
        ).toBeInTheDocument()
        expect(screen.getByText('£12.99')).toBeInTheDocument()

        const img = screen.getByRole('img')
        expect(img).toHaveAttribute('src', '/test.jpg')
        expect(img).toHaveAttribute('alt', 'Nordic Mug')

        expect(
            screen.getByRole('button', { name: /view details/i })
        ).toBeInTheDocument()
    })
})
