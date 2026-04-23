document.addEventListener("DOMContentLoaded", () => {

    const formLogin = document.getElementById("formLogin");

    formLogin.addEventListener("submit", async (params) => {

        params.preventDefault();

        const datos = new FormData(formLogin);

        const nombre = datos.get("nombre");
        const contrasena = datos.get("contrasena");

        try {
            const respuesta = await fetch("/usuarios/verificar-inicio-sesion", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({nombre, contrasena})});

            const resultado = await respuesta.json();

            if (respuesta.ok) {

                alert("Login exitoso");

                location.reload();

            } else {

                alert(resultado.mensaje);
            }

        } catch (error) {
            console.error("Error en login:", error);
        }

    });

});