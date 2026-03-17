import express from 'express';
import dotenv from 'dotenv';
//import db from './config/db.js';
const PORT = process.env.PORT || 3000;

dotenv.config();
const app = express();


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