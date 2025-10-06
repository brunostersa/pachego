/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost'],
    unoptimized: true
  },
  env: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'https://pachego.vercel.app',
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || 'Pá-chego Fretes',
    NEXT_PUBLIC_WHATSAPP_NUMBER: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '62991103510',
    NEXT_PUBLIC_EMAIL: process.env.NEXT_PUBLIC_EMAIL || 'contato@pachego.com.br',
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://pachego.com.br'
  },
  experimental: {
    optimizeCss: false
  }
}

module.exports = nextConfig
