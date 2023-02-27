/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    scrollRestoration: true,
  },
  images: {
    loader: 'custom',
    loaderFile: '/utils/supabase-image-loader.ts',
  },
}

module.exports = nextConfig
