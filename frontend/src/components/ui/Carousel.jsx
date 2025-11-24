import styled from 'styled-components'

const Carousel = styled.div`
    display: flex;
    gap: ${({ theme }) => theme.spacing.md};
    overflow-x: auto;
    overflow-y: hidden;
    padding-bottom: ${({ theme }) => theme.spacing.sm};

    & > * {
        flex: 0 0 auto; /* children stay in a row */
    }

    scroll-behavior: smooth;

    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
        display: none;
    }

    user-select: none;
    cursor: grab;
    touch-action: pan-y; /* allow vertical scroll on touch devices */

    &.dragging {
        cursor: grabbing;
        scroll-behavior: auto; /* no smooth scrolling while dragging */
    }

    img {
        pointer-events: none;
    }
`

export default Carousel
