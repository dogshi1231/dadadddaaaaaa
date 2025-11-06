"use client"

/**
 * Copyright (c) 2025 Solana Cheats. All rights reserved.
 * Unauthorized copying, distribution, or use of this code is strictly prohibited.
 */

import { useState, useRef, useEffect } from "react"
import { Header } from "@/components/header"
import { ProductCard3D } from "@/components/product-card-3d"
import { VariantModal } from "@/components/variant-modal"
import { MediaDisplay } from "@/components/media-display"

const products = [
  {
    id: "zenith",
    name: "Zenith",
    description:
      "Premium Fortnite hack with aimbot, ESP, and exclusive features",
    priceRange: "From $4.99",
    media: "https://i.imgur.com/PbDY5pe.mp4",
    variants: [
      {
        duration: "1-day",
        name: "Day Key",
        description: "Perfect for testing",
        price: "$4.99",
        sellhubVariantId: "dcc91018-acfe-488e-8b58-ebc77e7cb19a",
      },
      {
        duration: "1-week",
        name: "Week Key",
        description: "Short-term access",
        price: "$15.00",
        sellhubVariantId: "d4b37faf-0983-4251-8704-5170676d0371",
      },
      {
        duration: "1-month",
        name: "Month Key",
        description: "Most popular choice",
        price: "$24.99",
        badge: "POPULAR" as const,
        sellhubVariantId: "0a1dc57f-8ac8-4fe1-b168-b131f9af63bf",
      },
      {
        duration: "lifetime",
        name: "Lifetime",
        description: "One-time payment",
        price: "$90.99",
        badge: "BEST VALUE" as const,
        sellhubVariantId: "81c12347-3f89-41b4-aaeb-eb84c88d17c3",
      },
    ],
  },
  {
    id: "sol-external",
    name: "Sol EXTERNAL",
    description: "Advanced Call of duty cheat with undetected aimbot and ESP",
    priceRange: "From $4.99",
    media: "https://i.imgur.com/VxXivO3.mp4",
    variants: [
      {
        duration: "1-day",
        name: "Day Key",
        description: "Perfect for testing",
        price: "$4.99",
        sellhubVariantId: "48436f25-59d8-4466-b236-06335c6338f9",
      },
      {
        duration: "1-week",
        name: "Week Key",
        description: "Short-term access",
        price: "$15.00",
        sellhubVariantId: "5fd729e7-aed2-42b8-a2a2-3980ca86e57d",
      },
      {
        duration: "1-month",
        name: "Month Key",
        description: "Most popular choice",
        price: "$24.99",
        badge: "POPULAR" as const,
        sellhubVariantId: "56e239bc-f75c-4ec2-b5ab-88d7bb7d21f9",
      },
      {
        duration: "lifetime",
        name: "Lifetime",
        description: "One-time payment",
        price: "$89.99",
        badge: "BEST VALUE" as const,
        sellhubVariantId: "df55da00-5f44-4586-9d0a-7a3fbd0bfbc5",
      },
    ],
  },
  {
    id: "verse-perm-spoofer",
    name: "Verse Perm Spoofer",
    description: "Lifetime HWID protection for all games and anti-cheats",
    priceRange: "From $22.00",
    media: "https://i.imgur.com/8bEEyBp.mp4",
    badge: "POPULAR",
    variants: [
      {
        duration: "1-day",
        name: "One Time",
        description: "One-time payment",
        price: "$22.00",
        sellhubVariantId: "59a729ae-ac5f-4b77-a5d9-06babb7e1d29",
      },
      {
        duration: "lifetime",
        name: "Lifetime",
        description: "Lifetime access",
        price: "$70.00",
        badge: "BEST VALUE" as const,
        sellhubVariantId: "33d45cfa-b85b-4ecf-b9a7-751bd008b463",
      },
    ],
  },
  {
    id: "temp",
    name: "Temp",
    description: "Bypass Riot Vanguard anti-cheat system completely",
    priceRange: "From $4.99",
    media: "https://i.imgur.com/GY4tjyh.mp4",
    variants: [
      {
        duration: "1-day",
        name: "Day",
        description: "Perfect for testing",
        price: "$4.99",
        sellhubVariantId: "aad724ae-e5ef-4fd4-9a63-090fc2de08df",
      },
      {
        duration: "1-week",
        name: "Week",
        description: "Short-term access",
        price: "$10.00",
        sellhubVariantId: "575fff03-de8e-4317-9bad-49753049e3f9",
      },
      {
        duration: "1-month",
        name: "Month",
        description: "Most popular choice",
        price: "$20.00",
        badge: "POPULAR" as const,
        sellhubVariantId: "799fe2b1-26d4-4dd6-ba4f-2e12e2257682",
      },
      {
        duration: "lifetime",
        name: "Lifetime",
        description: "One-time payment",
        price: "$40.00",
        badge: "BEST VALUE" as const,
        sellhubVariantId: "294a7f9d-333a-4043-ab66-41193cda597b",
      },
    ],
  },
  {
    id: "phone-verified-steam",
    name: "Phone Verified Steam Accounts",
    description: "Temporary HWID spoofing for quick session protection",
    priceRange: "$0.18",
    media: "https://i.imgur.com/gTrloXO.mp4",
    variants: [
      {
        duration: "one-time",
        name: "Steam Account",
        description: "Phone verified steam account",
        price: "$0.18",
        sellhubVariantId: "e9b4d2ac-1287-4e2e-9297-f3f79c52c66b",
      },
    ],
  },
]

// --- Card component with hover video behavior like CardStack ---
function ProductCardWithHover({
  product,
  onBuyClick,
}: {
  product: (typeof products)[0]
  onBuyClick: () => void
}) {
  // ref to this specific card root
  const cardRef = useRef<HTMLDivElement | null>(null)

  // we track play and pause timing like CardStack
  const playPromiseRef = useRef<Promise<void> | null>(null)
  const pauseTimeoutRef = useRef<number | null>(null)
  const isHoveringRef = useRef(false)

  // helper: find the <video> inside THIS card
  const getVideoEl = (): HTMLVideoElement | null => {
    if (!cardRef.current) return null
    return cardRef.current.querySelector("video")
  }

  const playVideo = () => {
    const v = getVideoEl()
    if (!v) return
    if (v.paused) {
      playPromiseRef.current = v.play()
      playPromiseRef.current?.catch((err) => {
        if (err.name !== "AbortError") {
          console.error("Video play error:", err)
        }
      })
    }
  }

  const pauseVideo = () => {
    const v = getVideoEl()
    if (!v) return
    if (playPromiseRef.current) {
      playPromiseRef.current
        .then(() => {
          if (!v.paused) {
            v.pause()
            v.currentTime = 0
          }
        })
        .catch(() => {
          v.pause()
          v.currentTime = 0
        })
      playPromiseRef.current = null
    } else if (!v.paused) {
      v.pause()
      v.currentTime = 0
    }
  }

  // when you move mouse into the card (anywhere, incl. Buy Now)
  const handleMouseEnter = () => {
    isHoveringRef.current = true

    // kill any pending pause
    if (pauseTimeoutRef.current !== null) {
      clearTimeout(pauseTimeoutRef.current)
      pauseTimeoutRef.current = null
    }

    // slight delay so fast fly-bys don't spam play()
    setTimeout(() => {
      if (isHoveringRef.current) {
        playVideo()
      }
    }, 50)
  }

  // when you fully leave the card
  const handleMouseLeave = () => {
    isHoveringRef.current = false

    if (pauseTimeoutRef.current !== null) {
      clearTimeout(pauseTimeoutRef.current)
    }

    // debounce pause/reset so tiny gaps don't insta-stop
    pauseTimeoutRef.current = window.setTimeout(() => {
      pauseTimeoutRef.current = null
      if (!isHoveringRef.current) {
        pauseVideo()
      }
    }, 100)
  }

  // cleanup on unmount (just like CardStack useEffect cleanup)
  useEffect(() => {
    return () => {
      if (pauseTimeoutRef.current !== null) {
        clearTimeout(pauseTimeoutRef.current)
      }
      pauseVideo()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ProductCard3D className="product-card-3d">
      <div
        ref={cardRef}
        className="group/card relative bg-black border-2 border-white rounded-2xl overflow-hidden hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)] transition-all duration-300"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* badge top right */}
        {product.badge && (
          <div className="absolute top-3 right-4 bg-white text-black px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1 z-10 border-2 border-white shadow-lg pointer-events-none">
            <svg
              className="w-3.5 h-3.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {product.badge}
          </div>
        )}

        {/* media / video area */}
        <div className="h-[280px] overflow-hidden border-b-2 border-white relative cursor-pointer pointer-events-none">
          <MediaDisplay
            src={product.media || "/placeholder.svg?height=400&width=600"}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover/card:scale-110"
          />
        </div>

        {/* bottom info / Buy Now */}
        <div className="p-6 bg-black flex flex-col">
          <h3 className="text-2xl font-bold mb-2.5">{product.name}</h3>
          <p className="text-gray-400 text-sm mb-5 leading-relaxed">
            {product.description}
          </p>
          <div className="text-3xl font-bold mb-5">
            {product.priceRange}
          </div>

          <button
            onClick={() => onBuyClick()}
            className="w-full bg-white text-black font-bold py-3.5 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 btn-buy-now hover:bg-gray-200 relative z-30"
          >
            <svg
              className="w-4.5 h-4.5"
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
    </ProductCard3D>
  )
}

export default function CallOfDutyPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<
    (typeof products)[0] | null
  >(null)

  // opens VariantModal for the clicked product
  const handleBuyNowClick = (product: (typeof products)[0]) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const handleSelectVariant = (variant: any) => {
    console.log(
      "[v0] Selected variant:",
      variant,
      "for product:",
      selectedProduct?.name
    )
  }

  return (
    <div className="min-h-screen text-white bg-transparent">
      <Header />

      <main className="max-w-[1200px] mx-auto px-5 md:px-8 py-12 desktop-scale-wrapper-products">
        <h1 className="text-4xl md:text-5xl font-bold mb-12">
          Call of Duty
        </h1>

        <div className="flex flex-col items-center gap-8">
          {/* Top row - 2 products */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-[800px]">
            {products.slice(0, 2).map((product) => (
              <ProductCardWithHover
                key={product.id}
                product={product}
                onBuyClick={() => handleBuyNowClick(product)}
              />
            ))}
          </div>

          {/* Bottom row - 3 products */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            {products.slice(2).map((product) => (
              <ProductCardWithHover
                key={product.id}
                product={product}
                onBuyClick={() => handleBuyNowClick(product)}
              />
            ))}
          </div>
        </div>
      </main>

      {selectedProduct && (
        <VariantModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          productName={selectedProduct.name}
          variants={selectedProduct.variants}
          onSelectVariant={handleSelectVariant}
          readyForEmbed={true}
        />
      )}
    </div>
  )
}
