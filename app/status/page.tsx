"use client"

import { Header } from "@/components/header"
import Link from "next/link"
import { useState, useEffect } from "react"

const products = [
  { name: "insert product name", uptime: "99.9%", gamePage: "/store/call-of-duty" },
  { name: "insert product name", uptime: "99.9%", gamePage: "/store/valorant" },
  { name: "insert product name", uptime: "99.9%", gamePage: "/store/roblox" },
]

const recentUpdates = [
  {
    avatar: "/placeholder.svg?height=40&width=40",
    username: "Frost",
    title: "Battlefield 6 Beta Week 2 is now online!",
    snippet: "...",
    date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
  },
  {
    avatar: "/placeholder.svg?height=40&width=40",
    username: "DarthPK",
    title: "Introducing our newest Rainbow 6 Siege X product R6 X FANG!",
    snippet: "Features include Visuals, FPS...",
    date: new Date(Date.now() - 145 * 24 * 60 * 60 * 1000), // 145 days ago
  },
  {
    avatar: "/placeholder.svg?height=40&width=40",
    username: "DarthPK",
    title: "Please welcome our newest Apex product, APEX CRONOS!",
    snippet: "Features include aimbot, visuals...",
    date: new Date(Date.now() - 185 * 24 * 60 * 60 * 1000), // 185 days ago
  },
  {
    avatar: "/placeholder.svg?height=40&width=40",
    username: "DarthPK",
    title: "Please welcome our newest Rust product, RUST SWAP!",
    snippet: "It comes with ESP, Sky Color...",
    date: new Date(Date.now() - 226 * 24 * 60 * 60 * 1000), // 226 days ago
  },
  {
    avatar: "/placeholder.svg?height=40&width=40",
    username: "DarthPK",
    title: "Happy New Year to everyone!",
    snippet: "Thank you for being with us and we appreciate your support.",
    date: new Date(Date.now() - 307 * 24 * 60 * 60 * 1000), // 307 days ago
  },
]

function getTimeCountdown(date: Date): string {
  const now = new Date()
  const diff = now.getTime() - date.getTime()

  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const weeks = Math.floor(days / 7)
  const months = Math.floor(days / 30)

  if (seconds < 60) return `${seconds}s ago`
  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  if (days < 7) return `${days}d ago`
  if (weeks < 4) return `${weeks}w ago`
  if (months < 12) return `${months}mo ago`
  return date.toLocaleDateString()
}

export default function StatusPage() {
  const [currentTime, setCurrentTime] = useState<Date>(new Date())
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date())

  useEffect(() => {
    // Update countdown every second
    const countdownInterval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    // Update "Last refreshed" every 3 hours
    const refreshInterval = setInterval(
      () => {
        setLastRefreshed(new Date())
      },
      3 * 60 * 60 * 1000,
    ) // 3 hours

    return () => {
      clearInterval(countdownInterval)
      clearInterval(refreshInterval)
    }
  }, [])

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <div className="bg-[#0a0a1a] border-b border-white/10">
        <div className="max-w-[1800px] mx-auto px-3 md:px-5 lg:px-8 pt-[72px]">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between py-4 md:py-6 gap-4 md:gap-0">
            <div className="bg-white text-black px-4 md:px-6 py-2 md:py-3 rounded-lg font-bold text-xs md:text-sm">
              INSERT GAME NAME AND LOGO
            </div>
            <div className="flex gap-2">
              <button className="px-4 md:px-6 py-2 text-xs md:text-sm font-medium border-b-2 border-red-500 text-white">
                Cheat
              </button>
              <button className="px-4 md:px-6 py-2 text-xs md:text-sm font-medium text-gray-400 hover:text-white transition-colors">
                Spoofer
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto px-3 md:px-5 lg:px-8 py-8 md:py-12 desktop-scale-wrapper">
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
          {/* MAIN CONTENT */}
          <div className="flex-1">
            {/* All Cheats Status Section */}
            <div className="mb-8 md:mb-12">
              <div className="flex flex-col md:flex-row items-start gap-6 md:gap-8 mb-8">
                {/* LEFT IMAGE */}
                <img
                  src="/gaming-dashboard.jpg"
                  alt="Status dashboard"
                  className="w-40 md:w-56 rounded-xl shadow-[0_0_25px_rgba(22,255,114,0.35)] border border-emerald-500/20 flex-shrink-0"
                />

                {/* TEXT RIGHT */}
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">All Cheats Status</h2>

                  <div className="mt-4 text-xs md:text-sm text-white/60 flex flex-wrap items-center gap-3 font-mono">
                    <span className="flex items-center gap-2 text-base md:text-lg font-semibold">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                      Live sync active
                    </span>
                    <span className="text-white/30">•</span>
                    <span className="text-sm md:text-base font-bold">
                      Last refreshed: {lastRefreshed.toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 md:space-y-6">
                {products.map((product, index) => (
                  <div
                    key={index}
                    className="bg-black border-2 border-[#16ff72] rounded-2xl p-4 md:p-6 relative transition-all duration-200 hover:shadow-[0_0_30px_rgba(22,255,114,0.4),inset_0_0_20px_rgba(22,255,114,0.05)] hover:-translate-y-0.5"
                    style={{
                      boxShadow: "0 0 20px rgba(22, 255, 114, 0.2), inset 0 0 20px rgba(22, 255, 114, 0.05)",
                    }}
                  >
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                      <div className="flex items-center gap-3 md:gap-4">
                        <div className="w-8 md:w-10 h-8 md:h-10 bg-white rounded flex items-center justify-center flex-shrink-0">
                          <svg viewBox="0 0 24 24" className="w-5 md:w-6 h-5 md:h-6" fill="#000">
                            <path d="M4 8h12l4 4-4 4H4l4-4-4-4z" />
                          </svg>
                        </div>
                        <div className="bg-white px-3 md:px-4 py-1.5 md:py-2 text-black font-semibold text-xs md:text-sm rounded-lg">
                          {product.name}
                        </div>
                      </div>
                      <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4 w-full md:w-auto">
                        <div className="bg-[#16ff72]/20 text-[#16ff72] px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-bold flex items-center gap-2 border border-[#16ff72]/30 order-2 md:order-1">
                          <span className="w-1.5 md:w-2 h-1.5 md:h-2 bg-[#16ff72] rounded-full animate-pulse"></span>
                          UNDETECTED
                        </div>
                        <div className="text-right order-1 md:order-2 md:text-center">
                          <div className="text-xs text-gray-500">Uptime</div>
                          <div className="text-lg md:text-xl font-bold">{product.uptime}</div>
                        </div>
                        <Link href={product.gamePage} className="w-full md:w-auto order-3">
                          <button className="w-full bg-white text-black px-4 md:px-6 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-colors text-xs md:text-sm">
                            View Product
                          </button>
                        </Link>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs text-gray-400 mt-4 md:mt-0">
                      <span className="bg-white/5 px-2 md:px-3 py-1 rounded-full border border-white/10">Aimbot</span>
                      <span className="bg-white/5 px-2 md:px-3 py-1 rounded-full border border-white/10">ESP</span>
                      <span className="bg-white/5 px-2 md:px-3 py-1 rounded-full border border-white/10">Radar</span>
                      <span className="bg-white/5 px-2 md:px-3 py-1 rounded-full border border-white/10">Misc</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Status Legend Section */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">Status</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                <div className="bg-[#0a0a1a] rounded-2xl p-4 md:p-6 border-t-4 border-t-[#16ff72] border-x border-b border-white/10 shadow-lg transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div className="flex items-center gap-2 md:gap-3">
                      <div className="w-8 md:w-10 h-8 md:h-10 bg-[#16ff72] rounded-lg flex items-center justify-center flex-shrink-0">
                        <div className="w-5 md:w-6 h-5 md:h-6 text-black">✓</div>
                      </div>
                      <h3 className="font-bold text-sm md:text-base">Undetected</h3>
                    </div>
                    <span className="bg-[#16ff72] text-black px-2 md:px-3 py-1 rounded-full text-xs font-bold mt-2 md:mt-0">
                      Safe
                    </span>
                  </div>
                  <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
                    Our cheat is fully secure and safe to use. It's actively maintained and updated to stay undetected
                    by anti-cheat systems.
                  </p>
                </div>

                <div className="bg-[#0a0a1a] rounded-2xl p-4 md:p-6 border-t-4 border-t-orange-500 border-x border-b border-white/10 shadow-lg transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div className="flex items-center gap-2 md:gap-3">
                      <div className="w-8 md:w-10 h-8 md:h-10 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <div className="w-5 md:w-6 h-5 md:h-6 text-white">⚙</div>
                      </div>
                      <h3 className="font-bold text-sm md:text-base">Under Development</h3>
                    </div>
                    <span className="bg-orange-500 text-white px-2 md:px-3 py-1 rounded-full text-xs font-bold mt-2 md:mt-0">
                      Updating
                    </span>
                  </div>
                  <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
                    Our team is currently updating the cheat to ensure compatibility with the latest game version and
                    improved security.
                  </p>
                </div>

                <div className="bg-[#0a0a1a] rounded-2xl p-4 md:p-6 border-t-4 border-t-red-500 border-x border-b border-white/10 shadow-lg transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div className="flex items-center gap-2 md:gap-3">
                      <div className="w-8 md:w-10 h-8 md:h-10 bg-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <div className="w-5 md:w-6 h-5 md:h-6 text-white">!</div>
                      </div>
                      <h3 className="font-bold text-sm md:text-base">Detected</h3>
                    </div>
                    <span className="bg-red-500 text-white px-2 md:px-3 py-1 rounded-full text-xs font-bold mt-2 md:mt-0">
                      Unsafe
                    </span>
                  </div>
                  <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
                    The cheat is currently detected by anti-cheat systems and unsafe to use. Please wait for our team to
                    provide an updated version.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="lg:w-96">
            <div className="bg-[#0a0a1a] rounded-2xl p-4 md:p-6 border border-white/10 shadow-lg sticky top-24">
              <div className="flex items-center justify-between mb-4 md:mb-6 pb-4 md:pb-6 border-b border-white/10">
                <h3 className="font-bold text-base md:text-lg">Recent Status Updates</h3>
                <span className="text-[10px] md:text-xs text-gray-500 whitespace-nowrap ml-2">
                  Last refreshed: {lastRefreshed.toLocaleTimeString()}
                </span>
              </div>

              <div className="space-y-4 md:space-y-6">
                {recentUpdates.map((update, index) => (
                  <div key={index} className="pb-4 md:pb-6 border-b border-white/10 last:border-0 last:pb-0">
                    <div className="flex gap-2 md:gap-3">
                      <div className="w-8 md:w-10 h-8 md:h-10 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-xs md:text-sm mb-1">{update.username}</div>
                        <div className="text-xs md:text-sm text-gray-300 mb-1">{update.title}</div>
                        {update.snippet && (
                          <div className="text-[10px] md:text-xs text-gray-500 mb-1">{update.snippet}</div>
                        )}
                        <div className="text-[10px] md:text-xs text-gray-600">{getTimeCountdown(update.date)}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
