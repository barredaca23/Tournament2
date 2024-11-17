import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Configuración del servidor
const app = express();
app.set("port", 4000);

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, "../public")));


// Rutas
//login
app.get("/", (req, res) => {
    const filePath = path.join(__dirname, "../app/pages/login.html");
    res.sendFile(filePath, (err) => {
        if (err) {
            console.error("Error al cargar el archivo:", err.message);
            res.status(500).send("Error al cargar la página.");
        }
    });
});

//register
app.get("/register", (req, res) => {
  const filePath = path.join(__dirname, "../app/pages/register.html");
  res.sendFile(filePath, (err) => {
      if (err) {
          console.error("Error al cargar el archivo:", err.message);
          res.status(500).send("Error al cargar la página.");
      }
  });
});

// Iniciar el servidor
app.listen(app.get("port"), () => {
    console.log("Servidor corriendo en puerto", app.get("port"));
});


