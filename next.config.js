/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "5000",
        pathname: "/user/*",
      },
      {
        protocol: "http",
        hostname: "192.168.1.22",
        port: "5000",
        pathname: "/user/*",
      },
    ],
  },
};

module.exports = nextConfig;
