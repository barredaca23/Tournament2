import express from 'express';
import { getGames, getTournamentsByGame, getGameById, createGame, updateGame, deleteGame, getGameCount } from '../controllers/gameController.js';

const router = express.Router();

// Obtener todos los juegos
router.get('/', getGames); 

// Obtener el conteo de juegos
router.get('/count', getGameCount);

// Obtener un juego por ID
router.get('/:id', getGameById); 

// Obtener los torneos por juego
router.get('/:gameName/tournaments', getTournamentsByGame); 

// Crear un juego
router.post('/', createGame); 

// Actualizar un juego por ID
router.put('/:id', updateGame); 

// Eliminar un juego por ID
router.delete('/:id', deleteGame); 

 

export default router;
