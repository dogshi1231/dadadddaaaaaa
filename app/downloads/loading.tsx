export default function Loading() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0a0a1a] to-black animate-pulse" />
      
      {/* White dots background pattern */}
      <div className="absolute inset-0 opacity-40" style={{
        backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.6) 1px, rgba(0, 0, 0, 0) 1px)',
        backgroundSize: '6px 4px'
      }} />
      
      {/* Glowing red orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-700" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Logo */}
        <div className="mb-4">
          <img
            src="/images/design-mode/5Vsflv9.png"
            alt="Solana"
            className="h-20 md:h-24 w-auto object-contain drop-shadow-[0_0_25px_rgba(255,0,0,0.6)] animate-pulse"
          />
        </div>

        {/* Spinner */}
        <div className="relative">
          <div className="w-16 h-16 border-4 border-red-500/30 border-t-red-500 rounded-full animate-spin" />
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-purple-500 rounded-full animate-spin-slow" />
        </div>

        {/* Text */}
        <div className="text-center">
          <h2 className="text-white text-xl md:text-2xl font-bold mb-2">
            Loading Downloads
          </h2>
          <p className="text-white/60 text-sm md:text-base">
            Preparing your files...
          </p>
        </div>

        {/* Animated dots */}
        <div className="flex gap-2">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" />
          <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce delay-150" />
          <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce delay-300" />
        </div>
      </div>
    </div>
  )
}
