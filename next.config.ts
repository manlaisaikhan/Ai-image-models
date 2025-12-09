import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_MY_TOKEN: process.env.NEXT_PUBLIC_MY_TOKEN || "",
    NEXT_PUBLIC_MY_GEMINI_TOKEN: process.env.NEXT_PUBLIC_MY_GEMINI_TOKEN || "",
  },
  /* config options here */
  reactCompiler: true,
};

export default nextConfig;
