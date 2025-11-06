"use client"

import { useRef } from "react"

interface MediaDisplayProps {
  src: string
  alt: string
  className?: string
  onCardHover?: boolean
}

export function MediaDisplay({ src, alt, className = "", onCardHover = false }: MediaDisplayProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const playPromiseRef = useRef<Promise<void> | null>(null)

  // Check if the source is a video file
  const isVideo = src.endsWith(".mp4") || src.endsWith(".webm") || src.endsWith(".ogg")

  const handleMouseEnter = () => {
    if (videoRef.current && !onCardHover) {
      playPromiseRef.current = videoRef.current.play()
      playPromiseRef.current.catch((error) => {
        // Ignore AbortError - it's expected when play is interrupted
        if (error.name !== "AbortError") {
          console.error("Video play error:", error)
        }
      })
    }
  }

  const handleMouseLeave = () => {
    if (videoRef.current && !onCardHover) {
      if (playPromiseRef.current) {
        playPromiseRef.current
          .then(() => {
            if (videoRef.current) {
              videoRef.current.pause()
              videoRef.current.currentTime = 0
            }
          })
          .catch(() => {
            // Play was already interrupted, safe to pause
            if (videoRef.current) {
              videoRef.current.pause()
              videoRef.current.currentTime = 0
            }
          })
        playPromiseRef.current = null
      } else {
        videoRef.current.pause()
        videoRef.current.currentTime = 0
      }
    }
  }

  if (isVideo) {
    return (
      <video
        ref={videoRef}
        src={src || "https://i.imgur.com/PbDY5pe.mp4"}
        loop
        muted
        playsInline
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={className}
        controlsList="nodownload nofullscreen noremoteplayback"
        disablePictureInPicture
        disableRemotePlayback
        onContextMenu={(e) => e.preventDefault()}
        style={{ pointerEvents: 'none' }}
      />
    )
  }

  return <img src={src || "https://i.imgur.com/PbDY5pe.mp4"} alt={alt} className={className} />
}
