import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**', // Asegúrate de que la ruta permita cualquier imagen dentro de tu dominio
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:5000', // Cambia "http://localhost:5000" por la URL de tu backend si está en otro lugar
      },
    ];
  },
};

export default nextConfig;


