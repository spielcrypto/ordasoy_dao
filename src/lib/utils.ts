import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Get the correct asset path for static exports
 * Handles basePath automatically for different deployment scenarios:
 * - GitHub Pages with subdirectory: /repo-name/assets/...
 * - Custom domain (root): /assets/...
 *
 * This function detects the basePath from Next.js script tags in real-time,
 * which ensures it works correctly regardless of how the build was configured.
 */
export function getAssetPath(path: string): string {
  // Remove leading slash if present
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;

  let basePath = "";

  if (typeof window !== "undefined") {
    // Client-side: detect basePath from Next.js script tags (most reliable)
    // Next.js always includes scripts with /_next/static/ in the path
    // This detection works at runtime, so it's independent of build configuration
    const scripts = document.getElementsByTagName("script");

    for (let i = 0; i < scripts.length; i++) {
      const src = scripts[i].src;
      if (src && src.includes("/_next/static/")) {
        try {
          // Parse the script URL to get the pathname
          // Use window.location.origin as base for relative URLs
          const url = new URL(src, window.location.origin);
          const pathname = url.pathname;

          // Find the position of /_next/static/ in the pathname
          const nextStaticIndex = pathname.indexOf("/_next/static/");

          if (nextStaticIndex > 0) {
            // Extract everything before /_next/static/ as the basePath
            // Example: /repo-name/_next/static/... -> basePath = "/repo-name"
            basePath = pathname.substring(0, nextStaticIndex);
            break;
          } else if (nextStaticIndex === 0) {
            // Script is at /_next/static/... (root deployment, no basePath)
            // Example: /_next/static/... -> basePath = ""
            basePath = "";
            break;
          }
        } catch (e) {
          // If URL parsing fails (shouldn't happen, but handle gracefully),
          // try relative path detection
          if (src.startsWith("/")) {
            const nextStaticIndex = src.indexOf("/_next/static/");
            if (nextStaticIndex > 0) {
              basePath = src.substring(0, nextStaticIndex);
              break;
            } else if (nextStaticIndex === 0) {
              basePath = "";
              break;
            }
          }
        }
      }
    }

    // Ensure basePath is always a string (never undefined or null)
    // Default to empty string for root deployments (custom domains)
    if (basePath === undefined || basePath === null) {
      basePath = "";
    }
  } else {
    // Server-side: use environment variable if available
    // For static exports, this is only used during build/SSR
    basePath =
      (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_BASE_PATH) ||
      "";
  }

  // Return path with basePath prefix
  // If basePath is empty (root deployment like custom domain), return /assets/...
  // If basePath exists (subdirectory like GitHub Pages), return /repo-name/assets/...
  return basePath ? `${basePath}/${cleanPath}` : `/${cleanPath}`;
}
