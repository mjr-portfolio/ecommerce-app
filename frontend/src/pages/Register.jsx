import React, { useEffect, useState, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { api } from '../lib/api'

import Container from '../components/Container'
import PageHeader from '../components/ui/PageHeader'
import MessageContainer from '../components/ui/MessageContainer'
import ErrorMessage from '../components/ui/ErrorMessage'
import LoadingMessage from '../components/ui/LoadingMessage'
import Button from '../components/ui/Button'
import TextCenter from '../components/ui/TextCenter'
import Section from '../components/ui/Section'

import {
    Form,
    FormRow,
    FormLabel,
    FormInput,
    FormActions,
} from '../components/ui/Form'

export default function Register({ onLoginSuccess, user }) {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const location = useLocation()
    const navigate = useNavigate()

    const firstRender = useRef(true)
    const registering = useRef(false)

    const handleRegister = async e => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            await api('/api/auth/register', {
                method: 'POST',
                body: { email, name, password },
            })

            navigate('/login')
        } catch (err) {
            setError(err.message || 'Network error')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Container>
            <PageHeader>Register</PageHeader>

            <MessageContainer>
                {loading && <LoadingMessage>Loading...</LoadingMessage>}
                {error && <ErrorMessage>{error}</ErrorMessage>}
            </MessageContainer>

            {!loading && !error && (
                <Section>
                    <Form onSubmit={handleRegister}>
                        <FormRow>
                            <FormLabel htmlFor="name">Name</FormLabel>
                            <FormInput
                                id="name"
                                type="text"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                required
                            />
                        </FormRow>

                        <FormRow>
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <FormInput
                                id="email"
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                        </FormRow>

                        <FormRow>
                            <FormLabel htmlFor="password">Password</FormLabel>
                            <FormInput
                                id="password"
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                            />
                        </FormRow>

                        <FormActions>
                            <Button type="submit" disabled={loading} fullwidth>
                                {loading ? 'Registering...' : 'Register'}
                            </Button>
                        </FormActions>

                        <TextCenter>
                            Already have an account?{' '}
                            <Link to="/login">Log in here</Link>
                        </TextCenter>
                    </Form>
                </Section>
            )}
        </Container>
    )
}
