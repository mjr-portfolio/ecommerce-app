import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Login from '../src/pages/Login'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { lightTheme } from '../src/theme/theme'

// Mock fetch globally
global.fetch = vi.fn()

const renderLogin = (props = {}) =>
    render(
        <ThemeProvider theme={lightTheme}>
            <BrowserRouter>
                <Login {...props} />
            </BrowserRouter>
        </ThemeProvider>
    )

describe('Login Page', () => {
    beforeEach(() => {
        fetch.mockReset()
    })

    it('renders email and password fields', () => {
        renderLogin()

        expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
        expect(
            screen.getByRole('button', { name: /login/i })
        ).toBeInTheDocument()
    })

    it('submits form and calls onLoginSuccess on success', async () => {
        const mockSuccess = vi.fn()

        // Mock API response
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ user: { id: 1, email: 'test@example.com' } }),
        })

        renderLogin({ onLoginSuccess: mockSuccess })

        fireEvent.change(screen.getByLabelText(/email/i), {
            target: { value: 'test@example.com' },
        })
        fireEvent.change(screen.getByLabelText(/password/i), {
            target: { value: 'password123' },
        })

        fireEvent.click(screen.getByRole('button', { name: /login/i }))

        await waitFor(() => {
            expect(mockSuccess).toHaveBeenCalledWith({
                id: 1,
                email: 'test@example.com',
            })
        })
    })

    it('shows an error message when login fails', async () => {
        // Mock failed login
        fetch.mockResolvedValueOnce({
            ok: false,
            json: async () => ({ error: 'Invalid email or password' }),
        })

        renderLogin()

        fireEvent.change(screen.getByLabelText(/email/i), {
            target: { value: 'wrong@example.com' },
        })
        fireEvent.change(screen.getByLabelText(/password/i), {
            target: { value: 'badpass' },
        })

        fireEvent.click(screen.getByRole('button', { name: /login/i }))

        const msg = await screen.findByText(/invalid email or password/i)
        expect(msg).toBeInTheDocument()
    })
})
