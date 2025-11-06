# Deployment Guide - GitHub Pages

This guide explains how to deploy the Ordasoy DAO Next.js application to GitHub Pages.

## Prerequisites

1. A GitHub repository
2. GitHub Pages enabled in repository settings
3. The repository must be public (or you need GitHub Pro/Team for private repos)

## Setup Instructions

### 1. Enable GitHub Pages

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. Save the settings

### 2. Configure Base Path (if needed)

If your repository is **not** at the root (e.g., `username.github.io/repo-name`), you need to configure the base path:

1. Open `next.config.js`
2. Uncomment and set the `basePath` and `assetPrefix`:
   ```javascript
   basePath: '/repo-name',
   assetPrefix: '/repo-name',
   ```
   Replace `repo-name` with your actual repository name.

### 3. Push to Main Branch

The workflow will automatically trigger when you push to the `main` or `master` branch:

```bash
git add .
git commit -m "Setup GitHub Pages deployment"
git push origin main
```

### 4. Monitor Deployment

1. Go to the **Actions** tab in your GitHub repository
2. You should see the "Deploy to GitHub Pages" workflow running
3. Once complete, your site will be available at:
   - `https://username.github.io/repo-name` (if not root)
   - `https://username.github.io` (if repository is `username.github.io`)

## Workflow Details

The GitHub Actions workflow (`.github/workflows/deploy.yml`) does the following:

1. **Checkout** the repository code
2. **Setup Node.js** and pnpm
3. **Install dependencies** using pnpm
4. **Run linter** (non-blocking)
5. **Build** the Next.js application as a static site
6. **Deploy** to GitHub Pages

## Manual Deployment

You can also trigger the workflow manually:

1. Go to **Actions** tab
2. Select **Deploy to GitHub Pages** workflow
3. Click **Run workflow**
4. Select the branch and click **Run workflow**

## Troubleshooting

### Build Fails

- Check the Actions logs for specific errors
- Ensure all dependencies are properly listed in `package.json`
- Verify that `next.config.js` has `output: 'export'` set

### 404 Errors

- If your repo is not at the root, make sure `basePath` is configured correctly
- Clear browser cache and try again
- Check that the build completed successfully

### Images Not Loading

- Ensure `images.unoptimized: true` is set in `next.config.js`
- Verify image paths are correct
- Check that images are in the `public` folder

## Local Testing

To test the static export locally before deploying:

```bash
pnpm build
npx serve out
```

Then visit `http://localhost:3000` (or the port shown by serve).

## Notes

- The site is built as a static export, so server-side features won't work
- API routes are not supported in static exports
- Dynamic routes need to be pre-rendered at build time

