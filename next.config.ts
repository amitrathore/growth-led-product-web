import type { NextConfig } from "next";

// Set NEXT_PUBLIC_BASE_PATH='' (empty) when using a custom domain or root Pages site.
// Defaults to /growth-led-product-web for a standard project page.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/growth-led-product-web";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: basePath,
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
