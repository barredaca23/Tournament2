import axios from 'axios';

// Crea una instancia de axios con configuración global
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000',  // Aquí va tu URL base de la API
  headers: {
    'Content-Type': 'application/json', // Puedes agregar otros encabezados globales si es necesario
  },
});

// Si necesitas agregar interceptores para manejar peticiones y respuestas
axiosInstance.interceptors.request.use(
  (config) => {
    // Aquí puedes agregar un token de autorización o manejar otras configuraciones
    const token = localStorage.getItem('token'); // O de donde sea que almacenes el token
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Agregar token en cada solicitud
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    // Aquí puedes manejar la respuesta de la API
    return response;
  },
  (error) => {
    // Aquí puedes manejar los errores globales, como redirecciones en caso de token expirado, etc.
    if (error.response && error.response.status === 401) {
      // Redirigir al login si el token expiró
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
