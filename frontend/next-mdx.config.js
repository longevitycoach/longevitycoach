/* eslint-disable @typescript-eslint/no-var-requires */
const withMDX = require('@next/mdx')({
  extension: /\\.mdx?$/,
  options: {
    // If you use remark-gfm, you'll need to use next.config.mjs
    // as the package is ESM only
    // https://github.com/remarkjs/remark-gfm#install
    remarkPlugins: [],
    rehypePlugins: [],
    // If you use `MDXProvider`, uncomment the following line.
    // providerImportSource: "@mdx-js/react",
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure pageExtensions to include md and mdx
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  // Optionally, add any other Next.js config below
  reactStrictMode: true,
  // Enable static export
  output: 'export',
  // Base path for GitHub Pages
  basePath: process.env.NODE_ENV === 'production' ? '/longevitycoach' : '',
  // Asset prefix for static assets
  assetPrefix: process.env.NODE_ENV === 'production' ? '/longevitycoach/' : '',
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
};

// Merge MDX config with Next.js config
module.exports = withMDX(nextConfig);
