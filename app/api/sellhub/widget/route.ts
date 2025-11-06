// app/api/sellhub/widget/route.ts
import { NextResponse } from "next/server"

// Ensure Node runtime (more permissive networking than edge)
export const runtime = "nodejs"
// Avoid build-time caching
export const dynamic = "force-dynamic"

// Current Sellhub embed loader + sensible fallbacks
const SOURCES = [
  "https://public.sellhub.cx/embeds.js",
  "https://cdn.sellhub.cx/embeds.js",
  "https://cdn.sellhub.dev/embeds.js",
]

export async function GET() {
  for (const url of SOURCES) {
    try {
      const res = await fetch(url, {
        // never cache upstream during dev
        cache: "no-store",
        headers: { Accept: "text/javascript,*/*;q=0.1" },
      })
      if (res.ok) {
        const js = await res.text()
        return new NextResponse(js, {
          status: 200,
          headers: {
            "content-type": "application/javascript; charset=utf-8",
            "cache-control": "public, max-age=3600, s-maxage=3600",
            "access-control-allow-origin": "*",
            Vary: "Origin",
          },
        })
      }
    } catch {
      // continue to next source
    }
  }

  return new NextResponse(
    "/* Sellhub widget proxy: all upstream sources unavailable */\nconsole.error('Sellhub widget could not be loaded from any source');",
    {
      status: 502,
      headers: {
        "content-type": "application/javascript; charset=utf-8",
        "access-control-allow-origin": "*",
        Vary: "Origin",
      },
    }
  )
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "access-control-allow-origin": "*",
      "access-control-allow-methods": "GET, OPTIONS",
      "access-control-allow-headers": "*",
      Vary: "Origin",
    },
  })
}
