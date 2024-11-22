import { v2 as cloudinary } from 'cloudinary';
import express from 'express';
import multer from 'multer';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();
router.post('/upload', upload.single('file'), async (req, res) => {
    console.log('Archivo recibido:', req.file);
    console.log('Body recibido:', req.body);

    try {
        const file = req.file;
        if (!file) {
            return res.status(400).json({ error: 'No se proporcionó ningún archivo' });
        }

        // Subir el archivo a Cloudinary usando upload_stream
        const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { folder: 'tournaments' }, // Carpeta en Cloudinary
                (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                }
            );
            // Pasar el buffer del archivo al stream
            uploadStream.end(file.buffer);
        });

        // Enviar la URL del archivo subido como respuesta
        res.status(200).json({ url: result.secure_url });
    } catch (error) {
        console.error('Error al subir archivo:', error);
        res.status(500).json({ error: 'Error al subir archivo' });
    }
});


export default router;
