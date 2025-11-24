import styled from 'styled-components'

const PageHeader = styled.h2`
    font-size: ${({ theme }) => theme.fontSizes.xl};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    color: ${({ theme }) => theme.text.primary};
    font-weight: 600;
    line-height: 1.3;
    text-align: center;
    justify-content: center;
`

export default PageHeader
