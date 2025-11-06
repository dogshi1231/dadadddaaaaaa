import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Header } from "@/components/header"

const games = [
  { name: "Call of Duty", slug: "call-of-duty", icon: "🎮" },
  { name: "Valorant", slug: "valorant", icon: "🎯" },
  { name: "Rainbow Six Siege X", slug: "rainbow-six-siege-x", icon: "🛡️" },
  { name: "Rocket League", slug: "rocket-league", icon: "⚽" },
  { name: "Roblox", slug: "roblox", icon: "🎲" },
]

export default function StorePage() {
  const products = [
    {
      id: 1,
      image: "/placeholder.svg?height=600&width=400",
      price: "1.00-10.00",
      name: "insert product name",
    },
    {
      id: 2,
      image: "/placeholder.svg?height=600&width=400",
      price: "1.00-10.00",
      name: "insert product name",
    },
    {
      id: 3,
      image: "/placeholder.svg?height=600&width=400",
      price: "1.00-10.00",
      name: "insert product name",
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <nav className="flex items-center justify-between px-3 md:px-6 lg:px-8 py-3 md:py-4 nav-gradient border-b border-white/5 shadow-lg flex-wrap gap-4 md:gap-0">
        <div className="flex items-center gap-4 md:gap-8 flex-wrap">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div
              className="w-6 md:w-8 h-6 md:h-8 bg-white flex items-center justify-center"
              style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
            >
              <svg viewBox="0 0 24 24" className="w-4 md:w-6 h-4 md:h-6" fill="#1e2024">
                <path d="M4 8h12l4 4-4 4H4l4-4-4-4z" />
              </svg>
            </div>
            <span className="text-lg md:text-xl font-bold hidden sm:inline">Solana</span>
          </Link>

          {/* Navigation Links - Hidden on mobile */}
          <div className="hidden md:flex items-center gap-3 lg:gap-6 text-xs md:text-sm">
            <Link href="/store" className="hover:text-gray-300 transition-colors">
              Store
            </Link>
            <a href="#" className="hover:text-gray-300 transition-colors">
              Boosting
            </a>
            <Link href="/downloads" className="hover:text-gray-300 transition-colors">
              Downloads
            </Link>
            <a href="#" className="hover:text-gray-300 transition-colors">
              Status
            </a>
            <a href="#" className="hover:text-gray-300 transition-colors">
              FAQ
            </a>
          </div>
        </div>

        {/* Search and Icons */}
        <div className="flex items-center gap-2 md:gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:flex-initial">
            <span className="absolute left-2 md:left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">🔍</span>
            <Input
              placeholder="Search"
              className="w-full md:w-80 pl-7 md:pl-10 py-1.5 md:py-2 text-xs md:text-base bg-[#2a2d32] border-[#3a3d42] text-white placeholder:text-gray-400"
            />
          </div>
          <button className="p-1 md:p-2 hover:bg-[#2a2d32] rounded transition-colors hidden sm:block text-lg">
            💬
          </button>
          <button className="p-1 md:p-2 hover:bg-[#2a2d32] rounded transition-colors relative text-lg">
            🔔
            <span className="absolute top-0 right-0 w-3 md:w-4 h-3 md:h-4 bg-yellow-500 text-black text-[10px] md:text-xs flex items-center justify-center rounded-full font-bold">
              1
            </span>
          </button>
        </div>
      </nav>

      <main className="max-w-[1800px] mx-auto px-3 md:px-5 lg:px-8 py-8 md:py-12 pt-[72px] relative z-20 desktop-scale-wrapper">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 md:mb-12">Store</h1>

        <div className="space-y-3 md:space-y-4">
          {games.map((game, index) => (
            <Link key={index} href={`/store/${game.slug}`}>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between bg-[#0a0a1a] px-4 md:px-6 py-4 md:py-5 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-200 group shadow-lg hover:shadow-xl hover:-translate-y-0.5 cursor-pointer gap-3 md:gap-0">
                <div className="flex items-center gap-3 md:gap-4">
                  <span className="text-2xl md:text-3xl">{game.icon}</span>
                  <h3 className="text-sm md:text-lg font-semibold group-hover:text-white/80 transition-colors">
                    {game.name}
                  </h3>
                </div>

                <div className="flex items-center gap-3 text-xs md:text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                  <span>View Products</span>
                  <svg
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
