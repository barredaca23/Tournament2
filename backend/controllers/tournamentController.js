import pool from '../config/db.js'; // Conexión a la base de datos

// Obtener todos los torneos (con filtros opcionales)
export const getTournaments = async (req, res) => {
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
export const getTournamentById = async (req, res) => {
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
// Crear un nuevo torneo
export const createTournament = async (req, res) => {
  try {
    const { name, description, start_date, end_date, max_players, game_name, cover_image_url } = req.body;

    if (!name || !start_date || !end_date || !game_name) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    const query = `
      INSERT INTO tournaments (name, description, start_date, end_date, max_players, game_name, cover_image_url)
      VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;
    `;

    const values = [name, description, start_date, end_date, max_players, game_name, cover_image_url];
    const result = await pool.query(query, values);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error al crear el torneo:', error);
    res.status(500).json({ error: 'Error al crear el torneo' });
  }
};
// Actualizar un torneo existente
export const updateTournament = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, start_date, end_date, max_players, game_name, cover_image_url } = req.body;

    const query = `
      UPDATE tournaments
      SET name = $1, description = $2, start_date = $3, end_date = $4, max_players = $5, game_name = $6, cover_image_url = $7
      WHERE id = $8 RETURNING *;
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
// Eliminar un torneo por ID
export const deleteTournament = async (req, res) => {
  try {
    const { id } = req.params;

    const query = 'DELETE FROM tournaments WHERE id = $1 RETURNING *;';
    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Torneo no encontrado' });
    }

    res.status(200).json({ message: 'Torneo eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar el torneo:', error);
    res.status(500).json({ error: 'Error al eliminar el torneo' });
  }
};
export const getTournamentCount = async (req, res) => {
  try {
    console.log('Obteniendo el conteo de torneos');
    
    // Asegúrate de que esta consulta esté apuntando a la tabla correcta
    const result = await pool.query('SELECT COUNT(*) FROM tournaments');  // Esta es la consulta correcta
    
    // Parseamos correctamente el conteo como un número
    const count = parseInt(result.rows[0].count, 10);  // Esto asegura que el conteo sea un número
    
    if (isNaN(count)) {
      throw new Error('El conteo de torneos no es un número válido');
    }
    
    res.status(200).json({ count });  // Devolvemos el conteo
  } catch (error) {
    console.error('Error al obtener el conteo de torneos:', error);
    res.status(500).json({ error: 'Error al obtener el conteo de torneos' });
  }
};








