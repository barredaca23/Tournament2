const { Pool } = require('pg');
require('dotenv').config();  // Para acceder a las variables de entorno

// Crear una instancia de Pool para conectar con PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,  // Asumiendo que tienes la variable de entorno DATABASE_URL en tu .env
  ssl: {
    rejectUnauthorized: false  // Requiere esto si usas conexiones SSL, como en Neon
  }
});

module.exports = pool;