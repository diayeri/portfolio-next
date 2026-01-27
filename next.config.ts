import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  env: {
    NEXT_PUBLIC_BUILD_DATE: new Date().toISOString(),
  },
};

export default nextConfig;
