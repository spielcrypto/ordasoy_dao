/** @type {import('next').NextConfig} */
const isGithubPages = process.env.GITHUB_PAGES === 'true';
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] || 'ordasoy-dao';
// If repo name ends with .github.io, it's served from root, otherwise from /repo-name
const isRootRepo = repoName.endsWith('.github.io');
const basePath = isGithubPages && !isRootRepo ? `/${repoName}` : '';

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
};

module.exports = nextConfig;

