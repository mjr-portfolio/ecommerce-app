import { Navigate, useLocation } from 'react-router-dom'

function ProtectedRoute({ user, children }) {
    const location = useLocation()
    const redirectPath = location.pathname + location.search

    if (!user) {
        return (
            <Navigate
                to={`/login?next=${encodeURIComponent(redirectPath)}`}
                replace
            />
        )
    }
    return children
}

export default ProtectedRoute
