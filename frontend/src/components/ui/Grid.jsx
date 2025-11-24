import styled from 'styled-components'

const Grid = styled.div`
    display: grid;
    width: 100%;

    /* spacing between cards */
    gap: ${({ theme }) => theme.spacing.lg};

    /* 3-per-row on most screens */
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));

    /* forces all rows to equal height */
    grid-auto-rows: 1fr;

    @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
        grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    }

    @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
        grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    }
`

export default Grid
