import styled from 'styled-components'

const LoadingMessage = styled.p`
    color: ${({ theme }) => theme.text.primary};
    margin: ${({ theme }) => theme.spacing.sm} 0;
    font-size: ${({ theme }) => theme.fontSizes.md};
    font-weight: 600;
    line-height: 1.4;
`

export default LoadingMessage
