import React, { useEffect, useState, useRef, use } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import useIsMobile from '../hook/useIsMobile'
import { api } from '../lib/api'

import Container from '../components/Container'
import PageHeader from '../components/ui/PageHeader'
import Section from '../components/ui/Section'
import Button from '../components/ui/Button'
import ButtonRow from '../components/ui/ButtonRow'
import TextCenter from '../components/ui/TextCenter'
import Carousel from '../components/ui/Carousel'
import CarouselCard from '../components/ui/CarouselCard'
import LoadingSkeleton from '../components/ui/LoadingSkeleton'

const SectionHeader = styled.h3`
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    font-weight: 600;
`

export default function Home({ user }) {
    const [products, setProducts] = useState([])
    const [loadingProducts, setLoadingProducts] = useState(true)
    const carouselRef = useRef(null)

    const isMobile = useIsMobile()

    useEffect(() => {
        const load = async () => {
            try {
                const data = await api('/api/products', {
                    credentials: 'include', // Instead of 'auth: true' to differ public routes from protected ones
                })
                setProducts(data.slice(0, 5))
            } catch (err) {
                console.error('Failed to load featured products', err)
            } finally {
                setLoadingProducts(false)
            }
        }
        load()
    }, [])

    useEffect(() => {
        const container = carouselRef.current
        if (!container) return

        let isDown = false
        let startX = 0
        let scrollLeft = 0

        const handleMouseDown = e => {
            isDown = true
            container.classList.add('dragging')
            startX = e.clientX
            scrollLeft = container.scrollLeft
        }

        const handleMouseLeave = () => {
            isDown = false
            container.classList.remove('dragging')
        }

        const handleMouseUp = () => {
            isDown = false
            container.classList.remove('dragging')
        }

        const handleMouseMove = e => {
            if (!isDown) return
            e.preventDefault()
            const x = e.clientX
            const walk = (x - startX) * 1.5
            container.scrollLeft = scrollLeft - walk
        }

        container.addEventListener('mousedown', handleMouseDown)
        container.addEventListener('mouseleave', handleMouseLeave)
        container.addEventListener('mouseup', handleMouseUp)
        container.addEventListener('mousemove', handleMouseMove, {
            passive: false,
        })

        // cleanup on unmount / re-render
        return () => {
            container.removeEventListener('mousedown', handleMouseDown)
            container.removeEventListener('mouseleave', handleMouseLeave)
            container.removeEventListener('mouseup', handleMouseUp)
            container.removeEventListener('mousemove', handleMouseMove)
        }
    }, [products.length])

    return (
        <Container>
            <Section size="lg">
                <PageHeader>Welcome to the Store</PageHeader>
                <TextCenter>
                    A simple e-commerce demo built with React + Flask. Browse
                    products, place orders, and test real workflows.
                </TextCenter>
            </Section>

            {isMobile ? (
                <>
                    <Section>
                        <Link to="/products">
                            <Button fullwidth>Browse Products</Button>
                        </Link>
                    </Section>

                    {loadingProducts && (
                        <Section size="lg">
                            <TextCenter>
                                <SectionHeader>Featured Products</SectionHeader>
                            </TextCenter>
                            <LoadingSkeleton height="350px" />
                        </Section>
                    )}

                    {products.length > 0 && !loadingProducts && (
                        <Section size="lg">
                            <TextCenter>
                                <SectionHeader>Featured Products</SectionHeader>
                            </TextCenter>
                            <Carousel ref={carouselRef}>
                                {products.map(p => (
                                    <CarouselCard key={p.id} product={p} />
                                ))}
                            </Carousel>
                        </Section>
                    )}

                    {user && (
                        <Section size="lg">
                            <ButtonRow $justify="center">
                                <Link to="/cart">
                                    <Button fullwidth>View Cart</Button>
                                </Link>

                                <Link to="/orders">
                                    <Button fullwidth>My Orders</Button>
                                </Link>

                                <Link to="/profile">
                                    <Button fullwidth>My Account</Button>
                                </Link>
                            </ButtonRow>
                        </Section>
                    )}

                    {!user && (
                        <Section size="lg">
                            <ButtonRow $justify="center">
                                <Link to="/login">
                                    <Button fullwidth>Login</Button>
                                </Link>

                                <Link to="/register">
                                    <Button fullwidth>Create Account</Button>
                                </Link>
                            </ButtonRow>
                        </Section>
                    )}
                </>
            ) : (
                <>
                    {user && (
                        <Section size="lg">
                            <ButtonRow $justify="center">
                                <Link to="/cart">
                                    <Button size="lg">View Cart</Button>
                                </Link>

                                <Link to="/orders">
                                    <Button size="lg">My Orders</Button>
                                </Link>

                                <Link to="/profile">
                                    <Button size="lg">My Account</Button>
                                </Link>
                            </ButtonRow>
                        </Section>
                    )}

                    {!user && (
                        <Section size="lg">
                            <ButtonRow $justify="center">
                                <Link to="/login">
                                    <Button size="lg">Login</Button>
                                </Link>

                                <Link to="/register">
                                    <Button size="md">Create Account</Button>
                                </Link>
                            </ButtonRow>
                        </Section>
                    )}

                    {loadingProducts && (
                        <Section size="lg">
                            <TextCenter>
                                <SectionHeader>Featured Products</SectionHeader>
                            </TextCenter>
                            <LoadingSkeleton height="350px" />
                        </Section>
                    )}

                    {products.length > 0 && !loadingProducts && (
                        <Section size="lg">
                            <TextCenter>
                                <SectionHeader>Featured Products</SectionHeader>
                            </TextCenter>
                            <Carousel ref={carouselRef}>
                                {products.map(p => (
                                    <CarouselCard key={p.id} product={p} />
                                ))}
                            </Carousel>
                        </Section>
                    )}

                    <Section>
                        <Link to="/products">
                            <Button fullwidth>Browse Products</Button>
                        </Link>
                    </Section>
                </>
            )}
        </Container>
    )
}
