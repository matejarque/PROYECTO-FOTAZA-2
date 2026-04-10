//variable de entorno
import express from 'express';
import dotenv from 'dotenv';
import session from 'express-session';
import path from 'path';
import { fileURLToPath } from 'url';
//import db from './config/db.init.js'; //-> para poder cargar la base de dato

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
import interesImagenRoutes from "./routes/interes_imagen.routes.js"
import coleccionesRoutes from "./routes/colecciones.routes.js";

//inicializar la web
const app = express();
const PORT = process.env.PORT || 3000;

//configuracion de del motor de plantillas
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/views'));

//midelwares globales
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

//para el aauth
app.use(session({
    secret: process.env.SESSION_SECRET
}));




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
app.use("/colecciones", coleccionesRoutes);

app.get('/', (req, res) => {
    res.render('index');
});


app.get('/db', async (req, res) => {
    try {
        console.log("Conexion a la DB exitosa")
    } catch (error) {
        res.status(500).send(`Error de conexion: ${error.message}`);
    }
});


//maneja errores 404 -> modificar a una vista con PUG
app.all(/.*/, (req, res)=>{
    return res.status(404).send('<h1>404 No Disponible</h1>');
})

app.listen(PORT, () => {
    console.log(`Servidor levantado en el puerto ${PORT}`);
});