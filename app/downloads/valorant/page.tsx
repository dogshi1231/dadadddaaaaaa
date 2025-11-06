import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"

const downloads = [{ name: "Solona Internal" }, { name: "ColorBot" }]

export default function ValorantDownloadsPage() {
  return (
    <div className="min-h-screen text-white bg-transparent relative">
      <Header />

      <main className="mx-auto px-6 lg:px-16 py-16 max-w-[1400px] relative z-20">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-14 text-center sm:text-left">Valorant Downloads</h1>

        <div
          className="
            w-full rounded-2xl border border-white/10 
            bg-[rgba(15,15,15,0.9)]
            shadow-[0_0_40px_rgba(255,255,255,0.08)]
            backdrop-blur-[4px]
            p-6 sm:p-8
          "
        >
          <ul className="flex flex-col gap-6">
            {downloads.map((item, index) => (
              <li
                key={index}
                className="
                  flex flex-col sm:flex-row sm:items-center sm:justify-between
                  gap-5
                  bg-[rgba(25,25,25,0.9)]
                  border border-white/20 rounded-2xl
                  px-6 py-6
                  shadow-[0_0_18px_rgba(255,255,255,0.12)]
                  transition-all duration-400
                  hover:shadow-[0_0_30px_rgba(255,255,255,0.45)]
                  hover:border-white/60
                  hover:scale-[1.01]
                "
              >
                <div className="flex flex-col">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="text-[22px] sm:text-[24px] font-semibold text-white leading-none">{item.name}</h3>

                    <span
                      className="
                        text-[11px] leading-none font-medium
                        px-3 py-[3px] rounded
                        bg-white/10 text-white/60 uppercase tracking-wide
                      "
                    >
                      VALORANT
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:ml-auto">
                  <a
                    href="https://gitbook.placeholder.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      flex items-center gap-2 text-[14px] leading-none
                      text-white/70 border border-white/20
                      px-4 py-3 rounded-lg
                      bg-black/40 hover:bg-white/10
                      hover:text-white
                      transition-all duration-300
                    "
                  >
                    <span>View instructions</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    className="
                      bg-white hover:bg-neutral-200
                      text-black text-[16px] leading-none font-semibold
                      px-8 py-4 rounded-lg
                      shadow-[0_0_25px_rgba(255,255,255,0.4)]
                      hover:shadow-[0_0_40px_rgba(255,255,255,0.6)]
                      transition-all duration-300
                    "
                  >
                    <a href="https://gofile.io/placeholder" target="_blank" rel="noopener noreferrer">
                      Download
                    </a>
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  )
}
