/** @type {import('next').NextConfig} */
// Determine basePath based on deployment environment
// - GitHub Pages with subdirectory: use repo name as basePath
// - GitHub Pages with custom domain: no basePath (served from root)
// - GitHub Pages root repo (.github.io): no basePath (served from root)
// - Custom domain (non-GitHub Pages): no basePath (served from root)
const isGithubPages = process.env.GITHUB_PAGES === 'true';
const hasCustomDomain = process.env.CUSTOM_DOMAIN === 'true';
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] || 'ordasoy-dao';
// If repo name ends with .github.io, it's served from root
const isRootRepo = repoName.endsWith('.github.io');
// Set basePath only if:
// 1. It's GitHub Pages (GITHUB_PAGES=true)
// 2. It's NOT a root repo (.github.io)
// 3. It does NOT have a custom domain (custom domains are served from root)
const basePath = isGithubPages && !isRootRepo && !hasCustomDomain ? `/${repoName}` : '';

const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: basePath,
  assetPrefix: basePath || undefined,
  images: {
    domains: [],
    unoptimized: true
  },
  trailingSlash: true,
  env: {
    // Set basePath in environment for client-side access
    // This will be empty string for custom domains
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

module.exports = nextConfig;

