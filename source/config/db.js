import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const db = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,

    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,

    ssl: {
        rejectUnauthorized: false
    }
});

// ===============================
// PRUEBA DE CONEXION
// ===============================
(async () => {
    try {
        const conn = await db.getConnection();
        console.log("✅ MYSQL CONECTADO CORRECTAMENTE");
        conn.release();
    } catch (error) {
        console.error("❌ ERROR CONECTANDO MYSQL:", error);
    }
})();

export default db;