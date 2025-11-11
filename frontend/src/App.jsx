import React, { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/login'
import Register from './pages/register'
import Profile from './pages/profile'
import './App.css'

function ProtectedRoute({ user, children }) {
    // If not logged in, redirect to login
    if (!user) return <Navigate to="/login" replace />
    return children
}

function App() {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user')
        return storedUser ? JSON.parse(storedUser) : null
    })
    const [checkingSession, setCheckingSession] = useState(true) // <-- loading state for session check

    // Keeps localStorage in sync with user state
    useEffect(() => {
        if (user) localStorage.setItem('user', JSON.stringify(user))
        else localStorage.removeItem('user')
    }, [user])

    // On refresh, check if user is still logged in (session cookie)
    useEffect(() => {
        const checkSession = async () => {
            try {
                const response = await fetch('/auth/me', {
                    credentials: 'include',
                })

                const data = await response.json()

                // Assuming consistent API contract — backend returns { user: {...} } and good backend test coverage
                if (response.ok) {
                    setUser(data.user) // restore user from backend session
                } else {
                    setUser(null)
                    localStorage.removeItem('user')
                }
            } catch (err) {
                // No active session found; cleared user from state and localStorage
                setUser(null)
                localStorage.removeItem('user')
            } finally {
                setCheckingSession(false)
            }
        }
        if (user) checkSession()
        else setCheckingSession(false)
    }, [])

    return (
        <>
            <Routes>
                <Route
                    path="/login"
                    element={
                        user ? (
                            <Navigate to="/profile" replace />
                        ) : (
                            <Login
                                onLoginSuccess={userData => setUser(userData)}
                            />
                        )
                    }
                />
                <Route
                    path="/register"
                    element={
                        user ? (
                            <Navigate to="/profile" replace />
                        ) : (
                            <Register
                                onLoginSuccess={userData => setUser(userData)}
                            />
                        )
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute user={user}>
                            <Profile user={user} setUser={setUser} />
                        </ProtectedRoute>
                    }
                />
                {/* Default route */}
                <Route
                    path="*"
                    element={
                        <Navigate to={user ? '/profile' : '/login'} replace />
                    }
                />
            </Routes>

            {/* Overlay spinner while checking session */}
            {checkingSession && (
                <div className="overlay">
                    <div className="spinner"></div>
                </div>
            )}
        </>
    )
}

export default App
