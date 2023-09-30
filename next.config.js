/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    dirs: ["app", "ui", "lib"],
  },
};

const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
});

// module.exports = withPWA(nextConfig);
module.exports = nextConfig;
