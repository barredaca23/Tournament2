import express from 'express';
import { getTournaments, getTournamentById } from '../controllers/tournamentController.js';
import { createTournament, updateTournament, deleteTournament } from '../controllers/tournamentController.js';

const router = express.Router();

router.get('/', getTournaments);
router.post('/', createTournament);
router.put('/:id', updateTournament);
router.delete('/:id', deleteTournament);
router.get('/:id', getTournamentById);

export default router;
