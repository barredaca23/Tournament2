// authRoutes.js
const express = require("express");
const bcrypt = require("bcrypt");
const pool = require("../db"); // Asegúrate de importar correctamente tu conexión a la DB
const router = express.Router();

// Registro de usuarios
router.post("/register", async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await pool.query(
      `INSERT INTO users (username, email, password_hash, role)
       VALUES ($1, $2, $3, $4) RETURNING id, username, email, role, created_at`,
      [username, email, hashedPassword, role || "user"] // Role por defecto es "user"
    );

    res.status(201).json(newUser.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Error al registrar usuario" });
  }
});

const jwt = require("jsonwebtoken");

// Inicio de sesión
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const userResult = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
    const user = userResult.rows[0];

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET, // Configura tu clave secreta en un archivo .env
      { expiresIn: "1h" }
    );

    res.status(200).json({ token, role: user.role });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
});


module.exports = router;
