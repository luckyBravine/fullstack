/** @type {import('next').NextConfig} */
const nextConfig = {
        images: {
          remotePatterns: [
            {
              protocol: 'https',
              hostname: 'http://localhost:3000/profile',
              port: '',
              pathname: '../../../public/**',
            },
          ],
        },
}

module.exports = nextConfig
