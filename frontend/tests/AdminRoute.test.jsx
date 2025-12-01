import { screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import AdminRoute from '../src/components/AdminRoute'
import { render } from '@testing-library/react'

// Helper to reduce repeated boilerplate
function renderWithRoute(ui, { route = '/' } = {}) {
    window.history.pushState({}, 'Test Page', route)
    return render(<MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>)
}

describe('AdminRoute', () => {
    test('redirects unauthenticated users to /login', () => {
        renderWithRoute(
            <Routes>
                <Route
                    path="/admin-only"
                    element={
                        <AdminRoute user={null}>
                            <div>Admin Content</div>
                        </AdminRoute>
                    }
                />
                <Route path="/login" element={<div>Login Page</div>} />
            </Routes>,
            { route: '/admin-only' }
        )

        expect(screen.getByText(/login page/i)).toBeInTheDocument()
        expect(screen.queryByText(/admin content/i)).not.toBeInTheDocument()
    })

    test('redirects non-admin users to /', () => {
        const fakeUser = { id: 1, name: 'Regular User', is_admin: false }

        renderWithRoute(
            <Routes>
                <Route
                    path="/admin-only"
                    element={
                        <AdminRoute user={fakeUser}>
                            <div>Admin Content</div>
                        </AdminRoute>
                    }
                />
                <Route path="/" element={<div>Home Page</div>} />
            </Routes>,
            { route: '/admin-only' }
        )

        expect(screen.getByText(/home page/i)).toBeInTheDocument()
        expect(screen.queryByText(/admin content/i)).not.toBeInTheDocument()
    })

    test('allows access for admin users', () => {
        const adminUser = { id: 1, name: 'Admin Man', is_admin: true }

        renderWithRoute(
            <Routes>
                <Route
                    path="/admin-only"
                    element={
                        <AdminRoute user={adminUser}>
                            <div>Admin Content</div>
                        </AdminRoute>
                    }
                />
            </Routes>,
            { route: '/admin-only' }
        )

        expect(screen.getByText(/admin content/i)).toBeInTheDocument()
    })
})
