import React, { useEffect, useState, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import Container from '../components/Container'
import PageHeader from '../components/ui/PageHeader'
import MessageContainer from '../components/ui/MessageContainer'
import ErrorMessage from '../components/ui/ErrorMessage'
import LoadingMessage from '../components/ui/LoadingMessage'
import Button from '../components/ui/Button'
import TextCenter from '../components/ui/TextCenter'

import {
    Form,
    FormRow,
    FormLabel,
    FormInput,
    FormActions,
} from '../components/ui/Form'
import Section from '../components/ui/Section'

export default function Login({ onLoginSuccess, user }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const location = useLocation()
    const navigate = useNavigate()

    // Avoid redirect loop
    const firstRender = useRef(true)
    const loggingIn = useRef(false)

    const searchParams = new URLSearchParams(location.search)
    const redirectTo = searchParams.get('next') || '/'

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false
            return
        }

        if (loggingIn.current) return

        if (user) {
            if (user.is_admin) navigate('/admin')
            else navigate('/profile')
        }
    }, [user])

    const handleLogin = async e => {
        e.preventDefault()
        setLoading(true)
        // Reset messages after previous use
        setError('')

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ email, password }),
            })

            const data = await response.json()

            if (!response.ok) throw new Error(data.error || 'Login failed')

            loggingIn.current = true
            onLoginSuccess(data.user)

            if (data.user.is_admin && !searchParams.get('next')) {
                navigate('/admin')
            } else {
                navigate(redirectTo)
            }
        } catch (err) {
            setError(err.message || 'Network error')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Container>
            <PageHeader>Login</PageHeader>

            <MessageContainer>
                {loading && <LoadingMessage>Loading...</LoadingMessage>}
                {error && <ErrorMessage>{error}</ErrorMessage>}
            </MessageContainer>

            {!loading && !error && (
                <Section>
                    <Form onSubmit={handleLogin}>
                        <FormRow>
                            <FormLabel>Email</FormLabel>
                            <FormInput
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                        </FormRow>

                        <FormRow>
                            <FormLabel>Password</FormLabel>
                            <FormInput
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                            />
                        </FormRow>

                        <FormActions>
                            <Button type="submit" disabled={loading} fullwidth>
                                {loading ? 'Logging in...' : 'Login'}
                            </Button>
                        </FormActions>

                        <TextCenter>
                            Don’t have an account?{' '}
                            <Link to="/register">Register here</Link>
                        </TextCenter>
                    </Form>
                </Section>
            )}
        </Container>
    )
}
