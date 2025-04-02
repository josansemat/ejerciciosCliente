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


// Escribe aquí tu código
addEventListener("DOMContentLoaded", iniciar);

// Declarar variables globales
let categorias, productos, caracteristicas;

function iniciar(){
categorias = document.getElementById("categorias");
productos = document.getElementById("productos");
caracteristicas = document.getElementById("caracteristicas");

cargarCategorias();
// Limpiamos las características al iniciar
caracteristicas.innerHTML = "";
}

// cargar categorias
function cargarCategorias(){
    categorias.innerHTML = "";
    CATEGORIAS.forEach(categoria => {
        categorias.innerHTML += `
            <div class="col">
                <h1>
                    <span class="badge bg-info cursor-pointer" onclick="cargarProductos(${categoria.id})">${categoria.nombre}</span>
                </h1>
            </div>
        `;
    });
}


// cargar productos
function cargarProductos(categoriaId){
    productos.innerHTML = "";
    const productosFiltrados = PRODUCTOS.filter((item) => item.categoria == categoriaId);
    
    productosFiltrados.forEach(producto => {
        productos.innerHTML += `
            <div class="card col m-2" style="width: 18rem;">
                <img src="images/${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">${producto.descripcion}</p>
                    <p class="card-text">Precio: ${producto.precio}€</p>
                    <a href="#" class="btn btn-primary" onclick="cargarCaracteristicas(${producto.id});">Características</a>
                </div>
            </div>
        `;
    });
}

// cargar caracteristicas
function cargarCaracteristicas(id){
    
    caracteristicas.innerHTML = "";
    const producto = PRODUCTOS.find((item) => item.id == id);
    console.log("Cargando características para producto:", id);
    console.log("Producto encontrado:", producto);
    if (producto) {
        // Añadir título con el nombre del producto
        caracteristicas.innerHTML = `<li class="list-group-item d-flex justify-content-between lh-sm bg-primary text-white">
            <h6 class="my-0">Características de ${producto.nombre}</h6>
        </li>`;
        
        if (producto.caracteristicas && producto.caracteristicas.length > 0) {
            producto.caracteristicas.forEach(caract => {
                caracteristicas.innerHTML += `
                    <li class="list-group-item d-flex justify-content-between lh-sm">
                        <h6 class="my-0">${caract}</h6>
                    </li>
                `;
            });
        } else {
            caracteristicas.innerHTML += `
                <li class="list-group-item d-flex justify-content-between lh-sm">
                    <h6 class="my-0">No hay características disponibles</h6>
                </li>
            `;
        }
    } else {
        console.error("No se encontró el producto con ID:", id);
        caracteristicas.innerHTML = `
            <li class="list-group-item d-flex justify-content-between lh-sm">
                <h6 class="my-0">Producto no encontrado</h6>
            </li>
        `;
    }
}
    



























// filtrar
function filtrarCategoria(id) {
    let productos=[];
    for(let i=0; i<PRODUCTOS.length;i++){
        if(idCategoria==PRODUCTOS[i].categoria) productos.push(PRODUCTOS[i]);
    }
    return productos;
}
function filtrarCategoria2(id) {
  return  PRODUCTOS.filter((item)=>item.categoria==id)
}
// filtrar productos
function filtrarProductos(id) {
    let productos=[];
    for(let i=0; i<PRODUCTOS.length;i++){
        if(id==PRODUCTOS[i].id) productos.push(PRODUCTOS[i]);
    }
    return productos;
}
