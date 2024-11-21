import express from 'express';
import { getTournaments, getTournamentById, createTournament, updateTournament, deleteTournament, getTournamentCount } from '../controllers/tournamentController.js';

const router = express.Router();

// Obtener todos los torneos (opcionalmente con filtros)
router.get('/', getTournaments);

// Obtener el conteo de torneos
router.get('/count', getTournamentCount);  // Esta es la ruta para el conteo de torneos

// Crear un nuevo torneo
router.post('/', createTournament);

// Actualizar un torneo existente
router.put('/:id', updateTournament);

// Eliminar un torneo por ID
router.delete('/:id', deleteTournament);

// Obtener un torneo específico por ID
router.get('/:id', getTournamentById);

export default router;
