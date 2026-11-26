/** @type {import('next').NextConfig} */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig = {
  output: "export", // static site, ready for GitHub Pages
  basePath,
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
