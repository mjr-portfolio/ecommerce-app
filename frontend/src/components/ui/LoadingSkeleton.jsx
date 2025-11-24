import styled, { keyframes } from 'styled-components'

const shimmer = keyframes`
    0% { background-position: -400px 0; }
    100% { background-position: 400px 0; }
`

const LoadingSkeleton = styled.div`
    width: 100%;
    height: ${({ height }) => height || '200px'};
    border-radius: ${({ theme }) => theme.radius.md};

    background: linear-gradient(
        90deg,
        ${({ theme }) => theme.colors.border} 0%,
        ${({ theme }) => theme.colors.card} 50%,
        ${({ theme }) => theme.colors.border} 100%
    );
    background-size: 400px 100%;
    animation: ${shimmer} 1.2s ease-in-out infinite;
`

export default LoadingSkeleton
