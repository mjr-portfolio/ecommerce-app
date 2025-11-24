import styled from 'styled-components'

const SuccessMessage = styled.p`
    color: ${({ theme }) => theme.colors.success};
    margin: ${({ theme }) => theme.spacing.sm} 0;
    font-size: ${({ theme }) => theme.fontSizes.sm};
    font-weight: 600;
    line-height: 1.4;
    transition: opacity 0.2s ease;
`

export default SuccessMessage
