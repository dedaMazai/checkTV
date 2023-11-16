const { i18n } = require('./next-i18next.config.js')

const nextConfig = {
  reactStrictMode: true,
  i18n,
  rewrites() {
    // встроенные в next редиректы
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:3000/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
