document.addEventListener("DOMContentLoaded", () => {
    const botonesPuntuar = document.querySelectorAll(".btn-puntuar-foto");

    botonesPuntuar.forEach(boton => {
        boton.addEventListener("click", () => {
            const idImagen = boton.getAttribute("data-id-imagen");
            const idAutor = boton.getAttribute("data-id-autor");
            const idLogueado = boton.getAttribute("data-id-logueado");

            if (!idLogueado) {
                const modalCheckInstance = new bootstrap.Modal(document.getElementById("modalCheck"));
                modalCheckInstance.show();
                return;
            }

            if (parseInt(idLogueado) === parseInt(idAutor)) {
                alert("No puedes valorizar tus propias imágenes.");
                return;
            }

            const modalValorarElement = document.getElementById(`modalValorar-${idImagen}`);
            if (modalValorarElement) {
                const modalValorarInstance = new bootstrap.Modal(modalValorarElement);
                modalValorarInstance.show();
            } else {
                alert("Formulario de valoracion no disponible para esta imagen.");
            }
        });
    });
});