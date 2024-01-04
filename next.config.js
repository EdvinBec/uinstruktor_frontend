/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "5000",
        pathname: "/class/**/*",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "5000",
        pathname: "/user/*",
      },
      {
        protocol: "http",
        hostname: "172.26.140.9",
        port: "5000",
        pathname: "/user/*",
      },
      {
        protocol: "http",
        hostname: "172.26.140.9",
        port: "5000",
        pathname: "/class/**/*",
      },
    ],
  },
};

module.exports = nextConfig;
