import styled from 'styled-components'

export const Card = styled.div`
    background: ${({ theme }) => theme.colors.card};
    border-radius: ${({ theme }) => theme.radius.md};
    box-shadow: ${({ theme }) => theme.shadow.card};
    padding: ${({ theme }) => theme.spacing.lg};
    height: 100%;
    display: flex;
    flex-direction: column;
    align-self: stretch;
`

export const CardHeader = styled.div`
    margin-bottom: ${({ theme }) => theme.spacing.md};
`

export const CardTitle = styled.h3`
    margin: 0;
    font-size: 1.3rem;
    font-weight: 600;
    color: ${({ theme }) => theme.text.primary};
    text-align: ${({ $center }) => ($center ? 'center' : 'left')};
`

export const CardSubtitle = styled.p`
    margin: ${({ theme }) => theme.spacing.xs} 0 0 0;
    font-size: 0.95rem;
    color: ${({ theme }) => theme.text.secondary};
    opacity: 0.9;
`

export const CardRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: ${({ theme }) => theme.spacing.sm} 0;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};

    ${({ strong }) =>
        strong &&
        `
        font-weight: 600;
        border-bottom: none;
        padding-top: 1rem;
        font-size: 1.1rem;
    `}
`

// Left aligned label
export const CardLabel = styled.span`
    color: ${({ theme }) => theme.text.secondary};
    font-size: ${({ theme }) => theme.fontSizes.sm};
`

// Right aligned value
export const CardValue = styled.span`
    color: ${({ theme }) => theme.text.primary};
    font-size: ${({ theme }) => theme.fontSizes.base};
    font-weight: ${({ strong }) => (strong ? 600 : 400)};
`

export const CardBody = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: ${({ theme }) => theme.spacing.xs};
`

export const CardFooter = styled.div`
    margin-top: ${({ theme }) => theme.spacing.md};
    display: flex;
    gap: ${({ theme }) => theme.spacing.sm};
    flex-wrap: wrap;
    justify-content: flex-start;
`

export const CardSeparator = styled.hr`
    border: none;
    border-top: 1px solid ${({ theme }) => theme.colors.border};
    margin: ${({ theme }) => theme.spacing.md} 0;
`
