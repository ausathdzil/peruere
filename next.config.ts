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
          source: '/@:username/articles/:publicId',
          destination: '/u/:username/articles/:publicId',
        },
        {
          source: '/@:username',
          destination: '/u/:username',
        },
      ],
    };
  },
};

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default withBundleAnalyzer(nextConfig);
