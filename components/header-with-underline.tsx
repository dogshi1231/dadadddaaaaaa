"use client"

import { Header } from "@/components/header" // <-- lowercase path to match your file

export function HeaderWithUnderline() {
  return (
    <div className="relative z-[60]">
      <Header />

      {/* underline strip below header */}
      <div className="header-underline-wrap">
        <div className="header-underline-line" />
        <div className="header-underline-dots" />
      </div>
    </div>
  )
}
