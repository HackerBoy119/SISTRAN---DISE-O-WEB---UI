document.addEventListener("DOMContentLoaded", () => {
  // ===== 1. MODO OSCURO (ESTILO TAILWIND) =====
  const btnDarkMode = document.getElementById("btn-dark-mode");
  const htmlElement = document.documentElement; // Etiqueta <html>

  if (btnDarkMode) {
    if (localStorage.getItem("tema") === "dark") {
      htmlElement.classList.add("dark");
      btnDarkMode.textContent = "☀️";
    } else {
      btnDarkMode.textContent = "🌙";
    }

    btnDarkMode.addEventListener("click", () => {
      htmlElement.classList.toggle("dark");
      if (htmlElement.classList.contains("dark")) {
        localStorage.setItem("tema", "dark");
        btnDarkMode.textContent = "☀️";
      } else {
        localStorage.setItem("tema", "light");
        btnDarkMode.textContent = "🌙";
      }
    });
  }

  // Fecha Actual
  const displayFecha = document.getElementById("fechaActualDisplay");
  if (displayFecha) {
    displayFecha.textContent = "Fecha Actual: " + obtenerFechaFormateada();
  }

  // ===== 2. MENÚ HAMBURGUESA (TAILWIND) =====
  const btnMenuMovil = document.getElementById('btn-menu-movil');
  const menuPrincipal = document.getElementById('menu-principal');

  if (btnMenuMovil && menuPrincipal) {
      btnMenuMovil.addEventListener('click', () => {
          // Tailwind usa 'hidden' para ocultar y 'flex' para mostrar
          menuPrincipal.classList.toggle('hidden');
          menuPrincipal.classList.toggle('flex');
      });
  }
});