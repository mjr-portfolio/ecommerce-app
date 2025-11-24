import styled from 'styled-components'

export const OrderCard = styled.div`
    background: ${({ theme }) => theme.colors.card};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.radius.md};
    padding: ${({ theme }) => theme.spacing.lg};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    width: 100%;
`

export const OrderHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${({ theme }) => theme.spacing.md};
`

export const OrderId = styled.h3`
    margin: 0;
    font-size: ${({ theme }) => theme.fontSizes.lg};
    font-weight: 600;
    color: ${({ theme }) => theme.text.primary};
`

export const OrderStatus = styled.span`
    font-size: ${({ theme }) => theme.fontSizes.sm};
    padding: ${({ theme }) => theme.spacing.xs}
        ${({ theme }) => theme.spacing.sm};
    border-radius: ${({ theme }) => theme.radius.sm};
    background: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.text.primary};
    font-weight: 500;
`

export const OrderMeta = styled.div`
    font-size: ${({ theme }) => theme.fontSizes.sm};
    color: ${({ theme }) => theme.text.secondary};
    margin-bottom: ${({ theme }) => theme.spacing.md};
`

export const OrderFooter = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: ${({ theme }) => theme.spacing.md};
`
