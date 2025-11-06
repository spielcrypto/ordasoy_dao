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
 * This function detects the basePath from loaded script tags.
 * Defaults to root (no basePath) for custom domains.
 */
export function getAssetPath(path: string): string {
  // Remove leading slash if present
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;

  // Default to empty basePath (root deployment - custom domain)
  // Only add basePath if we detect one from the page
  let basePath = "";

  if (typeof window !== "undefined") {
    // Cache the detected basePath to avoid recalculating
    const cacheKey = "__ordasoy_basePath__";
    const cached = (window as any)[cacheKey];

    if (cached !== undefined) {
      basePath = cached;
    } else {
      // Detect basePath from script tags that are already in the DOM
      // Look for scripts with /_next/static/ in their src
      const scripts = document.querySelectorAll(
        'script[src*="/_next/static/"]'
      );

      for (let i = 0; i < scripts.length; i++) {
        const script = scripts[i] as HTMLScriptElement;
        const src = script.src || script.getAttribute("src");

        if (src) {
          try {
            // Parse the URL to get the pathname
            let url: URL;
            if (src.startsWith("http://") || src.startsWith("https://")) {
              url = new URL(src);
            } else if (src.startsWith("//")) {
              url = new URL(
                src,
                window.location.protocol + "//" + window.location.host
              );
            } else if (src.startsWith("/")) {
              url = new URL(src, window.location.origin);
            } else {
              // Relative URL
              url = new URL(src, window.location.href);
            }

            const pathname = url.pathname;
            const nextStaticIndex = pathname.indexOf("/_next/static/");

            if (nextStaticIndex > 0) {
              // Found a basePath: everything before /_next/static/
              basePath = pathname.substring(0, nextStaticIndex);
              break;
            } else if (nextStaticIndex === 0) {
              // No basePath, we're at root
              basePath = "";
              break;
            }
          } catch (e) {
            // If parsing fails, try simple string search
            const nextStaticIndex = src.indexOf("/_next/static/");
            if (nextStaticIndex === 0) {
              basePath = "";
              break;
            } else if (nextStaticIndex > 0) {
              // Extract basePath from string
              const beforeNext = src.substring(0, nextStaticIndex);
              // Remove protocol and domain if present
              const pathMatch = beforeNext.match(/\/([^/]+)$/);
              if (pathMatch) {
                basePath = pathMatch[0];
                break;
              }
            }
          }
        }
      }

      // Cache the result
      (window as any)[cacheKey] = basePath;
    }
  } else {
    // Server-side: use environment variable
    basePath =
      (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_BASE_PATH) ||
      "";
  }

  // Return path with basePath prefix
  return basePath ? `${basePath}/${cleanPath}` : `/${cleanPath}`;
}
