import * as React from "react"

const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
} as const;

type BreakpointKey = keyof typeof BREAKPOINTS;

export function useIsMobile(breakpoint: BreakpointKey = 'md') {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)
  const breakpointValue = BREAKPOINTS[breakpoint];

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpointValue - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < breakpointValue)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < breakpointValue)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}
