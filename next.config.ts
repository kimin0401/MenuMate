import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'www.foodsafetykorea.go.kr',
        port: '',
        pathname: '/uploadimg/**',
      },
      {
        protocol: 'https',
        hostname: 'www.foodsafetykorea.go.kr',
        port: '',
        pathname: '/uploadimg/**',
      },
      {
        protocol: 'http',
        hostname: 'www.foodsafetykorea.go.kr',
        port: '',
        pathname: '/common/**',
      },
      {
        protocol: 'https',
        hostname: 'www.foodsafetykorea.go.kr',
        port: '',
        pathname: '/common/**',
      },
    ],
  },
};

export default nextConfig;
