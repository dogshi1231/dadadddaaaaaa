export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0a0a1a] to-black animate-pulse" />
      
      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(220, 38, 38, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(220, 38, 38, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Logo */}
        <div className="animate-pulse">
          <img
            src="/images/design-mode/5Vsflv9.png"
            alt="Solana"
            className="h-32 w-auto object-contain drop-shadow-[0_0_40px_rgba(220,38,38,0.6)]"
          />
        </div>

        {/* Spinner */}
        <div className="relative w-16 h-16">
          {/* Outer rotating ring */}
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-red-500 border-r-red-500 animate-spin shadow-[0_0_20px_rgba(220,38,38,0.5)]" />
          
          {/* Inner pulsing dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse shadow-[0_0_15px_rgba(220,38,38,0.8)]" />
          </div>
        </div>

        {/* Loading text */}
        <div className="flex flex-col items-center gap-2">
          <p className="text-white text-lg font-bold animate-pulse">Loading...</p>
          <div className="flex gap-1">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-2 h-2 rounded-full bg-red-500 animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-2 h-2 rounded-full bg-red-500 animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </div>

      {/* Glowing edges effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-50" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-50" />
        <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-red-500 to-transparent opacity-50" />
        <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-red-500 to-transparent opacity-50" />
      </div>
    </div>
  )
}
