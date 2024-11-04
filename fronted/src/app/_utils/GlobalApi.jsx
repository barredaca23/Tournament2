const axios = require("axios");

const API_KEY = process.env.NEXT_PUBLIC_STRAPI_API_KEY;

const axiosClient = axios.create({
  baseURL: 'http://localhost:1337/api',
  headers: {
    'Authorization': `Bearer ${API_KEY}`
  }
});

const getSliders = async () => {
    try {
      const response = await axiosClient.get('/sliders?populate=*');
      console.log("Datos de sliders:", response.data.data); // Aquí ves los datos devueltos por la API
      return response.data.data;
    } catch (error) {
      console.error("Error fetching sliders:", error);
      return [];
    }
  };
  const getCategories = () => axiosClient.get('/games?populate=*').then(resp => resp.data.data);

  const getAllTorneos= () => axiosClient.get('/torneos?populate=*').then(resp => resp.data.data);
 
  const getTorneosByCategory = (category) => axiosClient.get(`/torneos?filters[games][Name_Game][$eq]=${category}&populate=*`)
  .then(resp => {
   return resp.data.data});
  

export default {
  getSliders,
  getCategories,
  getTorneosByCategory,
  getAllTorneos
};
