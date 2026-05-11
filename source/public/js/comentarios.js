document.addEventListener("DOMContentLoaded", () => {

    const formularios = document.querySelectorAll(".form-comentario");

    formularios.forEach(formulario => {

        formulario.addEventListener("submit", async (e) => {

            e.preventDefault();

            const formData = new FormData(formulario);

            const comentario = formData.get("comentario");
            const idPublicacion = formData.get("idPublicacion");

            try {

                const respuesta = await fetch("/comentarios/crear", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({comentario, idPublicacion})
                });

                const data = await respuesta.json();

                if (!respuesta.ok) {
                    alert(data.mensaje);
                    return;
                }

                //contenedor comentarios
                const listaComentarios = formulario.parentElement.querySelector(".lista-comentarios");

                //crear vista del comentario
                const nuevoComentario = document.createElement("div");

                nuevoComentario.classList.add("small", "mb-2");
                nuevoComentario.innerHTML = `<strong class="text-primary">@Tú</strong> ${comentario}`;

                // agregar arriba
                listaComentarios.prepend(nuevoComentario);

                // limpiar input
                formulario.reset();

            } catch (error) {
                console.log("error comentando", error);
                alert("Error al comentar");
            }

        });

    });

});