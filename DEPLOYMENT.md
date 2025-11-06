# Deployment Guide

This guide explains how to build and deploy the Ordasoy DAO application for different environments.

## Build Configurations

The application supports two deployment scenarios:

### 1. Custom Domain (Root Deployment)
For deployments on custom domains like `ordasoy.spielcrypto.com`:

```bash
# Build without GITHUB_PAGES environment variable
pnpm build
# or
npm run build
```

This will:
- Set `basePath` to empty string (`""`)
- Generate paths like `/_next/static/...` and `/assets/...`
- Work correctly on custom domains served from root

### 2. GitHub Pages (Subdirectory Deployment)
For deployments on GitHub Pages with subdirectory like `username.github.io/repo-name`:

```bash
# Build with GITHUB_PAGES environment variable
GITHUB_PAGES=true GITHUB_REPOSITORY="username/ordasoy-dao" pnpm build
# or
GITHUB_PAGES=true GITHUB_REPOSITORY="username/ordasoy-dao" npm run build
```

This will:
- Set `basePath` to `"/ordasoy-dao"` (or the repo name)
- Generate paths like `/ordasoy-dao/_next/static/...` and `/ordasoy-dao/assets/...`
- Work correctly on GitHub Pages subdirectory deployments

## Automatic Detection

The application includes automatic `basePath` detection at runtime using the `getAssetPath()` function. This function:

1. Detects the `basePath` from Next.js script tags in the HTML
2. Works regardless of build configuration
3. Ensures assets load correctly in both deployment scenarios

However, for optimal performance, it's recommended to build with the correct configuration for your deployment target.

## Deployment Steps

### For Custom Domain

1. Build the application:
   ```bash
   pnpm build
   ```

2. Deploy the `out/` directory to your web server
   - The `out/` directory contains all static files
   - Serve from the root of your domain

3. Ensure your web server is configured to:
   - Serve `index.html` for all routes (SPA routing)
   - Set proper cache headers for static assets

### For GitHub Pages

1. Build the application:
   ```bash
   GITHUB_PAGES=true GITHUB_REPOSITORY="username/ordasoy-dao" pnpm build
   ```

2. Deploy using GitHub Actions (see `.github/workflows/deploy.yml`)
   - The workflow automatically sets the correct environment variables
   - Or manually push the `out/` directory to the `gh-pages` branch

## Troubleshooting

### Images or JavaScript not loading

If images or JavaScript files are not loading:

1. **Check the build configuration**: Ensure you built with the correct environment variables for your deployment target

2. **Verify the HTML**: Check the generated HTML in `out/index.html`:
   - For custom domain: Scripts should be `/_next/static/...`
   - For GitHub Pages: Scripts should be `/repo-name/_next/static/...`

3. **Check browser console**: Look for 404 errors on asset files

4. **Rebuild**: If the build was made with incorrect settings, rebuild with the correct configuration:
   ```bash
   # For custom domain
   pnpm build
   
   # For GitHub Pages
   GITHUB_PAGES=true GITHUB_REPOSITORY="username/ordasoy-dao" pnpm build
   ```

### Runtime Detection

The `getAssetPath()` function automatically detects the `basePath` at runtime, so even if the build was made with incorrect settings, it should still work. However, for best performance and to avoid any issues, always build with the correct configuration for your deployment target.
