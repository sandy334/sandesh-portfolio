import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Security headers. The site positions its author around technical SEO,
 * so it should pass the same checks it recommends to clients.
 */
const securityHeaders = [
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
];

// GITHUB_PAGES=true builds a static export into out/, served from NEXT_PUBLIC_BASE_PATH.
const isPages = process.env.GITHUB_PAGES === 'true';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: isPages ? { unoptimized: true } : { formats: ['image/avif', 'image/webp'] },
  experimental: {
    // This project lives inside another repository; pin tracing to this folder
    // so Next does not pick up the parent lockfile.
    outputFileTracingRoot: __dirname,
  },
  ...(isPages
    ? { output: 'export', basePath, trailingSlash: true }
    : {
        async headers() {
          return [{ source: '/(.*)', headers: securityHeaders }];
        },
      }),
};

export default nextConfig;
