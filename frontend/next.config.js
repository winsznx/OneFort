/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost', 'onefort.xyz'],
    formats: ['image/avif', 'image/webp'],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  env: {
    NEXT_PUBLIC_APP_NAME: 'OneFort',
    NEXT_PUBLIC_APP_TAGLINE: 'Your Financial Fortress on OneChain',
  },
};

module.exports = nextConfig;
