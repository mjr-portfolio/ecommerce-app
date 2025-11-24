import { useEffect, useState } from 'react'
import { useTheme } from 'styled-components'

export default function useIsMobile() {
    const theme = useTheme()

    // theme.breakpoints.mobile is "600px"
    // So we remove "px" and convert to a number:
    const mobileBreakpoint = parseInt(
        theme.breakpoints.mobile.replace('px', ''),
        10
    )

    const [isMobile, setIsMobile] = useState(
        typeof window !== 'undefined'
            ? window.innerWidth < mobileBreakpoint
            : false
    )

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < mobileBreakpoint)
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [mobileBreakpoint])

    return isMobile
}
