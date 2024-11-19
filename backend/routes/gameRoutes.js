// src/routes/gameRoutes.js
import express from 'express';
import { getGames, getTournamentsByGame, createGame, updateGame, deleteGame } from '../controllers/gameController.js';


const router = express.Router();

router.get('/', getGames); // Lista de juegos
router.get('/:gameName/tournaments', getTournamentsByGame); // Torneos por juego
router.post('/', createGame); // Crear un juego
router.put('/:id', updateGame); // Actualizar un juego
router.delete('/:id', deleteGame); // Eliminar un juego

export default router;