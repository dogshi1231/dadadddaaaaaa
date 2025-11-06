"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Shield, AlertCircle, RefreshCw } from "lucide-react"
import { VariantModal } from "@/components/variant-modal"
import { productsData } from "@/lib/products-data"

export default function RocketLeagueStatusPage() {
  const products = productsData["rocket-league"]
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
          "bg-[rgba(0,128,0,0.15)] text-emerald-300 border border-emerald-500/40 shadow-[0_0_8px_rgba(16,185,129,0.6)]",
        dotClass: "bg-emerald-400 shadow-[0_0_6px_rgba(16,185,129,0.8)]",
        rowOuterGlow:
          "0 0 12px rgba(0,255,128,0.25), 0 0 30px rgba(0,255,128,0.15), inset 0 0 8px rgba(0,255,128,0.15)",
        rowBorderColor: "border-emerald-500/40",
      }
    }
    if (level === "updating") {
      return {
        pillClass:
          "bg-[rgba(255,200,0,0.12)] text-amber-300 border border-amber-400/40 shadow-[0_0_8px_rgba(251,191,36,0.4)]",
        dotClass: "bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.8)]",
        rowOuterGlow:
          "0 0 12px rgba(251,191,36,0.25), 0 0 30px rgba(251,191,36,0.15), inset 0 0 8px rgba(251,191,36,0.15)",
        rowBorderColor: "border-amber-400/40",
      }
    }
    return {
      pillClass: "bg-[rgba(255,0,0,0.12)] text-red-300 border border-red-500/40 shadow-[0_0_8px_rgba(239,68,68,0.5)]",
      dotClass: "bg-red-400 shadow-[0_0_6px_rgba(239,68,68,0.8)]",
      rowOuterGlow: "0 0 12px rgba(239,68,68,0.25), 0 0 30px rgba(239,68,68,0.15), inset 0 0 8px rgba(239,68,68,0.15)",
      rowBorderColor: "border-red-500/40",
    }
  }

  return (
    <div className="min-h-screen bg-transparent relative">
      <Header />

      <main className="mx-auto px-7 lg:px-20 mt-24 relative z-20 max-w-[1400px]">
        <section className="my-16">
          <h2 className="text-white text-[2.8rem] font-extrabold mb-2">Rocket League - All Cheats Status</h2>

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
              Rocket League
            </div>

            <ul>
              {products.map((product, i) => {
                const styles = getStatusStyles(product.statusLevel)

                return (
                  <li
                    key={i}
                    className={`
                      flex items-center justify-between gap-5
                      px-7 py-6
                      bg-[rgba(20,20,20,0.7)]
                      border ${styles.rowBorderColor}
                      rounded-xl
                      mt-4
                      transition-all duration-300 hover:scale-[1.01]
                    `}
                    style={{ boxShadow: styles.rowOuterGlow }}
                  >
                    {/* LEFT SIDE - Image */}
                    <div className="flex items-start gap-5">
                      <img
                        src={product.media || "/placeholder.svg"}
                        alt={product.name}
                        className="
                          w-18 h-18 rounded-md
                          object-cover
                          ring-1 ring-white/10
                          shadow-[0_0_22px_rgba(168,85,247,0.4)]
                          flex-shrink-0
                        "
                        onError={(e) => {
                          e.currentTarget.style.display = "none"
                          const parent = e.currentTarget.parentElement
                          if (parent) {
                            const fallback = document.createElement("div")
                            fallback.className = `
                              w-18 h-18 rounded-md
                              bg-gradient-to-br from-[#2a123a] to-[#000]
                              ring-1 ring-white/10
                              shadow-[0_0_22px_rgba(168,85,247,0.4)]
                              flex items-center justify-center text-[11px]
                              text-white/70 font-medium
                            `
                            fallback.textContent = "IMG"
                            parent.appendChild(fallback)
                          }
                        }}
                      />

                      <div className="flex flex-col">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-white font-semibold text-[17px] leading-none">{product.name}</span>
                          <span className="text-[11px] font-medium px-2 py-[2px] rounded bg-white/10 text-white/50 uppercase tracking-widest">
                            RL
                          </span>
                        </div>

                        <div className="text-[14px] text-white/70 mt-1">{product.price}</div>
                        <div className="text-[12px] text-white/40 font-mono mt-1">Updated 2h ago</div>
                      </div>
                    </div>

                    {/* RIGHT SIDE - Buttons */}
                    <div className="flex items-center gap-4 ml-auto">
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

        <section className="my-20">
          <h2 className="text-2xl font-bold text-white mb-6">Status Checker</h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div
              className="
                bg-[#101010]/90
                border border-emerald-600/40
                rounded-xl
                shadow-[0_0_20px_rgba(16,185,129,0.3)]
                p-4
                flex flex-row gap-3
              "
            >
              <div
                className="
                  flex items-center justify-center
                  w-8 h-8 rounded-md
                  bg-emerald-600 text-white
                  shadow-[0_0_10px_rgba(16,185,129,0.6)]
                  text-xs font-bold
                  flex-shrink-0
                "
              >
                <Shield className="h-4 w-4" />
              </div>

              <div className="flex-1">
                <div className="flex items-center flex-wrap gap-2 mb-2">
                  <span className="text-white font-semibold text-sm leading-none">Undetected</span>
                  <span className="text-[10px] font-semibold bg-emerald-500 text-white px-2 py-[2px] rounded-full leading-none">
                    Safe
                  </span>
                </div>
                <p className="text-[12px] text-white/70 leading-relaxed">
                  Our cheat is fully secure and safe to use. It&apos;s actively maintained and updated to stay
                  undetected by anti-cheat systems.
                </p>
              </div>
            </div>

            <div
              className="
                bg-[#101010]/90
                border border-amber-500/40
                rounded-xl
                shadow-[0_0_20px_rgba(251,191,36,0.3)]
                p-4
                flex flex-row gap-3
              "
            >
              <div
                className="
                  flex items-center justify-center
                  w-8 h-8 rounded-md
                  bg-amber-500 text-black
                  shadow-[0_0_10px_rgba(251,191,36,0.6)]
                  text-xs font-bold
                  flex-shrink-0
                "
              >
                <RefreshCw className="h-4 w-4" />
              </div>

              <div className="flex-1">
                <div className="flex items-center flex-wrap gap-2 mb-2">
                  <span className="text-white font-semibold text-sm leading-none">Under Development</span>
                  <span className="text-[10px] font-semibold bg-amber-500 text-black px-2 py-[2px] rounded-full leading-none">
                    Updating
                  </span>
                </div>
                <p className="text-[12px] text-white/70 leading-relaxed">
                  Our team is currently updating the cheat to ensure compatibility with the latest game version and
                  improved security.
                </p>
              </div>
            </div>

            <div
              className="
                bg-[#101010]/90
                border border-red-500/40
                rounded-xl
                shadow-[0_0_20px_rgba(239,68,68,0.4)]
                p-4
                flex flex-row gap-3
              "
            >
              <div
                className="
                  flex items-center justify-center
                  w-8 h-8 rounded-md
                  bg-red-500 text-white
                  shadow-[0_0_10px_rgba(239,68,68,0.6)]
                  text-xs font-bold
                  flex-shrink-0
                "
              >
                <AlertCircle className="h-4 w-4" />
              </div>

              <div className="flex-1">
                <div className="flex items-center flex-wrap gap-2 mb-2">
                  <span className="text-white font-semibold text-sm leading-none">Detected</span>
                  <span className="text-[10px] font-semibold bg-red-500 text-white px-2 py-[2px] rounded-full leading-none">
                    Unsafe
                  </span>
                </div>
                <p className="text-[12px] text-white/70 leading-relaxed">
                  The cheat is currently detected by anti-cheat systems and unsafe to use. Please wait for our team to
                  provide an updated version.
                </p>
              </div>
            </div>
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
