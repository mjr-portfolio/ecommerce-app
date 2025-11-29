import styled from 'styled-components'

const PageHeader = styled.h2`
    font-size: ${({ theme }) => theme.fontSizes.xxl};
    margin-bottom: calc(${({ theme }) => theme.spacing.lg} * 1.2);
    color: ${({ theme }) => theme.text.primary};
    font-weight: 600;
    text-align: center;
    line-height: 1.25;
`

export default PageHeader
