/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["robohash.org"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rickandmortyapi.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "reqres.in",
        port: "",
      },
      {
        protocol: "https",
        hostname: "627ec72cb75a25d3f3bd0acb.mockapi.io",
        port: "",
      },
      {
        protocol: "https",
        hostname: "cloudflare-ipfs.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "en.gravatar.com",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
