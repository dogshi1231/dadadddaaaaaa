"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { VariantModal } from "@/components/variant-modal"
import { productsData } from "@/lib/products-data"

export default function CallOfDutyStatusPage() {
  const products = productsData["call-of-duty"]
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<(typeof products)[0] | null>(null)

  const handleViewProduct = (product: (typeof products)[0]) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const handleSelectVariant = (variant: any) => {
    console.log("Selected variant:", variant)
  }

  function getStatusStyles(level: string) {
    if (level === "safe") {
      return {
        pillClass:
          "bg-[rgba(0,128,0,0.15)] text-emerald-300 border border-emerald-500/40 shadow-[0_0_9px_rgba(16,185,129,0.6)]",
        dotClass: "bg-emerald-400 shadow-[0_0_7px_rgba(16,185,129,0.8)]",
        rowOuterGlow:
          "0 0 14px rgba(0,255,128,0.25), 0 0 35px rgba(0,255,128,0.15), inset 0 0 9px rgba(0,255,128,0.15)",
        rowBorderColor: "border-emerald-500/40",
      }
    }
    if (level === "updating") {
      return {
        pillClass:
          "bg-[rgba(255,200,0,0.12)] text-amber-300 border border-amber-400/40 shadow-[0_0_9px_rgba(251,191,36,0.5)]",
        dotClass: "bg-amber-400 shadow-[0_0_7px_rgba(251,191,36,0.8)]",
        rowOuterGlow:
          "0 0 14px rgba(251,191,36,0.25), 0 0 35px rgba(251,191,36,0.15), inset 0 0 9px rgba(251,191,36,0.15)",
        rowBorderColor: "border-amber-400/40",
      }
    }
    return {
      pillClass:
        "bg-[rgba(255,0,0,0.12)] text-red-300 border border-red-500/40 shadow-[0_0_9px_rgba(239,68,68,0.5)]",
      dotClass: "bg-red-400 shadow-[0_0_7px_rgba(239,68,68,0.8)]",
      rowOuterGlow:
        "0 0 14px rgba(239,68,68,0.25), 0 0 35px rgba(239,68,68,0.15), inset 0 0 9px rgba(239,68,68,0.15)",
      rowBorderColor: "border-red-500/40",
    }
  }

  return (
    <div className="min-h-screen bg-transparent relative">
      <Header />

      <main className="mx-auto px-7 lg:px-20 mt-24 relative z-20 max-w-[1400px]">
        <section className="my-16">
          <h2 className="text-white text-[2.8rem] font-extrabold mb-2">
            Call of Duty - All Cheats Status
          </h2>

          <div className="mt-2 text-[13px] text-white/60 flex flex-wrap items-center gap-2 font-mono">
            <span className="flex items-center gap-1 text-xl font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
              Live sync active
            </span>
            <span className="text-white/30">•</span>
            <span className="text-lg font-bold">Last refreshed: 12:51 AM EST</span>
          </div>

          <div
            className="
              mt-6 rounded-2xl border border-emerald-500/10
              bg-[rgba(15,15,15,0.9)]
              shadow-[0_0_30px_rgba(0,255,128,0.05)]
              backdrop-blur-[2px]
            "
          >
            <div className="px-7 py-5 text-base text-white/70 border-b border-white/10 font-semibold">
              Call of Duty / Warzone
            </div>

            <ul>
              {products.map((product, i) => {
                const styles = getStatusStyles(product.statusLevel)
                return (
                  <li
                    key={i}
                    className="
                      flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5
                      px-7 py-6
                      bg-[rgba(20,20,20,0.7)]
                      border rounded-xl
                      mt-4
                      transition-all duration-300 hover:scale-[1.01]
                    "
                    style={{ boxShadow: styles.rowOuterGlow, borderColor: styles.rowBorderColor }}
                  >
                    {/* LEFT - image + info */}
                    <div className="flex items-start gap-5 flex-1 min-w-0">

                      {/* ✅ VIDEO THUMBNAIL */}
                      {product.media && (
                        <div
                          className="
                            w-[72px] h-[72px] rounded-md overflow-hidden
                            ring-1 ring-white/10
                            shadow-[0_0_22px_rgba(168,85,247,0.4)]
                            flex-shrink-0 bg-black/30
                          "
                        >
                          <video
                            src={product.media}
                            className="w-full h-full object-cover block"
                            muted
                            playsInline
                            onError={(e) => {
                              // If video fails, hide it
                              e.currentTarget.style.display = 'none'
                            }}
                          />
                        </div>
                      )}

                      <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-white font-semibold text-[17px] leading-none truncate">
                            {product.name}
                          </span>
                          <span className="text-[11px] font-medium px-2 py-[2px] rounded bg-white/10 text-white/50 uppercase tracking-widest">
                            COD
                          </span>
                        </div>

                        <div className="text-[14px] text-white/70 mt-1">{product.price}</div>
                        <div className="text-[12px] text-white/40 font-mono mt-1">
                          Updated 2h ago
                        </div>
                      </div>
                    </div>

                    {/* RIGHT */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 sm:ml-auto">
                      <div
                        className={`
                          flex items-center gap-2
                          text-[13px] font-semibold px-3.5 py-1.5 rounded-full
                          ${styles.pillClass}
                        `}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${styles.dotClass}`} />
                        <span>{product.status}</span>
                      </div>

                      <button
                        onClick={() => handleViewProduct(product)}
                        className="
                          text-[13px] text-white/80
                          bg-[rgba(0,0,0,0.4)]
                          border border-white/10
                          rounded-md
                          px-5 py-2
                          hover:bg-white/5 hover:text-emerald-200
                          hover:border-emerald-400/40
                          transition-all
                          cursor-pointer
                        "
                      >
                        View Product
                      </button>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </section>
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
