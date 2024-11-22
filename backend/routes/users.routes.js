import express from 'express';
import { register, login, getUsers, updateUser, deleteUser, getUserProfile } from '../controllers/userController.js';

const router = express.Router();

router.post('/register', register); // Registro
router.post('/login', login);       // Inicio de sesión
router.get('/', getUsers);          // Obtener todos los usuarios
router.put('/:id', updateUser);     // Actualizar usuario
router.delete('/:id', deleteUser);  // Eliminar usuario
router.get('/profile',getUserProfile);

export default router;
