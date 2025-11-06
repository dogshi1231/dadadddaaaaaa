"use client"

import { useEffect, useRef, type ReactNode } from "react"

interface ProductCard3DProps {
  children: ReactNode
  className?: string
}

export function ProductCard3D({ children, className = "" }: ProductCard3DProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const supportsHover = window.matchMedia("(hover: hover)").matches
    if (!supportsHover || window.innerWidth < 768) {
      return
    }

    card.classList.add("tilt-effect")

    const getCardCenter = () => {
      const rect = card.getBoundingClientRect()
      return {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      }
    }

    const getTiltIntensity = () => {
      if (window.innerWidth < 1024) {
        return 8
      }
      return 12
    }

    let ticking = false

    const handleMouseMove = (e: MouseEvent) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const center = getCardCenter()
          const mouseX = e.clientX
          const mouseY = e.clientY

          const deltaX = mouseX - center.x
          const deltaY = mouseY - center.y

          const intensity = getTiltIntensity()

          const tiltX = (deltaY / (card.offsetHeight / 2)) * -intensity
          const tiltY = (deltaX / (card.offsetWidth / 2)) * intensity

          const transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-10px) translateZ(0px)`
          card.style.transform = transform

          ticking = false
        })
        ticking = true
      }
    }

    const handleMouseLeave = () => {
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) translateZ(0px)"
    }

    card.addEventListener("mousemove", handleMouseMove as EventListener, { passive: true })
    card.addEventListener("mouseleave", handleMouseLeave, { passive: true })

    return () => {
      card.removeEventListener("mousemove", handleMouseMove as EventListener)
      card.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <div ref={cardRef} className={className}>
      {children}
    </div>
  )
}
