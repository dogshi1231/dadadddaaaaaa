"use client"

import { X } from "lucide-react"
import { useEffect } from "react"

interface NotificationsPanelProps {
  onClose: () => void
}

export function NotificationsPanel({ onClose }: NotificationsPanelProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [onClose])

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 z-40 bg-black/50" onClick={onClose} />

      {/* Panel */}
      <div className="fixed right-0 top-0 h-screen w-96 bg-[#0f0f12] border-l border-white/10 shadow-2xl z-50 flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <h2 className="text-lg font-bold">Updates</h2>
          <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-8">
          <div className="flex flex-col items-center justify-center h-full text-center">
            <p className="text-gray-400">No updates yet</p>
          </div>
        </div>
      </div>
    </>
  )
}
