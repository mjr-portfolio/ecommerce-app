import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import useIsMobile from '../hook/useIsMobile'

import Container from '../components/Container'
import PageHeader from '../components/ui/PageHeader'
import MessageContainer from '../components/ui/MessageContainer'
import ErrorMessage from '../components/ui/ErrorMessage'
import Button from '../components/ui/Button'
import Section from '../components/ui/Section'
import ButtonRow from '../components/ui/ButtonRow'
import TextCenter from '../components/ui/TextCenter'
import Avatar from '../components/ui/Avatar'

import { Card, CardBody, CardTitle, CardSubtitle } from '../components/ui/Card'

function Profile({ user, setUser }) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const navigate = useNavigate()
    const isMobile = useIsMobile()

    const handleLogout = async () => {
        setLoading(true)
        setError('')

        try {
            const response = await fetch('/api/auth/logout', {
                method: 'POST',
                credentials: 'include',
            })

            const data = await response.json()
            if (!response.ok)
                throw new Error(data.error || 'Failed to log out.')

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
                {loading && <p>Loading profile...</p>}
                {error && <ErrorMessage>{error}</ErrorMessage>}
            </MessageContainer>

            {!loading && !error && user && (
                <Section size="lg">
                    <Card>
                        <CardBody>
                            <Avatar>{user.name?.[0]?.toUpperCase()}</Avatar>

                            <TextCenter>
                                <CardTitle>{user.name}</CardTitle>
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
                                        <Link to="/orders">
                                            <Button fullwidth>My Orders</Button>
                                        </Link>

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
                                        <Link to="/orders">
                                            <Button size="lg">My Orders</Button>
                                        </Link>

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

export default Profile
