import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Register({ onLoginSuccess }) {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const handleRegister = async e => {
        e.preventDefault()
        setLoading(true)

        try {
            const response = await fetch('/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, name, password }),
            })

            const data = await response.json()

            if (response.ok) {
                onLoginSuccess(data.user) // Passes user data to App.jsx so it can be used throughout the app
                navigate('/profile')
            } else {
                setMessage(data.error || 'User registration failed')
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
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <div>
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        style={{ width: '100%', marginBottom: 10, padding: 8 }}
                    />
                </div>
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
                    {loading ? 'Registering...' : 'Register'}
                </button>
            </form>
            <p>
                Already have an account? <Link to="/login">Log in here</Link>
            </p>
            {message && <p>{message}</p>}
        </div>
    )
}

export default Register
