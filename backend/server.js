const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const tournamentRoutes = require('./routes/tournamentRoutes'); // Rutas de torneos
const adminTournamentRoutes = require('./routes/adminTournamentRoutes'); // Rutas de administración de torneos

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads')); // Servir archivos estáticos (imágenes)

// Rutas
app.use('/api/tournaments', tournamentRoutes); // Rutas de torneos
app.use('/api/admin/tournaments', adminTournamentRoutes); // Rutas de administración de torneos

// Ruta base
app.get('/', (req, res) => {
  res.send('¡Servidor funcionando correctamente!');
});

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});