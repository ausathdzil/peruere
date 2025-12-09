import bundleAnalyzer from '@next/bundle-analyzer';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    authInterrupts: true,
    inlineCss: true,
    turbopackFileSystemCacheForDev: true,
  },
  reactCompiler: true,
  typedRoutes: true,

  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/@:handle/articles/:publicId',
          destination: '/u/:handle/articles/:publicId',
        },
        {
          source: '/@:handle',
          destination: '/u/:handle',
        },
      ],
    };
  },
};

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default withBundleAnalyzer(nextConfig);
