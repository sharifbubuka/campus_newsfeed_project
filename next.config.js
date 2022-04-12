/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['media.guim.co.uk', 'cdn.weatherapi.com'],
  }
}

module.exports = nextConfig
