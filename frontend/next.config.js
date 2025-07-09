/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        // разрешаем ВСЕ пути внутри Cloudinary
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'real-estate-agency-pcuk.onrender.com',
        port: '',
        pathname: '/uploads/**',
      },
    ],
    // Отключаем оптимизацию для внешних изображений (опционально)
    unoptimized: process.env.NODE_ENV === 'production',
  },
  // Включаем поддержку SVG как компонентов
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    });
    return config;
  },
}