document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // VALIDACION PARA +1FOTO
    // ==========================================
    const formCrear = document.getElementById("formCrearPublicacionNueva");
    if (formCrear) {
        formCrear.addEventListener("submit", (e) => {
            const inputFiles = formCrear.querySelector('input[name="imagenes"]');
            if (inputFiles && inputFiles.files.length < 2) {
                e.preventDefault();
                alert("Debes seleccionar al menos 2 imágenes o videos para realizar una publicación as");
            }
        });
    }

    // ==========================================
    // SOLUCION AL ERROR (de backdrop) inyecta el modal directamente
    // ==========================================
    if (!document.getElementById("modalConfirmarComentarios")) {
        const modalHTML = `
            <div class="modal fade" id="modalConfirmarComentarios" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">⚠️ Confirmar Cierre</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <p>¿Estás seguro de que deseas cerrar los comentarios de esta publicación? No se admitirán más interacciones.</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button type="button" id="btnAceptarCambioComentarios" class="btn btn-danger">🔒 Cerrar definitivo</button>
                        </div>
                    </div>
                </div>
            </div>`;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    // ==========================================
    // LOGICA DE CIERRE
    // ==========================================
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

    if (btnAceptarModal) {
        btnAceptarModal.addEventListener("click", async () => {
            if (!publicacionSeleccionada) return;
            try {
                const respuesta = await fetch(`/comentarios/modificar-apertura/${publicacionSeleccionada}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ comentarioAbierto: 0 }),
                    credentials: "include"
                });

                if (respuesta.ok) {
                    modalConfirmar.hide();
                    const cajaComentarios = botonActivo.closest(".comentarios-box");
                    const contenedorForm = cajaComentarios.querySelector(".form-contenedor");
                    const avisoCerrado = cajaComentarios.querySelector(".aviso-cerrado");

                    botonActivo.remove();
                    if (contenedorForm) contenedorForm.style.display = "none";
                    if (avisoCerrado) avisoCerrado.style.display = "block";
                } else {
                    const res = await respuesta.json();
                    alert(res.mensaje);
                }
            } catch (error) {
                console.error("Error al cerrar comentarios:", error);
            }
        });
    }

    // ==========================================
    // REPORTES INTERACTIVOS
    // ==========================================
    const botonesAbrirReporte = document.querySelectorAll(".btn-abrir-reporte");
    const btnConfirmarReporte = document.getElementById("btnConfirmarReporte");
    const selectMotivo = document.getElementById("selectMotivoDenuncia");

    botonesAbrirReporte.forEach(btn => {
        btn.addEventListener("click", () => {
            const idPub = btn.getAttribute("data-id-publicacion");
            if (btnConfirmarReporte) btnConfirmarReporte.setAttribute("data-id-publicacion", idPub);
        });
    });

    if (btnConfirmarReporte) {
        btnConfirmarReporte.addEventListener("click", async () => {
            const idPub = btnConfirmarReporte.getAttribute("data-id-publicacion");
            const motivo = selectMotivo.value;

            if (!motivo) {
                alert("Por favor, selecciona un motivo válido.");
                return;
            }

            try {
                const respuesta = await fetch("/denuncias/crear", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ idPublicacion: idPub, idMotivo: motivo }),
                    credentials: "include"
                });

                if (respuesta.ok) {
                    alert("REPORTE ENVIADSO CON EXITO");
                    const modalEl = document.getElementById("modalReportar");
                    const modalInstance = bootstrap.Modal.getInstance(modalEl);
                    if (modalInstance) modalInstance.hide();
                } else {
                    alert("Error al procesar la denuncia en el servidor.");
                }
            } catch (error) {
                console.error("Error al reportar:", error);
            }
        });
    }

    // ==========================================
    //  SUBIDA ASINCRONICA DE PUNTUACIONES
    // ==========================================
    const formulariosPuntuar = document.querySelectorAll(".form-puntuar");
    formulariosPuntuar.forEach(form => {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            const idImagen = form.getAttribute("data-id-imagen");
            const puntuacion = form.querySelector(".select-puntuacion").value;

            try {
                const respuesta = await fetch("/valoraciones/registrar", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ idImagen, puntuacion }),
                    credentials: "include"
                });

                if (respuesta.ok) {
                    alert(" Gracias por puntuar esta foto!");
                    const modalEl = document.getElementById(`modalValorar-${idImagen}`);
                    const modalInstance = bootstrap.Modal.getInstance(modalEl);
                    if (modalInstance) modalInstance.hide();
                    location.reload();
                } else {
                    const res = await respuesta.json();
                    alert(res.mensaje || "Error al registrar la puntuación.");
                }
            } catch (error) {
                console.error("Error al puntuar:", error);
            }
        });
    });
});