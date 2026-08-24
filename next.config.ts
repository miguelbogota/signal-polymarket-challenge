import type { NextConfig } from "next";
import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";

/** Integrates Vanilla Extract with the Next.js compiler. */
const withVanillaExtract = createVanillaExtractPlugin({
  unstable_turbopack: { mode: "auto" },
});

/** Defines the application build configuration and enables React development safeguards. */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  logging: {
    browserToTerminal: true,
  },
};

export default withVanillaExtract(nextConfig);
