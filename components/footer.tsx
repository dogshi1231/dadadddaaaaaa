"use client"

import { useEffect, useRef, useState } from "react"

export function Footer() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [copyText, setCopyText] = useState("Copy invite")

  const INVITE = "https://discord.gg/cBhpdmjz78"

  useEffect(() => {
    const footer = footerRef.current
    const canvas = canvasRef.current
    if (!footer || !canvas) return

    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    let w = 0,
      h = 0
    let spacing = 22,
      baseR = 0.6,
      maxR = 1.6,
      sigma = 160
    let dots: { x: number; y: number }[] = []
    const center = { x: 0, y: 0 }

    function buildGrid() {
      dots = []
      const offX = (w % spacing) / 2
      const offY = (h % spacing) / 2
      for (let yy = offY; yy <= h - offY; yy += spacing) {
        for (let xx = offX; xx <= w - offX; xx += spacing) {
          dots.push({ x: xx, y: yy })
        }
      }
    }

    function resize() {
      const rect = footer.getBoundingClientRect()
      w = Math.max(320, Math.floor(rect.width))
      h = Math.max(220, Math.floor(rect.height))
      const dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 2))
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = w + "px"
      canvas.style.height = h + "px"
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      if (w < 520) {
        spacing = 20
        sigma = 130
        baseR = 0.5
        maxR = 1.4
      } else if (w < 980) {
        spacing = 22
        sigma = 150
        baseR = 0.55
        maxR = 1.5
      } else {
        spacing = 24
        sigma = 170
        baseR = 0.6
        maxR = 1.6
      }

      buildGrid()
      center.x = w * 0.5
      center.y = h * 0.42
    }

    function draw() {
      ctx.clearRect(0, 0, w, h)

      const rad = Math.max(w, h) * 0.42
      const g = ctx.createRadialGradient(center.x, center.y, 0, center.x, center.y, rad)
      g.addColorStop(0, "rgba(220, 38, 38, 0.10)")
      g.addColorStop(0.55, "rgba(220, 38, 38, 0.04)")
      g.addColorStop(1, "rgba(220, 38, 38, 0.00)")
      ctx.fillStyle = g
      ctx.fillRect(0, 0, w, h)

      for (let i = 0; i < dots.length; i++) {
        const p = dots[i]
        const dx = p.x - center.x,
          dy = p.y - center.y
        const d2 = dx * dx + dy * dy
        const f = Math.exp(-d2 / (2 * sigma * sigma))

        const r = baseR + (maxR - baseR) * f
        const alp = 0.06 + 0.2 * f

        ctx.beginPath()
        ctx.fillStyle = `rgba(220, 38, 38, ${alp.toFixed(3)})`
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    resize()
    draw()

    const resizeObserver = new ResizeObserver(() => {
      resize()
      draw()
    })
    resizeObserver.observe(footer)

    return () => resizeObserver.disconnect()
  }, [])

  const handleSubscribe = () => {
    if (!isSubscribed) {
      setShowConfirm(true)
      setIsSubscribed(true)
    } else {
      setShowConfirm(!showConfirm)
    }
  }

  const handleCopyInvite = async () => {
    try {
      await navigator.clipboard.writeText(INVITE)
      setCopyText("Copied!")
      setTimeout(() => setCopyText("Copy invite"), 1200)
    } catch {
      setCopyText("Failed • long press to copy")
      setTimeout(() => setCopyText("Copy invite"), 1500)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer
      ref={footerRef}
      className="w-full text-white border-t border-white/10 relative overflow-hidden text-[#e9eaee] leading-7"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-90" />

      <div className="tmx-topline h-[3px] w-full bg-gradient-to-r from-transparent via-red-600 to-transparent animate-[tmx-move_5s_linear_infinite]" />

      <div className="container relative z-10 max-w-[1400px] mx-auto px-5 md:px-8 leading-7">
        <div className="grid grid-cols-12 gap-7 py-11">
          <section className="col-span-12 md:col-span-4">
            
            <h4 className="mt-2.5 mb-0.5 font-black text-[22px] text-red-600">SOLANA SOFTWARE</h4>
            <p className="text-[#c3c7d2] mb-3.5">
              Designed with passion • Powered by <b>SOLANA</b>
            </p>

            <div className="mt-2">
              <p className="text-[13px] text-[#b9beca] mb-2">Get product news & deals</p>
              <button
                onClick={handleSubscribe}
                className="inline-flex items-center gap-2 border-0 px-4.5 py-3 rounded-xl cursor-pointer text-white bg-gradient-to-r from-red-600 to-red-500 shadow-[0_10px_22px_rgba(220,38,38,0.25),inset_0_1px_0_rgba(255,255,255,.35)] font-extrabold uppercase tracking-wider transition-all duration-200 hover:translate-y-[-2px] hover:shadow-[0_16px_28px_rgba(220,38,38,0.35)]"
              >
                <i className="fa-solid fa-paper-plane"></i>
                <span>{isSubscribed ? "Subscribed" : "Subscribe"}</span>
              </button>

              <div
                className={`mt-3 border border-red-600/20 rounded-[14px] bg-gradient-to-b from-red-600/[0.02] to-transparent shadow-[inset_0_1px_0_rgba(220,38,38,.04)] overflow-hidden transition-all duration-400 ${
                  showConfirm ? "max-h-[200px] opacity-100 p-3" : "max-h-0 opacity-0 p-0"
                }`}
              >
                <div className="flex gap-2.5 items-center">
                  <img
                    src="/images/design-mode/NJlVLzZ.png"
                    alt="Logo"
                    className="w-[42px] h-[42px] rounded-[10px] shadow-[0_8px_24px_rgba(0,0,0,.25)]"
                  />
                  <div>
                    <h6 className="font-bold">
                      Welcome to <b>SOLANA</b>
                    </h6>
                    <p className="mt-0.5 text-[#dfe3ea] text-sm">
                      Thanks for subscribing! Join our community and never miss updates.
                    </p>
                  </div>
                </div>

                <div className="flex gap-2.5 flex-wrap mt-2.5">
                  <a
                    className="inline-flex items-center gap-2 rounded-xl px-3.5 py-2.5 no-underline font-extrabold tracking-wide bg-gradient-to-r from-red-600 to-red-500 text-white shadow-[0_10px_22px_rgba(220,38,38,0.25)] hover:translate-y-[-2px] transition-transform"
                    href="https://discord.gg/cBhpdmjz78"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <i className="fa-brands fa-discord"></i> Join Discord
                  </a>
                  <button
                    onClick={handleCopyInvite}
                    className="inline-flex items-center gap-2 rounded-xl px-3.5 py-2.5 font-extrabold tracking-wide bg-[#17181a] text-white border border-red-600/20 hover:translate-y-[-2px] transition-transform"
                  >
                    <i className="fa-solid fa-link"></i> {copyText}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex gap-2.5 mt-3.5 flex-wrap">
              <a
                className="w-12 h-12 rounded-full flex items-center justify-center text-white text-xl bg-[#17181a] border border-red-600/20 relative overflow-hidden transition-all duration-250 hover:translate-y-[-3px] hover:scale-[1.07] hover:bg-[#5865F2] hover:shadow-[0_0_20px_rgba(88,101,242,.55)]"
                href="https://discord.gg/5thCTeuhkq"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Discord"
              >
                <i className="fa-brands fa-discord transition-transform duration-350 hover:scale-[1.15] hover:rotate-6"></i>
              </a>
              <a
                className="w-12 h-12 rounded-full flex items-center justify-center text-white text-xl bg-[#17181a] border border-red-600/20 relative overflow-hidden transition-all duration-250 hover:translate-y-[-3px] hover:scale-[1.07] hover:bg-[#FF0000] hover:shadow-[0_0_20px_rgba(255,0,0,.55)]"
                href="https://www.youtube.com/@aaa.void1337"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="YouTube"
              >
                <i className="fa-brands fa-youtube transition-transform duration-350 hover:scale-[1.15] hover:rotate-6"></i>
              </a>
            </div>
          </section>
        </div>

        <div className="border-t border-red-600/10 flex items-center gap-3 justify-between py-4 text-[#aeb3bf] text-sm">
          <p>
            © <span>{new Date().getFullYear()}</span> SOLANA · All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full border border-red-600/20 bg-[#17181a] text-white cursor-pointer grid place-items-center transition-all duration-200 hover:translate-y-[-2px] hover:bg-gradient-to-r hover:from-red-600 hover:to-red-500 hover:text-white hover:shadow-[0_10px_22px_rgba(220,38,38,0.25)]"
            type="button"
            aria-label="Back to top"
          >
            <i className="fa-solid fa-arrow-up"></i>
          </button>
        </div>
      </div>

      <style jsx>{`
        .tmx-footer {
          background: radial-gradient(900px 420px at 50% -240px, rgba(220, 38, 38, 0.1), transparent 60%),
            radial-gradient(820px 420px at 100% 120%, rgba(220, 38, 38, 0.06), transparent 60%),
            linear-gradient(180deg, #0f0f10 0%, #0a0a0b 100%);
          border-top: 1px solid rgba(220, 38, 38, 0.35);
        }

        @keyframes tmx-move {
          to {
            background-position: -200% 0;
          }
        }
      `}</style>
    </footer>
  )
}
