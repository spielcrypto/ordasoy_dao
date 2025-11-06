/** @type {import('next').NextConfig} */
// Determine basePath based on deployment environment
// - GitHub Pages with subdirectory: use repo name as basePath
// - Custom domain or GitHub Pages root: no basePath (empty string)
const isGithubPages = process.env.GITHUB_PAGES === 'true';
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] || 'ordasoy-dao';
// If repo name ends with .github.io, it's served from root, otherwise from /repo-name
const isRootRepo = repoName.endsWith('.github.io');
// Only set basePath for GitHub Pages non-root repos
// For custom domains, GITHUB_PAGES won't be 'true', so basePath will be empty
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
  env: {
    // Set basePath in environment for client-side access
    // This will be empty string for custom domains
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

module.exports = nextConfig;

