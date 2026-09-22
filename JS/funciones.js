// FUNCIONES AUXILIARES
function obtenerFechaFormateada() {
    const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const fecha = new Date();
    return fecha.toLocaleDateString('es-PE', opciones);
}

function mostrarError(idContenedor, mensaje) {
    const contenedor = document.getElementById(idContenedor);
    if (contenedor) {
        contenedor.textContent = mensaje;
        contenedor.style.display = "block";
    }
}

function limpiarError(idContenedor) {
    const contenedor = document.getElementById(idContenedor);
    if (contenedor) {
        contenedor.textContent = "";
        contenedor.style.display = "none";
    }
}