import React, { useEffect, useState, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

function Login({ onLoginSuccess, user }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    const location = useLocation()
    const navigate = useNavigate()
    const firstRender = useRef(true)
    const loggingIn = useRef(false)

    // Read the ?next= value from the URL
    const searchParams = new URLSearchParams(location.search)
    const redirectTo = searchParams.get('next') || '/profile'

    // 1️⃣ Redirect if visiting login page while already logged in
    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false
            return
        }

        if (loggingIn.current) return

        if (user) {
            navigate('/profile')
        }
    }, [user])

    const handleLogin = async e => {
        e.preventDefault()
        setLoading(true)

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include', // important for Flask-Login sessions
                body: JSON.stringify({ email, password }),
            })

            const data = await response.json()

            // Check for failed response before parsing JSON
            if (!response.ok) throw new Error(data.error || 'Login failed')

            loggingIn.current = true
            onLoginSuccess(data.user) // Passes user data to App.jsx so it can be used throughout the app
            navigate(redirectTo)
            setMessage(`Logged in successfully as ${data.user.name || 'user'}`)
        } catch (err) {
            setMessage(err.message || 'Network error')
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
