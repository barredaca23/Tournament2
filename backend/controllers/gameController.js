// src/controllers/gameController.js
import pool from '../config/db.js';

// Obtener todos los juegos
export const getGames = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM games ORDER BY created_at DESC');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error al obtener los juegos:', error);
    res.status(500).json({ error: 'Error al obtener los juegos' });
  }
};

// Obtener torneos por juego
export const getTournamentsByGame = async (req, res) => {
  try {
    const { gameName } = req.params;

    const query = 'SELECT * FROM tournaments WHERE LOWER(game_name) = LOWER($1) ORDER BY start_date';
    const result = await pool.query(query, [gameName]);

    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error al obtener los torneos por juego:', error);
    res.status(500).json({ error: 'Error al obtener los torneos por juego' });
  }
};
