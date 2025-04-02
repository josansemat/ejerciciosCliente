const CATEGORIAS = [
	{ id: 1, nombre: "Ratones" },
	{ id: 2, nombre: "Teclados" },
	{ id: 3, nombre: "Monitores" }
];
const PRODUCTOS = [
	{ id: 1, categoria: 1, nombre: "Ratón Logitech G2023", precio:24.90, descripcion: "Tecnología LIGHTSYNC, un sensor para gaming y un diseño clásico con 6 botones", imagen: "logitech-g203.webp", caracteristicas: ["Ancho: 34mm", "Prof.: 116mm", "Alto: 42mm", "Peso: 85g"] },
	{ id: 2, categoria: 1, nombre: "Ratón MSI Clutch GM08",precio: 9.99, descripcion: "Con un preciso Sensor PAW-3519 óptico de hasta 3200 DPI", imagen: "msi-gm08.webp", caracteristicas: ["Ancho: 40mm", "Prof.: 128mm", "Alto: 40", "Peso: 92g"] },
	{ id: 3, categoria: 1, nombre: "Ratón Tempest MS300", precio: 15.23, descripcion: "Ratón gaming diseñado para ofrecer precisión y estilo a los gamers más exigentes", imagen: "tempest-ms300.webp", caracteristicas: ["Ancho: 41mm", "Prof.: 108mm", "Alto: 38", "Peso: 75g"] },
	{ id: 5, categoria: 2, nombre: "Teclado Corsair K55", precio: 72.19, descripcion: "Ilumine sus sesiones de juego con retroiluminación RGB de diez zonas", imagen: "teclado_corsair_k55.webp", caracteristicas: ["Color: Negro", "Iluminación: Sí"] },
	{ id: 6, categoria: 2, nombre: "Teclado Tempest K20", precio: 83.55, descripcion: "Un teclado con un diseño gaming exclusivo", imagen: "teclado_tempest_k20.webp", caracteristicas: ["Color: Blanco", "Tipo: Mecánico", "Layout: Español", "Peso: 450gr", "Nº teclas: 68"] },
	{ id: 7, categoria: 2, nombre: "Teclado Owlotech EMK500", precio: 34.99, descripcion: "Está diseñado para proporcionar una experiencia de uso ergonómica y comodísima", imagen: "teclado_owlotech.webp", caracteristicas: ["Color: Negro", "Tipo: Mecánico", "Peso: 112g"] },
	{ id: 8, categoria: 3, nombre: "Monitor LG 24GS50F", precio: 150.12, descripcion: "Monitor diseñado especialmente para gamers", imagen: "monitor_lg.webp", caracteristicas: ["Tipo HD: Full HD", "Pantalla táctil: No"] },
	{ id: 9, categoria: 3, nombre: "Monitor MSG G27", precio: 169.55, descripcion: "Equipado con un panel de 1920x1080, 250hz", imagen: "monitor_msi.webp", caracteristicas: ["Curvatura: 1500R", "Relación de aspecto: 16:9"] },

];

// Variables globales
let categoriaSeleccionada = null;
let productoSeleccionado = null;

// Función para cargar las categorías
function cargarCategorias() {
    const categoriasContainer = document.getElementById('categorias');
    categoriasContainer.innerHTML = '';
    
    CATEGORIAS.forEach(categoria => {
        const divCategoria = document.createElement('div');
        divCategoria.className = 'col';
        
        const h1 = document.createElement('h1');
        
        const span = document.createElement('span');
        span.className = 'badge bg-info cursor-pointer';
        span.textContent = categoria.nombre;
        span.dataset.id = categoria.id;
        span.addEventListener('click', () => seleccionarCategoria(categoria.id));
        
        h1.appendChild(span);
        divCategoria.appendChild(h1);
        categoriasContainer.appendChild(divCategoria);
    });
}

// Función para seleccionar una categoría
function seleccionarCategoria(categoriaId) {
    categoriaSeleccionada = categoriaId;
    const spans = document.querySelectorAll('#categorias span');
    
    spans.forEach(span => {
        if (parseInt(span.dataset.id) === categoriaId) {
            span.classList.replace('bg-info', 'bg-primary');
        } else {
            span.classList.replace('bg-primary', 'bg-info');
        }
    });
    
    cargarProductos();
    limpiarCaracteristicas();
}

// Función para cargar los productos de la categoría seleccionada
function cargarProductos() {
    const productosContainer = document.getElementById('productos');
    productosContainer.innerHTML = '';
    
    const productosFiltrados = PRODUCTOS.filter(producto => producto.categoria === categoriaSeleccionada);
    
    productosFiltrados.forEach(producto => {
        const divProducto = document.createElement('div');
        divProducto.className = 'card col m-2';
        divProducto.style.width = '18rem';
        
        const img = document.createElement('img');
        img.className = 'card-img-top';
        img.src = 'images/' + producto.imagen;
        img.alt = producto.nombre;
        
        const divCardBody = document.createElement('div');
        divCardBody.className = 'card-body';
        
        const h5 = document.createElement('h5');
        h5.className = 'card-title';
        h5.textContent = producto.nombre;
        
        const p = document.createElement('p');
        p.className = 'card-text';
        p.textContent = producto.descripcion;
        
        const pPrecio = document.createElement('p');
        pPrecio.className = 'card-text fw-bold';
        pPrecio.textContent = `Precio: ${producto.precio.toFixed(2)} €`;
        
        const a = document.createElement('a');
        a.className = 'btn btn-primary';
        a.textContent = 'Características';
        a.href = '#';
        a.addEventListener('click', (e) => {
            e.preventDefault();
            mostrarCaracteristicas(producto.id);
        });
        
        divCardBody.appendChild(h5);
        divCardBody.appendChild(p);
        divCardBody.appendChild(pPrecio);
        divCardBody.appendChild(a);
        
        divProducto.appendChild(img);
        divProducto.appendChild(divCardBody);
        
        productosContainer.appendChild(divProducto);
    });
}

// Función para mostrar las características de un producto
function mostrarCaracteristicas(productoId) {
    productoSeleccionado = PRODUCTOS.find(producto => producto.id === productoId);
    
    if (!productoSeleccionado) return;
    
    const caracteristicasContainer = document.getElementById('caracteristicas');
    caracteristicasContainer.innerHTML = '';
    
    // Crear el título del producto
    const tituloLi = document.createElement('li');
    tituloLi.className = 'list-group-item d-flex justify-content-between lh-sm bg-primary text-white';
    const tituloH6 = document.createElement('h6');
    tituloH6.className = 'my-0';
    tituloH6.textContent = productoSeleccionado.nombre;
    tituloLi.appendChild(tituloH6);
    caracteristicasContainer.appendChild(tituloLi);
    
    // Añadir cada característica
    productoSeleccionado.caracteristicas.forEach(caracteristica => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between lh-sm';
        
        const h6 = document.createElement('h6');
        h6.className = 'my-0';
        h6.textContent = caracteristica;
        
        li.appendChild(h6);
        caracteristicasContainer.appendChild(li);
    });
    
    // Asegurar que el panel de características esté visible
    const caracteristicasPanel = document.querySelector('.col-md-5.col-lg-4');
    if (caracteristicasPanel) {
        caracteristicasPanel.style.display = 'block';
    }
}

// Función para limpiar las características
function limpiarCaracteristicas() {
    const caracteristicasContainer = document.getElementById('caracteristicas');
    caracteristicasContainer.innerHTML = '';
}

// Inicialización cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
    // Crear estructura del DOM si no existe
    const productosDiv = document.getElementById('productos');
    const caracteristicasUl = document.getElementById('caracteristicas');
    
    // Asegurarnos de que la estructura está completa
    if (!productosDiv.parentNode.parentNode.querySelector('.col-md-5.col-lg-4')) {
        const rowDiv = productosDiv.parentNode.parentNode;
        
        // Crear el contenedor para las características si no existe
        const caracteristicasContainer = document.createElement('div');
        caracteristicasContainer.className = 'col-md-5 col-lg-4 order-md-last';
        
        const h4 = document.createElement('h4');
        h4.className = 'd-flex justify-content-between align-items-center mb-3';
        
        const span = document.createElement('span');
        span.className = 'text-primary';
        span.textContent = 'Características';
        
        h4.appendChild(span);
        caracteristicasContainer.appendChild(h4);
        
        // Crear la lista de características si no existe
        if (!caracteristicasUl) {
            const ul = document.createElement('ul');
            ul.id = 'caracteristicas';
            ul.className = 'list-group mb-3';
            caracteristicasContainer.appendChild(ul);
        } else {
            caracteristicasContainer.appendChild(caracteristicasUl);
        }
        
        rowDiv.appendChild(caracteristicasContainer);
    }
    
    // Iniciar la aplicación
    cargarCategorias();
});

