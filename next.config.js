/** @type {import('next').NextConfig} */
// const { proxy } = require("next-http-proxy-middleware");
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/:path*',
                destination: `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_API_URL_ADDRESS}/:path*`,
            }
        ]
    },
    // exportPathMap: async function (
    //   defaultPathMap,
    //   { dev, dir, outDir, distDir, buildId }
    // ) {
    //   return {
    //     "/": { page: "/" },
    //     // "/api/:path": { page: "/api/[...path]" },
    //     "/testing": {
    //       page: "/testing",
    //     },
    //     "/auth/login": {
    //       page: "/auth/login",
    //     },
    //     "/auth/register": {
    //       page: "/auth/register",
    //     },
    //     "/trade": {
    //       page: "/trade",
    //     },
    //     "/trade/verification": {
    //       page: "/trade/verification",
    //     },
    //     "/wallet": {
    //       page: "/wallet",
    //     },
    //     "/wallet/deposit": {
    //       page: "/wallet/deposit",
    //     },
    //     "/wallet/withdraw": {
    //       page: "/wallet/withdraw",
    //     },
    //   };
    // },
    // trailingSlash: true,
    reactStrictMode: false,
    // images: {
    //   unoptimized: true,
    // },
    // output: "standalone",

    // i18n: {
    //   locales: ["en", "id"],
    //   defaultLocale: "en",
    //   localeDetection: false,
    // },
    // output: "standalone",
}

module.exports = nextConfig
