document.addEventListener("DOMContentLoaded", () => {
    // === CREAR COMENTARIOS ===
    const formulariosComentarios = document.querySelectorAll(".form-comentario");
    formulariosComentarios.forEach(form => {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const idPublicacion = formData.get("idPublicacion");
            const comentario = formData.get("comentario"); // Cambiado a 'comentario' para calzar con tu req.body
            const listaComentarios = form.closest(".comentarios-box").querySelector(".lista-comentarios");

            try {
                const respuesta = await fetch("/comentarios/crear", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ comentario, idPublicacion }),
                    credentials: "include"
                });
                const resultado = await respuesta.json();
                if (respuesta.ok) {
                    const sinComentarios = listaComentarios.querySelector(".sin-comentarios");
                    if (sinComentarios) sinComentarios.remove();
                    
                    const nuevoElemento = document.createElement("div");
                    nuevoElemento.classList.add("small", "mb-2");
                    nuevoElemento.innerHTML = `<strong class="text-primary">@TuUsuario</strong> ${comentario}`;
                    listaComentarios.appendChild(nuevoElemento);
                    form.reset();
                } else {
                    alert(resultado.mensaje);
                }
            } catch (error) {
                console.error("Error al crear comentario:", error);
            }
        });
    });

    // === CERRAR COMENTARIOS DEFINITIVO ===
    const botonesToggle = document.querySelectorAll(".btn-toggle-comentarios");
    const modalConfirmar = new bootstrap.Modal(document.getElementById("modalConfirmarComentarios"));
    const btnAceptarModal = document.getElementById("btnAceptarCambioComentarios");

    let publicacionSeleccionada = null;
    let botonActivo = null;

    botonesToggle.forEach(boton => {
        boton.addEventListener("click", () => {
            publicacionSeleccionada = boton.getAttribute("data-id-publicacion");
            botonActivo = boton;
            modalConfirmar.show();
        });
    });

    btnAceptarModal.addEventListener("click", async () => {
        if (!publicacionSeleccionada) return;

        try {
            const respuesta = await fetch(`/comentarios/modificar-apertura/${publicacionSeleccionada}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ comentarioAbierto: 0 }), // Forzamos el cierre enviando 0
                credentials: "include"
            });

            const resultado = await respuesta.json();

            if (respuesta.ok) {
                modalConfirmar.hide();

                const cajaComentarios = botonActivo.closest(".comentarios-box");
                const contenedorForm = cajaComentarios.querySelector(".form-contenedor");
                const avisoCerrado = cajaComentarios.querySelector(".aviso-cerrado");

                // El autor ya lo cerró, hacemos desaparecer el botón de control
                botonActivo.remove();
                
                if (contenedorForm) contenedorForm.style.display = "none";
                if (avisoCerrado) avisoCerrado.style.display = "block";
            } else {
                alert(resultado.mensaje);
            }
        } catch (error) {
            console.error("Error al cerrar comentarios:", error);
        }
    });
});