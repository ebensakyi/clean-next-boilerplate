import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/dg4jhba5c/image/upload/v1741605150/abstract-bg_wq4f8w.jpg',
      },
    ],
  },
};

export default nextConfig;
