import { ThemeProvider } from 'styled-components'
import { lightTheme, darkTheme } from './theme/theme'
import { GlobalStyles } from './theme/globalStyles'
import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { api } from './lib/api'

import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import OrderComplete from './pages/OrderComplete'
import Orders from './pages/Orders'
import OrderDetail from './pages/OrderDetail'
import Home from './pages/Home'

import LoadingMessage from './components/ui/LoadingMessage'
import MessageContainer from './components/ui/MessageContainer'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import AdminRoute from './components/AdminRoute'

import AdminHome from './pages/admin/AdminHome'
import AdminProducts from './pages/admin/AdminProducts'
import AdminProductNew from './pages/admin/AdminProductNew'
import AdminProductEdit from './pages/admin/AdminProductEdit'
import AdminOrders from './pages/admin/AdminOrders'
import AdminOrderDetail from './pages/admin/AdminOrderDetail'

export default function App() {
    const storedTheme = localStorage.getItem('themeMode')
    const [theme, setTheme] = useState(
        storedTheme === 'light' ? lightTheme : darkTheme
    )
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user')
        return storedUser ? JSON.parse(storedUser) : null
    })
    const [checkingSession, setCheckingSession] = useState(true)
    const [cartCount, setCartCount] = useState(0)

    // Keeps localStorage in sync with user state
    useEffect(() => {
        if (user) localStorage.setItem('user', JSON.stringify(user))
        else localStorage.removeItem('user')
    }, [user])

    // On refresh, check if user is still logged in (session cookie)
    useEffect(() => {
        const checkSession = async () => {
            try {
                const data = await api('/api/auth/me', { auth: true })

                setUser(data.user) // restore user from backend session
                fetchCartCount()
            } catch (err) {
                if (err.status === 401) {
                    // No active session found, cleared user from state and localStorage
                    setUser(null)
                    localStorage.removeItem('user')
                } else {
                    console.warn('Session check failed:', err)
                }
            } finally {
                setCheckingSession(false)
            }
        }
        checkSession()
    }, [])

    const fetchCartCount = async () => {
        try {
            const data = await api('/api/cart/count', { auth: true })

            setCartCount(data.count)
        } catch (err) {
            setCartCount(0)
        }
    }

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

            {checkingSession ? (
                <MessageContainer>
                    <LoadingMessage>Checking Session...</LoadingMessage>
                </MessageContainer>
            ) : (
                <>
                    <Navbar
                        user={user}
                        cartCount={cartCount}
                        toggleTheme={toggleTheme}
                        theme={theme}
                    />
                    <Routes>
                        <Route path="/" element={<Home user={user} />} />
                        <Route
                            path="/login"
                            element={
                                <Login
                                    onLoginSuccess={userData =>
                                        setUser(userData)
                                    }
                                    user={user}
                                />
                            }
                        />
                        <Route
                            path="/register"
                            element={
                                <Register
                                    onLoginSuccess={userData =>
                                        setUser(userData)
                                    }
                                    user={user}
                                />
                            }
                        />
                        <Route path="/products" element={<Products />} />
                        <Route
                            path="/products/:id"
                            element={
                                <ProductDetail
                                    user={user}
                                    fetchCartCount={fetchCartCount}
                                />
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
                        <Route
                            path="/cart/"
                            element={
                                <ProtectedRoute user={user}>
                                    <Cart fetchCartCount={fetchCartCount} />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/checkout"
                            element={
                                <ProtectedRoute user={user}>
                                    <Checkout fetchCartCount={fetchCartCount} />
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

                        <Route
                            path="/admin"
                            element={
                                <AdminRoute user={user}>
                                    <AdminHome />
                                </AdminRoute>
                            }
                        />

                        <Route
                            path="/admin/products"
                            element={
                                <AdminRoute user={user}>
                                    <AdminProducts />
                                </AdminRoute>
                            }
                        />

                        <Route
                            path="/admin/products/new"
                            element={
                                <AdminRoute user={user}>
                                    <AdminProductNew />
                                </AdminRoute>
                            }
                        />

                        <Route
                            path="/admin/products/:id/edit"
                            element={
                                <AdminRoute user={user}>
                                    <AdminProductEdit />
                                </AdminRoute>
                            }
                        />

                        <Route
                            path="/admin/orders"
                            element={
                                <AdminRoute user={user}>
                                    <AdminOrders />
                                </AdminRoute>
                            }
                        />

                        <Route
                            path="/admin/orders/:id"
                            element={
                                <AdminRoute user={user}>
                                    <AdminOrderDetail />
                                </AdminRoute>
                            }
                        />

                        {/* Default route */}
                        <Route path="*" element={<Home />} />
                    </Routes>
                </>
            )}
        </ThemeProvider>
    )
}
