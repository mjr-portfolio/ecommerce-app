import styled from 'styled-components'

export const TableWrapper = styled.div`
    overflow-x: auto;
    width: 100%;
`

export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    min-width: 700px;
    background: ${({ theme }) => theme.colors.card};
    color: ${({ theme }) => theme.text.primary};
    border-radius: ${({ theme }) => theme.radius.md};
    overflow: hidden;
    box-shadow: ${({ theme }) => theme.shadow.card};

    th,
    td {
        padding: ${({ theme }) => theme.spacing.md};
        border-bottom: 1px solid ${({ theme }) => theme.colors.border};
        text-align: left;
        font-size: 0.95rem;
    }

    th {
        font-weight: 600;
        background: ${({ theme }) => theme.colors.cardAlt};
    }

    tr:last-child td {
        border-bottom: none;
    }
`
