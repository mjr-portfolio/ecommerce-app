import styled from 'styled-components'

const Avatar = styled.div`
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.primary};
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    color: white;
    font-weight: 600;
    margin: 0 auto ${({ theme }) => theme.spacing.md};
`

export default Avatar
