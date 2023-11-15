/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    rewrites(){ // встроенные в next редиректы
      return [
        {
          source: "/api/:path*",
          destination: "http://localhost:3000/:path*",
        }
      ]
    }
  }
  
  module.exports = nextConfig
  