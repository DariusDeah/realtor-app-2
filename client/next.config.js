/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "cdn-icons.flaticon.com",
      "photos.zillowstatic.com",
      "images.unsplash.com",
    ],
  },
};

module.exports = nextConfig;
