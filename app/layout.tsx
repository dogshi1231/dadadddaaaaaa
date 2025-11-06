
/**
 * Copyright (c) 2025 Solana Cheats. All rights reserved.
 * Unauthorized copying, distribution, or use of this code is strictly prohibited.
 */

import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { Footer } from "@/components/footer"
import { AnimatedBackground } from "@/components/animated-background"
import { SellhubProvider } from "@/components/sellhub-provider"
import { ProtectionScript } from "@/components/protection-script"

export const metadata: Metadata = {
  title: "v0 App",
  description: "Created with v0",
  generator: "v0.app",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
          rel="stylesheet"
        />
      </head>

      <body className="font-sans antialiased bg-black text-white overflow-x-hidden" suppressHydrationWarning>
        <SellhubProvider>
          <ProtectionScript />
          {/* Background */}
          <div className="interactive-bg-wrapper">
            <AnimatedBackground />
          </div>

          {/* Content */}
          <div className="content-wrapper">
            {children}
            <Footer />
          </div>
        </SellhubProvider>
      </body>
    </html>
  )
}

