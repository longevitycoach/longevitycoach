// @ts-check
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

// Check if we're building for GitHub Pages
const isGithubPages = process.env.NODE_ENV === 'production';
// Update this to match your repository name
const repoName = 'longevitycoach';
const basePath = isGithubPages ? `/${repoName}` : '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure pageExtensions to include md and mdx
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],

  // Base path for GitHub Pages
  basePath: basePath,
  // Asset prefix for static assets
  assetPrefix: basePath,

  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },

  // Enable static export — next build handles export when output: 'export' is set
  output: 'export',

  // Output static files directly to docs/ in repo root
  distDir: '../docs',

  // Enable React Strict Mode
  reactStrictMode: true,

  // Enable SWC minification
  swcMinify: true,

  // Webpack configuration
  webpack: (config, { isServer: _isServer }) => {
    // Add path aliases to webpack
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src'),
    };

    // Important: return the modified config
    return config;
  },
};

// Webpack configuration for handling MDX files
nextConfig.webpack = (config, { isServer: _isServer }) => {
  // Handle MDX files
  config.module.rules.push({
    test: /\.mdx?$/,
    use: [
      {
        loader: '@mdx-js/loader',
        options: {
          // Add any MDX options here
        },
      },
    ],
  });

  return config;
};

// Log the configuration for debugging (development only)
if (process.env.NODE_ENV !== 'production') {
  console.log('Next.js Config:', {
    basePath: nextConfig.basePath,
    assetPrefix: nextConfig.assetPrefix,
    output: nextConfig.output,
    images: nextConfig.images,
    env: process.env.NODE_ENV,
  });
}

module.exports = nextConfig;
