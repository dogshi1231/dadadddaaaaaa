"use client"

import { Header } from "@/components/header"
import { ProductCard3D } from "@/components/product-card-3d"
import { VariantModal } from "@/components/variant-modal"
import { MediaDisplay } from "@/components/media-display"
import { useState } from "react"

const products = [
  {
    id: "crusader",
    name: "Crusader",
    description: "Tactical advantage with undetected features for Rainbow Six Siege",
    priceRange: "From $5.99",
    media: "https://i.imgur.com/crusader-r6.mp4",
    variants: [
      { duration: "1-day", name: "One Time", description: "Perfect for testing", price: "$5.99" },
      { duration: "1-week", name: "1 Week", description: "Short-term access", price: "$14.99" },
      {
        duration: "1-month",
        name: "1 Month",
        description: "Most popular choice",
        price: "$29.99",
        badge: "POPULAR" as const,
      },
      {
        duration: "lifetime",
        name: "Lifetime",
        description: "One-time payment",
        price: "$59.99",
        badge: "BEST VALUE" as const,
      },
    ],
  },
]

export default function RainbowSixPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<(typeof products)[0] | null>(null)

  const handleBuyNow = (product: (typeof products)[0]) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const handleSelectVariant = (variant: any) => {
    console.log("[v0] Selected variant:", variant, "for product:", selectedProduct?.name)
  }

  return (
    <div className="min-h-screen text-white bg-transparent">
      <Header />
      <main className="max-w-[1200px] mx-auto px-5 md:px-8 py-12 desktop-scale-wrapper-products">
        <h1 className="text-4xl md:text-5xl font-bold mb-12">Rainbow Six Siege X</h1>

        <div className="flex justify-center">
          <div className="w-full max-w-[380px]">
            {products.map((product) => (
              <ProductCard3D
                key={product.id}
                className="group/card relative bg-black border-2 border-white rounded-2xl overflow-hidden hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)] transition-all duration-300 product-card-3d"
              >
                {product.badge && (
                  <div className="absolute top-3 right-4 bg-white text-black px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1 z-10 border-2 border-white shadow-lg">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {product.badge}
                  </div>
                )}

                <div className="h-[280px] overflow-hidden border-b-2 border-white relative cursor-pointer">
                  <MediaDisplay
                    src={product.media || "/placeholder.svg?height=400&width=600"}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover/card:scale-110"
                  />
                </div>

                <div className="p-6 bg-black">
                  <h3 className="text-2xl font-bold mb-2.5">{product.name}</h3>
                  <p className="text-gray-400 text-sm mb-5 leading-relaxed">{product.description}</p>
                  <div className="text-3xl font-bold mb-5">{product.priceRange}</div>
                  <button
                    onClick={() => handleBuyNow(product)}
                    className="w-full bg-white text-black font-bold py-3.5 px-6 rounded-lg hover:bg-gray-100 transition-all duration-300 flex items-center justify-center gap-2 btn-buy-now"
                  >
                    <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              </ProductCard3D>
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
        />
      )}
    </div>
  )
}
