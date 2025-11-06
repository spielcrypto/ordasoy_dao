/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    domains: [],
    unoptimized: true
  },
  // Uncomment and set if your repo is not at the root (e.g., username.github.io/repo-name)
  // basePath: '/repo-name',
  // assetPrefix: '/repo-name',
};

module.exports = nextConfig;

