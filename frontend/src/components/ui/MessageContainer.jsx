import styled from 'styled-components'

const MessageContainer = styled.div`
    min-height: 2.4em;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: ${({ theme }) => theme.spacing.sm} 0;
    text-align: center;
`

export default MessageContainer
