const express = require('express');
const { getTournaments, getTournamentById } = require('../controllers/tournamentController');

const router = express.Router();

router.get('/', getTournaments);
router.get('/:id', getTournamentById);

module.exports = router;
