import React, { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import Login from './pages/login'
import Register from './pages/register'
import Profile from './pages/profile'
import Products from './pages/products'
import ProductDetail from './pages/productDetail'
import Cart from './pages/cart'
import Checkout from './pages/checkout'
import OrderComplete from './pages/orderComplete'
import Orders from './pages/orders'
import OrderDetail from './pages/orderDetail'
import Home from './pages/home'

import Navbar from './components/navbar'
import ProtectedRoute from './components/protectedRoute'

import './App.css'

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
                const response = await fetch('/api/auth/me', {
                    credentials: 'include',
                })

                const data = await response.json()

                // Assuming consistent API contract — backend returns { user: {...} } and good backend test coverage
                if (!response.ok)
                    throw new Error(data.error || 'Failed to fetch user data')

                setUser(data.user) // restore user from backend session
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
            <Navbar user={user} />
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
