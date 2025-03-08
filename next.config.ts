import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '127.0.0.1',
        pathname: '**',
      },
    ],  
  },

  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
};

export default nextConfig;