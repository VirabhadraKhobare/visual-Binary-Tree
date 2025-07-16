import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // basePath: '/sittraining/day32-10-Jul-Thu/visBTree/out',
  // assetPrefix: '/sittraining/day32-10-Jul-Thu/visBTree/out/',
};

export default nextConfig;