import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['res.cloudinary.com'], // Agrega esta línea para permitir imágenes desde Cloudinary
  },
};

export default nextConfig;
