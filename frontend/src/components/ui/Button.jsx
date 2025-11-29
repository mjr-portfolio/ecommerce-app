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
    cursor: pointer;
    font-weight: 500;
    text-align: center;

    background: ${({ theme, $variant }) =>
        $variant === 'danger'
            ? theme.colors.danger
            : $variant === 'secondary'
            ? theme.colors.secondary
            : theme.colors.primary};

    color: ${({ theme, $variant }) =>
        $variant === 'secondary' ? theme.text.primary : '#fff'};

    border: ${({ theme, $variant }) =>
        $variant === 'secondary'
            ? `1px solid ${theme.colors.secondaryBorder}`
            : 'none'};

    transition: filter 0.15s ease, transform 0.15s ease;

    &:hover {
        filter: brightness(1.07);
        transform: translateY(-1px);
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
