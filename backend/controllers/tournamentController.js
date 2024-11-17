const pool = require('../config/db'); // Conexión a la base de datos

// Obtener todos los torneos (con filtros opcionales)
const getTournaments = async (req, res) => {
  try {
    const { name, game_name, start_date, end_date } = req.query;

    // Construcción dinámica del filtro
    let query = 'SELECT * FROM tournaments WHERE 1=1';
    const values = [];

    if (name) {
      query += ' AND LOWER(name) LIKE LOWER($1)';
      values.push(`%${name}%`);
    }
    if (game_name) {
      query += ' AND LOWER(game_name) LIKE LOWER($2)';
      values.push(`%${game_name}%`);
    }
    if (start_date && end_date) {
      query += ' AND start_date BETWEEN $3 AND $4';
      values.push(start_date, end_date);
    }

    // Ejecutar consulta
    const result = await pool.query(query, values);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error al obtener torneos:', error);
    res.status(500).json({ error: 'Error al obtener torneos' });
  }
};

// Obtener el detalle de un torneo específico por ID
const getTournamentById = async (req, res) => {
  try {
    const { id } = req.params;

    const query = 'SELECT * FROM tournaments WHERE id = $1';
    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Torneo no encontrado' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error al obtener el torneo:', error);
    res.status(500).json({ error: 'Error al obtener el torneo' });
  }
};

module.exports = { getTournaments, getTournamentById };
