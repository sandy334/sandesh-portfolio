/**
 * Sub-path the site is served from (e.g. "/sandesh-portfolio" on GitHub Pages).
 * next/image and plain <a href> don't add it to string paths, so asset paths go through withBase.
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export const withBase = (path: string) => (path.startsWith('/') ? `${basePath}${path}` : path);
