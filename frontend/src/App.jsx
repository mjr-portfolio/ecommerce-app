import { ThemeProvider } from 'styled-components'
import { lightTheme, darkTheme } from './theme/theme'
import { GlobalStyles } from './theme/globalStyles'
import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/cart'
import Checkout from './pages/checkout'
import OrderComplete from './pages/OrderComplete'
import Orders from './pages/Orders'
import OrderDetail from './pages/OrderDetail'
import Home from './pages/Home'

import MessageContainer from './components/ui/MessageContainer'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
    const storedTheme = localStorage.getItem('themeMode')
    const [theme, setTheme] = useState(
        storedTheme === 'dark' ? darkTheme : lightTheme
    )
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user')
        return storedUser ? JSON.parse(storedUser) : null
    })
    const [checkingSession, setCheckingSession] = useState(true)

    // Keeps localStorage in sync with user state
    useEffect(() => {
        if (user) localStorage.setItem('user', JSON.stringify(user))
        else localStorage.removeItem('user')
    }, [user])

    // On refresh, check if user is still logged in (session cookie)
    useEffect(() => {
        const checkSession = async () => {
            try {
                const response = await fetch('/api/auth/me', {
                    credentials: 'include',
                })

                const data = await response.json()

                // Assuming consistent API contract — backend returns { user: {...} } and good backend test coverage
                if (!response.ok)
                    throw new Error(data.error || 'Failed to fetch user data')

                setUser(data.user) // restore user from backend session
            } catch (err) {
                // No active session found, cleared user from state and localStorage
                setUser(null)
                localStorage.removeItem('user')
            } finally {
                setCheckingSession(false)
            }
        }
        if (user) checkSession()
        else setCheckingSession(false)
    }, [])

    const toggleTheme = () => {
        setTheme(prev => {
            const next = prev.mode === 'light' ? darkTheme : lightTheme
            localStorage.setItem('themeMode', next.mode)
            return next
        })
    }

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyles />
            <Navbar user={user} toggleTheme={toggleTheme} theme={theme} />
            <Routes>
                <Route path="/" element={<Home user={user} />} />
                <Route
                    path="/login"
                    element={
                        <Login
                            onLoginSuccess={userData => setUser(userData)}
                            user={user}
                        />
                    }
                />
                <Route
                    path="/register"
                    element={
                        <Register
                            onLoginSuccess={userData => setUser(userData)}
                            user={user}
                        />
                    }
                />
                <Route path="/products" element={<Products />} />
                <Route
                    path="/products/:id"
                    element={<ProductDetail user={user} />}
                />
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute user={user}>
                            <Profile user={user} setUser={setUser} />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/cart/"
                    element={
                        <ProtectedRoute user={user}>
                            <Cart />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/checkout"
                    element={
                        <ProtectedRoute user={user}>
                            <Checkout />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/order-complete"
                    element={
                        <ProtectedRoute user={user}>
                            <OrderComplete />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/orders"
                    element={
                        <ProtectedRoute user={user}>
                            <Orders />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/orders/:id"
                    element={
                        <ProtectedRoute user={user}>
                            <OrderDetail />
                        </ProtectedRoute>
                    }
                />
                {/* Default route */}
                <Route path="*" element={<Home />} />
            </Routes>

            {checkingSession && (
                <MessageContainer>
                    <p>Checking session…</p>
                </MessageContainer>
            )}
        </ThemeProvider>
    )
}

export default App
