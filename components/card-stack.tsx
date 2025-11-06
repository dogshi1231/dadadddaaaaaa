"use client"

import { useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { MediaDisplay } from "@/components/media-display"

interface CardData {
  id: string
  name: string
  description: string
  priceRange: string
  status: "UNDETECTED" | "POPULAR"
  gamePage: string
  media: string
}

// your data stays the same
const CARDS: CardData[] = [
  {
    id: "zenith",
    name: "Zenith V2",
    status: "UNDETECTED",
    description:
      "Premium Fortnite hack with aimbot, ESP, and exclusive features",
    priceRange: "From $4.90",
    gamePage: "/store/call-of-duty",
    media: "https://i.imgur.com/PbDY5pe.mp4",
  },
  {
    id: "sol-external",
    name: "Sol EXTERNAL",
    status: "UNDETECTED",
    description:
      "Advanced Valorant cheat with undetected aimbot and ESP",
    priceRange: "From $5.99",
    gamePage: "/store/call-of-duty",
    media: "https://i.imgur.com/VxXivO3.mp4",
  },
  {
    id: "verse-perm-spoofer",
    name: "Verse Perm Spoofer",
    status: "POPULAR",
    description:
      "Lifetime HWID protection for all games and anti-cheats",
    priceRange: "From $14.90",
    gamePage: "/store/call-of-duty",
    media: "https://i.imgur.com/8bEEyBp.mp4",
  },
]

export function CardStack() {
  const router = useRouter()

  // DOM refs
  const deckRef = useRef<HTMLDivElement | null>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  // drag/swapping refs
  const draggingRef = useRef(false)
  const swappingRef = useRef(false)
  const startXRef = useRef(0)
  const dragXRef = useRef(0)

  // video hover refs (ONLY for the current front card)
  const playPromiseRef = useRef<Promise<void> | null>(null)
  const pauseTimeoutRef = useRef<number | null>(null)
  const hoveringFrontRef = useRef(false)

  // sizing / animation tuning
  const CARD_WIDTH = 340
  const DRAG_THRESHOLD = 100
  const STACK_OFFSET = 15
  const STACK_SCALE_STEP = 0.04
  const SWAP_MS = 400
  const RESTACK_MS = 600

  // ----- helpers -----

  // find the element that is currently "front" (data-index="0")
  const getFrontCardEl = () =>
    cardRefs.current.find((c) => c?.dataset.index === "0") || null

  // get the <video> inside the current front card
  const getFrontVideoEl = () => {
    const front = getFrontCardEl()
    if (!front) return null
    return front.querySelector("video") as HTMLVideoElement | null
  }

  // apply stacked transform for each position
  const applyStackTransform = (card: HTMLDivElement, stackPos: number) => {
    // stackPos 0 = front, 1 = mid, 2 = back
    const x = STACK_OFFSET * stackPos
    const y = STACK_OFFSET * stackPos
    const z = -10 * stackPos
    const scale = 1 - STACK_SCALE_STEP * stackPos
    const rotZ = stackPos === 0 ? 0 : stackPos === 1 ? -6 : -10

    card.style.transform = `translate3d(${x}px,${y}px,${z}px) rotateZ(${rotZ}deg) scale(${scale})`
  }

  // put the 3 cards in front/mid/back visual state based on their data-index
  const layoutCards = () => {
    const cards = cardRefs.current
    const front = cards.find((c) => c?.dataset.index === "0")
    const mid = cards.find((c) => c?.dataset.index === "1")
    const back = cards.find((c) => c?.dataset.index === "2")

    cards.forEach((c) => c && c.classList.remove("front", "mid", "back"))

    if (front) {
      front.classList.add("front")
      applyStackTransform(front, 0)
      front.style.zIndex = "3"
      front.style.opacity = "1"
      front.style.boxShadow =
        "0 0 40px rgba(255,0,0,0.35), 0 8px 15px rgba(0,0,0,0.6)"
      front.style.pointerEvents = "auto"
    }

    if (mid) {
      mid.classList.add("mid")
      applyStackTransform(mid, 1)
      mid.style.zIndex = "2"
      mid.style.opacity = "0.9"
      mid.style.boxShadow = "0 5px 15px rgba(0,0,0,0.5)"
      mid.style.pointerEvents = "none"
    }

    if (back) {
      back.classList.add("back")
      applyStackTransform(back, 2)
      back.style.zIndex = "1"
      back.style.opacity = "0.8"
      back.style.boxShadow = "0 5px 15px rgba(0,0,0,0.4)"
      back.style.pointerEvents = "none"
    }
  }

  // drag live update (front card follows cursor)
  const liveDragUpdate = () => {
    if (swappingRef.current) return
    const front = getFrontCardEl()
    if (!front) return

    const maxTilt = 5
    const tilt = (dragXRef.current / (CARD_WIDTH / 2)) * maxTilt

    front.style.transition = "none"
    front.style.transform = `translate3d(${dragXRef.current}px,0,0) rotateZ(${tilt}deg) scale(1)`
  }

  // throw + reorder after drag passes threshold
  const performSwap = (direction: "left" | "right") => {
    if (swappingRef.current) return
    swappingRef.current = true

    const cards = cardRefs.current
    const front = cards.find((c) => c?.dataset.index === "0")
    const mid = cards.find((c) => c?.dataset.index === "1")
    const back = cards.find((c) => c?.dataset.index === "2")

    if (!front || !mid || !back) {
      swappingRef.current = false
      return
    }

    // define where each card moves after the swap
    const newOrder =
      direction === "left"
        ? {
            [front.dataset.index!]: "2", // front -> back
            [mid.dataset.index!]: "0", // mid -> front
            [back.dataset.index!]: "1", // back -> mid
          }
        : {
            [front.dataset.index!]: "1", // front -> mid
            [mid.dataset.index!]: "2", // mid -> back
            [back.dataset.index!]: "0", // back -> front
          }

    // big throw anim for current front
    const throwDir = direction === "left" ? -1 : 1
    const throwX = throwDir * (CARD_WIDTH * 1.1)
    const throwRot = throwDir * 15

    front.style.transition =
      "transform 0.4s cubic-bezier(0.5,0.5,0.4,1.2), box-shadow 0.4s cubic-bezier(0.2,0.8,0.2,1), opacity 0.4s cubic-bezier(0.2,0.8,0.2,1)"
    front.style.transform = `translate3d(${throwX}px,0,0) rotateZ(${throwRot}deg) scale(1)`
    front.style.opacity = "0.6"

    if (direction === "left") {
      // mid becomes new front
      mid.style.transition =
        "transform 0.4s cubic-bezier(0.2,0.8,0.2,1), box-shadow 0.4s cubic-bezier(0.2,0.8,0.2,1), opacity 0.4s cubic-bezier(0.2,0.8,0.2,1)"
      mid.style.transform = "translate3d(0,0,0) rotateZ(0deg) scale(1)"
      mid.style.opacity = "1"

      // back becomes new mid
      back.style.transition =
        "transform 0.4s cubic-bezier(0.2,0.8,0.2,1), box-shadow 0.4s cubic-bezier(0.2,0.8,0.2,1), opacity 0.4s cubic-bezier(0.2,0.8,0.2,1)"
      back.style.transform = `translate3d(${STACK_OFFSET}px,${STACK_OFFSET}px,-10px) rotateZ(-6deg) scale(${
        1 - STACK_SCALE_STEP
      })`
      back.style.opacity = "0.9"
    } else {
      // back becomes new front
      back.style.transition =
        "transform 0.4s cubic-bezier(0.2,0.8,0.2,1), box-shadow 0.4s cubic-bezier(0.2,0.8,0.2,1), opacity 0.4s cubic-bezier(0.2,0.8,0.2,1)"
      back.style.transform = "translate3d(0,0,0) rotateZ(0deg) scale(1)"
      back.style.opacity = "1"

      // mid goes to back
      mid.style.transition =
        "transform 0.4s cubic-bezier(0.2,0.8,0.2,1), box-shadow 0.4s cubic-bezier(0.2,0.8,0.2,1), opacity 0.4s cubic-bezier(0.2,0.8,0.2,1)"
      mid.style.transform = `translate3d(${
        STACK_OFFSET * 2
      }px,${STACK_OFFSET * 2}px,-20px) rotateZ(-10deg) scale(${
        1 - STACK_SCALE_STEP * 2
      })`
      mid.style.opacity = "0.8"
    }

    // after throw finishes
    setTimeout(() => {
      // update data-index for all cards
      cardRefs.current.forEach((card) => {
        if (!card) return
        const oldIndex = card.dataset.index!
        for (const oldVal in newOrder) {
          if (oldVal === oldIndex) {
            card.dataset.index = newOrder[oldVal]
          }
        }
      })

      // smooth settle
      cardRefs.current.forEach((card) => {
        if (!card) return
        card.style.transition = `transform ${RESTACK_MS}ms cubic-bezier(0.2,0.8,0.2,1), box-shadow ${RESTACK_MS}ms cubic-bezier(0.2,0.8,0.2,1), opacity ${RESTACK_MS}ms cubic-bezier(0.2,0.8,0.2,1)`
      })

      layoutCards()

      // cleanup after settle
      setTimeout(() => {
        cardRefs.current.forEach((c) => {
          if (!c) return
          c.style.transition = ""
          c.style.opacity = ""
        })
        dragXRef.current = 0
        swappingRef.current = false
      }, RESTACK_MS + 50)
    }, SWAP_MS)
  }

  // ----- drag handlers -----

  const handleMove = (e: MouseEvent | TouchEvent) => {
    if (!draggingRef.current) return
    const clientX =
      "touches" in e
        ? (e as TouchEvent).touches[0].clientX
        : (e as MouseEvent).clientX

    dragXRef.current = clientX - startXRef.current
    liveDragUpdate()
  }

  const handleUp = () => {
    if (!draggingRef.current) return
    draggingRef.current = false

    const deck = deckRef.current
    if (deck) deck.style.cursor = "grab"

    const absDrag = Math.abs(dragXRef.current)
    if (absDrag > DRAG_THRESHOLD) {
      const dir = dragXRef.current < 0 ? "left" : "right"
      performSwap(dir)
    } else {
      // snap back if not past threshold
      const front = getFrontCardEl()
      if (front) {
        front.style.transition =
          "transform 0.4s cubic-bezier(0.2,0.8,0.2,1), box-shadow 0.4s cubic-bezier(0.2,0.8,0.2,1)"
        front.style.transform =
          "translate3d(0,0,0) rotateZ(0deg) scale(1)"
      }
    }

    dragXRef.current = 0

    window.removeEventListener("mousemove", handleMove as any)
    window.removeEventListener("touchmove", handleMove as any)
    window.removeEventListener("mouseup", handleUp as any)
    window.removeEventListener("touchend", handleUp as any)
  }

  const handleDown = (e: React.PointerEvent | React.TouchEvent) => {
    if (swappingRef.current) return
    const deck = deckRef.current
    const front = getFrontCardEl()
    if (!front) return

    // only allow drag if they clicked the actual front card body
    if (!front.contains(e.target as Node)) return

    draggingRef.current = true
    dragXRef.current = 0
    startXRef.current =
      "touches" in e
        ? e.touches[0].clientX
        : (e as React.PointerEvent).clientX

    if (deck) deck.style.cursor = "grabbing"
    front.style.transition = "none"

    window.addEventListener("mousemove", handleMove as any)
    window.addEventListener("touchmove", handleMove as any, { passive: true })
    window.addEventListener("mouseup", handleUp as any)
    window.addEventListener("touchend", handleUp as any)
  }

  // ----- BUY NOW -----
  const handleBuyNowClick = (ev: React.MouseEvent) => {
    // don't treat this as start of drag
    ev.stopPropagation()
    ev.preventDefault()
    router.push("/store/call-of-duty")
  }

  // ----- FRONT CARD HOVER VIDEO LOGIC -----
  const playFrontVideo = () => {
    const vid = getFrontVideoEl()
    if (!vid) return
    if (vid.paused) {
      playPromiseRef.current = vid.play()
      playPromiseRef.current?.catch((err) => {
        if (err.name !== "AbortError") {
          console.error("Video play error:", err)
        }
      })
    }
  }

  const pauseFrontVideo = () => {
    const vid = getFrontVideoEl()
    if (!vid) return

    if (playPromiseRef.current) {
      playPromiseRef.current
        .then(() => {
          vid.pause()
          vid.currentTime = 0
        })
        .catch(() => {
          vid.pause()
          vid.currentTime = 0
        })
      playPromiseRef.current = null
    } else {
      vid.pause()
      vid.currentTime = 0
    }
  }

  // when pointer enters the DECK, we treat as hover for the front card
  const handleMouseEnterDeck = () => {
    hoveringFrontRef.current = true
    // kill any queued pause
    if (pauseTimeoutRef.current !== null) {
      clearTimeout(pauseTimeoutRef.current)
      pauseTimeoutRef.current = null
    }
    // small delay like the CoD card
    setTimeout(() => {
      if (hoveringFrontRef.current && !draggingRef.current) {
        playFrontVideo()
      }
    }, 50)
  }

  // when pointer leaves the DECK entirely
  const handleMouseLeaveDeck = () => {
    hoveringFrontRef.current = false

    if (pauseTimeoutRef.current !== null) {
      clearTimeout(pauseTimeoutRef.current)
    }

    pauseTimeoutRef.current = window.setTimeout(() => {
      pauseTimeoutRef.current = null
      if (!hoveringFrontRef.current) {
        pauseFrontVideo()
      }
    }, 100)
  }

  // ----- init / cleanup -----
  useEffect(() => {
    // seed indexes
    cardRefs.current.forEach((c, i) => {
      if (c) c.dataset.index = String(i)
    })

    // default cursor
    if (deckRef.current) {
      deckRef.current.style.cursor = "grab"
    }

    layoutCards()

    return () => {
      // cleanup timers/listeners
      if (pauseTimeoutRef.current !== null) {
        clearTimeout(pauseTimeoutRef.current)
      }
      window.removeEventListener("mousemove", handleMove as any)
      window.removeEventListener("touchmove", handleMove as any)
      window.removeEventListener("mouseup", handleUp as any)
      window.removeEventListener("touchend", handleUp as any)
    }
  }, [])

  // ----- render -----
  return (
    <div
      ref={deckRef}
      className="relative w-[340px] h-[510px] select-none"
      style={{
        transformStyle: "preserve-3d",
        cursor: "grab",
        userSelect: "none",
      }}
      onMouseDown={handleDown}
      onTouchStart={handleDown}
      onMouseEnter={handleMouseEnterDeck}
      onMouseLeave={handleMouseLeaveDeck}
    >
      {CARDS.map((card, i) => (
        <div
          key={card.id}
          ref={(el) => (cardRefs.current[i] = el)}
          // NOTE:
          // We always render with the *front card full CoD style*,
          // but mid/back won't animate hover video anyway because
          // hover logic only targets data-index="0".
          className="absolute inset-0 bg-black border-2 border-white rounded-2xl overflow-hidden"
          style={{
            transition:
              "transform 0.4s cubic-bezier(0.2,0.8,0.2,1), box-shadow 0.4s cubic-bezier(0.2,0.8,0.2,1), opacity 0.4s cubic-bezier(0.2,0.8,0.2,1)",
            willChange: "transform, box-shadow, opacity, z-index",
          }}
        >
          {/* STATUS BADGE */}
          {card.status && (
            <div className="absolute top-3 right-4 bg-white text-black px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1 z-10 border-2 border-white shadow-lg pointer-events-none">
              <svg
                className="w-3.5 h-3.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {card.status}
            </div>
          )}

          {/* MEDIA (top half) */}
          <div className="h-[240px] overflow-hidden border-b-2 border-white relative cursor-pointer pointer-events-none">
            <MediaDisplay
              src={card.media}
              alt={card.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover/card:scale-110"
            />
          </div>

          {/* INFO + BUY NOW */}
          <div className="p-5 bg-black flex flex-col h-[270px]">
            <h3 className="text-xl font-bold mb-2">{card.name}</h3>

            <p className="text-gray-400 text-xs mb-2 leading-relaxed flex-1 line-clamp-2">
              {card.description}
            </p>

            <div className="text-lg font-bold mb-3">{card.priceRange}</div>

            <button
              // block drag start when pressing the button
              onPointerDown={(e) => {
                e.stopPropagation()
              }}
              onClick={handleBuyNowClick}
              className="relative z-30 w-full bg-white text-black font-bold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 hover:bg-gray-200 text-sm btn-buy-now"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              Buy Now
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
