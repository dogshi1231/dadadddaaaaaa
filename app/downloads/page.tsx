import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"

const downloads = [
  {
    name: "Call of Duty - Zenith",
    game: "call-of-duty",
    status: "UNDETECTED",
    statusColor: "bg-green-500",
    download: "https://gofile.io/d/xCkaUP",
    instructions: "https://pastebin.com/r36nWPhjExternal",
  },
  {
    name: "Call of Duty - Sol EXTERNAL",
    game: "call-of-duty",
    status: "UNDETECTED",
    statusColor: "bg-green-500",
    download: "https://gofile.io/d/xCkaUP",
    instructions: "https://pastebin.com/r36nWPhjExternal",
  },
  {
    name: "Call of Duty - Verse Perm Spoofer",
    game: "call-of-duty",
    status: "UNDETECTED",
    statusColor: "bg-green-500",
    download: "https://verse-solutions.gitbook.io/verse-permanent-guide",
    instructions: "https://verse-solutions.gitbook.io/verse-permanent-guide",
  },
  {
    name: "Call of Duty - Temp",
    game: "call-of-duty",
    status: "UNDETECTED",
    statusColor: "bg-green-500",
    download: "https://undetect.net/loader_exodus",
    instructions: "https://exofun.gitbook.io/docs/guides/requirements-and-info",
  },
  {
    name: "Call of Duty - Phone Verified Steam Accounts",
    game: "call-of-duty",
    status: "AVAILABLE",
    statusColor: "bg-blue-500",
    download: "https://gofile.io/placeholder",
    instructions: "https://gitbook.placeholder.com",
  },
  {
    name: "Valorant - Sol Internal",
    game: "valorant",
    status: "UNDETECTED",
    statusColor: "bg-green-500",
    download: "https://gofile.io/placeholder",
    instructions: "https://gitbook.placeholder.com",
  },
  {
    name: "Valorant - ColorBot",
    game: "valorant",
    status: "UNDETECTED",
    statusColor: "bg-green-500",
    download: "https://gofile.io/placeholder",
    instructions: "https://gitbook.placeholder.com",
  },
  {
    name: "Rainbow Six Siege X - Crusader",
    game: "rainbow-six-siege-x",
    status: "UNDETECTED",
    statusColor: "bg-green-500",
    download: "https://gofile.io/placeholder",
    instructions: "https://gitbook.placeholder.com",
  },
  {
    name: "Rocket League - Phantom Rocket League",
    game: "rocket-league",
    status: "UNDETECTED",
    statusColor: "bg-green-500",
    download: "https://gofile.io/placeholder",
    instructions: "https://gitbook.placeholder.com",
  },
  {
    name: "Roblox - Matcha",
    game: "roblox",
    status: "UNDETECTED",
    statusColor: "bg-green-500",
    download: "https://gofile.io/placeholder",
    instructions: "https://gitbook.placeholder.com",
  },
]

export default function DownloadsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="max-w-[1800px] mx-auto px-3 md:px-5 lg:px-8 py-8 md:py-12 pt-[72px] relative z-20 desktop-scale-downloads">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 md:mb-12">Downloads</h1>

        <div className="space-y-3 md:space-y-4">
          {downloads.map((item, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row md:items-center md:justify-between bg-[#0a0a1a] px-4 md:px-6 py-4 md:py-5 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-200 group shadow-lg hover:shadow-xl hover:-translate-y-0.5 gap-3 md:gap-0"
            >
              <div className="flex items-start md:items-center gap-2 md:gap-3">
                <h3 className="text-sm md:text-lg font-semibold flex-1">{item.name}</h3>
                <span
                  className={`${item.statusColor} text-white text-[10px] md:text-xs font-bold px-2 md:px-3 py-1 rounded-full flex-shrink-0`}
                >
                  {item.status}
                </span>
              </div>

              <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4 w-full md:w-auto">
                <a
                  href={item.instructions}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs md:text-sm text-gray-400 hover:text-white transition-colors order-2 md:order-1"
                >
                  View instructions
                  <svg className="w-3 md:w-4 h-3 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
                <Button
                  asChild
                  className="w-full md:w-auto bg-[#f7c948] hover:bg-[#f5c02e] text-black font-bold px-4 md:px-6 py-2 rounded-xl shadow-lg group-hover:shadow-xl transition-all text-sm md:text-base order-1 md:order-2"
                >
                  <a href={item.download} target="_blank" rel="noopener noreferrer">
                    Download
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
