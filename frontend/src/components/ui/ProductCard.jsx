import styled from 'styled-components'

export const ProductCard = styled.div`
    background: ${({ theme }) => theme.colors.card};
    border-radius: ${({ theme }) => theme.radius.md};
    box-shadow: ${({ theme }) => theme.shadow.card};
    border: 1px solid ${({ theme }) => theme.colors.border};
    padding: ${({ theme }) => theme.spacing.md};

    display: flex;
    flex-direction: column;
    height: 100%;
    transition: transform 0.18s ease, box-shadow 0.18s ease;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgba(46, 52, 64, 0.15);
    }
`

export const ProductImage = styled.div`
    width: 100%;
    height: 160px;
    border-radius: ${({ theme }) => theme.radius.md};
    background: ${({ theme }) => theme.colors.secondary};
    margin-bottom: ${({ theme }) => theme.spacing.md};
    overflow: hidden;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`

export const ProductTitle = styled.h3`
    font-size: ${({ theme }) => theme.fontSizes.base};
    font-weight: 600;
    margin: 0 0 ${({ theme }) => theme.spacing.sm} 0;
    line-height: 1.3;

    display: -webkit-box;
    -webkit-line-clamp: 2; /* limits to 2 lines */
    -webkit-box-orient: vertical;
    overflow: hidden;
`

export const ProductExcerpt = styled.p`
    font-size: ${({ theme }) => theme.fontSizes.sm};
    color: ${({ theme }) => theme.text.secondary};
    margin: 0 0 ${({ theme }) => theme.spacing.md} 0;

    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
`

export const ProductFooter = styled.div`
    margin-top: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
`
