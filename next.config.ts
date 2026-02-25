import type { NextConfig } from "next";

// Suppress Recharts warnings during build
if (typeof window === 'undefined') {
  const originalWarn = console.warn;
  console.warn = (...args: any[]) => {
    const msg = args[0]?.toString() || '';
    if (msg.includes('width') && msg.includes('height') && msg.includes('chart')) {
      return;
    }
    originalWarn(...args);
  };
}

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
