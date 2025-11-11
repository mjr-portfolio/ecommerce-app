import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Login({ onLoginSuccess }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const handleLogin = async e => {
        e.preventDefault()
        setLoading(true)

        try {
            const response = await fetch('/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include', // important for Flask-Login sessions
                body: JSON.stringify({ email, password }),
            })

            const data = await response.json()

            if (response.ok) {
                onLoginSuccess(data.user) // Passes user data to App.jsx so it can be used throughout the app
                navigate('/profile')
                setMessage(`Logged in successfully as ${data.message}`)
            } else {
                setMessage(data.error || 'Login failed')
            }
        } catch (err) {
            setMessage('Network error')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div
            style={{ maxWidth: 400, margin: '50px auto', textAlign: 'center' }}
        >
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        style={{ width: '100%', marginBottom: 10, padding: 8 }}
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        style={{ width: '100%', marginBottom: 10, padding: 8 }}
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    style={{ padding: 8, width: '100%' }}
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
            <p>
                Don’t have an account? <Link to="/register">Register here</Link>
            </p>
            {message && <p>{message}</p>}
        </div>
    )
}

export default Login
