import styled from 'styled-components'

const Section = styled.div`
    margin-bottom: ${({ size = 'lg', theme }) => {
        /* Switch used as number of sizes might grow */
        switch (size) {
            case 'xs':
                return theme.spacing.xs
            case 'sm':
                return theme.spacing.sm
            case 'md':
                return theme.spacing.md
            case 'lg':
                return theme.spacing.lg
            case 'xl':
                return theme.spacing.xl
            default:
                return theme.spacing.lg
        }
    }};
    text-align: ${({ $center }) => ($center ? 'center' : 'left')};
`

export default Section
