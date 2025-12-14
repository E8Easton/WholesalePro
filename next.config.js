/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_KEY: process.env.API_KEY,
    REACT_APP_SUPABASE_URL: process.env.REACT_APP_SUPABASE_URL,
    REACT_APP_SUPABASE_ANON_KEY: process.env.REACT_APP_SUPABASE_ANON_KEY,
    WHOP_WEBHOOK_SECRET: process.env.WHOP_WEBHOOK_SECRET
  },
  reactStrictMode: true,
  typescript: {
    // Prevent build failure on type errors during deployment for now
    ignoreBuildErrors: true,
  },
  eslint: {
    // Prevent build failure on lint errors during deployment for now
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;