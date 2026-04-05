import express from 'express';
import dotenv from 'dotenv';
//import db from './config/db.js'; //-> para poder cargar la base de dato

//importancion de las rutas
import usuarioRoutes from "./routes/usuario.routes.js"; 
import publicacionesRoutes from "./routes/publicaciones.routes.js";
import comentariosRoutes from "./routes/comentarios.routes.js";
//import reporteComentariosRoutes from "./routes/reporte_comentarios.routes.js";
import etiquetasRoutes from "./routes/etiquetas.routes.js";
import rolRoutes from "./routes/roles.routes.js";
import seguidoresRoutes from "./routes/seguidor.routes.js";
import licenciasRoutes from "./routes/licencias.routes.js";
import imagenesRoutes from "./routes/imagenes.routes.js";
import valoracionesRoutes from "./routes/valoraciones.routes.js";
import motivoDenunciaRoutes from "./routes/motivos_denuncia.routes.js";
import denunciasRoutes from "./routes/denuncias.routes.js";
import notificacionesRoutes from "./routes/notificaciones.routes.js"
import interesImagenRoutes from "./routes/imagenes.routes.js"
const PORT = process.env.PORT || 3000;

dotenv.config();
const app = express();

app.use(express.json());
app.use("/usuarios", usuarioRoutes)
app.use("/publicaciones", publicacionesRoutes);
app.use("/comentarios", comentariosRoutes);
//app.use("/reporte-comentarios", reporteComentariosRoutes); 
app.use("/etiquetas", etiquetasRoutes);
app.use("/roles", rolRoutes);
app.use("/seguidores", seguidoresRoutes);
app.use("/licencias", licenciasRoutes);
app.use("/imagenes", imagenesRoutes);
app.use("/valoraciones", valoracionesRoutes);
app.use("/motivo-denuncia", motivoDenunciaRoutes);
app.use("/denuncias", denunciasRoutes);
app.use("/notificaciones", notificacionesRoutes);
app.use("/interes-imagen", interesImagenRoutes);
app.get('/', (req, res) => {
    res.send('El servidor de fotaza esta activo');
});


app.get('/db', async (req, res) => {
    try {
        console.log("Conexion a la DB exitosa")
    } catch (error) {
        res.status(500).send(`Error de conexion: ${error.message}`);
    }
});

app.listen(PORT, () => {
    console.log(`Servidor levantado en el puerto ${PORT}`);
});