// --- Lógica de Navegación por Pestañas ---
function cambiarPestana(idPestana, elementoLink) {
    // 1. Ocultar todas las secciones del panel de administración
    const secciones = document.querySelectorAll('#admin-view section');
    secciones.forEach(sec => {
        sec.classList.remove('seccion-activa');
        sec.classList.add('seccion-oculta');
    });

    // 2. Mostrar la sección seleccionada
    const seccionActiva = document.getElementById(idPestana);
    if (seccionActiva) {
        seccionActiva.classList.remove('seccion-oculta');
        seccionActiva.classList.add('seccion-activa');
    }

    // 3. Actualizar la clase 'active' en el menú de navegación
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => link.classList.remove('active'));
    if (elementoLink) {
        elementoLink.classList.add('active');
    }
}

// --- Cambio entre Vista Administrador y Vista Usuario (Documentación) ---
let modoUsuario = false;

function toggleModoUsuario() {
    modoUsuario = !modoUsuario;
    const body = document.body;
    const btnTexto = document.getElementById('texto-btn-usuario');
    const adminView = document.getElementById('admin-view');
    const userView = document.getElementById('user-view');
    const navLinks = document.getElementById('nav-links');

    if (modoUsuario) {
        // Cambiar a Vista Usuario (Documentación y Demo) con colores claros pastel
        body.classList.add('modo-usuario');
        btnTexto.innerText = "Volver a Vista Admin";
        adminView.classList.add('seccion-oculta');
        userView.classList.remove('seccion-oculta');
        navLinks.style.display = 'none'; // Ocultar pestañas de admin para limpiar la UI
    } else {
        // Regresar a Vista Administrador con colores oscuros pastel mate
        body.classList.remove('modo-usuario');
        btnTexto.innerText = "Vista Usuario / Cliente";
        adminView.classList.remove('seccion-oculta');
        userView.classList.add('seccion-oculta');
        navLinks.style.display = 'flex'; // Mostrar pestañas de admin
        // Asegurar que volvemos a la pestaña de Inicio por defecto al cambiar de vista
        cambiarPestana('inicio', document.querySelector('.nav-links a'));
    }
}

// --- Lógica Mejorada de la Ventana Modal ---
function abrirModal(titulo, claseIcono, descripcion) {
    const modal = document.getElementById('modal-global');
    const modalTitulo = document.getElementById('modal-titulo');
    const modalDesc = document.getElementById('modal-desc');
    const modalIcono = document.getElementById('modal-icono');

    // Inyectar la información dinámica
    modalTitulo.innerText = titulo;
    modalDesc.innerText = descripcion;
    modalIcono.innerHTML = `<i class="fa-solid ${claseIcono}"></i>`;
    
    // Activar animación y visibilidad
    modal.classList.add('active');
}

function cerrarModal() {
    const modal = document.getElementById('modal-global');
    modal.classList.remove('active');
}

// Cerrar el modal haciendo clic fuera de la caja de contenido
window.onclick = function(event) {
    const modal = document.getElementById('modal-global');
    if (event.target === modal) {
        cerrarModal();
    }
}

// --- Lógica del Carrito de Compras (Demo Interactiva y Funcional) ---
let carrito = [];
let totalCarrito = 0;

function toggleCart() {
    const cartPanel = document.getElementById('cart-panel');
    cartPanel.classList.toggle('active');
}

function agregarAlCarrito(nombreProducto, precioProducto) {
    // Añadir el objeto al arreglo del carrito en memoria temporal
    carrito.push({ nombre: nombreProducto, precio: precioProducto });
    
    // Actualizar Contador visual (Burbuja roja)
    const cartCount = document.getElementById('cart-count');
    cartCount.innerText = carrito.length;

    // Actualizar Total matemático
    totalCarrito += precioProducto;
    
    // Renderizar la lista actualizada en el HTML
    actualizarVistaCarrito();
    
    // Abrir el panel lateral automáticamente para dar retroalimentación al usuario
    const cartPanel = document.getElementById('cart-panel');
    if (!cartPanel.classList.contains('active')) {
        cartPanel.classList.add('active');
    }
}

function eliminarDelCarrito(index) {
    // Restar el precio del producto eliminado del total
    totalCarrito -= carrito[index].precio;
    
    // Eliminar el objeto del arreglo usando splice
    carrito.splice(index, 1);
    
    // Actualizar Contador visual
    const cartCount = document.getElementById('cart-count');
    cartCount.innerText = carrito.length;
    
    // Renderizar la lista nuevamente
    actualizarVistaCarrito();
}

function actualizarVistaCarrito() {
    const ulCarrito = document.getElementById('cart-items');
    const spanTotal = document.getElementById('total-price');
    
    // Limpiar lista actual para evitar duplicados al renderizar
    ulCarrito.innerHTML = '';
    
    // Generar nuevos elementos HTML por cada producto en el arreglo
    carrito.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="cart-item-info">
                <span class="cart-item-name">${item.nombre}</span>
                <span class="cart-item-price">$${item.precio.toFixed(2)}</span>
            </div>
            <i class="fa-solid fa-trash cart-item-remove" onclick="eliminarDelCarrito(${index})" title="Eliminar producto"></i>
        `;
        ulCarrito.appendChild(li);
    });
    
    // Imprimir total general formateado a 2 decimales
    spanTotal.innerText = totalCarrito.toFixed(2);
}

function procesarPago() {
    // Validación: No permitir pago si el carrito está vacío
    if (carrito.length === 0) {
        alert("¡Tu carrito está completamente vacío! Agrega algunos dispositivos o accesorios para probar la simulación.");
        return;
    }
    
    // Alerta de éxito emulando el backend
    alert(`[SIMULACIÓN EXITOSA DEL SISTEMA PYTHON] \n\n¡Compra procesada con éxito por un total de $${totalCarrito.toFixed(2)}!\n\nEn el entorno de producción, esto acaba de ejecutar: \n1. Sentencia UPDATE en SQL para descontar el stock.\n2. Inserción de las ganancias en el reporte del día.\n3. Generación automática del comprobante de garantía en PDF.`);
    
    // Resetear el estado del carrito tras una compra exitosa
    carrito = [];
    totalCarrito = 0;
    document.getElementById('cart-count').innerText = "0";
    actualizarVistaCarrito();
    toggleCart(); // Ocultar el panel
}