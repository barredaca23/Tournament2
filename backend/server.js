const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { Pool } = require('pg');

// Cargar variables de entorno
dotenv.config();

// Crear una instancia de Express
const app = express();

// Middleware
app.use(express.json());  // Para manejar el cuerpo de las solicitudes como JSON
app.use(cors());  // Para permitir CORS

// Conectar con la base de datos en Neon
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false  // Esto es necesario cuando usas SSL (como en Neon)
  }
});

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('¡Servidor corriendo!');
});

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
