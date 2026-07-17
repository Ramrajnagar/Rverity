/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
            },
        ],
    },
    typescript: {
        ignoreBuildErrors: true,
    },
}

module.exports = nextConfig
