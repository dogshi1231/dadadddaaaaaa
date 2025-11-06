/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Disable source maps in production to make code harder to reverse engineer
  productionBrowserSourceMaps: false,
  // Optimize for production builds
  swcMinify: true,
}

export default nextConfig
