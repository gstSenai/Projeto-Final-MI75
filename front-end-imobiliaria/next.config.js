/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '9090',
                pathname: '/imagens/**',
            },
        ],
    },
}

module.exports = nextConfig 