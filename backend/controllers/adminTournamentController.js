const pool = require('../config/db');

// Crear un nuevo torneo
const createTournament = async (req, res) => {
  try {
    const { name, description, start_date, end_date, max_players, game_name, cover_image_url } = req.body;

    const query = `
      INSERT INTO tournaments (name, description, start_date, end_date, max_players, game_name, cover_image_url, created_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
      RETURNING *;
    `;
    const values = [name, description, start_date, end_date, max_players, game_name, cover_image_url];
    const result = await pool.query(query, values);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error al crear el torneo:', error);
    res.status(500).json({ error: 'Error al crear el torneo' });
  }
};

// Editar un torneo existente
const updateTournament = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, start_date, end_date, max_players, game_name, cover_image_url } = req.body;

    const query = `
    UPDATE tournaments
    SET name = $1, description = $2, start_date = $3, end_date = $4,
        max_players = $5, game_name = $6, cover_image_url = $7
    WHERE id = $8
    RETURNING *;
    `;
    const values = [name, description, start_date, end_date, max_players, game_name, cover_image_url, id];
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Torneo no encontrado' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error al actualizar el torneo:', error);
    res.status(500).json({ error: 'Error al actualizar el torneo' });
  }
};

// Eliminar un torneo
const deleteTournament = async (req, res) => {
  try {
    const { id } = req.params;

    const query = 'DELETE FROM tournaments WHERE id = $1 RETURNING *;';
    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Torneo no encontrado' });
    }

    res.status(200).json({ message: 'Torneo eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar el torneo:', error);
    res.status(500).json({ error: 'Error al eliminar el torneo' });
  }
};

module.exports = { createTournament, updateTournament, deleteTournament };
