// Escribe aquí tu código

// Inicializar eventos cuando se cargue la página
addEventListener('load', inicializarEventos, false);

function inicializarEventos() {
    // Cargar las categorías al iniciar la página
    cargarCategorias();
}

/**
 * Función para cargar las categorías desde la API mediante AJAX
 */
function cargarCategorias() {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                try {
                    // Obtener el XML de la respuesta
                    let xml = xhr.responseXML;
                    // Convertir el XML a un formato más manejable
                    let categorias = xml2jsonCategorias(xml);
                    // Mostrar las categorías en la interfaz
                    mostrarCategorias(categorias);
                } catch (ex) {
                    console.error("Error al procesar las categorías: " + ex.message);
                }
            } else {
                console.error("Error al cargar las categorías. Estado: " + xhr.status);
            }
        }
    };
    
    // Configurar la petición AJAX
    xhr.open('GET', 'api/cargar_categorias_xml.php', true);
    xhr.timeout = 3000; // Tiempo máximo de espera: 3 segundos
    xhr.ontimeout = () => {
        console.error("Tiempo de espera agotado al cargar las categorías");
    };
    xhr.send();
}

/**
 * Convierte el XML de categorías a un array de objetos JavaScript
 */
function xml2jsonCategorias(xml) {
    let categoriasXML = xml.getElementsByTagName("categorias");
    let categorias = [];
    
    for (let i = 0; i < categoriasXML.length; i++) {
        let categoria = categoriasXML[i];
        let id = categoria.getElementsByTagName("id")[0].textContent;
        let nombre = categoria.getElementsByTagName("nombre")[0].textContent;
        
        categorias.push({ id: id, nombre: nombre });
    }
    
    return categorias;
}

/**
 * Muestra las categorías en la interfaz
 */
function mostrarCategorias(categorias) {
    let contenedor = document.getElementById("inputCategorias");
    contenedor.innerHTML = ''; // Limpiar el contenedor
    
    // Generar HTML para cada categoría
    categorias.forEach(categoria => {
        let divCol = document.createElement("div");
        divCol.className = "col";
        
        let boton = document.createElement("button");
        boton.className = "btn btn-info";
        boton.textContent = categoria.nombre;
        // Añadir evento para cargar productos de esta categoría cuando se haga clic
        boton.onclick = function() {
            cargarProductos(categoria.id);
        };
        
        divCol.appendChild(boton);
        contenedor.appendChild(divCol);
    });
}
/**
 * Función para cargar los productos de una categoría específica
 */
function cargarProductos(categoriaId) {
    console.log("Cargando productos de la categoría: " + categoriaId);
    
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                try {
                    // Convertir la respuesta JSON a objetos JavaScript
                    const productos = JSON.parse(xhr.responseText);
                    
                    // Filtrar productos por categoría
                    const productosFiltrados = productos.filter(
                        producto => producto.id_categoria == categoriaId
                    );
                    
                    // Mostrar los productos
                    mostrarProductos(productosFiltrados);
                } catch (ex) {
                    console.error("Error al procesar los productos: " + ex.message);
                }
            } else {
                console.error("Error al cargar los productos. Estado: " + xhr.status);
            }
        }
    };
    
    // Configurar la petición AJAX
    xhr.open('GET', 'api/cargar_productos_json.php', true);
    xhr.timeout = 3000; // Tiempo máximo de espera: 3 segundos
    xhr.ontimeout = () => {
        console.error("Tiempo de espera agotado al cargar los productos");
    };
    xhr.send();
}

/**
 * Muestra los productos en la interfaz
 */
function mostrarProductos(productos) {
    let contenedor = document.getElementById("inputProductos");
    contenedor.innerHTML = ''; // Limpiar el contenedor
    
    if (productos.length === 0) {
        contenedor.innerHTML = '<div class="col-12 text-center"><p>No hay productos disponibles en esta categoría</p></div>';
        return;
    }
    
    // Generar HTML para cada producto
    productos.forEach(producto => {
        let divCard = document.createElement("div");
        divCard.className = "card col m-2";
        divCard.style = "width: 18rem;";
        
        divCard.innerHTML = `
            <img src="images/${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
            <div class="card-body">
                <h3 class="card-title">${producto.nombre}</h3>
                <h4 class="card-text">${producto.precio} €</h4>
                <a class="btn btn-primary">Detalles</a>
            </div>
        `;
        
        // Añadir evento para mostrar detalles del producto
        const btnDetalles = divCard.querySelector('.btn');
        btnDetalles.onclick = function() {
            cargarDetalles(producto.id);
        };
        
        contenedor.appendChild(divCard);
    });
}

/**
 * Carga y muestra los detalles de un producto específico
 */
function cargarDetalles(productoId) {
    console.log("Cargando detalles del producto: " + productoId);
    
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                try {
                    // Convertir la respuesta JSON a objetos JavaScript
                    const productos = JSON.parse(xhr.responseText);
                    
                    // Buscar el producto por ID
                    const producto = productos.find(p => p.id == productoId);
                    
                    // Mostrar los detalles del producto
                    if (producto) {
                        mostrarDetallesProducto(producto);
                    } else {
                        console.error("Producto no encontrado");
                    }
                } catch (ex) {
                    console.error("Error al procesar los detalles del producto: " + ex.message);
                }
            } else {
                console.error("Error al cargar los detalles del producto. Estado: " + xhr.status);
            }
        }
    };
    
    // Configurar la petición AJAX
    xhr.open('GET', 'api/cargar_productos_json.php', true);
    xhr.timeout = 3000; // Tiempo máximo de espera: 3 segundos
    xhr.ontimeout = () => {
        console.error("Tiempo de espera agotado al cargar los detalles del producto");
    };
    xhr.send();
}

/**
 * Muestra los detalles de un producto en la interfaz
 */
function mostrarDetallesProducto(producto) {
    let contenedor = document.getElementById("inputDescripcion");
    
    // Crear contenido HTML con los detalles del producto
    let html = `
        <div>
            <h4>${producto.nombre}</h4>
            <p><strong>Precio:</strong> ${producto.precio} €</p>
            <p><strong>Descripción:</strong> ${producto.descripcion}</p>
            <p><strong>Características:</strong> ${producto.caracteristicas}</p>
        </div>
    `;
    
    // Insertar el HTML en el contenedor
    contenedor.innerHTML = html;
}