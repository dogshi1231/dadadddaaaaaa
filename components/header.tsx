"use client"

/**
 * Copyright (c) 2025 Solana Cheats. All rights reserved.
 * Unauthorized copying, distribution, or use of this code is strictly prohibited.
 */

import { useState, useRef, useEffect, useCallback } from "react"
import { AlertCircle, MessageCircle, LogIn, Menu, X } from "lucide-react"
import Link from "next/link"
import { NotificationsPanel } from "./notifications-panel"
import { useIsMobile } from "@/hooks/use-mobile"

/* -------------------------
   DESKTOP DATA / UTILITIES
--------------------------*/

// Games list for desktop dropdowns
const GAMES = [
  {
    name: "Call of Duty",
    slug: "call-of-duty",
    icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Call_of_Duty_2023_logo.svg/2560px-Call_of_Duty_2023_logo.svg.png",
  },
  {
    name: "Valorant",
    slug: "valorant",
    icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Valorant_logo_-_pink_color_version.svg/1280px-Valorant_logo_-_pink_color_version.svg.png",
  },
  {
    name: "Rainbow Six Siege X",
    slug: "rainbow-six-siege-x",
    icon: "https://images.seeklogo.com/logo-png/32/2/rainbow-six-siege-logo-png_seeklogo-325646.png",
  },
  {
    name: "Rocket League",
    slug: "rocket-league",
    icon: "https://external-preview.redd.it/EbmVXFck5cfh9GkPDslAyA4T2UA_VcxlRWnTCTuXIy0.jpg?width=1080&crop=smart&auto=webp&s=98e10cfa6910e01f96df91864c894065c4ca4c53",
  },
  {
    name: "Roblox",
    slug: "roblox",
    icon: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Roblox_Logo_2022.jpg?20220830054427",
  },
]

function gameHref(section: string, slug: string): string {
  return `/${section.toLowerCase()}/${slug}`
}

const NAV_WITH_DROPDOWN = ["Store", "Boosting", "Downloads", "Status"]
const NAV_SINGLE = ["FAQ"]

/* -------------------------
   MOBILE MENU DATA
--------------------------*/

const storeGamesMobile = [
  {
    name: "Call of Duty",
    sub: "Black Ops 6 / WZ",
    href: "/store/call-of-duty",
    bestSeller: true,
    icon: "/icons/cod.png",
  },
  {
    name: "Valorant",
    sub: "Valorant",
    href: "/store/valorant",
    bestSeller: false,
    icon: "/icons/val.png",
  },
  {
    name: "Rainbow Six Siege",
    sub: "R6 Siege",
    href: "/store/rainbow-six-siege-x",
    bestSeller: false,
    icon: "/icons/r6.png",
  },
  {
    name: "Rocket League",
    sub: "Rocket League",
    href: "/store/rocket-league",
    bestSeller: false,
    icon: "/icons/rl.png",
  },
  {
    name: "Roblox",
    sub: "Roblox",
    href: "/store/roblox",
    bestSeller: false,
    icon: "/icons/roblox.png",
  },
]

const boostingGamesMobile = [
  {
    name: "Call of Duty Boosting",
    sub: "Black Ops 6 / WZ",
    icon: "/icons/cod.png",
  },
  {
    name: "Valorant Boosting",
    sub: "Valorant",
    icon: "/icons/val.png",
  },
  {
    name: "Rainbow Six Siege Boosting",
    sub: "R6 Siege",
    icon: "/icons/r6.png",
  },
  {
    name: "Rocket League Boosting",
    sub: "Rocket League",
    icon: "/icons/rl.png",
  },
  {
    name: "Roblox Boosting",
    sub: "Roblox",
    icon: "/icons/roblox.png",
  },
]

export function Header() {
  // ========= SHARED STATE =========
  const isMobile = useIsMobile()

  // desktop dropdown state
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  // mobile drawer state
  const [mobileOpen, setMobileOpen] = useState(false)

  // notif panel
  const [showNotifications, setShowNotifications] = useState(false)

  // mobile redirect popup
  const [showMobilePrompt, setShowMobilePrompt] = useState(false)

  // hover delay timers for desktop
  const openTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (openTimeoutRef.current) clearTimeout(openTimeoutRef.current)
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current)
    }
  }, [])

  // ask mobile users once per session about apx.sellhub.com
  useEffect(() => {
    if (!isMobile) return
    if (typeof window === "undefined") return
    const alreadyAsked = sessionStorage.getItem("sol-mobile-prompt-shown")
    if (!alreadyAsked) {
      setShowMobilePrompt(true)
      sessionStorage.setItem("sol-mobile-prompt-shown", "1")
    }
  }, [isMobile])

  // ========= DESKTOP DROPDOWN LOGIC =========

  // desktop hover in
  const handleMouseEnter = (link: string) => {
    if (isMobile) return
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current)
    openTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(link)
    }, 150)
  }

  // desktop hover out
  const handleMouseLeave = () => {
    if (isMobile) return
    if (openTimeoutRef.current) clearTimeout(openTimeoutRef.current)
    closeTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 150)
  }

  // tap on nav item (mobile)
  const handleNavTap = (link: string) => {
    if (!isMobile) return
    setActiveDropdown((prev) => (prev === link ? null : link))
  }

  const closeAllMenus = useCallback(() => {
    setActiveDropdown(null)
    setMobileOpen(false)
  }, [])

  // ========= DESKTOP DROPDOWN ROWS =========

  // clickable row (Store / Downloads / Status dropdown entries)
  function NormalDropdownRow({
    parent,
    game,
  }: {
    parent: string
    game: (typeof GAMES)[number]
  }) {
    const bestSeller = parent === "Store" && game.slug === "call-of-duty"

    return (
      <Link
        href={gameHref(parent, game.slug)}
        onClick={closeAllMenus}
        className="
          flex items-start gap-2 w-full
          px-3 py-2 rounded-[6px]
          hover:bg-white/5
          text-white text-[13px] leading-[1.3]
          relative
        "
      >
        <img
          src={game.icon || "/placeholder.svg"}
          alt={game.name}
          className="
            mt-[2px] w-5 h-5 object-contain rounded-[4px]
            drop-shadow-[0_0_4px_rgba(255,0,0,0.4)]
          "
        />

        <div className="flex-1 flex flex-col text-white">
          <span className="font-medium">{game.name}</span>
        </div>

        {bestSeller && (
          <span
            className={[
              "shrink-0 text-[10px] leading-none px-2 py-[4px] rounded-md font-semibold",
              "bg-gradient-to-r from-red-500 to-purple-500 text-white",
              "shadow-[0_0_10px_rgba(239,68,68,0.8),0_0_20px_rgba(168,85,247,0.5)]",
              "border border-white/20",
              "whitespace-nowrap",
            ].join(" ")}
          >
            Best seller
          </span>
        )}
      </Link>
    )
  }

  // 🔒 locked Boosting panel with diagonal COMING SOON
  function BoostingDropdownLockedPanel() {
    return (
      <div
        className="
          relative
          rounded-xl
          bg-gradient-to-br from-black via-[#0a0a0a] to-black
          border-2 border-red-500/40
          shadow-[0_20px_60px_rgba(255,0,0,0.5),0_0_40px_rgba(255,0,0,0.3)]
          text-white
          w-full
          py-8
          pointer-events-none
          select-none
          overflow-hidden
        "
      >
        {/* Centered COMING SOON text */}
        <div className="relative z-10 flex items-center justify-center px-6 py-4">
          <div className="text-center">
            <div
              className="
                text-red-500 text-2xl font-black uppercase tracking-wider
                mb-2
                drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]
              "
            >
              Coming Soon
            </div>
            <div className="text-white/50 text-sm font-medium">
              Boosting services launching soon
            </div>
          </div>
        </div>

        {/* Animated glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-red-500/5 animate-pulse" />
      </div>
    )
  }

  // dropdown flyout under nav item
  function DesktopDropdown({ link }: { link: string }) {
    if (activeDropdown !== link) return null

    const isBoosting = link === "Boosting"

    const panelClasses = [
      "absolute left-1/2 -translate-x-1/2",
      "top-full",
      "z-40",
      "mt-2",
      "min-w-[220px] max-w-[260px] w-[240px]",
      "rounded-lg border",
      "origin-top",
      "opacity-0 translate-y-[-4px] scale-[0.98]",
      "animate-[dropdownFade_130ms_ease-out_forwards]",
      isBoosting
        ? "bg-[#0a0a0a] text-white border-red-500/40 ring-1 ring-red-500/40 shadow-[0_0_15px_rgba(255,0,0,0.4)]"
        : "bg-black/90 text-white border-white/10 ring-1 ring-white/10 shadow-[0_0_20px_rgba(0,0,0,0.8)]",
    ].join(" ")

    return (
      <div className={panelClasses} style={{ transformOrigin: "top center" }}>
        <div className="relative z-10 p-3 space-y-1">
          {isBoosting ? (
            <BoostingDropdownLockedPanel />
          ) : (
            GAMES.map((game) => <NormalDropdownRow key={game.slug} parent={link} game={game} />)
          )}
        </div>
      </div>
    )
  }

  // MOBILE FULL-SCREEN DRAWER
  const MobileDrawer = () => {
    if (!mobileOpen) return null

    return (
      <>
        {/* backdrop */}
        <div
          className="
            fixed inset-0 bg-black/80 backdrop-blur-sm
            z-[90]
          "
          onClick={closeAllMenus}
        />

        {/* drawer */}
        <div
          className="
            fixed inset-x-0 top-0 bottom-0 z-[100]
            bg-[#0a0a0f] text-white
            border-l border-r border-white/10
            shadow-[0_40px_120px_rgba(255,0,128,0.4)]
            flex flex-col
          "
        >
          {/* header row inside drawer */}
          <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <img
                src="/images/design-mode/5Vsflv9.png"
                alt="Solana"
                className="h-8 w-auto object-contain drop-shadow-[0_0_10px_rgba(255,0,0,0.6)]"
              />
              <span className="text-white font-black text-lg">Solana</span>
            </div>

            <button
              onClick={closeAllMenus}
              className="
                w-10 h-10 flex items-center justify-center rounded-lg
                border border-white/20 bg-white/[0.05]
                active:scale-[0.96] transition
              "
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* scrollable content */}
          <div className="flex-1 overflow-y-auto px-4 py-6 space-y-8 text-sm">
            {/* PRIMARY ACTIONS */}
            <div className="space-y-3">
              <Link
                href="/store/call-of-duty"
                className="
                  block w-full rounded-xl border border-white/20 bg-gradient-to-r from-red-600 to-pink-500
                  text-white text-center font-bold text-base py-3
                  shadow-[0_20px_40px_rgba(255,0,128,0.5)]
                  active:scale-[0.98] transition
                "
                onClick={closeAllMenus}
              >
                View Products
              </Link>

              <a
                href="https://discord.gg/5thCTeuhkq"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  block w-full rounded-xl border border-white/20
                  bg-[linear-gradient(135deg,#5865f2_0%,#4752c4_100%)]
                  text-white text-center font-bold text-base py-3
                  shadow-[0_20px_40px_rgba(88,101,242,0.6)]
                  active:scale-[0.98] transition
                "
              >
                Join Discord
              </a>

              <a
                href="https://docs.google.com/forms/YOUR_FORM_ID_HERE"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  block w-full rounded-xl border border-white/20
                  bg-white/[0.05] text-white text-center font-semibold text-base py-3
                  shadow-[0_20px_40px_rgba(255,255,255,0.1)]
                  active:scale-[0.98] transition
                "
                onClick={closeAllMenus}
              >
                Report Ban / Issue
              </a>

              <Link
                href="/faq"
                className="
                  block w-full rounded-xl border border-white/20
                  bg-white/[0.03] text-white text-center font-medium text-base py-3
                  active:scale-[0.98] transition
                "
                onClick={closeAllMenus}
              >
                FAQ
              </Link>
            </div>

            {/* STORE LINKS */}
            <div>
              <div className="text-white/60 text-[11px] uppercase tracking-wide font-medium mb-3">Store</div>
              <div className="space-y-2">
                {storeGamesMobile.map((g) => (
                  <Link
                    key={g.name}
                    href={g.href}
                    className="
                      flex items-center justify-between
                      rounded-lg border border-white/10 bg-white/[0.03]
                      px-4 py-3 active:scale-[0.98] transition
                    "
                    onClick={closeAllMenus}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={g.icon || "/placeholder.svg"}
                        className="h-8 w-8 rounded-md object-contain drop-shadow-[0_0_6px_rgba(255,0,128,0.5)]"
                      />
                      <div className="flex flex-col">
                        <span className="text-white text-[14px] font-semibold leading-none">{g.name}</span>
                        <span className="text-white/50 text-[11px] leading-none mt-1">{g.sub}</span>
                      </div>
                    </div>

                    {g.bestSeller && (
                      <span
                        className="
                          text-[10px] font-semibold leading-none
                          px-2 py-0.5 rounded-full
                          bg-gradient-to-r from-pink-500 to-red-500 text-white
                          shadow-[0_0_15px_rgba(255,0,128,0.6)]
                        "
                      >
                        BEST SELLER
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <div className="text-white/60 text-[11px] uppercase tracking-wide font-medium mb-3">Boosting</div>
              <div className="space-y-2">
                {boostingGamesMobile.map((g) => (
                  <Link
                    key={g.name}
                    href={`/boosting/call-of-duty`}
                    className="
                      relative flex items-center justify-between
                      rounded-lg border border-white/10
                      bg-white/[0.02]
                      px-4 py-3
                      select-none
                      active:scale-[0.98] transition
                    "
                  >
                    <div className="flex items-center gap-3">
                      <img src={g.icon || "/placeholder.svg"} className="h-8 w-8 rounded-md object-contain" />
                      <div className="flex flex-col">
                        <span className="text-white text-[14px] font-semibold leading-none">{g.name}</span>
                        <span className="text-white/40 text-[11px] leading-none mt-1">{g.sub}</span>
                      </div>
                    </div>

                    <span
                      className="
                        bg-white text-black text-[10px] font-bold tracking-wider
                        px-2 py-0.5 rounded-sm shadow
                      "
                    >
                      COMING SOON
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* STATUS / DOWNLOADS */}
            <div className="space-y-4">
              <Link
                href="/downloads/call-of-duty"
                className="
                  block rounded-lg border border-white/10 bg-white/[0.03]
                  px-4 py-3 active:scale-[0.98] transition
                "
                onClick={closeAllMenus}
              >
                <div className="text-white text-[14px] font-semibold leading-none">Downloads</div>
                <div className="text-white/50 text-[11px] leading-none mt-1">Loader / Client</div>
              </Link>

              <Link
                href="/status/call-of-duty"
                className="
                  block rounded-lg border border-white/10 bg-white/[0.03]
                  px-4 py-3 active:scale-[0.98] transition
                "
                onClick={closeAllMenus}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white text-[14px] font-semibold leading-none">Status</div>
                    <div className="text-white/50 text-[11px] leading-none mt-1">Undetected / Updating / Down</div>
                  </div>
                  <span className="status-pill">UNDETECTED</span>
                </div>
              </Link>
            </div>

            {/* LOGIN AT BOTTOM */}
            <div className="pt-4 border-t border-white/10">
              <a
                href="https://apx.sellhub.cx/order"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  block text-center text-white/80 text-[13px] font-medium
                  active:scale-[0.98] transition
                "
                onClick={closeAllMenus}
              >
                Login
              </a>
            </div>
          </div>
        </div>
      </>
    )
  }

  /* ---------------------------------
     RENDER
  ----------------------------------*/

  return (
    <>
      {/* background dim if desktop dropdown OR mobile drawer is open */}
      {(activeDropdown || mobileOpen) && (
        <div
          className="fixed inset-0 z-30 bg-black/60 md:bg-transparent"
          onClick={() => {
            setActiveDropdown(null)
            setMobileOpen(false)
          }}
        />
      )}

      {/* one-time "mobile site?" toast */}
      {showMobilePrompt && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-[360px] rounded-xl bg-black/90 border border-white/15 p-4 shadow-[0_0_30px_rgba(0,0,0,0.8)] ring-1 ring-white/20 text-white md:hidden">
          <div className="text-[15px] font-semibold mb-2">Switch to mobile site?</div>
          <div className="text-[13px] text-white/70 leading-snug mb-4">
            We have a mobile-optimized version of the store: apx.sellhub.com
          </div>
          <div className="flex gap-2">
            <button
              className="flex-1 text-[13px] font-bold py-2 rounded-lg bg-white/10 border border-white/30 hover:bg-white/20 hover:border-white/50 transition-colors"
              onClick={() => {
                window.location.href = "https://apx.sellhub.com"
              }}
            >
              Go there
            </button>
            <button
              className="flex-1 text-[13px] font-bold py-2 rounded-lg bg-black border border-white/20 hover:bg-white/5 hover:border-white/40 transition-colors"
              onClick={() => {
                setShowMobilePrompt(false)
              }}
            >
              Stay here
            </button>
          </div>
        </div>
      )}

      {/* MAIN TOP BAR */}
      <nav
        className="
          sticky top-0 left-0 right-0 z-50
          h-[72px] flex items-center
          border-b border-white/10 shadow-lg
          bg-black
        "
      >
        {/* LOGO (left) */}
        <div className="h-full flex items-center px-4 md:px-8 lg:px-12">
          <Link href="/" className="flex items-center gap-2 md:gap-3 flex-shrink-0" onClick={closeAllMenus}>
            <img src="/images/design-mode/5Vsflv9.png" alt="Solana" className="h-6 md:h-8 w-auto object-contain" />
            <span className="text-white font-black text-lg md:text-xl hidden sm:inline">Solana</span>
          </Link>
        </div>

        {/* DESKTOP NAV CENTER */}
        <div className="h-full flex-1 items-center justify-center px-4 md:px-8 hidden md:flex">
          <div className="flex items-center gap-6 lg:gap-10 text-sm font-medium">
            {NAV_WITH_DROPDOWN.map((link) => (
              <div
                key={link}
                className="relative group"
                onMouseEnter={() => handleMouseEnter(link)}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className="
                    text-white/60 hover:text-white
                    transition-colors duration-300
                    py-2 relative whitespace-nowrap
                    font-extrabold leading-7 text-lg lg:text-xl
                  "
                  onClick={() => handleNavTap(link)}
                >
                  {link}

                  {/* glowing underline on hover */}
                  <span
                    className="
                      absolute bottom-0 left-1/2 -translate-x-1/2
                      w-0 h-0.5
                      bg-gradient-to-r from-red-500 to-purple-500
                      group-hover:w-full
                      transition-all duration-300 ease-out
                    "
                    style={{
                      boxShadow: "0 0 8px rgba(239,68,68,0.8), 0 0 12px rgba(239,68,68,0.5)",
                    }}
                  />
                </button>

                {/* DESKTOP DROPDOWN PANEL */}
                <DesktopDropdown link={link} />
              </div>
            ))}

            {NAV_SINGLE.map((label) => (
              <Link
                key={label}
                href="/faq"
                className="
                  text-white/60 hover:text-white
                  transition-all duration-300
                  py-2 relative whitespace-nowrap group
                  font-extrabold text-lg lg:text-xl
                "
                onClick={closeAllMenus}
              >
                {label}
                <span
                  className="
                    absolute bottom-0 left-1/2 -translate-x-1/2
                    w-0 h-0.5
                    bg-gradient-to-r from-red-500 to-purple-500
                    group-hover:w-full
                    transition-all duration-300 ease-out
                  "
                  style={{
                    boxShadow: "0 0 8px rgba(239,68,68,0.8), 0 0 12px rgba(239,68,68,0.5)",
                  }}
                />
              </Link>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE ACTIONS + HAMBURGER */}
        <div className="h-full flex items-center gap-2 md:gap-3 lg:gap-5 px-3 md:px-6 lg:px-12 ml-auto">
          {/* Report Ban / Issue */}
          <a
            href="https://docs.google.com/forms/YOUR_FORM_ID_HERE"
            target="_blank"
            rel="noopener noreferrer"
            className="
              hidden sm:flex items-center gap-2
              px-2 md:px-4 py-2
              text-red-400 hover:text-red-300
              transition-colors rounded-lg border border-transparent
              hover:border-red-400/30
            "
            style={{
              textShadow: "0 0 10px rgba(239,68,68,0.8), 0 0 20px rgba(239,68,68,0.5)",
            }}
          >
            <AlertCircle className="w-3 md:w-4 h-3 md:h-4" />
            <span className="hidden lg:inline text-xs md:text-base font-extrabold">Report Ban / Issue</span>
          </a>

          {/* Discord */}
          <Link
            href="https://discord.gg/5thCTeuhkq"
            className="
              hidden sm:flex items-center gap-2
              px-2 md:px-4 py-2
              text-purple-300 hover:text-purple-200
              transition-colors rounded-lg
              border border-purple-400/30 hover:border-purple-300/50
            "
            onClick={closeAllMenus}
          >
            <MessageCircle className="w-3 md:w-4 h-3 md:h-4" />
            <span className="hidden lg:inline font-extrabold text-sm md:text-lg">Discord</span>
          </Link>

          {/* Login */}
          <a
            href="https://apx.sellhub.cx/order"
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex items-center gap-1 md:gap-2
              px-2 md:px-4 py-2
              text-white hover:text-white/90
              transition-colors rounded-lg
              border border-white/30 hover:border-white/50
              bg-white/10 hover:bg-white/20
            "
          >
            <LogIn className="w-3 md:w-4 h-3 md:h-4" />
            <span className="hidden sm:inline font-bold text-xs md:text-xl">Login</span>
          </a>

          {/* Hamburger for mobile -> opens full-screen drawer */}
          <button
            onClick={() => {
              setMobileOpen((prev) => !prev)
              setActiveDropdown(null)
            }}
            className="
              md:hidden text-white/60 hover:text-white
              transition-colors
            "
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* MOBILE DRAWER CONTENT */}
      <MobileDrawer />

      {showNotifications && <NotificationsPanel onClose={() => setShowNotifications(false)} />}
    </>
  )
}
