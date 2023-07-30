const { withContentlayer } = require("next-contentlayer");

const cachedPaths = [
  "/",
  "/pricing",
  "/metatags",
  "/blog",
  "/blog/:path*",
  "/help",
  "/help/:path*",
  "/changelog",
  "/changelog/:path*",
  "/privacy",
  "/terms",
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    useDeploymentId: true,
    serverActions: true,
    useDeploymentIdServerActions: true,
  },
  images: {
    domains: [
      "www.google.com",
      "avatar.vercel.sh",
      "faisalman.github.io",
      "avatars.dicebear.com",
      "res.cloudinary.com",
      "pbs.twimg.com",
      "d2vwwcvoksz7ty.cloudfront.net",
      "lh3.googleusercontent.com",
      "media.cleanshot.cloud", // only for staging purposes
    ],
  },
  async headers() {
    return [
      ...cachedPaths.map((path) => ({
        source: path,
        has: [
          {
            type: "host",
            value: "dub-git-caching-headers-elegance.vercel.app",
          },
        ],
        headers: [
          {
            key: "cdn-cache-control",
            value: "max-age=300",
          },
        ],
      })),
      {
        source: "/:path*",
        headers: [
          {
            key: "Referrer-Policy",
            value: "no-referrer-when-downgrade",
          },
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
        ],
      },
    ];
  },
};

module.exports = withContentlayer(nextConfig);
