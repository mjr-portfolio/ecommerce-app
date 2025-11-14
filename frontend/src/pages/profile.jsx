import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Profile({ user, setUser }) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const navigate = useNavigate()

    const handleLogout = async () => {
        setLoading(true)
        try {
            const response = await fetch('/api/auth/logout', {
                method: 'POST',
                credentials: 'include',
            })

            const data = await response.json()

            if (!response.ok)
                throw new Error(data.error || 'Failed to log out.')

            setUser(null)
            navigate('/login')
        } catch (err) {
            setError(err.message || 'Network error during logout.')
        } finally {
            setLoading(false)
        }
    }

    if (!user)
        return (
            <div style={{ textAlign: 'center', marginTop: 50 }}>
                <p>You are not logged in.</p>
                <button
                    onClick={() => navigate('/login')}
                    style={{ marginTop: 20 }}
                >
                    Return to Login page
                </button>
            </div>
        )

    return (
        <div style={{ textAlign: 'center', marginTop: 50 }}>
            <h2>Profile</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <p>You are logged in as {user.email}</p>
            <p>Name: {user.name}</p>
            <p>Account created: {new Date(user.created_at).toLocaleString()}</p>
            <div style={{ marginTop: '20px' }}>
                <Link to="/orders">
                    <button>View My Orders</button>
                </Link>
            </div>
            <div style={{ marginTop: '20px' }}>
                <button
                    onClick={handleLogout}
                    disabled={loading}
                    style={{ marginTop: 20 }}
                >
                    {loading ? 'Logging out...' : 'Logout'}
                </button>
            </div>
        </div>
    )
}

export default Profile
