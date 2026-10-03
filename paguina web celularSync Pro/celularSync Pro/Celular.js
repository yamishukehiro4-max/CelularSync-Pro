// --- Lógica de Súper Animación de Carga ---
window.addEventListener('load', () => {
    // Le damos 2.5 segundos para que el usuario admire la animación de carga premium
    setTimeout(() => {
        const loader = document.getElementById('pantalla-carga');
        loader.style.opacity = '0';
        setTimeout(() => { loader.style.visibility = 'hidden'; }, 800);
    }, 2500); 
});

// --- Lógica de Menú Hamburguesa para Móviles ---
function toggleMenu() {
    const navLinks = document.getElementById('nav-links');
    navLinks.classList.toggle('show-menu');
}

function cerrarMenuMobile() {
    const navLinks = document.getElementById('nav-links');
    if (navLinks.classList.contains('show-menu')) {
        navLinks.classList.remove('show-menu');
    }
}

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
    // 1. Mostrar animación de carga con spinners
    const loader = document.getElementById('pantalla-carga');
    const loaderBar = document.querySelector('.loader-progreso');
    const loaderSubtitulo = document.querySelector('.loader-subtitulo');

    // Reiniciar animación de la barra CSS
    loaderBar.style.animation = 'none';
    loaderBar.offsetHeight; /* trigger reflow para que vuelva a iniciar */
    loaderBar.style.animation = null;

    // Cambiar el texto de la carga dependiendo hacia dónde vamos
    if (!modoUsuario) {
        loaderSubtitulo.innerText = "Cargando interfaz de cliente (Frontend)...";
    } else {
        loaderSubtitulo.innerText = "Iniciando entorno de gestión empresarial de alto nivel...";
    }

    // Hacemos visible el cargador
    loader.style.visibility = 'visible';
    loader.style.opacity = '1';

    // 2. Retrasar el cambio de vista visual para que se disfrute la animación
    setTimeout(() => {
        modoUsuario = !modoUsuario;
        const body = document.body;
        const btnTexto = document.getElementById('texto-btn-usuario');
        const adminView = document.getElementById('admin-view');
        const userView = document.getElementById('user-view');
        const navLinks = document.getElementById('nav-links');
        const btnMenuToggle = document.querySelector('.menu-hamburguesa');

        if (modoUsuario) {
            // Cambiar a Vista Usuario con colores claros
            body.classList.add('modo-usuario');
            btnTexto.innerText = "Volver a Vista Admin";
            adminView.classList.add('seccion-oculta');
            userView.classList.remove('seccion-oculta');
            navLinks.style.display = 'none'; 
            btnMenuToggle.style.display = 'none'; // Ocultar hamburguesa en vista usuario
        } else {
            // Regresar a Vista Administrador Premium
            body.classList.remove('modo-usuario');
            btnTexto.innerText = "Vista Usuario / Cliente";
            adminView.classList.remove('seccion-oculta');
            userView.classList.add('seccion-oculta');
            
            // Restaurar menú dependiendo del tamaño de pantalla
            navLinks.style.display = window.innerWidth > 900 ? 'flex' : 'none'; 
            btnMenuToggle.style.display = window.innerWidth <= 900 ? 'block' : 'none';
            
            cambiarPestana('inicio', document.querySelector('.nav-links a'));
        }

        // 3. Ocultar la animación suavemente después de hacer el cambio
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => { loader.style.visibility = 'hidden'; }, 800);
        }, 800); // 800ms de gracia visual

    }, 1500); // 1.5 segundos simulando la carga del sistema
}

// --- Lógica Mejorada de la Ventana Modal ---
function abrirModal(titulo, claseIcono, descripcion) {
    const modal = document.getElementById('modal-global');
    const modalTitulo = document.getElementById('modal-titulo');
    const modalDesc = document.getElementById('modal-desc');
    const modalIcono = document.getElementById('modal-icono');

    // Inyectar la información dinámica (ahora soporta saltos de línea con \n gracias al CSS white-space: pre-line)
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

// Cerrar el modal haciendo clic en cualquier parte oscura (Optimizado para móviles)
window.addEventListener('click', function(event) {
    const modal = document.getElementById('modal-global');
    if (event.target === modal) {
        cerrarModal();
    }
});

// Soporte táctil extra para cerrar modal fuera de la caja en celulares
window.addEventListener('touchstart', function(event) {
    const modal = document.getElementById('modal-global');
    if (event.target === modal) {
        cerrarModal();
    }
});

// --- Lógica del Carrito de Compras (Demo Interactiva y Funcional) ---
let carrito = [];
let totalCarrito = 0;

function toggleCart() {
    const cartPanel = document.getElementById('cart-panel');
    cartPanel.classList.toggle('active');
}

function agregarAlCarrito(nombreProducto, precioProducto) {
    // Añadir el objeto al arreglo del carrito
    carrito.push({ nombre: nombreProducto, precio: precioProducto });
    
    // Actualizar Contador visual
    const cartCount = document.getElementById('cart-count');
    cartCount.innerText = carrito.length;

    // Actualizar Total matemático
    totalCarrito += precioProducto;
    
    // Renderizar lista
    actualizarVistaCarrito();
    
    // Abrir el panel lateral automáticamente
    const cartPanel = document.getElementById('cart-panel');
    if (!cartPanel.classList.contains('active')) {
        cartPanel.classList.add('active');
    }
}

function eliminarDelCarrito(index) {
    // Restar el precio
    totalCarrito -= carrito[index].precio;
    
    // Eliminar del arreglo
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
    
    // Limpiar lista
    ulCarrito.innerHTML = '';
    
    // Generar HTML por producto
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
    
    spanTotal.innerText = totalCarrito.toFixed(2);
}

function procesarPago() {
    if (carrito.length === 0) {
        alert("¡Tu carrito está completamente vacío! Agrega algunos dispositivos o accesorios para probar la simulación.");
        return;
    }
    
    alert(`[SIMULACIÓN EXITOSA DEL SISTEMA PYTHON] \n\n¡Compra procesada con éxito por un total de $${totalCarrito.toFixed(2)}!\n\nEn el entorno de producción, esto acaba de ejecutar: \n1. Sentencia UPDATE en SQL para descontar el stock.\n2. Inserción de las ganancias en el reporte del día.\n3. Generación automática del comprobante de garantía en PDF.`);
    
    carrito = [];
    totalCarrito = 0;
    document.getElementById('cart-count').innerText = "0";
    actualizarVistaCarrito();
    toggleCart();
}