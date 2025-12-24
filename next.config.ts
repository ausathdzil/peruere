import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    inlineCss: true,
    typedEnv: true,
  },
  reactCompiler: true,
  typedRoutes: true,
};

export default nextConfig;
