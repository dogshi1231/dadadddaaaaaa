"use client"

import { useEffect, useRef } from "react"

/**
 * AnimatedBackground — same visuals, but with physical-like wave INTERFERENCE.
 * - Multiple click waves now superpose (constructive/destructive) instead of hard "bouncing".
 * - Keeps your palette/shimmer/cursor blob + fade-out behavior.
 * - Optional: set PHYSICS_MODE = "bounce" to restore the toy bounce behavior.
 */
export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // --- CONFIG / STATE (kept from your version) ---
    let width = 0
    let height = 0
    const dpr = Math.min(2, Math.max(1, window.devicePixelRatio || 1))

    let mouseX = -9999
    let mouseY = -9999
    let displayX = -9999
    let displayY = -9999
    let hasPointer = false

    // waves = expanding rings from click
    type Wave = {
      x: number
      y: number
      radius: number
      maxRadius: number
      speed: number
      opacity: number
      color: string
      thickness: number
      life: number
      maxLife: number
      intensity: number
      frequency: number
      _lastBounceAt?: number
      fadeOut?: boolean
    }
    const waves: Wave[] = []
    let lastClickTime = 0

    // Perf tracking (kept)
    let lastFrameTime = 0
    let frameCount = 0
    let fps = 60
    let isLowPerf = false
    let skipFrames = 0

    // Dot field config (kept)
    const baseSpacing = 15
    const baseRadius = 0.75
    const influence = 150
    const growth = 2
    const follow = 0.6
    const colorThreshold = 0.3

    const palette = ["#FFFFFF", "#F5F5F5", "#E8E8E8", "#D3D3D3", "#C0C0C0", "#A9A9A9"]
    const colorCount = palette.length
    let shimmerTime = 0

    // ---- NEW: physics mode switch ----
    // "interference" (realistic: waves superpose) or "bounce" (toy reflection).
    const PHYSICS_MODE: "interference" | "bounce" = "interference"

    // ---- Interference tuning (small) ----
    // Treat each wave like a cos() field around its front; sum contributions.
    // wavelength ~ how wide each ripple ring is; sharpness ~ how tight the ring energy sticks to the front.
    const WAVELENGTH = 28        // px: distance from crest to crest
    const SHARPNESS = 0.12       // 0.08 softer … 0.2 sharper
    const INTENSITY_SCALE = 1.6  // how much wave field grows dots
    const FADE_MULT = 0.965      // per-frame opacity multiplier during fadeOut
    const COLLISION_EPS = 18     // used only if PHYSICS_MODE === "bounce"
    const BOUNCE_DAMP = 0.95
    const BOUNCE_COOLDOWN_MS = 120
    const BAND_WIDTH = 40        // for your original color band logic (kept)

    // Resize (kept)
    function resize() {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    let resizeTimer: ReturnType<typeof setTimeout> | null = null
    const handleResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer)
      resizeTimer = setTimeout(resize, 120)
    }
    window.addEventListener("resize", handleResize)

    // Pointer (kept)
    function onMove(e: { clientX: number; clientY: number }) {
      mouseX = e.clientX
      mouseY = e.clientY
      if (!hasPointer) {
        displayX = mouseX
        displayY = mouseY
        hasPointer = true
      }
    }

    // Ensure animation loop (kept)
    let isAnimating = false
    function ensureAnimating() {
      if (!isAnimating) {
        isAnimating = true
        requestAnimationFrame(draw)
      }
    }

    // Movement listeners (kept)
    const handleMouseMove = (e: MouseEvent) => {
      onMove(e)
      ensureAnimating()
    }
    const handleTouchMove = (e: TouchEvent) => {
      if (!e.touches || !e.touches[0]) return
      mouseX = e.touches[0].clientX
      mouseY = e.touches[0].clientY
      if (!hasPointer) {
        displayX = mouseX
        displayY = mouseY
        hasPointer = true
      }
      ensureAnimating()
    }
    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    window.addEventListener("touchmove", handleTouchMove, { passive: true })

    // Wave creation (kept; seeds fadeOut=false)
    function createWave(x: number, y: number) {
      const now = performance.now()
      if (now - lastClickTime < 200) return
      lastClickTime = now

      const randomColor = palette[Math.floor(Math.random() * palette.length)]
      const wave: Wave = {
        x,
        y,
        radius: 0,
        maxRadius: Math.max(width, height) * 1.5,
        speed: 3 + Math.random() * 2,
        opacity: 1,
        color: randomColor,
        thickness: 2 + Math.random() * 2,
        life: 0,
        maxLife: 150,
        intensity: 0.6 + Math.random() * 0.4,
        frequency: 0.05 + Math.random() * 0.1,
        _lastBounceAt: 0,
        fadeOut: false,
      }
      waves.push(wave)
      ensureAnimating()
    }

    const handleClick = (e: MouseEvent) => createWave(e.clientX, e.clientY)
    const handleTouchStart = (e: TouchEvent) => {
      if (!e.touches || !e.touches[0]) return
      createWave(e.touches[0].clientX, e.touches[0].clientY)
    }
    window.addEventListener("click", handleClick, { passive: true })
    window.addEventListener("touchstart", handleTouchStart, { passive: true })

    // ---- Helper: interference field at a point (gx, gy) ----
    function interferenceAt(gx: number, gy: number) {
      if (waves.length === 0) return 0
      let sum = 0
      for (let i = 0; i < waves.length; i++) {
        const w = waves[i]
        const d = Math.hypot(gx - w.x, gy - w.y)
        // distance from the current crest position (front) in wavelengths:
        const phase = (d - w.radius) * (Math.PI * 2 / WAVELENGTH)
        // narrow energy around the ring front:
        const envelope = Math.exp(-Math.abs(d - w.radius) * SHARPNESS)
        // contribution (scaled by wave opacity so it fades naturally):
        sum += Math.cos(phase) * envelope * w.opacity
      }
      // Clamp to reasonable range:
      return Math.max(-2, Math.min(2, sum))
    }

    // Main loop (kept, with interference used in dot sizing)
    function draw(currentTime: number) {
      const deltaTime = currentTime - lastFrameTime
      lastFrameTime = currentTime

      // Perf throttle (kept)
      skipFrames++
      frameCount++
      if (frameCount % 30 === 0 && deltaTime > 0) {
        fps = 1000 / deltaTime
        isLowPerf = fps < 35
      }
      if (isLowPerf && fps < 25 && skipFrames % 3 !== 0) {
        requestAnimationFrame(draw)
        return
      }

      // Smooth cursor (kept)
      if (hasPointer) {
        displayX += (mouseX - displayX) * follow
        displayY += (mouseY - displayY) * follow
      }

      shimmerTime += deltaTime * 0.003

      ctx.fillStyle = "#000000"
      ctx.fillRect(0, 0, width, height)

      // Update waves (kept + fadeOut)
      for (let i = waves.length - 1; i >= 0; i--) {
        const w = waves[i]
        w.radius += w.speed
        w.life++

        if (w.fadeOut) {
          w.opacity *= FADE_MULT
        } else {
          w.opacity = Math.max(0, 1 - w.life / w.maxLife)
        }
        if (!w.fadeOut && w.radius > w.maxRadius) {
          w.fadeOut = true
        }
        if (w.opacity <= 0 || (w.speed < 0 && w.radius < 0)) {
          waves.splice(i, 1)
        }
      }

      // Optional toy "bounce" mode (off by default)
      if (PHYSICS_MODE === "bounce" && waves.length > 1) {
        for (let i = 0; i < waves.length; i++) {
          for (let j = i + 1; j < waves.length; j++) {
            const a = waves[i], b = waves[j]
            const d = Math.hypot(a.x - b.x, a.y - b.y)
            const sumFront = Math.abs((a.radius + b.radius) - d)
            const diffFront = Math.abs(Math.abs(a.radius - b.radius) - d)
            if (sumFront < COLLISION_EPS || diffFront < COLLISION_EPS) {
              const now = performance.now()
              const okA = !a._lastBounceAt || now - a._lastBounceAt > BOUNCE_COOLDOWN_MS
              const okB = !b._lastBounceAt || now - b._lastBounceAt > BOUNCE_COOLDOWN_MS
              if (okA && okB) {
                const va = a.speed
                a.speed = -b.speed * BOUNCE_DAMP
                b.speed = -va * BOUNCE_DAMP
                a._lastBounceAt = now
                b._lastBounceAt = now
                if (a.fadeOut) a.fadeOut = false
                if (b.fadeOut) b.fadeOut = false
              }
            }
          }
        }
      }

      // Build dot lists (kept, but wave influence now uses interference sum)
      const whiteDots: Array<{ x: number; y: number; r: number }> = []
      const coloredDots: Array<{ x: number; y: number; r: number; baseColor: string }> = []

      const centerX = hasPointer ? displayX : width * 0.5
      const centerY = hasPointer ? displayY : height * 0.35

      for (let gy = -baseSpacing; gy < height + baseSpacing; gy += baseSpacing) {
        for (let gx = -baseSpacing; gx < width + baseSpacing; gx += baseSpacing) {
          const dx = gx - centerX
          const dy = gy - centerY
          const dist = Math.sqrt(dx * dx + dy * dy)

          // Original cursor blob:
          const t = Math.max(0, 1 - dist / influence)
          const baseR = baseRadius + growth * t

          // ---- NEW: interference contribution (replaces hard band check) ----
          const field = interferenceAt(gx, gy) // can be negative/positive
          // map field to a 0..something bump for dot growth:
          const waveInfluence = Math.max(0, field) * INTENSITY_SCALE

          // Keep your color/shimmer logic intact:
          if (t > colorThreshold || waveInfluence > 0.3) {
            let baseColor: string
            if (waveInfluence > 0.3 && waves.length > 0) {
              // pick the strongest nearby wave color (simple heuristic)
              let chosen = palette[0]
              let best = -Infinity
              for (let i = 0; i < waves.length; i++) {
                const w = waves[i]
                const d = Math.hypot(gx - w.x, gy - w.y)
                const score = 1 / (1 + Math.abs(d - w.radius))
                if (score > best) { best = score; chosen = w.color }
              }
              baseColor = chosen
            } else {
              const shimmerPhase = Math.sin(gx * 0.03 + gy * 0.03 + shimmerTime * 0.8) * 0.5 + 0.5
              const colorIndex = Math.floor(shimmerPhase * colorCount) % colorCount
              baseColor = palette[colorIndex]
            }

            const finalR = baseR + waveInfluence
            coloredDots.push({ x: gx, y: gy, r: finalR, baseColor })
          } else {
            whiteDots.push({ x: gx, y: gy, r: baseR })
          }
        }
      }

      // Draw white dots batched (kept)
      if (whiteDots.length > 0) {
        ctx.fillStyle = "#ffffff"
        ctx.beginPath()
        for (let i = 0; i < whiteDots.length; i++) {
          const dot = whiteDots[i]
          ctx.moveTo(dot.x + dot.r, dot.y)
          ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2)
        }
        ctx.fill()
      }

      // Draw colored dots individually (kept)
      for (let i = 0; i < coloredDots.length; i++) {
        const dot = coloredDots[i]
        ctx.fillStyle = dot.baseColor
        ctx.beginPath()
        ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2)
        ctx.fill()
      }

      const moving = Math.abs(displayX - mouseX) > 0.05 || Math.abs(displayY - mouseY) > 0.05
      const hasWaves = waves.length > 0

      if (moving || hasWaves || hasPointer) {
        requestAnimationFrame(draw)
      } else {
        isAnimating = false
      }
    }

    // Kick off
    const start = () => requestAnimationFrame(draw)
    start()

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("click", handleClick)
      window.removeEventListener("touchstart", handleTouchStart)
      if (resizeTimer) clearTimeout(resizeTimer)
    }
  }, [])

  return <canvas ref={canvasRef} className="w-full h-full" aria-hidden="true" />
}
