import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Get the correct asset path for GitHub Pages
 * Handles basePath automatically for static exports
 *
 * This function detects the basePath from the script src or current URL,
 * ensuring it works in all deployment scenarios
 */
export function getAssetPath(path: string): string {
  // Remove leading slash if present
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;

  let basePath = "";

  // Try to get basePath from environment variable first (set at build time)
  if (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_BASE_PATH) {
    basePath = process.env.NEXT_PUBLIC_BASE_PATH;
  } else if (typeof window !== "undefined") {
    // Client-side: detect basePath from script tags or current URL
    // Method 1: Try to get from script src (most reliable for Next.js)
    const scripts = document.getElementsByTagName("script");
    for (let i = 0; i < scripts.length; i++) {
      const src = scripts[i].src;
      if (src && src.includes("/_next/static/")) {
        // Extract basePath from script src
        // Script src can be:
        // - Absolute: https://domain.com/repo-name/_next/static/...
        // - Relative: /repo-name/_next/static/... or /_next/static/...
        let scriptPath = src;
        // If absolute URL, extract pathname
        try {
          const url = new URL(src);
          scriptPath = url.pathname;
        } catch {
          // If relative URL, use as is
          scriptPath = src.startsWith("/") ? src : `/${src}`;
        }

        // Extract basePath: everything before /_next/static/
        const nextStaticIndex = scriptPath.indexOf("/_next/static/");
        if (nextStaticIndex > 0) {
          basePath = scriptPath.substring(0, nextStaticIndex);
          break;
        } else if (nextStaticIndex === 0) {
          // No basePath, we're at root
          basePath = "";
          break;
        }
      }
    }

    // Method 2: Fallback to detecting from current URL
    if (!basePath) {
      const pathname = window.location.pathname;
      const segments = pathname.split("/").filter(Boolean);
      // For GitHub Pages, if we have a first segment and it's not a known route,
      // it's likely the basePath (repo name)
      if (segments.length > 0) {
        // Check if first segment looks like a repo name (not a page route)
        // This is a heuristic, but works for most GitHub Pages deployments
        const firstSegment = segments[0];
        // If we're not at root and first segment exists, use it as basePath
        if (
          firstSegment &&
          pathname !== "/" &&
          pathname !== `/${firstSegment}`
        ) {
          basePath = `/${firstSegment}`;
        } else if (firstSegment && pathname === `/${firstSegment}`) {
          // We're at /repo-name/, so repo-name is the basePath
          basePath = `/${firstSegment}`;
        }
      }
    }
  }

  // Return path with basePath prefix
  // If basePath is empty (root deployment), return path with leading slash
  // If basePath exists (subdirectory deployment like /repo-name), prepend it
  return basePath ? `${basePath}/${cleanPath}` : `/${cleanPath}`;
}
