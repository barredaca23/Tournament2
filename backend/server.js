import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import tournamentRoutes from './routes/tournamentRoutes.js';
import gameRoutes from './routes/gameRoutes.js';
import usersRoutes from './routes/users.routes.js';
import uploadRoutes from './routes/uploadRoutes.js'; // Importa las rutas de subida de imágenes

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

// Rutas
app.use('/api/games', gameRoutes);
app.use('/api/tournaments', tournamentRoutes);
app.use('/api/users', usersRoutes);
app.use('/api', uploadRoutes); // Registra las rutas de subida de imágenes

app.get('/', (req, res) => {
  res.send('¡Servidor funcionando correctamente!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
