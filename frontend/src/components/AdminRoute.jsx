import { Navigate, useLocation } from 'react-router-dom'

export default function AdminRoute({ user, children }) {
    const location = useLocation()

    const isOnLoginPage = location.pathname === '/login'

    if (!user) {
        if (isOnLoginPage) return children

        const redirectPath = location.pathname + location.search

        return (
            <Navigate
                to={`/login?next=${encodeURIComponent(redirectPath)}`}
                replace
            />
        )
    }

    if (!user.is_admin) {
        return <Navigate to="/" replace />
    }

    return children
}
