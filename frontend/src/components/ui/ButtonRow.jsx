import styled from 'styled-components'

const ButtonRow = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: ${({ theme }) => theme.spacing.md};

    @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
        flex-direction: row;
    }

    justify-content: ${({ $justify }) => {
        switch ($justify) {
            case 'center':
                return 'center'
            case 'end':
                return 'flex-end'
            case 'between':
            case 'space-between':
                return 'space-between'
            case 'around':
            case 'space-around':
                return 'space-around'
            default:
                return 'flex-start'
        }
    }};
`

export default ButtonRow
