const env = process.env.ENV;
let destination;

if (env === "dev") {
    destination = process.env.DEV_DESTINATION;
} else if (env === "dev2") {
    destination = process.env.DEV2_DESTINATION;
} else {
    destination = process.env.PROD_DESTINATION;
}

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    async rewrites() {
        return [
            {
                source: "/api/:path*",
                destination: destination,
            },
        ];
    },
};

export default nextConfig;