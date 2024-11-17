// src/app/axiosInstance.ts
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Asegúrate de configurar esta variable de entorno
  timeout: 10000,
});

export default axiosInstance;
