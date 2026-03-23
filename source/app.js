import express from 'express';
import dotenv from 'dotenv';
//import db from './config/db.js'; //-> para poder cargar la base de dato

//importancion de las rutas
import usuarioRoutes from "./routes/usuario.routes.js"; 
import publicacionesRoutes from "./routes/publicaciones.routes.js";
import comentariosRoutes from "./routes/comentarios.routes.js"


const PORT = process.env.PORT || 3000;

dotenv.config();
const app = express();


app.use(express.json());
app.use("/usuarios", usuarioRoutes)
app.use("/publicaciones", publicacionesRoutes);
app.use("/comentarios", comentariosRoutes);


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