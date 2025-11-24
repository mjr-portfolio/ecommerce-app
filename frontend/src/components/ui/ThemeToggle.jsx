import styled from 'styled-components'

const ToggleWrapper = styled.button`
    background: ${({ theme }) => theme.colors.card};
    border: 1px solid ${({ theme }) => theme.colors.border};
    width: 50px;
    height: 26px;
    border-radius: 20px;
    padding: 0;
    margin: 0;
    position: relative;
    cursor: pointer;

    display: flex;
    align-items: center;

    transition: background 0.3s ease;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        margin: ${({ theme, $open }) => `0 ${theme.spacing.sm}`};
    }
`

const Thumb = styled.div`
    width: 22px;
    height: 22px;
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 50%;
    position: absolute;
    left: ${({ $active }) => ($active ? '26px' : '2px')};
    top: 2px;
    transition: left 0.3s ease;
`

const Icon = styled.span`
    position: absolute;
    font-size: 0.8rem;
    top: 50%;
    transform: translateY(-50%);
    color: ${({ theme }) => theme.text.secondary};

    left: ${({ $position }) => ($position === 'left' ? '6px' : 'unset')};
    right: ${({ $position }) => ($position === 'right' ? '6px' : 'unset')};
`

export default function ThemeToggle({ isDark, onToggle }) {
    return (
        <ToggleWrapper onClick={onToggle} aria-label="Toggle dark mode">
            <Icon $position="left">☀️</Icon>
            <Icon $position="right">🌙</Icon>
            <Thumb $active={isDark} />
        </ToggleWrapper>
    )
}
