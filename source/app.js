// ----------------------------------------------------- IMPORTACIONES ----------------------------------
import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import session from 'express-session';
//IMPORTO DIRECTAMENTE DE MODEL, COMO ES EL HOME PRINCIAPL
import { listarPublicacionesModel } from "./models/publicaciones.model.js";

// --------------------------------------------- CONFIGURACION DE VARIABLES Y RUTAS ----------------------------------

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Importacion de todas las rutas
import usuarioRoutes from "./routes/usuario.routes.js"; 
import publicacionesRoutes from "./routes/publicaciones.routes.js";
import comentariosRoutes from "./routes/comentarios.routes.js";
import etiquetasRoutes from "./routes/etiquetas.routes.js";
import rolRoutes from "./routes/roles.routes.js";
import seguidoresRoutes from "./routes/seguidor.routes.js";
import licenciasRoutes from "./routes/licencias.routes.js";
import imagenesRoutes from "./routes/imagenes.routes.js";
import valoracionesRoutes from "./routes/valoraciones.routes.js";
import motivoDenunciaRoutes from "./routes/motivos_denuncia.routes.js";
import denunciasRoutes from "./routes/denuncias.routes.js";
import notificacionesRoutes from "./routes/notificaciones.routes.js";
import interesImagenRoutes from "./routes/interes_imagen.routes.js";
import coleccionesRoutes from "./routes/colecciones.routes.js";





// -----------------------------------------------------  INICIALIZACION DE TODA LA APP     ----------------------------------
const app = express();
const PORT = process.env.PORT || 3000;



// // -----------------------------------------------------  CONFIGURACION DE PUG ----------------------------------
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');




// -----------------------------------------------------  MIDELWARES GLOBALES ----------------------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


// -----------------------------------------------------  CONFIGUIRACION DE SESIÓNES ----------------------------------
app.use(session({
    secret: process.env.SESSION_SECRET, 
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: false, 
        maxAge: 3600000 
    }
}));


app.get("/salir", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/");
    })
})





// -----------------------------------------------------  RUTA RAIZ ------------- ----------------------------------

app.get('/', async (req, res) => {
    try {
        const publicaciones = await listarPublicacionesModel();
        
        res.render('pages/index', { 
            publicaciones: publicaciones,  usuarioLogueado: req.session});
    } catch (error) {
        console.error("Error al cargar las publicaciones en el Home:", error);
        res.render('pages/index', { publicaciones: [], usuarioLogueado: null });
    }
});



// -----------------------------------------------------  USO DE RUTAS  --------------------------------------------

app.use("/usuarios", usuarioRoutes);
app.use("/publicaciones", publicacionesRoutes);
app.use("/comentarios", comentariosRoutes);
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




// -----------------------------------------------------  RUTAS DE UTILIDAD Y ERRORES ----------------------------------



// Ruta de prueba para la DB 
app.get('/db', (req, res) => {
    res.send("Chequea la consola de tu terminal para ver el estado de la conexión.");
});

// Para manejar erorres 404, podria agregar otros
app.all(/.*/, (req, res) => {
    res.status(404).send('<h1>404 No Disponible - Fotaza 2</h1>');
});

// --- LEvantar el servidor
app.listen(PORT, () => {
    console.log(`Servidor levantado en el puerto ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});