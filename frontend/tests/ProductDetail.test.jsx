import { describe, test, expect, beforeEach, afterEach } from 'vitest'
import { vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import ProductDetail from '../src/pages/ProductDetail'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { lightTheme } from '../src/theme/theme'

function renderPage(id = '1') {
    return render(
        <ThemeProvider theme={lightTheme}>
            <MemoryRouter initialEntries={[`/products/${id}`]}>
                <Routes>
                    <Route path="/products/:id" element={<ProductDetail />} />
                </Routes>
            </MemoryRouter>
        </ThemeProvider>
    )
}

describe('ProductDetail', () => {
    beforeEach(() => {
        vi.resetAllMocks()
    })

    test('renders loading message initially', () => {
        vi.spyOn(global, 'fetch').mockResolvedValue({
            ok: true,
            json: async () => ({ id: 1, name: 'Test', price: 10 }),
        })

        renderPage()

        expect(screen.getByText(/loading/i)).toBeInTheDocument()
    })

    test('renders product details on success', async () => {
        vi.spyOn(global, 'fetch').mockResolvedValue({
            ok: true,
            json: async () => ({
                id: 1,
                name: 'Test Product',
                description: 'A good product',
                price: 9.99,
            }),
        })

        renderPage()

        await waitFor(() =>
            expect(screen.getByText(/test product/i)).toBeInTheDocument()
        )
        expect(screen.getByText(/9.99/i)).toBeInTheDocument()
    })

    test('renders error message on failure', async () => {
        vi.spyOn(global, 'fetch').mockResolvedValue({
            ok: false,
            json: async () => ({ error: 'Not found' }),
        })

        renderPage()

        await waitFor(() =>
            expect(screen.getByText(/not found/i)).toBeInTheDocument()
        )
    })
})
