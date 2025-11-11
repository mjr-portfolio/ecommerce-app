import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Profile({ user, setUser }) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const navigate = useNavigate()

    const handleLogout = async () => {
        setLoading(true)
        try {
            const response = await fetch('/auth/logout', {
                method: 'POST',
                credentials: 'include',
            })

            const data = await response.json()

            if (response.ok) {
                setUser(null)
                navigate('/login')
            } else {
                setError(data.error || 'Failed to log out.')
            }
        } catch (err) {
            setError('Network error during logout.')
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
            <button
                onClick={handleLogout}
                disabled={loading}
                style={{ marginTop: 20 }}
            >
                {loading ? 'Logging out...' : 'Logout'}
            </button>
        </div>
    )
}

export default Profile
