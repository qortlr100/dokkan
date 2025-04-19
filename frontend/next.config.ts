import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    domains: ['localhost', 'dokkan.cid.wiki'],
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  // 백엔드 리소스 요청을 위한 rewrites 설정
  async rewrites() {
    return [
      {
        source: '/resources/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL}/resources/:path*`,
      },
    ];
  },
};

export default nextConfig;
