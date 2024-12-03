import jwt from 'jsonwebtoken';

export const isAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No autorizado. Token faltante.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Acceso denegado. Solo para administradores.' });
    }
    next();
  } catch (error) {
    console.error('Error al validar admin:', error);
    return res.status(401).json({ message: 'Token inválido o expirado.' });
  }
};
