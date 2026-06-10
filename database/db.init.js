import db from '../source/config/db.js'; 
import dotenv from 'dotenv';
import bcrypt from 'bcrypt'; 

dotenv.config();

const inicializarBaseDeDatos = async () => {
    try {
        console.log("==================================================");
        console.log("         Inicializacion de la Base de Datos");
        console.log("==================================================");

        await db.query('SET FOREIGN_KEY_CHECKS = 0');

        const tablas = [
            'publicaciones_coleccion', 'publicacion_etiquetas', 'intereses_imagen',
            'notificaciones', 'denuncias', 'valoraciones', 'comentarios',
            'imagenes', 'publicaciones', 'colecciones', 'usuarios',
            'categorias', 'etiquetas', 'licencias', 'motivos_denuncia', 'roles'];

        for (const tabla of tablas) {
            await db.query(`DROP TABLE IF EXISTS ${tabla}`);
        }
        console.log(" Tablas eliminadas.");

        await db.query('SET FOREIGN_KEY_CHECKS = 1');

        // ==========================================================================
        //                          CREACION DE TABLAS
        // ==========================================================================
        
        console.log("creando tablas");

        await db.query(`CREATE TABLE roles (
                id_rol INT AUTO_INCREMENT PRIMARY KEY,
                nombre VARCHAR(50) NOT NULL UNIQUE,
                estado TINYINT(1) DEFAULT 1
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`);

        await db.query(`CREATE TABLE categorias (
                id_categoria INT AUTO_INCREMENT PRIMARY KEY,
                nombre_categoria VARCHAR(50) NOT NULL UNIQUE
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`);

        await db.query(`CREATE TABLE licencias (
                id_licencia INT AUTO_INCREMENT PRIMARY KEY,
                tipo VARCHAR(50) NOT NULL UNIQUE
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`);

        await db.query(`CREATE TABLE motivos_denuncia (
                id_motivo INT AUTO_INCREMENT PRIMARY KEY,
                nombre VARCHAR(100) NOT NULL UNIQUE
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`);

        await db.query(`CREATE TABLE etiquetas (
                id_etiqueta INT AUTO_INCREMENT PRIMARY KEY,
                nombre VARCHAR(50) NOT NULL UNIQUE
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`);

        await db.query(`CREATE TABLE usuarios (
                id_usuario INT AUTO_INCREMENT PRIMARY KEY,
                nombre_usuario VARCHAR(50) NOT NULL UNIQUE,
                correo_electronico VARCHAR(100) NOT NULL UNIQUE,
                contrasena VARCHAR(255) NOT NULL,
                bio TEXT NULL,
                foto_perfil VARCHAR(255) DEFAULT NULL,
                pais VARCHAR(50) DEFAULT NULL,
                id_rol INT DEFAULT 3,
                fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                estado ENUM('activo', 'inactivo') DEFAULT 'activo',
                FOREIGN KEY (id_rol) REFERENCES roles (id_rol) ON DELETE RESTRICT
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`);

        await db.query(`CREATE TABLE colecciones (
                id_coleccion INT AUTO_INCREMENT PRIMARY KEY,
                id_usuario INT NOT NULL,
                nombre VARCHAR(100) DEFAULT NULL,
                descripcion TEXT NULL,
                estado TINYINT(1) DEFAULT 0,
                FOREIGN KEY (id_usuario) REFERENCES usuarios (id_usuario) ON DELETE CASCADE
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`);

        await db.query(`CREATE TABLE publicaciones (
                id_publicacion INT AUTO_INCREMENT PRIMARY KEY,
                titulo VARCHAR(255) NOT NULL,
                descripcion TEXT NOT NULL,
                visibilidad ENUM('publico', 'privado') DEFAULT 'publico',
                contador_visualizaciones INT DEFAULT 0,
                id_usuario INT NOT NULL,
                comentarios_abiertos TINYINT(1) DEFAULT 1,
                fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                estado TINYINT(1) DEFAULT 1,
                id_categoria INT DEFAULT NULL,
                FOREIGN KEY (id_categoria) REFERENCES categorias (id_categoria) ON DELETE SET NULL,
                FOREIGN KEY (id_usuario) REFERENCES usuarios (id_usuario) ON DELETE CASCADE
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`);

        await db.query(`CREATE TABLE imagenes (
                id_imagen INT AUTO_INCREMENT PRIMARY KEY,
                id_publicacion INT NOT NULL,
                ruta_url VARCHAR(255) NOT NULL,
                marca_agua_texto VARCHAR(255) DEFAULT NULL,
                id_licencia INT NOT NULL,
                FOREIGN KEY (id_publicacion) REFERENCES publicaciones (id_publicacion) ON DELETE CASCADE,
                FOREIGN KEY (id_licencia) REFERENCES licencias (id_licencia) ON DELETE RESTRICT
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`);

        await db.query(`CREATE TABLE comentarios (
                id_comentario INT AUTO_INCREMENT PRIMARY KEY,
                id_publicacion INT NOT NULL,
                id_usuario INT NOT NULL,
                comentario_padre INT DEFAULT NULL,
                contenido TEXT NOT NULL,
                fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                estado ENUM('visible', 'oculto') DEFAULT 'visible',
                FOREIGN KEY (id_publicacion) REFERENCES publicaciones (id_publicacion) ON DELETE CASCADE,
                FOREIGN KEY (id_usuario) REFERENCES usuarios (id_usuario) ON DELETE CASCADE,
                FOREIGN KEY (comentario_padre) REFERENCES comentarios (id_comentario) ON DELETE CASCADE
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`);

        await db.query(`CREATE TABLE valoraciones (
                id_valoracion INT AUTO_INCREMENT PRIMARY KEY,
                id_imagen INT NOT NULL,
                id_usuario INT NOT NULL,
                puntuacion TINYINT NOT NULL,
                fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                UNIQUE KEY uq_valoraciones_id_imagen_id_usuario (id_imagen, id_usuario),
                FOREIGN KEY (id_imagen) REFERENCES imagenes (id_imagen) ON DELETE CASCADE,
                FOREIGN KEY (id_usuario) REFERENCES usuarios (id_usuario) ON DELETE CASCADE,
                CONSTRAINT valoraciones_chk_1 CHECK (puntuacion BETWEEN 1 AND 5)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`);

        await db.query(`CREATE TABLE denuncias (
                id_denuncia INT AUTO_INCREMENT PRIMARY KEY,
                id_usuario_denunciante INT NOT NULL,
                id_publicacion INT DEFAULT NULL,
                id_comentario INT DEFAULT NULL,
                id_motivo INT NOT NULL,
                descripcion TEXT NOT NULL,
                estado ENUM('pendiente', 'revisada', 'desestimada') DEFAULT 'pendiente',
                fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (id_usuario_denunciante) REFERENCES usuarios (id_usuario) ON DELETE CASCADE,
                FOREIGN KEY (id_publicacion) REFERENCES publicaciones (id_publicacion) ON DELETE SET NULL,
                FOREIGN KEY (id_comentario) REFERENCES comentarios (id_comentario) ON DELETE SET NULL,
                FOREIGN KEY (id_motivo) REFERENCES motivos_denuncia (id_motivo) ON DELETE RESTRICT
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`);

        await db.query(`CREATE TABLE IF NOT EXISTS seguidores (
        id_usuario_seguidor INT NOT NULL,
        id_usuario_seguido INT NOT NULL,
        fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id_usuario_seguidor, id_usuario_seguido),
        FOREIGN KEY (id_usuario_seguidor) REFERENCES usuarios (id_usuario) ON DELETE CASCADE,
        FOREIGN KEY (id_usuario_seguido) REFERENCES usuarios (id_usuario) ON DELETE CASCADE
     ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`);

        await db.query(`CREATE TABLE intereses_imagen (
                id_interes INT AUTO_INCREMENT PRIMARY KEY,
                id_imagen INT DEFAULT NULL,
                id_usuario_interesado INT DEFAULT NULL,
                fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                UNIQUE KEY uq_intereses_id_imagen_id_user (id_imagen, id_usuario_interesado),
                FOREIGN KEY (id_imagen) REFERENCES imagenes (id_imagen) ON DELETE CASCADE,
                FOREIGN KEY (id_usuario_interesado) REFERENCES usuarios (id_usuario) ON DELETE CASCADE
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`);

        await db.query(`CREATE TABLE notificaciones (
                id_notificacion INT AUTO_INCREMENT PRIMARY KEY,
                id_usuario_destino INT DEFAULT NULL,
                id_usuario_origen INT DEFAULT NULL,
                tipo_evento ENUM('comentario', 'valoracion', 'interes', 'seguimiento') DEFAULT NULL,
                tipo_recurso ENUM('publicacion', 'imagen', 'usuario') DEFAULT NULL,
                id_recurso INT DEFAULT NULL,
                leido TINYINT(1) DEFAULT 0,
                fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (id_usuario_destino) REFERENCES usuarios (id_usuario) ON DELETE CASCADE,
                FOREIGN KEY (id_usuario_origen) REFERENCES usuarios (id_usuario) ON DELETE SET NULL
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`);

        await db.query(`CREATE TABLE publicaciones_coleccion (
                id_coleccion INT NOT NULL,
                id_publicacion INT NOT NULL,
                PRIMARY KEY (id_coleccion, id_publicacion),
                FOREIGN KEY (id_coleccion) REFERENCES colecciones (id_coleccion) ON DELETE CASCADE,
                FOREIGN KEY (id_publicacion) REFERENCES publicaciones (id_publicacion) ON DELETE CASCADE
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`);

        await db.query(`CREATE TABLE publicacion_etiquetas (
                id_publicacion INT NOT NULL,
                id_etiqueta INT NOT NULL,
                PRIMARY KEY (id_publicacion, id_etiqueta),
                FOREIGN KEY (id_publicacion) REFERENCES publicaciones (id_publicacion) ON DELETE CASCADE,
                FOREIGN KEY (id_etiqueta) REFERENCES etiquetas (id_etiqueta) ON DELETE CASCADE
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`);

        console.log(" Tablas creadas exitosamente.");

        // ==========================================================================
        //                          CONFIGURACION DE LA BASE INSERTS
        // ==========================================================================
        console.log("Insertando registros esenciales...");

        await db.query(`INSERT INTO roles (id_rol, nombre) VALUES (1, 'administrador'), (2, 'validador'), (3, 'usuario')`);
        await db.query(`INSERT INTO categorias (id_categoria, nombre_categoria) VALUES (1, 'Naturaleza'), (2, 'Animales'), (3, 'Urbano'), (4, 'Paisajes'), (5, 'Retratos')`);
        await db.query(`INSERT INTO licencias (id_licencia, tipo) VALUES (1, 'Con copyright'), (2, 'Creative Commons'), (4, 'Sin copyright')`);
        await db.query(`INSERT INTO motivos_denuncia (id_motivo, nombre) VALUES (1, 'Contenido inapropiado'), (2, 'Plagio / Derechos de autor'), (3, 'Spam o estafa'), (4, 'Otro')`);

        // ==========================================================================
        //                     GENERACION DE USUARIO
        // ==========================================================================
        console.log(" Encriptando contraseñas e insertando usuarios de prueba.");

        const hashAdmin = await bcrypt.hash('admin', 10);
        const hashUsuarios = await bcrypt.hash('12345678', 10); 

        await db.query(`INSERT INTO usuarios (id_usuario, nombre_usuario, correo_electronico, contrasena, id_rol, bio, pais) 
            VALUES (1, 'admin', 'admin@fotaza.com', ?, 1, 'Cuenta Administradora del sistema.', 'Argentina')`, [hashAdmin]);

        
        const usuariosPrueba = [
            ['test_user1', 'user1@fotaza.com', 'Fotógrafo amateur explorando paisajes.'],
            ['test_user2', 'user2@fotaza.com', 'Amante de la fotografía urbana y callejera.'],
            ['test_user3', 'user3@fotaza.com', 'Diseñador y creador de contenidos digitales.'],
            ['test_user4', 'user4@fotaza.com', 'Coleccionista de retratos y momentos artísticos.'],
            ['test_user5', 'user5@fotaza.com', 'Buscando inspiración en la comunidad.'],
            ['test_user6', 'user6@fotaza.com', 'Amante de la vida silvestre y los animales.'],
            ['test_user7', 'user7@fotaza.com', 'Compartiendo pedacitos de mi galería personal.'],
            ['test_user8', 'user8@fotaza.com', 'Probando interacciones dinámicas en la app.'],
            ['test_user9', 'user9@fotaza.com', 'Creador independiente enfocado en licencias CC.']
        ];

        let idActual = 2;
        for (const user of usuariosPrueba) {
            await db.query(`
                INSERT INTO usuarios (id_usuario, nombre_usuario, correo_electronico, contrasena, id_rol, bio, pais) 
                VALUES (?, ?, ?, ?, 3, ?, 'Argentina')
            `, [idActual, user[0], user[1], hashUsuarios, user[2]]);
            idActual++;
        }

        console.log("==================================================");
        console.log("  Base de datos lista! ");
        console.log("==================================================");
        process.exit(0);

    } catch (error) {
        console.error("Error critico al inicializar la Base de Datos:", error);
        process.exit(1);
    }
};

inicializarBaseDeDatos();