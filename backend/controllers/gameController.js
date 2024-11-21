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
// Crear un nuevo juego
export const createGame = async (req, res) => {
  try {
    const { name, description, cover_image_url } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'El nombre es obligatorio' });
    }

    const query = `
      INSERT INTO games (name, description, cover_image_url)
      VALUES ($1, $2, $3) RETURNING *;
    `;

    const values = [name, description, cover_image_url];
    const result = await pool.query(query, values);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error al crear el juego:', error);
    res.status(500).json({ error: 'Error al crear el juego' });
  }
};

// Actualizar un juego existente
export const updateGame = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, cover_image_url } = req.body;

    const query = `
      UPDATE games
      SET name = $1, description = $2, cover_image_url = $3
      WHERE id = $4 RETURNING *;
    `;

    const values = [name, description, cover_image_url, id];
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Juego no encontrado' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error al actualizar el juego:', error);
    res.status(500).json({ error: 'Error al actualizar el juego' });
  }
};

// Eliminar un juego
export const deleteGame = async (req, res) => {
  try {
    const { id } = req.params;

    const query = 'DELETE FROM games WHERE id = $1 RETURNING *;';
    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Juego no encontrado' });
    }

    res.status(200).json({ message: 'Juego eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar el juego:', error);
    res.status(500).json({ error: 'Error al eliminar el juego' });
  }
};
// Obtener un juego por ID
export const getGameById = async (req, res) => {
  try {
    const { id } = req.params; // Obtener el ID de la URL

    const query = 'SELECT * FROM games WHERE id = $1';
    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Juego no encontrado' });
    }

    // Aquí ya debes retornar el juego usando el resultado de la consulta
    res.status(200).json(result.rows[0]); // Retorna el juego encontrado
  } catch (error) {
    console.error('Error al obtener el juego:', error);
    res.status(500).json({ error: 'Error al obtener el juego' });
  }
};

// Obtener el número de juegos
export const getGameCount = async (req, res) => {
  try {
    const result = await pool.query('SELECT COUNT(*) FROM games');  // Consulta correcta
    res.status(200).json({ count: result.rows[0].count });  // Devuelve el conteo
  } catch (error) {
    console.error('Error al obtener el conteo de juegos:', error);
    res.status(500).json({ error: 'Error al obtener el conteo de juegos' });
  }
};

