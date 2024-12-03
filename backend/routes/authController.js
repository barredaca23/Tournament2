export const verifyRole = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // El token está en Authorization header
    if (!token) {
      return res.status(401).json({ message: 'Token no proporcionado' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded.role !== 'admin') {
        return res.status(403).json({ message: 'No tienes permisos para acceder a esta página.' });
      }
      req.user = decoded;
      next(); // Continúa con la petición si el rol es admin
    } catch (error) {
      console.error('Error al verificar el token:', error);
      return res.status(401).json({ message: 'Token inválido o expirado' });
    }
  };
  