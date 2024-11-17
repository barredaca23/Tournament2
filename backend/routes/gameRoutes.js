// src/routes/gameRoutes.js
import express from 'express';
import { getGames, getTournamentsByGame } from '../controllers/gameController.js';

const router = express.Router();

router.get('/', getGames); // Lista de juegos
router.get('/:gameName/tournaments', getTournamentsByGame); // Torneos por juego

export default router;