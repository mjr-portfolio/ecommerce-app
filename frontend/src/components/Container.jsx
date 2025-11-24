import styled from 'styled-components'

const Container = styled.div`
    width: 100%;
    max-width: 900px;
    margin: 0 auto;
    padding: ${({ theme }) => theme.spacing.lg};

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        padding: ${({ theme }) => theme.spacing.md};
    }
`

export default Container
