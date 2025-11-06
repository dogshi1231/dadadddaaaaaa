    "use client"

    /**
     * Copyright (c) 2025 Solana Cheats. All rights reserved.
     * Unauthorized copying, distribution, or use of this code is strictly prohibited.
     */

    import { Button } from "@/components/ui/button"
    import { HeaderWithUnderline } from "@/components/header-with-underline"
    import { SectionHeader } from "@/components/section-header"
    import { CardStack } from "@/components/card-stack"
    import { Headphones, Zap, Shield, MessageCircle, ExternalLink } from "lucide-react"
    import Link from "next/link"
    import { useIsMobile } from "@/hooks/use-mobile"

    export default function SolanaProductsPage() {
    const isMobile = useIsMobile()

    const featuredGames = [
        {
        name: "Call of Duty",
        sub: "Black Ops 6 / WZ",
        img: "https://aimexcheats.com/assets/img/cod6.svg",
        href: "/store/call-of-duty",
        },
        {
        name: "Valorant",
        sub: "Valorant",
        img: "https://i.imgur.com/QsUcbHP.png",
        href: "/store/valorant",
        },
        {
        name: "Rainbow Six Siege",
        sub: "R6 Siege",
        img: "https://images.seeklogo.com/logo-png/32/2/rainbow-six-siege-logo-png-rocket-league-clipart-transparent.png",
        href: "/store/rainbow-six-siege-x",
        },
        {
        name: "Rocket League",
        sub: "Rocket League",
        img: "https://www.vhv.rs/dpng/d/439-4392879_rocket-league-logo-png-rocket-league-clipart-transparent.png",
        href: "/store/rocket-league",
        },
        {
        name: "Roblox",
        sub: "Roblox",
        img: "https://www.freepnglogos.com/uploads/roblox-logo/file-roblox-2017-logo-red-0.png",
        href: "/store/roblox",
        },
    ]

    return (
        <div className="content-wrapper min-h-screen text-white bg-transparent">
        <HeaderWithUnderline />

        {/* NEW global scale wrapper for desktop */}
        <main
            className="
            relative flex flex-col gap-12 md:gap-16 pb-12 md:pb-16
            desktop-scale-wrapper-home
            "
        >
            {/* ===================== HERO SECTION ===================== */}
            <section className="relative w-full">
            <div className="w-full max-w-[1800px] mx-auto px-3 md:px-8 lg:px-12">
                {/* bring back the per-hero shrink on desktop */}
                <div className="desktop-scale-wrapper">
                <div className="relative flex justify-center pt-4 md:pt-6 lg:pt-8">
                    {/* HERO CARD */}
                    <div
                    className="
                        relative w-full
                        rounded-3xl overflow-hidden
                        border border-white/10
                        bg-black/50
                        shadow-[0_30px_120px_rgba(255,255,255,0.12),0_0_80px_rgba(255,255,255,0.4)]
                        max-w-[1820px]
                    "
                    >
                    {/* glowing ring around whole hero card */}
                    <div
                        className="
                        pointer-events-none absolute inset-0 rounded-3xl
                        ring-1 ring-white/20
                        after:content-['']
                        after:absolute after:inset-0 after:rounded-3xl
                        after:shadow-[0_0_80px_40px_rgba(255,255,255,0.18)]
                        after:pointer-events-none
                        "
                    />

                    {/* subtle inner highlight stroke */}
                    <div
                        className="
                        pointer-events-none absolute inset-0 rounded-3xl
                        border border-white/[0.03]
                        [mask-image:linear-gradient(to_bottom,rgba(255,255,255,0.6),rgba(255,255,255,0))]
                        "
                    />

                    {/* VIDEO LAYER */}
                    <div className="relative">
                        <video
                        src="https://i.imgur.com/VtsqBbF.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        onError={(e) => {
                          // Hide video if it fails to load
                          e.currentTarget.style.display = 'none'
                          // Show gradient background instead
                          const parent = e.currentTarget.parentElement
                          if (parent) {
                            parent.style.background = 'linear-gradient(135deg, #0a0a1a 0%, #000000 100%)'
                          }
                        }}
                        className="
                            w-full
                            aspect-video
                            object-cover
                        "
                        />

                        {/* Dark gradient overlay over the video so content pops */}
                        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-[#0a0a1a]/60 to-black/80 pointer-events-none" />
                    </div>

                    {/* CONTENT OVER VIDEO */}
                    <div
                        className="
                        absolute inset-0
                        flex flex-col xl:flex-row
                        items-start xl:items-center
                        justify-between
                        gap-6 md:gap-10 xl:gap-16
                        px-4 sm:px-6 md:px-10 lg:px-16
                        py-8 md:py-10
                        "
                    >
                        {/* LEFT SIDE: BRAND + CTA + SOCIAL PROOF */}
                        <div className="flex-1 max-w-xl w-full">
                        {/* Logo */}
                        <div className="mb-4 md:mb-6">
                            <img
                            src="https://i.imgur.com/hOTvde5.png"
                            alt="SOLANA"
                            className="h-24 sm:h-32 md:h-48 lg:h-56 w-auto object-contain drop-shadow-[0_0_25px_rgba(255,255,255,0.5)]"
                            />
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-6 md:mb-8">
                            {/* Primary CTA */}
                            <Link href="/store/call-of-duty" className="w-full sm:w-auto">
                            <Button
                                size="lg"
                                className="
                                w-full sm:w-auto
                                bg-[#dc2626] hover:bg-[#b91c1c]
                                text-white font-bold text-sm md:text-base lg:text-lg
                                px-6 sm:px-8 md:px-10 py-4 md:py-5 lg:py-6 h-auto rounded-xl
                                shadow-[0_20px_40px_rgba(220,38,38,0.5)]
                                border border-white/10
                                button-pearl
                                "
                            >
                                View Products
                            </Button>
                            </Link>

                            {/* Secondary CTA / Learn More */}
                            <Link href="/faq" className="w-full sm:w-auto">
                            <button
                                className="
                                w-full sm:w-auto
                                group relative rounded-xl
                                px-6 sm:px-8 md:px-10 py-4 md:py-5 lg:py-6 h-auto
                                text-white text-sm md:text-base lg:text-lg font-medium
                                border border-white/20
                                bg-white/[0.03] backdrop-blur-[6px]
                                shadow-[0_20px_40px_rgba(0,0,0,0.8)]
                                hover:bg-white/[0.07] hover:border-white/40
                                transition-all
                                button-outline-pearl
                                "
                            >
                                <div className="flex items-center justify-center gap-2">
                                <span className="inline-flex h-2 w-2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                                <span>Learn More</span>
                                </div>
                            </button>
                            </Link>
                        </div>

                        {/* Social proof */}
                        <div className="flex flex-col xs:flex-row items-start xs:items-center gap-3 md:gap-4 text-white/80 text-xs md:text-sm lg:text-base font-medium select-none">
                            {/* avatars */}
                            <div className="flex items-center -space-x-2">
                            <img
                                src="/images/design-mode/hGAFcwz.png"
                                alt="User 1"
                                className="w-7 md:w-9 lg:w-10 h-7 md:h-9 lg:h-10 rounded-full border-2 border-black object-cover shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                            />
                            <img
                                src="https://cdn.pfps.gg/pfps/48771-bloodhound-lil-jeff.jpeg"
                                alt="User 2"
                                className="w-7 md:w-9 lg:w-10 h-7 md:h-9 lg:h-10 rounded-full border-2 border-black object-cover shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                            />
                            <img
                                src="https://cdn.pfps.gg/pfps/57614-fami.jpeg"
                                alt="User 3"
                                className="w-7 md:w-9 lg:w-10 h-7 md:h-9 lg:h-10 rounded-full border-2 border-black object-cover shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                            />
                            </div>

                            <div className="leading-tight">
                            <div className="text-white font-semibold text-xs md:text-sm lg:text-base tracking-wide">
                                2400+ Total Members
                            </div>
                            <div className="text-white/50 text-[10px] md:text-xs">active across store / support</div>
                            </div>
                        </div>
                        </div>

                        {/* RIGHT SIDE: CARD STACK / FEATURED PRODUCT */}
                        {!isMobile && (
                        <div className="w-full max-w-sm self-center xl:self-auto flex justify-center xl:justify-end">
                            <CardStack />
                        </div>
                        )}
                    </div>

                    {/* floating game strip at bottom of hero (desktop only) */}
                    {!isMobile && (
                        <div className="absolute left-0 right-0 bottom-4 md:bottom-6 hidden md:flex justify-center px-4 pointer-events-auto">
                        <div
                            className="
                            flex flex-col md:flex-row items-center md:items-start justify-between
                            gap-4 md:gap-6
                            w-[90%] max-w-[900px]
                            rounded-xl border border-white/20
                            bg-white/[0.05] backdrop-blur-[8px]
                            shadow-[0_30px_120px_rgba(255,255,255,0.3),0_0_60px_rgba(255,255,255,0.4)]
                            px-4 md:px-6 py-3 md:py-4
                            overflow-hidden
                            "
                        >
                            {featuredGames.map((g) => (
                            <Link
                                key={g.name}
                                href={g.href}
                                className="
                                flex flex-col items-center text-center gap-2
                                min-w-[80px] md:min-w-[100px]
                                hover:scale-105 transition-transform cursor-pointer
                                "
                            >
                                <img
                                src={g.img || "/placeholder.svg"}
                                alt={g.name}
                                className={`
                                    object-contain
                                    ${g.name === "Call of Duty" ? "h-8 md:h-10" : ""}
                                    ${g.name === "Valorant" ? "h-6 md:h-8 filter grayscale hover:grayscale-0 transition" : ""}
                                    ${g.name === "Rainbow Six Siege" ? "h-6 md:h-8" : ""}
                                    ${g.name === "Rocket League" ? "h-8 md:h-10" : ""}
                                    ${g.name === "Roblox" ? "h-6 md:h-8 rounded-[4px]" : ""}
                                `}
                                />
                                <span className="text-[9px] md:text-[11px] text-white/60 uppercase tracking-wide font-medium">
                                {g.sub}
                                </span>
                            </Link>
                            ))}
                        </div>
                        </div>
                    )}
                    </div>
                </div>
                </div>

                {/* mobile version of featured games list */}
                {isMobile && (
                <div className="mt-6 px-3 flex flex-col gap-4">
                    {featuredGames.map((g) => (
                    <Link
                        key={g.name}
                        href={g.href}
                        className="
                        flex items-center justify-between
                        rounded-xl border border-white/20
                        bg-[rgba(0,0,0,0.6)] backdrop-blur-sm
                        shadow-[0_20px_40px_rgba(0,0,0,0.8)]
                        px-4 py-4
                        active:scale-[0.98] transition
                        "
                    >
                        <div className="flex items-center gap-3">
                        <img
                            src={g.img || "/placeholder.svg"}
                            alt={g.name}
                            className="w-10 h-10 object-contain rounded-[4px]"
                        />
                        <div className="flex flex-col">
                            <span className="text-white text-sm font-bold leading-tight">{g.name}</span>
                            <span className="text-[10px] text-white/60 uppercase tracking-wide">{g.sub}</span>
                        </div>
                        </div>

                        <div
                        className="
                            text-[11px] font-bold text-black rounded-lg py-2 px-3
                            bg-gradient-to-r from-[#ff3b30] to-[#ff0040]
                            shadow-[0_15px_40px_rgba(255,0,0,0.5)]
                        "
                        >
                        View
                        </div>
                    </Link>
                    ))}
                </div>
                )}
            </div>
            </section>

            {/* ===================== WHY CHOOSE SOLANA ===================== */}
            <section className="w-full">
            <div className="w-full max-w-[1800px] mx-auto px-3 md:px-8 lg:px-12">
                <div className="py-8 md:py-12 xl:py-16">
                <div className="flex justify-center mb-8 md:mb-12">
                    <SectionHeader title="Why Choose" highlight="Solana?" subtitle="Professional quality meets security" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 max-w-6xl mx-auto">
                    <div className="bg-[#0a0a1a] border border-white/10 rounded-2xl p-6 md:p-8 hover:border-[#dc2626]/50 transition-all hover:scale-105">
                    <div className="w-12 md:w-16 h-12 md:h-16 bg-white rounded-full flex items-center justify-center mb-4 md:mb-6 mx-auto">
                        <Shield className="w-6 md:w-8 h-6 md:h-8 text-black" />
                    </div>
                    <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-center">100% Undetected</h3>
                    <p className="text-gray-400 text-center text-xs md:text-sm">
                        State-of-the-art anti-detection technology ensures maximum security
                    </p>
                    </div>

                    <div className="bg-[#0a0a1a] border border-white/10 rounded-2xl p-6 md:p-8 hover:border-[#dc2626]/50 transition-all hover:scale-105">
                    <div className="w-12 md:w-16 h-12 md:h-16 bg-white rounded-full flex items-center justify-center mb-4 md:mb-6 mx-auto">
                        <Zap className="w-6 md:w-8 h-6 md:h-8 text-black" />
                    </div>
                    <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-center">Instant Updates</h3>
                    <p className="text-gray-400 text-center text-xs md:text-sm">
                        Automatic updates after every game patch within minutes
                    </p>
                    </div>

                    <div className="bg-[#0a0a1a] border border-white/10 rounded-2xl p-6 md:p-8 hover:border-[#dc2626]/50 transition-all hover:scale-105">
                    <div className="w-12 md:w-16 h-12 md:h-16 bg-white rounded-full flex items-center justify-center mb-4 md:mb-6 mx-auto">
                        <Headphones className="w-6 md:w-8 h-6 md:h-8 text-black" />
                    </div>
                    <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-center">24/7 Support</h3>
                    <p className="text-gray-400 text-center text-xs md:text-sm">
                        Our team is available around the clock - Discord &amp; Ticket System
                    </p>
                    </div>

                    <div className="bg-[#0a0a1a] border border-white/10 rounded-2xl p-6 md:p-8 hover:border-[#dc2626]/50 transition-all hover:scale-105">
                    <div className="w-12 md:w-16 h-12 md:h-16 bg-white rounded-full flex items-center justify-center mb-4 md:mb-6 mx-auto">
                        <svg className="w-6 md:w-8 h-6 md:h-8 text-black" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-center">Easy Setup</h3>
                    <p className="text-gray-400 text-center text-xs md:text-sm">
                        Simple installation with our automatic installer
                    </p>
                    </div>
                </div>
                </div>
            </div>
            </section>

            {/* ===================== DISCORD CTA ===================== */}
            <section className="w-full">
            <div className="w-full max-w-[1800px] mx-auto px-3 md:px-8 lg:px-12">
                <div className="pb-12 md:pb-16 text-center max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4 need-help-glow">Need Help?</h2>
                <p className="text-gray-300 text-sm md:text-base lg:text-lg mb-6 md:mb-10">
                    Join our <span className="text-[#5865f2] font-semibold">Discord</span> community for instant support,
                    updates, and exclusive content!
                </p>

                <a
                    href="https://discord.gg/eqMEN5YA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block w-full md:w-auto"
                >
                    <Button
                    size="lg"
                    className="
                        w-full md:w-auto
                        discord-button text-white font-bold text-sm md:text-base lg:text-lg
                        px-8 md:px-12 py-6 md:py-8 h-auto rounded-xl shadow-2xl group
                    "
                    >
                    <MessageCircle className="w-5 md:w-6 h-5 md:h-6 mr-2 md:mr-3" />
                    <div className="flex flex-col items-start">
                        <span className="text-base md:text-xl">Join our Discord</span>
                        <span className="text-xs md:text-sm opacity-90">24/7 Community Support</span>
                    </div>
                    <ExternalLink className="w-4 md:w-5 h-4 md:h-5 ml-2 md:ml-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </a>
                </div>
            </div>
            </section>
        </main>
        </div>
    )
    }
