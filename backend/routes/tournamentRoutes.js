import express from 'express';
import {
  getTournaments,
  getTournamentById,
  createTournament,
  updateTournament,
  deleteTournament,
  getTournamentCount,
  registerUserToTournament
} from '../controllers/tournamentController.js';
import { isAdmin } from './authMiddleware.js'; // Importa middlewares necesarios

const router = express.Router();

// Obtener todos los torneos (Accesible para cualquier usuario autenticado)
router.get('/',  getTournaments);// Con autenticación


// Obtener el conteo de torneos (Accesible solo para administradores)
router.get('/count',  getTournamentCount);

// Crear un nuevo torneo (Accesible solo para administradores)
router.post('/', isAdmin, createTournament);

// Actualizar un torneo existente (Accesible solo para administradores)
router.put('/:id',  updateTournament);

// Eliminar un torneo por ID (Accesible solo para administradores)
router.delete('/:id',  deleteTournament);

// Obtener un torneo específico por ID (Accesible para cualquier usuario autenticado)
router.get('/:id',  getTournamentById);

router.post('/:id/register', registerUserToTournament);


export default router;
