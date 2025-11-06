"use client"

import Script from "next/script"

export function SellhubProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Set config before script loads */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            if (typeof window !== 'undefined') {
              window.sellhubConfig = { debug: true, autoInit: true };
              console.log('✅ Sellhub config set:', window.sellhubConfig);
            }
          `,
        }}
      />
      
      {/* Load Sellhub script */}
      <Script
        src="https://public.sellhub.cx/embeds.js"
        strategy="afterInteractive"
        onLoad={() => {
          console.log('✅ Sellhub script loaded')
          console.log('window.Sellhub:', (window as any).Sellhub)
        }}
        onError={(e) => {
          console.error('❌ Sellhub script failed:', e)
        }}
      />
      
      {children}
    </>
  )
}
