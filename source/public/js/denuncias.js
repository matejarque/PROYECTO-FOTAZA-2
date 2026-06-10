document.addEventListener("DOMContentLoaded", async () => {

    const inputPublicacion = document.getElementById("idPublicacionReporte");
    const inputComentario = document.getElementById("idComentarioReporte");
    const btnEnviar = document.getElementById("btnEnviarReporte");
    const selectMotivo = document.getElementById("motivoReporte");

    // =====================
    // CARGAR MOTIVOS
    // =====================

    try {

        const respuesta = await fetch("/motivo-denuncia/listar-motivos");

        const data = await respuesta.json();

        selectMotivo.innerHTML =
            '<option value="">Seleccionar motivo</option>';

        data.resul.forEach(motivo => {

            const option = document.createElement("option");

            option.value = motivo.id_motivo;
            option.textContent = motivo.nombre;

            selectMotivo.appendChild(option);

        });

    } catch(error) {
        console.error("Error cargando motivos", error);
    }

    // =====================
    // PUBLICACION
    // =====================

    document.querySelectorAll(".btn-abrir-reporte-publicacion")
    .forEach(btn => {
 btn.addEventListener("click", () => {inputPublicacion.value = btn.dataset.idPublicacion; inputComentario.value = "";});
 });

    // =====================
    // COMENTARIO
    // =====================

    document.querySelectorAll(".btn-abrir-reporte-comentario")
    .forEach(btn => {

        btn.addEventListener("click", () => {

            inputPublicacion.value = btn.dataset.idPublicacion;
            inputComentario.value = btn.dataset.idComentario;});

    });

    // =====================
    // ENVIAR
    // =====================

    btnEnviar.addEventListener("click", async () => {

        console.log({publicacion: inputPublicacion.value,
            comentario: inputComentario.value,
            motivo: selectMotivo.value
        });

        try {

            const respuesta = await fetch("/denuncias", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    idPublicacion: inputPublicacion.value,
                    idComentario: inputComentario.value || null,
                    idMotivo: selectMotivo.value
                })
            });

            const resultado = await respuesta.json();

            if (respuesta.ok) {

                alert("Denuncia enviada");

                bootstrap.Modal
                    .getInstance(
                        document.getElementById("modalReportar")
                    )
                    .hide();

            } else {
                alert(resultado.mensaje);
            }

        } catch(error) {

            console.error(error);
            alert("Error al denunciar");

        }

    });

});