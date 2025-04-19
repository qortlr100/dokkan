/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['localhost', 'dokkan.cid.wiki'],
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  // resources 디렉토리를 정적 파일로 제공
  async rewrites() {
    return [
      {
        source: '/resources/:path*',
        destination: '/app/resources/:path*',
      },
    ];
  },
}

module.exports = nextConfig 