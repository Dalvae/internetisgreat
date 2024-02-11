/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },

      {
        protocol: "https",
        hostname: "ik.imagekit.io/tapto",
      },
    ],
  },
};

export default nextConfig;
