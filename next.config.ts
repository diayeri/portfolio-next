import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const withMDX = createMDX({
  extension: /\.mdx?$/,
});

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  pageExtensions: ["ts", "tsx", "mdx"],
  env: {
    NEXT_PUBLIC_BUILD_DATE: new Date().toISOString(),
  },
};

export default withMDX(nextConfig);
