import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import useIsMobile from '../hook/useIsMobile'

import Container from '../components/Container'
import PageHeader from '../components/ui/PageHeader'
import MessageContainer from '../components/ui/MessageContainer'
import ErrorMessage from '../components/ui/ErrorMessage'
import LoadingMessage from '../components/ui/LoadingMessage'
import Button from '../components/ui/Button'
import Section from '../components/ui/Section'
import ButtonRow from '../components/ui/ButtonRow'
import TextCenter from '../components/ui/TextCenter'
import Avatar from '../components/ui/Avatar'

import { Card, CardBody, CardTitle, CardSubtitle } from '../components/ui/Card'

export default function Profile({ user, setUser }) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const navigate = useNavigate()
    const isMobile = useIsMobile()

    const handleLogout = async () => {
        setLoading(true)
        setError('')

        try {
            const res = await fetch('/api/auth/logout', {
                method: 'POST',
                credentials: 'include',
            })

            const data = await res.json()
            if (!res.ok) throw new Error(data.error || 'Failed to log out.')

            setUser(null)
            navigate('/login')
        } catch (err) {
            setError(err.message || 'Network error during logout.')
        } finally {
            setLoading(false)
        }
    }

    const formatDate = date =>
        new Date(date).toLocaleDateString('en-GB', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })

    return (
        <Container>
            <PageHeader>My Account</PageHeader>

            <MessageContainer>
                {loading && <LoadingMessage>Loading Profile...</LoadingMessage>}
                {error && <ErrorMessage>{error}</ErrorMessage>}
            </MessageContainer>

            {!loading && !error && user && (
                <Section size="lg">
                    <Card>
                        <CardBody>
                            <Avatar>{user.name?.[0]?.toUpperCase()}</Avatar>

                            <TextCenter>
                                <CardTitle $center>{user.name}</CardTitle>
                                <CardSubtitle>{user.email}</CardSubtitle>
                            </TextCenter>

                            <Section size="md">
                                <TextCenter>
                                    Member since{' '}
                                    <strong>
                                        {formatDate(user.created_at)}
                                    </strong>
                                </TextCenter>
                            </Section>

                            <Section size="lg">
                                {isMobile ? (
                                    <ButtonRow $justify="center">
                                        {user?.is_admin ? (
                                            <Button
                                                fullwidth
                                                as={Link}
                                                to="/admin"
                                            >
                                                Go to Admin Dashboard
                                            </Button>
                                        ) : (
                                            <Button
                                                fullwidth
                                                as={Link}
                                                to="/orders"
                                            >
                                                My Orders
                                            </Button>
                                        )}

                                        <Button
                                            fullwidth
                                            variant="secondary"
                                            disabled={loading}
                                            onClick={handleLogout}
                                        >
                                            {loading
                                                ? 'Logging out…'
                                                : 'Logout'}
                                        </Button>
                                    </ButtonRow>
                                ) : (
                                    <ButtonRow $justify="center">
                                        {user?.is_admin ? (
                                            <Button as={Link} to="/admin">
                                                Go to Admin Dashboard
                                            </Button>
                                        ) : (
                                            <Button
                                                size="lg"
                                                as={Link}
                                                to="/orders"
                                            >
                                                My Orders
                                            </Button>
                                        )}

                                        <Button
                                            variant="secondary"
                                            disabled={loading}
                                            onClick={handleLogout}
                                        >
                                            {loading
                                                ? 'Logging out…'
                                                : 'Logout'}
                                        </Button>
                                    </ButtonRow>
                                )}
                            </Section>
                        </CardBody>
                    </Card>
                </Section>
            )}

            {/* Fallback (should rarely appear due to ProtectedRoute) */}
            {!loading && !error && !user && (
                <Section>
                    <TextCenter>
                        <p>You are not logged in.</p>
                        <Button onClick={() => navigate('/login')} fullwidth>
                            Go to Login
                        </Button>
                    </TextCenter>
                </Section>
            )}
        </Container>
    )
}
