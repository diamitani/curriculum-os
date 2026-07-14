/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => [
    {
      source: "/api/backend/:path*",
      destination: "http://localhost:8000/api/v1/:path*",
    },
  ],
};

module.exports = nextConfig;
