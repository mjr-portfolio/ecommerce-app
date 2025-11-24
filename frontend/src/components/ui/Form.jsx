import styled from 'styled-components'

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.md};
    max-width: 420px;
    width: 100%;
    margin: 0 auto;
`

export const FormRow = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.xs};
`

export const FormLabel = styled.label`
    font-size: 0.95rem;
    font-weight: 500;
    color: ${({ theme }) => theme.text.primary};
`

export const FormInput = styled.input`
    padding: ${({ theme }) => theme.spacing.sm};
    border-radius: ${({ theme }) => theme.radius.sm};
    border: 1px solid ${({ theme }) => theme.colors.border};
    background: ${({ theme }) => theme.colors.card};
    color: ${({ theme }) => theme.text.primary};
    font-size: 1rem;
    width: 100%;

    &:focus {
        outline: none;
        border-color: ${({ theme }) => theme.colors.primary};
        box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}40;
    }
`

export const FormError = styled.p`
    color: ${({ theme }) => theme.text.error};
    font-size: 0.9rem;
    margin: 0;
`

export const FormActions = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.sm};
    margin-top: ${({ theme }) => theme.spacing.md};

    @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
        flex-direction: row;
        justify-content: flex-end;

        > * {
            flex: 1;
        }
    }
`
