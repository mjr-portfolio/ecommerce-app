import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import Navbar from '../src/components/Navbar'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { lightTheme } from '../src/theme/theme'

// Helper: render Navbar with required props
function renderNavbar(user = null, cartCount = 0) {
    return render(
        <ThemeProvider theme={lightTheme}>
            <MemoryRouter>
                <Navbar
                    user={user}
                    toggleTheme={() => {}}
                    theme={lightTheme}
                    cartCount={cartCount}
                />
            </MemoryRouter>
        </ThemeProvider>
    )
}

describe('Navbar – Cart Badge', () => {
    beforeEach(() => vi.resetAllMocks())
    afterEach(() => vi.restoreAllMocks())

    test('does NOT show badge if cartCount = 0', () => {
        renderNavbar({ name: 'Test User' }, 0)

        expect(screen.queryByTestId('cart-badge')).not.toBeInTheDocument()
    })

    test('shows badge when cartCount > 0', () => {
        renderNavbar({ name: 'Test User' }, 3)

        const badge = screen.getByTestId('cart-badge')
        expect(badge).toBeInTheDocument()
        expect(badge.textContent).toBe('3')
    })

    test('updates badge when cartCount changes', async () => {
        const { rerender } = render(
            <ThemeProvider theme={lightTheme}>
                <MemoryRouter>
                    <Navbar
                        user={{ name: 'Test User' }}
                        toggleTheme={() => {}}
                        theme={lightTheme}
                        cartCount={1}
                    />
                </MemoryRouter>
            </ThemeProvider>
        )

        expect(screen.getByTestId('cart-badge').textContent).toBe('1')

        // re-render with new cart count
        rerender(
            <ThemeProvider theme={lightTheme}>
                <MemoryRouter>
                    <Navbar
                        user={{ name: 'Test User' }}
                        toggleTheme={() => {}}
                        theme={lightTheme}
                        cartCount={4}
                    />
                </MemoryRouter>
            </ThemeProvider>
        )

        expect(screen.getByTestId('cart-badge').textContent).toBe('4')
    })
})
