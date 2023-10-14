/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ["app", "hooks", "lib", "ui", "utils"],
  },
  // https://github.com/WalletConnect/walletconnect-monorepo/issues/1908
  webpack: (config, context) => {
    if (config.plugins) {
      config.plugins.push(
        new context.webpack.IgnorePlugin({
          resourceRegExp: /^(lokijs|pino-pretty|encoding)$/,
        })
      );
    }
    return config;
  },
};

module.exports = nextConfig;
