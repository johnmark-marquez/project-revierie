import type { NextConfig } from "next";

/**
 * GitHub Pages project site URL:
 * https://johnmark-marquez.github.io/project-reverie/
 *
 * Set GITHUB_PAGES=true when building for deployment so basePath and
 * asset URLs resolve correctly on Pages. Local dev omits basePath.
 */
const repo = "project-reverie";
const isGithubPages = process.env.GITHUB_PAGES === "true";
const basePath = isGithubPages ? `/${repo}` : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
