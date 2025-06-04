// Registra un evento cuando se carga completamente la página para llamar a la función inicializarEventos
addEventListener('load', inicializarEventos, false);

// Registra otro evento de carga para llamar a la función presionBoton2 (carga inicial de películas)
window.addEventListener('load', presionBoton2, false);

// Define la función que inicializa los eventos cuando se carga la página
function inicializarEventos() {
    // Obtiene el elemento select con id 'inputGenero'
    let ob = document.getElementById('inputGenero');
    // Añade un evento 'click' al selector que llamará a la función presionBoton
    ob.addEventListener('click', presionBoton, false);
}

// Declara una variable global para almacenar la conexión AJAX de géneros
let conexion1;
// Función que se ejecuta cuando se hace clic en el selector de géneros
function presionBoton(e) {
    // Crea un nuevo objeto XMLHttpRequest para la petición AJAX
    conexion1 = new XMLHttpRequest();
    // Configura la petición como GET al archivo cargar_generos_json.php
    conexion1.open('GET', 'cargar_generos_json.php', true);
    // Establece un tiempo máximo de espera de 3 segundos
    conexion1.timeout = 3000;
    // Añade un evento para procesar la respuesta cuando cambie el estado de la petición
    conexion1.addEventListener('readystatechange', procesarDatos);
    // Añade un evento para manejar el caso de timeout
    conexion1.addEventListener('timeout', tiempoVencido);
    // Envía la petición al servidor
    conexion1.send();
}

// Función que se ejecuta si la petición supera el tiempo máximo de espera
function tiempoVencido() {
    // Muestra un mensaje de error en el elemento con id "inputTabla"
    document.getElementById("inputTabla").innerHTML = "Tiempo de espera vencido";
}

// Función para procesar los datos recibidos de la petición de géneros
function procesarDatos() {
    // Verifica si la petición ha finalizado (estado 4)
    if(conexion1.readyState==4){
        // Verifica si la respuesta es exitosa (código 200)
        if (conexion1.status == 200) {
            // Obtiene el elemento select donde se mostrarán los géneros
            let selector = document.getElementById("inputGenero");

            try {
                // Convierte la respuesta JSON recibida a un objeto JavaScript
                let datos = JSON.parse(conexion1.responseText);

                // Vacía el contenido actual del selector
                selector.innerHTML = "";

                // Crea una opción "Todos" y la añade al selector
                let option2 = document.createElement('option');
                option2.value = "todos"; 
                option2.textContent = "Todos";
                selector.appendChild(option2); 

                // Recorre los géneros recibidos y crea una opción para cada uno
                for (let f = 0; f < datos.length; f++) {
                    let option = document.createElement('option');
                    option.value = datos[f].nombre; 
                    option.textContent = datos[f].nombre;
                    selector.appendChild(option); 
                }

                // Elimina el evento click para evitar recargar los géneros innecesariamente
                selector.removeEventListener('click', presionBoton, false);
            } catch (ex) {
                // Maneja errores en el parseo del JSON
                document.getElementById("inputTabla").innerHTML = "Error al cargar parsear el JSON: " + ex.message;
            }
        } else {
            // Maneja errores en la respuesta HTTP
            document.getElementById("inputTabla").innerHTML = "Error al cargar los datos";
        }
    }
}

// SECCIÓN DE PELÍCULAS

// Obtiene el elemento select de géneros nuevamente
let ob2 = document.getElementById('inputGenero');
// Añade un evento click para cargar películas cuando se seleccione un género
ob2.addEventListener('click', presionBoton2, false);

// Declara una variable global para la conexión AJAX de películas
let conexion2;
// Función para cargar películas según el género seleccionado
function presionBoton2() {
    console.log("presionBoton");
    // Crea un nuevo objeto XMLHttpRequest
    conexion2 = new XMLHttpRequest();
    // Obtiene el elemento select y el valor seleccionado
    let selec = document.getElementById("inputGenero");
    let gen = selec.value;

    // Si el valor es "todos", carga todas las películas, sino filtra por género
    if(gen=="todos"){
        conexion2.open('GET', 'cargar_peliculas_xml.php', true);
    }else{
        conexion2.open('GET', 'cargar_peliculas_xml.php?genero=' + gen, true);
    }
    // Establece timeout, eventos de respuesta y envía la petición
    conexion2.timeout = 3000;
    conexion2.addEventListener('readystatechange', procesarDatos2);
    conexion2.addEventListener('timeout', tiempoVencido2);
    console.log("Ojn");
    conexion2.send();
}

// Función para manejar timeout en la carga de películas
function tiempoVencido2() {
    document.getElementById("inputTabla").innerHTML = "Tiempo de espera vencido";
}

// Función para procesar la respuesta XML de películas
function procesarDatos2() {
    // Verifica si la petición ha finalizado
    if (conexion2.readyState == 4) {
        // Verifica si la respuesta es exitosa
        if (conexion2.status == 200) {
            // Obtiene el elemento donde se mostrarán las películas
            let mostrarPeliculas = document.getElementById("inputTabla");
            try {
                // Obtiene el documento XML de la respuesta
                let xmlDoc2 = conexion2.responseXML;
                console.log(xmlDoc2);

                // Vacía el contenido actual
                mostrarPeliculas.innerHTML = "";

                // Obtiene todas las películas del XML
                let datos2 = xmlDoc2.getElementsByTagName("pelicula");
                
                // Si no hay películas, muestra un mensaje
                if (datos2.length === 0) {
                    mostrarPeliculas.innerHTML = "No se encontraron peliculas.";
                    return;
                }

                // Recorre las películas y crea filas de tabla para cada una
                for (let f2 = 0; f2 < datos2.length; f2++) {
                    // Crea una fila de tabla
                    let tr2 = document.createElement("tr");

                    // Crea y añade una celda para el título
                    let tdTitulo = document.createElement("td");
                    tdTitulo.textContent = datos2[f2].getElementsByTagName('titulo')[0].textContent;
                    tr2.appendChild(tdTitulo);

                    // Crea y añade una celda para el año
                    let tdAnio = document.createElement("td");
                    tdAnio.textContent = datos2[f2].getElementsByTagName('anio')[0].textContent;
                    tr2.appendChild(tdAnio);

                    // Crea y añade una celda para el género
                    let tdGenero = document.createElement("td");
                    tdGenero.textContent = datos2[f2].getElementsByTagName('genero')[0].textContent;
                    tr2.appendChild(tdGenero);

                    // Crea y añade una celda para la imagen del póster
                    let tdImagen = document.createElement("td");
                    tdImagen.innerHTML = "<img src='"+datos2[f2].getElementsByTagName('poster')[0].textContent+"'>";
                    tr2.appendChild(tdImagen);

                    // Crea y añade una celda con botón para ver la descripción
                    let tdBoton = document.createElement("td");
                    tdBoton.innerHTML = "<button type='button' id='mostrarDescripcion' value='"+datos2[f2].getElementsByTagName('id')[0].textContent+"' onclick='mostrarDesc("+datos2[f2].getElementsByTagName('id')[0].textContent+")'>Descripcion</button>";
                    tr2.appendChild(tdBoton);

                    // Añade la fila a la tabla
                    mostrarPeliculas.appendChild(tr2);
                }
            } catch (ex2) {
                // Maneja errores en el procesamiento del XML
                document.getElementById("inputTabla").innerHTML = "Error al cargar los datos del XML: " + ex2.message;
            }
        } else {
            // Maneja errores en la respuesta HTTP
            document.getElementById("inputTabla").innerHTML = "Error al cargar los datos";
        }
    } else {
        // Muestra mensaje de carga mientras se procesa la petición
        document.getElementById("inputTabla").innerHTML = "Cargando...";
    }
}

// Función para mostrar la sinopsis de una película según su ID
function mostrarDesc(idTrama){
    // Verifica si la petición ha finalizado (reutiliza la conexión anterior)
    if (conexion2.readyState == 4) {
        // Verifica si la respuesta es exitosa
        if (conexion2.status == 200) {
            // Obtiene el elemento donde se mostrará la trama
            let mostrarTrama = document.getElementById("inputTrama");
            try {
                // Obtiene el documento XML de la respuesta
                let xmlDoc2 = conexion2.responseXML;
                console.log(xmlDoc2);

                // Vacía el contenido actual
                mostrarTrama.innerHTML = "";

                // Obtiene todas las películas del XML
                let datos3 = xmlDoc2.getElementsByTagName("pelicula");
                
                // Si no hay películas, muestra un mensaje
                if (datos3.length === 0) {
                    mostrarTrama.innerHTML = "No se encontraron tramas.";
                    return;
                }

                // Recorre las películas buscando la que coincida con el ID
                for (let f2 = 0; f2 < datos3.length; f2++) {
                    // Si encuentra la película con el ID buscado
                    if(datos3[f2].getElementsByTagName('id')[0].textContent==idTrama){
                        // Crea un párrafo con la sinopsis y lo añade
                        let p = document.createElement('p');
                        p.textContent = datos3[f2].getElementsByTagName('sinopsis')[0].textContent;
                        mostrarTrama.appendChild(p);
                    }
                }
            } catch (ex2) {
                // Maneja errores en el procesamiento del XML
                document.getElementById("inputTrama").innerHTML = "Error al cargar los datos del XML: " + ex2.message;
            }
        } else {
            // Maneja errores en la respuesta HTTP
            document.getElementById("inputTrama").innerHTML = "Error al cargar los datos";
        }
    } else {
        // Muestra mensaje de carga mientras se procesa la petición
        document.getElementById("inputTrama").innerHTML = "Cargando...";
    }
}