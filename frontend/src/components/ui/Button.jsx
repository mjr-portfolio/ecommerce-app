import styled from 'styled-components'

const StyledButton = styled.button`
    padding: ${({ size }) =>
        size === 'lg'
            ? '0.75em 4.4em'
            : size === 'md'
            ? '0.75em 2.5em'
            : '0.75em 1.25em'};
    font-size: ${({ theme }) => theme.fontSizes.base};
    border-radius: ${({ theme }) => theme.radius.md};
    border: none;
    cursor: pointer;
    font-weight: 500;

    background: ${({ theme, $variant }) =>
        $variant === 'danger'
            ? theme.colors.danger
            : $variant === 'secondary'
            ? theme.colors.secondary
            : theme.colors.primary};

    color: ${({ theme, $variant }) =>
        $variant === 'secondary' ? theme.text.primary : '#fff'};

    border: ${({ theme, $variant }) =>
        $variant === 'secondary' ? `1px solid ${theme.colors.border}` : 'none'};

    transition: all 0.2s ease;

    &:hover {
        background: ${({ theme, $variant }) =>
            $variant === 'danger'
                ? theme.colors.dangerHover
                : $variant === 'secondary'
                ? theme.colors.secondaryHover
                : theme.colors.primaryHover};
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }

    width: ${({ $fullwidth }) => ($fullwidth ? '100%' : 'auto')};
`

export default function Button({ children, variant, fullwidth, ...rest }) {
    return (
        <StyledButton $variant={variant} $fullwidth={fullwidth} {...rest}>
            {children}
        </StyledButton>
    )
}
