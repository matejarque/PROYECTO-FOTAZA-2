## PROYECTO-FOTAZA-2

## Servicios externos utilizados

- **Cloudinary:** Almacenamiento para contetnido multimedia
- **Aiven:** Hosting y gestion remota para la base de datos
- **Render:** servidor para el despliegue

---

## EL VIDEO: https://drive.google.com/file/d/162eSm7lUsxu9SqVBhcDCoWke_sIvJkBL/view?usp=sharing

## Aplicación en Produccion (ES MUY IMPORTANTE QUE PRIMERO SE PRUEBE EN PRODUCCION!!)

- **Enlace (Render):** [https://proyecto-fotaza-2.onrender.com](https://proyecto-fotaza-2.onrender.com)

### Usuarios de prueba para la Web en PRODUCCION

Para evaluar la plataforma online con el contenido, interacciones y publicaciones ya existentes, utilizar las siguientes cuentas:

- **Usuario 1:** `matute09` | **Contraseña:** `matute09`
- **Usuario 2:** `SoyNorma` | **Contraseña:** `SoyNorma`

---

## ENTORNO LOCAL

## ES MUY IMPORTANTE QUE PRUEBEN LA PAGINA PRIMERO (APLICACION EN PRODUCCION) PORQUE EL db:init va a limpiar la base de datos y crearla nuevamente con datos definidos

- Si necesitan desplegar en entorno local:

- **Usuario ** `ejarque_matias` | **Contraseña:** `12345678`

1.  **Clonar el repositorio:**

    git clone [https://github.com/matejarque/PROYECTO-FOTAZA-2.git](https://github.com/matejarque/PROYECTO-FOTAZA-2.git)
    cd PROYECTO-FOTAZA-2

2.  **instalar dependencias**
    npm install

3.  **Crear la variable de entorno**

      PORT=3000

        SESSION_SECRET=

        DB_HOST=localhost
        DB_USER=root
        DB_PASS=
        DB_NAME=fotaza
        DB_PORT=3306

        CLOUDINARY_CLOUD_NAME=
        CLOUDINARY_API_KEY=
        CLOUDINARY_API_SECRET=

    Hay un .env.example con las variables

4.  **Iniciar la base de datos**
    npm run db:init

5.  **Iniciar la aplicacion**
    npm start o npm dev
