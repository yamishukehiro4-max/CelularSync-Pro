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
        // Cambiar a Vista Usuario (Documentación y Demo)
        body.classList.add('modo-usuario');
        btnTexto.innerText = "Vista Administrador";
        adminView.classList.add('seccion-oculta');
        userView.classList.remove('seccion-oculta');
        navLinks.style.display = 'none'; // Ocultar pestañas de admin
    } else {
        // Regresar a Vista Administrador
        body.classList.remove('modo-usuario');
        btnTexto.innerText = "Vista Usuario / Cliente";
        adminView.classList.remove('seccion-oculta');
        userView.classList.add('seccion-oculta');
        navLinks.style.display = 'flex'; // Mostrar pestañas de admin
        // Asegurar que volvemos a la pestaña de Inicio por defecto
        cambiarPestana('inicio', document.querySelector('.nav-links a'));
    }
}

// --- Lógica de la Ventana Modal ---
function abrirModal(titulo, claseIcono, descripcion) {
    const modal = document.getElementById('modal-global');
    const modalTitulo = document.getElementById('modal-titulo');
    const modalDesc = document.getElementById('modal-desc');
    const modalIcono = document.getElementById('modal-icono');

    modalTitulo.innerText = titulo;
    modalDesc.innerText = descripcion;
    modalIcono.innerHTML = `<i class="fa-solid ${claseIcono}"></i>`;
    
    modal.classList.add('active');
}

function cerrarModal() {
    const modal = document.getElementById('modal-global');
    modal.classList.remove('active');
}

// Cerrar el modal haciendo clic fuera del contenido
window.onclick = function(event) {
    const modal = document.getElementById('modal-global');
    if (event.target === modal) {
        cerrarModal();
    }
}

// --- Lógica del Carrito de Compras (Demo Interactiva) ---
let carrito = [];
let totalCarrito = 0;

function toggleCart() {
    const cartPanel = document.getElementById('cart-panel');
    cartPanel.classList.toggle('active');
}

function agregarAlCarrito(nombreProducto, precioProducto) {
    // Añadir al arreglo del carrito
    carrito.push({ nombre: nombreProducto, precio: precioProducto });
    
    // Actualizar Contador
    const cartCount = document.getElementById('cart-count');
    cartCount.innerText = carrito.length;

    // Actualizar Total
    totalCarrito += precioProducto;
    
    // Renderizar la lista
    actualizarVistaCarrito();
    
    // Abrir el panel automáticamente para que el usuario vea su producto
    const cartPanel = document.getElementById('cart-panel');
    if (!cartPanel.classList.contains('active')) {
        cartPanel.classList.add('active');
    }
}

function eliminarDelCarrito(index) {
    // Restar el precio del total
    totalCarrito -= carrito[index].precio;
    
    // Eliminar el objeto del arreglo
    carrito.splice(index, 1);
    
    // Actualizar Contador
    const cartCount = document.getElementById('cart-count');
    cartCount.innerText = carrito.length;
    
    // Renderizar la lista nuevamente
    actualizarVistaCarrito();
}

function actualizarVistaCarrito() {
    const ulCarrito = document.getElementById('cart-items');
    const spanTotal = document.getElementById('total-price');
    
    // Limpiar lista actual
    ulCarrito.innerHTML = '';
    
    // Generar nuevos items
    carrito.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="cart-item-info">
                <span class="cart-item-name">${item.nombre}</span>
                <span class="cart-item-price">$${item.precio.toFixed(2)}</span>
            </div>
            <i class="fa-solid fa-trash cart-item-remove" onclick="eliminarDelCarrito(${index})"></i>
        `;
        ulCarrito.appendChild(li);
    });
    
    // Imprimir total
    spanTotal.innerText = totalCarrito.toFixed(2);
}

function procesarPago() {
    if (carrito.length === 0) {
        alert("¡Tu carrito está vacío! Agrega algunos productos para probar la simulación.");
        return;
    }
    
    alert(`[SIMULACIÓN DEL SISTEMA] \n\n¡Compra procesada con éxito por un total de $${totalCarrito.toFixed(2)}!\n\nEn el backend de Python, esto habría: \n1. Descontado el stock en SQL.\n2. Guardado la ganancia.\n3. Generado el PDF del recibo.`);
    
    // Vaciar carrito después de simular la compra
    carrito = [];
    totalCarrito = 0;
    document.getElementById('cart-count').innerText = "0";
    actualizarVistaCarrito();
    toggleCart(); // Cerrar el panel
}