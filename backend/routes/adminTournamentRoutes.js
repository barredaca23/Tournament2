const express = require('express');
const {
  createTournament,
  updateTournament,
  deleteTournament,
} = require('../controllers/adminTournamentController');

const router = express.Router();

// Rutas para la gestión de torneos
router.post('/', createTournament); // Crear torneo
router.put('/:id', updateTournament); // Actualizar torneo
router.delete('/:id', deleteTournament); // Eliminar torneo

module.exports = router;
