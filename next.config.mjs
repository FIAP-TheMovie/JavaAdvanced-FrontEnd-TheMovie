/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'avatar.iran.liara.run',
                port: '',
                pathname: '/**', // Ajuste se necessário
            },
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '8080',
                pathname: '/movies/photo/**', // Permite qualquer arquivo nessa pasta
            },
        ],
    },
};

export default nextConfig;