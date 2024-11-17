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
            'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
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
    try {
        // Buscar usuario por email
        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (user.rows.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Comparar contraseñas
        const isMatch = await bcrypt.compare(password, user.rows[0].password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        // Generar token
        const token = jwt.sign({ id: user.rows[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, user: user.rows[0] });
    } catch (error) {
        res.status(500).json({ error: error.message });
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
