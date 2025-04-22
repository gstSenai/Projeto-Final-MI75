/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://localhost:9090/:path*'
            }
        ]
    },
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '9090',
                pathname: '/imagens/**',
            },
        ],
        domains: ['localhost'],
    },
}

module.exports = nextConfig 