import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
    *, *::before, *::after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
            Helvetica, Arial, sans-serif;
        background: ${({ theme }) => theme.colors.background};
        color: ${({ theme }) => theme.text.primary};
        line-height: 1.6;
    }

    a {
        color: ${({ theme }) => theme.colors.primary};
        text-decoration: none;
    }
    a:hover {
        text-decoration: underline;
    }

    h1, h2, h3 {
        margin-bottom: ${({ theme }) => theme.spacing.md};
        font-weight: 600;
    }

    p {
        margin-bottom: ${({ theme }) => theme.spacing.sm};
    }
`
