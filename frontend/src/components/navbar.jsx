import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useState } from 'react'

import useIsMobile from '../hook/useIsMobile'

import Container from './Container'
import ThemeToggle from './ui/ThemeToggle'

const NavWrapper = styled.nav`
    background: ${({ theme }) => theme.colors.card};
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    position: relative;
`

const NavInner = styled(Container)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: ${({ theme }) => theme.spacing.md} 0;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        padding: ${({ theme }) => theme.spacing.sm} 0;
    }
`

const NavGroup = styled.div`
    display: flex;
    gap: ${({ theme }) => theme.spacing.md};

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        display: none;
    }
`

const NavLink = styled(Link)`
    color: ${({ theme }) => theme.text.primary};
    text-decoration: none;
    font-weight: 500;

    &:hover {
        color: ${({ theme }) => theme.colors.primary};
    }
`

const Hamburger = styled.button`
    background: none;
    border: none;
    padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
    cursor: pointer;
    display: none;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        display: block;
    }

    span {
        display: block;
        width: 24px;
        height: 3px;
        background: ${({ theme }) => theme.text.primary};
        margin: 4px 0;
        border-radius: 3px;
        transition: 0.3s;
    }
`

const MobileMenu = styled.div`
    display: none;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        display: flex;
        flex-direction: column;
        gap: ${({ theme }) => theme.spacing.sm};
        background: ${({ theme }) => theme.colors.card};
        border-top: 1px solid ${({ theme }) => theme.colors.border};
        padding: ${({ theme, $open }) =>
            $open
                ? `${theme.spacing.md} ${theme.spacing.md}`
                : `0 ${theme.spacing.md}`}};
        position: absolute;
        width: 100%;
        left: 0;
        top: 100%;
        z-index: 10;

        max-height: ${({ $open }) => ($open ? '400px' : '0')};
        overflow: hidden;
        transition: max-height 0.3s ease;
    }
`

const MobileLink = styled(Link)`
    color: ${({ theme }) => theme.text.primary};
    text-decoration: none;
    padding: ${({ theme }) => theme.spacing.sm} 0;
    font-weight: 500;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};

    &:last-child {
        border-bottom: none;
    }
`

export default function Navbar({ user, toggleTheme, theme }) {
    const [open, setOpen] = useState(false)
    const isMobile = useIsMobile()

    return (
        <NavWrapper>
            <NavInner>
                <NavGroup>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/products">Products</NavLink>
                    {user && (
                        <>
                            <NavLink to="/cart">Cart</NavLink>
                            <NavLink to="/orders">Orders</NavLink>
                        </>
                    )}
                </NavGroup>

                <NavGroup>
                    <ThemeToggle
                        isDark={theme.mode === 'dark'}
                        onToggle={toggleTheme}
                    />

                    {!user ? (
                        <>
                            <NavLink to="/login">Login</NavLink>
                            <NavLink to="/register">Register</NavLink>
                        </>
                    ) : (
                        <>
                            <NavLink to="/profile">
                                {user.name || 'Profile'}
                            </NavLink>
                        </>
                    )}
                </NavGroup>

                <Hamburger onClick={() => setOpen(o => !o)}>
                    <span />
                    <span />
                    <span />
                </Hamburger>

                {isMobile && (
                    <ThemeToggle
                        isDark={theme.mode === 'dark'}
                        onToggle={toggleTheme}
                    />
                )}
            </NavInner>

            <MobileMenu $open={open}>
                <MobileLink onClick={() => setOpen(o => !o)} to="/">
                    Home
                </MobileLink>
                <MobileLink onClick={() => setOpen(o => !o)} to="/products">
                    Products
                </MobileLink>

                {user && (
                    <>
                        <MobileLink onClick={() => setOpen(o => !o)} to="/cart">
                            Cart
                        </MobileLink>
                        <MobileLink
                            onClick={() => setOpen(o => !o)}
                            to="/orders"
                        >
                            Orders
                        </MobileLink>
                        <MobileLink
                            onClick={() => setOpen(o => !o)}
                            to="/profile"
                        >
                            Profile
                        </MobileLink>
                    </>
                )}

                {!user && (
                    <>
                        <MobileLink
                            onClick={() => setOpen(o => !o)}
                            to="/login"
                        >
                            Login
                        </MobileLink>
                        <MobileLink
                            onClick={() => setOpen(o => !o)}
                            to="/register"
                        >
                            Register
                        </MobileLink>
                    </>
                )}
            </MobileMenu>
        </NavWrapper>
    )
}
