document.addEventListener("DOMContentLoaded", () => {
    // cargar xml categoria
    let conexion1;
    conexion1 = new XMLHttpRequest();
    conexion1.open('GET', 'api/cargar_categorias_xml.php', true);
    conexion1.timeout = 3000; // Tiempo máximo de espera del API 3sg
    conexion1.addEventListener('readystatechange', procesarDatos); // Añadimos el callback
    conexion1.send();

    function procesarDatos() {
        if (conexion1.readyState == 4) {
            if (conexion1.status == 200) {
                let resultados = document.getElementById("inputCategorias");
                try {
                    let xmlDoc = conexion1.responseXML; // En la propiedad responseXML se almacena el XML (tiene una estructura similar al DOM)
                    let salida = '<div class="row">';
    
                    // Obtener todos los elementos <categoria> dentro del XML
                    let categoria = xmlDoc.getElementsByTagName("categoria");
    
                    for (let f = 0; f < categoria.length; f++) {
                        // Acceder a los datos de cada elemento <categoria>
                        let id = categoria[f].getElementsByTagName("id")[0].textContent;
                        let nombre = categoria[f].getElementsByTagName("nombre")[0].textContent;                    
                        // Crear botones con estilo Bootstrap
                        salida += '<div class="col"><button class="btn btn-info detalle-btn" data-id="'+id+'">'+nombre+'</button></div>';
                    }
                    salida += '</div>';
                    resultados.innerHTML = salida;
                    
                    // Agregar eventos a los botones "Detalle"
                    document.querySelectorAll(".detalle-btn").forEach(boton => {
                        boton.addEventListener("click", cargarProductos);
                    });
                } catch (ex) {
                    document.getElementById("inputCategorias").innerHTML = '<div class="alert alert-danger">Error al extraer datos del XML: ' + ex.message + '</div>';
                }
    
            } else {
                // Se ha recibido un código status distinto de 200
                document.getElementById("inputCategorias").innerHTML = '<div class="alert alert-danger">Error al cargar los datos</div>';
            }
        } else {
            document.getElementById("inputCategorias").innerHTML = '<div class="spinner-border text-primary" role="status"><span class="visually-hidden">Cargando...</span></div>';
        }
    }

    function cargarProductos(event) {
        let conexion2;
        conexion2 = new XMLHttpRequest();
        conexion2.open('GET', 'api/cargar_productos_json.php', true);
        conexion2.timeout = 3000; // Tiempo máximo de espera del API 3sg
        conexion2.addEventListener('readystatechange', procesarDatos2); // Añadimos el callback
        conexion2.send();
        
        // Agregar clase activa al botón seleccionado solo es visual
        document.querySelectorAll(".detalle-btn").forEach(btn => {
            btn.classList.remove("active");
        });
        event.target.classList.add("active");
        
        // Guardar el ID de la categoría seleccionada
        const categoriaId = event.target.getAttribute("data-id");
                
        function procesarDatos2() {
            if(conexion2.readyState == 4){
                if (conexion2.status == 200) {
                    let resultados = document.getElementById("inputProductos");
                    try {
                        let datos = JSON.parse(conexion2.responseText);
                        
                        // Filtrar los productos por la categoría seleccionada
                        let productosFiltrados = datos.filter(p => p.id_categoria == categoriaId);
                        let salida = '<div class="row">';
                        
                        if(productosFiltrados.length > 0){
                            for (let f = 0; f < productosFiltrados.length; f++) {
                                salida += '<div class="card col m-2" style="width: 18rem;">';
                                salida += '<img src="images/'+productosFiltrados[f].imagen+'" class="card-img-top" alt="'+productosFiltrados[f].nombre+'">';
                                salida += '<div class="card-body">';
                                salida += '<h3 class="card-title">'+productosFiltrados[f].nombre+'</h3>';
                                salida += '<h4 class="card-text">'+productosFiltrados[f].precio+' €</h4>';
                                salida += '<button class="btn btn-primary btn-detalle" data-id="'+productosFiltrados[f].id+'">Detalles</button>';
                                salida += '</div>';
                                salida += '</div>';
                            }
                            salida += '</div>';
                        } else {
                            salida = '<div class="alert alert-info">No hay productos disponibles en esta categoría.</div>';
                        }
                        
                        resultados.innerHTML = salida;
                        
                        // Limpiar la descripción cuando se cambia de categoría
                        document.getElementById("inputDescripcion").innerHTML = 'Seleccione un producto para ver su descripción';
                        
                        // Agregar eventos a los botones de detalles
                        document.querySelectorAll(".btn-detalle").forEach(boton => {
                            boton.addEventListener("click", cargarDetalles);
                        });
                        
                    } catch (ex) {
                        document.getElementById("inputProductos").innerHTML = '<div class="alert alert-danger">Error al cargar o parsear el JSON: ' + ex.message + '</div>';
                    }
                } else {
                    // Si la solicitud no es correcta (código de estado diferente a 200)
                    document.getElementById("inputProductos").innerHTML = '<div class="alert alert-danger">Error al cargar los datos</div>';
                }
            } else {
                document.getElementById("inputProductos").innerHTML = '<div class="spinner-border text-primary" role="status"><span class="visually-hidden">Cargando...</span></div>';
            }
        }
    }
    
    // Función para cargar detalles del producto específico
    function cargarDetalles(event) {
        const idProducto = event.target.getAttribute('data-id');
        
        let conexion3 = new XMLHttpRequest();
        conexion3.open('GET', 'api/cargar_productos_json.php', true);
        conexion3.timeout = 3000;
        
        conexion3.onreadystatechange = function() {
            if(conexion3.readyState == 4) {
                if (conexion3.status == 200) {
                    let descripcionElement = document.getElementById("inputDescripcion");
                    
                    try {
                        let datos = JSON.parse(conexion3.responseText);
                        mostrarDetalleProducto(datos, idProducto, descripcionElement);
                    } catch (ex) {
                        descripcionElement.innerHTML = '<div class="alert alert-danger">Error al cargar los detalles: ' + ex.message + '</div>';
                    }
                } else {
                    document.getElementById("inputDescripcion").innerHTML = '<div class="alert alert-danger">Error al cargar los detalles del producto</div>';
                }
            } else {
                document.getElementById("inputDescripcion").innerHTML = '<div class="spinner-border text-primary" role="status"><span class="visually-hidden">Cargando detalles...</span></div>';
            }
        };
        
        conexion3.send();
    }
    
    // Función para mostrar los detalles del producto
    function mostrarDetalleProducto(datos, idProducto, elemento) {
        // Buscar el producto específico por su ID
        let producto = datos.find(p => p.id == idProducto);
        
        if(producto) {
            let descripcion = '';
            descripcion += '<div>';
            descripcion += '<h4>'+producto.nombre+'</h4>';
            descripcion += '<p><strong>Precio:</strong> '+producto.precio+' €</p>';
            descripcion += '<p><strong>Categoría:</strong> '+producto.id_categoria+'</p>';
            descripcion += '<p><strong>ID Producto:</strong> '+producto.id+'</p>';
            descripcion += '<img src="images/'+producto.imagen+'" class="img-fluid mb-2" alt="'+producto.nombre+'">';
            descripcion += '</div>';
            
            elemento.innerHTML = descripcion;
        } else {
            elemento.innerHTML = '<div class="alert alert-warning">No se encontró el producto con ID: ' + idProducto + '</div>';
        }
    }
});