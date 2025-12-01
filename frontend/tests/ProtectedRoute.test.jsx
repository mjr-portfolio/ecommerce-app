import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import ProtectedRoute from '../src/components/ProtectedRoute'

function renderWithRouter(ui, { route = '/' } = {}) {
    return render(<MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>)
}

describe('ProtectedRoute', () => {
    test('redirects unauthenticated users to /login', () => {
        renderWithRouter(
            <Routes>
                <Route
                    path="/protected"
                    element={
                        <ProtectedRoute user={null}>
                            <div>Secret</div>
                        </ProtectedRoute>
                    }
                />
                <Route path="/login" element={<div>Login Page</div>} />
            </Routes>,
            { route: '/protected' }
        )

        expect(screen.getByText(/login page/i)).toBeInTheDocument()
        expect(screen.queryByText(/secret/i)).not.toBeInTheDocument()
    })

    test('renders children when user is authenticated', () => {
        const fakeUser = { id: 1, email: 'test@example.com' }

        renderWithRouter(
            <Routes>
                <Route
                    path="/protected"
                    element={
                        <ProtectedRoute user={fakeUser}>
                            <div>Secret</div>
                        </ProtectedRoute>
                    }
                />
            </Routes>,
            { route: '/protected' }
        )

        expect(screen.getByText('Secret')).toBeInTheDocument()
    })
})
