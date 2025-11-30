import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    authInterrupts: true,
    turbopackFileSystemCacheForDev: true,
  },
  reactCompiler: true,
  typedRoutes: true,
};

export default nextConfig;
