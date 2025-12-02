import styled from 'styled-components'
import { Link, NavLink } from 'react-router-dom'
import { useState } from 'react'

import useIsMobile from '../hook/useIsMobile'

import Container from './Container'
import ThemeToggle from './ui/ThemeToggle'

const NavWrapper = styled.nav`
    position: sticky;
    top: 0;
    z-index: 100;
    width: 100%;
    backdrop-filter: blur(10px);
    background: ${({ theme }) =>
        theme.mode === 'light'
            ? 'rgba(236, 239, 244, 0.85)'
            : 'rgba(46, 52, 64, 0.75)'};
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    padding: 12px 0;

    display: flex;
    justify-content: center;
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
    gap: ${({ theme }) => theme.spacing.lg};
    align-items: center;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        display: none;
    }
`

const NavLinkStyled = styled(NavLink)`
    padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
    border-radius: 8px;
    font-weight: 500;
    text-decoration: none;
    color: ${({ theme }) => theme.text.primary};
    transition: background 0.2s ease, color 0.2s ease;

    &.active {
        background: ${({ theme }) => theme.colors.secondary};
        color: ${({ theme }) => theme.text.primary};
        font-weight: 600;
    }

    &:hover {
        background: ${({ theme }) => theme.colors.secondaryHover};
        text-decoration: none;
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

const CartBadge = styled.span`
    background: ${({ theme }) => theme.colors.primary};
    color: white;
    padding: 2px 8px;
    font-size: 0.75rem;
    border-radius: 999px;
    margin-left: 6px;
    font-weight: 600;
`

export default function Navbar({ user, cartCount, toggleTheme, theme }) {
    const [open, setOpen] = useState(false)
    const isMobile = useIsMobile()

    return (
        <NavWrapper>
            <NavInner>
                <NavGroup>
                    <NavLinkStyled to="/">Home</NavLinkStyled>
                    <NavLinkStyled to="/products">Products</NavLinkStyled>
                    {user && (
                        <>
                            <NavLinkStyled to="/cart">
                                Cart
                                {cartCount > 0 && (
                                    <CartBadge data-testid="cart-badge">
                                        {cartCount}
                                    </CartBadge>
                                )}
                            </NavLinkStyled>
                            <NavLinkStyled to="/orders">Orders</NavLinkStyled>
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
                            <NavLinkStyled to="/login">Login</NavLinkStyled>
                            <NavLinkStyled to="/register">
                                Register
                            </NavLinkStyled>
                        </>
                    ) : (
                        <>
                            <NavLinkStyled to="/profile">
                                {user.name || 'Profile'}
                            </NavLinkStyled>
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
                        <MobileLink to="/cart" onClick={() => setOpen(o => !o)}>
                            Cart{' '}
                            {cartCount > 0 && (
                                <CartBadge data-testid="cart-badge-mobile">
                                    {cartCount}
                                </CartBadge>
                            )}
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
