import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'www.foodsafetykorea.go.kr',
        port: '',
        pathname: '/uploadimg/**',
      },
    ],
  },
};

export default nextConfig;
