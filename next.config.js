/** @type {import("next").NextConfig} */
module.exports = {
    reactStrictMode: true,
    experimental: {
        serverActions: true,
        appDir: true,
    },
    webpack: (config) => {
        config.module.rules.push({
            test: /\.svg$/i,
            use: ['@svgr/webpack'],
        });
        return config;
    },
};