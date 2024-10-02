/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['openrouter.ai'],
  },
  reactStrictMode: true,
  env: {
    NEXT_PROJECT_KEY: process.env.NEXT_PROJECT_KEY,
    NEXT_SUPABASE_ANON_KEY: process.env.NEXT_SUPABASE_ANON_KEY,
  },
    // experimental: {
    //   runtime: 'experimental-edge',
    // },
    // other configurations...
  };
  
  export default nextConfig;
  