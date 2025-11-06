"use client"

import { useEffect } from "react"

export function ProtectionScript() {
  useEffect(() => {
    // Disable right-click context menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault()
      return false
    }

    // Detect DevTools opening
    const detectDevTools = () => {
      const threshold = 160
      const widthThreshold = window.outerWidth - window.innerWidth > threshold
      const heightThreshold = window.outerHeight - window.innerHeight > threshold
      
      if (widthThreshold || heightThreshold) {
        // DevTools is likely open - you can add custom handling here
        console.clear()
      }
    }

    // Disable common keyboard shortcuts for DevTools
    const handleKeyDown = (e: KeyboardEvent) => {
      // F12
      if (e.keyCode === 123) {
        e.preventDefault()
        return false
      }
      // Ctrl+Shift+I / Cmd+Option+I
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.keyCode === 73) {
        e.preventDefault()
        return false
      }
      // Ctrl+Shift+J / Cmd+Option+J
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.keyCode === 74) {
        e.preventDefault()
        return false
      }
      // Ctrl+U / Cmd+U (View Source)
      if ((e.ctrlKey || e.metaKey) && e.keyCode === 85) {
        e.preventDefault()
        return false
      }
      // Ctrl+Shift+C / Cmd+Option+C (Inspect Element)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.keyCode === 67) {
        e.preventDefault()
        return false
      }
    }

    // Add event listeners
    document.addEventListener("contextmenu", handleContextMenu)
    document.addEventListener("keydown", handleKeyDown)
    
    // Check for DevTools periodically
    const devToolsCheck = setInterval(detectDevTools, 1000)

    // Cleanup
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu)
      document.removeEventListener("keydown", handleKeyDown)
      clearInterval(devToolsCheck)
    }
  }, [])

  return null
}
