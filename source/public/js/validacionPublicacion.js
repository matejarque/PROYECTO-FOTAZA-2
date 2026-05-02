document.querySelector("#modalCrearPublicacion form").addEventListener("submit", function(e) {
    const titulo = document.querySelector("[name='titulo']").value.trim();
    const descripcion = document.querySelector("[name='descripcion']").value.trim();
    const imagenes = document.querySelector("[name='imagenes']").files;

    if (!titulo || !descripcion || imagenes.length === 0) {
        e.preventDefault();
        alert("Completa tdos los camps");
    }
});