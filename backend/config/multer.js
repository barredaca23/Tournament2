// config/multer.js
import multer from 'multer';

// Configuración de multer para almacenamiento en memoria
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('file'); // 'file' es el nombre del campo de archivo

export default upload;
