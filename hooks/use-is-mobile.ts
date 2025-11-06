"use client"

import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    function compute() {
      const touchDetected =
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        // @ts-ignore legacy prop
        navigator.msMaxTouchPoints > 0

      const narrow = window.innerWidth < MOBILE_BREAKPOINT

      setIsMobile(touchDetected || narrow)
    }

    compute()
    window.addEventListener("resize", compute)
    return () => window.removeEventListener("resize", compute)
  }, [])

  return isMobile
}
