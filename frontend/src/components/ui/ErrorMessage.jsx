import styled from 'styled-components'

const ErrorMessage = styled.p`
    color: ${({ theme }) => theme.text.danger};
    margin: ${({ theme }) => theme.spacing.sm} 0;
    font-size: ${({ theme }) => theme.fontSizes.sm};
    font-weight: 600;
    line-height: 1.4;
`

export default ErrorMessage
