const env = process.env.ENV;

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    async rewrites() {
        return [
            {
                source: "/api/:path*",
                destination:
                    env === "dev"
                        ? process.env.DEV_DESTINATION
                        : env === "prod" && process.env.PROD_DESTINATION,
            },
        ];
    },
};

export default nextConfig;
