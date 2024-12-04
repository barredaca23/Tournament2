import pool from "../config/db.js";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";

// Registro de usuarios
export const register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        // Verificar si el usuario ya existe
        const checkUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (checkUser.rows.length > 0) {
            return res.status(400).json({ message: 'El usuario ya está registrado' });
        }

        // Hashear contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insertar nuevo usuario
        const newUser = await pool.query(
            'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING *',
            [username, email, hashedPassword]
        );

        res.status(201).json({ message: 'Usuario registrado con éxito', user: newUser.rows[0] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Inicio de sesión
export const login = async (req, res) => {
    const { email, password } = req.body;
    console.log("JWT_SECRET:", process.env.JWT_SECRET);

    try {
        console.log("Datos recibidos:", { email, password });

        // Buscar usuario por email
        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        console.log("Resultado de la búsqueda:", user.rows);

        if (user.rows.length === 0) {
            console.log("Usuario no encontrado.");
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Comparar contraseñas
        const isMatch = await bcrypt.compare(password, user.rows[0].password_hash);
        console.log("Resultado de comparación de contraseña:", isMatch);

        if (!isMatch) {
            console.log("Contraseña incorrecta.");
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        // Generar token
        const token = jwt.sign(
            { id: user.rows[0].id, role: user.rows[0].role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        console.log("Token generado:", token);

        res.json({
            token,
            user: {
                id: user.rows[0].id,
                username: user.rows[0].username,
                email: user.rows[0].email,
                role: user.rows[0].role
            },
        });
    } catch (error) {
        console.error("Error en el login:", error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};



// Obtener todos los usuarios
export const getUsers = async (req, res) => {
    try {
        const users = await pool.query('SELECT id, username, email FROM users');
        res.json(users.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar usuario
export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, email } = req.body;
    try {
        const updatedUser = await pool.query(
            'UPDATE users SET username = $1, email = $2 WHERE id = $3 RETURNING *',
            [username, email, id]
        );
        res.json(updatedUser.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar usuario
export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM users WHERE id = $1', [id]);
        res.json({ message: 'Usuario eliminado con éxito' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener el perfil del usuario
export const getUserProfile = async (req, res) => {
    try {
      const userId = req.user.id; // Asegúrate de tener autenticación configurada para obtener el ID del usuario
      const { rows } = await pool.query('SELECT id, username, email FROM users WHERE id = $1', [userId]);
      
      if (rows.length === 0) return res.status(404).json({ message: 'Usuario no encontrado' });
  
      res.json(rows[0]);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener el perfil', error });
    }
  };

  
  
// Controlador para obtener el torneo y los participantes de un usuario
export const getTournamentsByUserId = async (req, res) => {
    const { userId } = req.params;
  
    try {
      // Consulta para obtener los torneos y participantes
      const query = `
        SELECT 
          t.id AS tournament_id, 
          t.name AS tournament_name, 
          t.start_date, 
          t.end_date, 
          t.max_players, 
          t.game_name, 
          t.cover_image_url,
          u.id AS participant_id, 
          u.username, 
          u.email
        FROM tournaments t
        JOIN tournament_participants tp_user ON tp_user.tournament_id = t.id
        JOIN tournament_participants tp_others ON tp_others.tournament_id = t.id
        JOIN users u ON u.id = tp_others.user_id
        WHERE tp_user.user_id = $1
        ORDER BY t.start_date, u.username;
      `;
  
      const result = await pool.query(query, [userId]);
  
      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'El usuario no está inscrito en ningún torneo.' });
      }
  
      // Agrupar los resultados por torneo
      const tournaments = {};
      result.rows.forEach(row => {
        const { 
          tournament_id, 
          tournament_name, 
          start_date, 
          end_date, 
          max_players, 
          game_name, 
          cover_image_url, 
          participant_id, 
          username, 
          email 
        } = row;
  
        // Si el torneo aún no está registrado, lo inicializamos
        if (!tournaments[tournament_id]) {
          tournaments[tournament_id] = {
            id: tournament_id,
            name: tournament_name,
            start_date,
            end_date,
            max_players,
            game_name,
            cover_image_url,
            participants: []
          };
        }
  
        // Agregamos al participante al torneo correspondiente
        tournaments[tournament_id].participants.push({
          user_id: participant_id,
          username,
          email,
        });
      });
  
      // Transformar el objeto de torneos en un array
      const tournamentsArray = Object.values(tournaments);
  
      res.json({ tournaments: tournamentsArray });
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      res.status(500).json({ message: 'Hubo un error al procesar tu solicitud.' });
    }
  };
  
