import { Navigate, useLocation } from 'react-router-dom'

export default function ProtectedRoute({ user, children }) {
    const location = useLocation()

    // Prevent redirect loop if already on login
    const isOnLoginPage = location.pathname === '/login'

    if (!user) {
        if (isOnLoginPage) return children //Covers potential login page accidental wrapping

        const redirectPath = location.pathname + location.search

        return (
            <Navigate
                to={`/login?next=${encodeURIComponent(redirectPath)}`}
                replace
            />
        )
    }

    // User exists - allow page
    return children
}
