// Escribe tu código aquí

addEventListener('load', inicializarEventos, false);

window.addEventListener('load', presionBoton2, false);

function inicializarEventos() {
    let ob = document.getElementById('inputGenero');
    ob.addEventListener('click', presionBoton, false);
}

let conexion1;
function presionBoton(e) {
    conexion1 = new XMLHttpRequest();
    conexion1.open('GET', 'cargar_generos_json.php', true);
    conexion1.timeout = 3000;
    conexion1.addEventListener('readystatechange', procesarDatos);
    conexion1.addEventListener('timeout', tiempoVencido);
    conexion1.send();
}


function tiempoVencido() {
    document.getElementById("inputTabla").innerHTML = "Tiempo de espera vencido";
}

function procesarDatos() {
	if(conexion1.readyState==4){
		if (conexion1.status == 200) {
        let selector = document.getElementById("inputGenero");

        try {
            let datos = JSON.parse(conexion1.responseText);

            selector.innerHTML = "";

            let option2 = document.createElement('option');
                option2.value = "todos"; 
                option2.textContent = "Todos";
                selector.appendChild(option2); 

            for (let f = 0; f < datos.length; f++) {
                let option = document.createElement('option');
                option.value = datos[f].nombre; 
                option.textContent = datos[f].nombre;
                selector.appendChild(option); 
            }

            selector.removeEventListener('click', presionBoton, false);
        } catch (ex) {
            document.getElementById("inputTabla").innerHTML = "Error al cargar parsear el JSON: " + ex.message;
        }

    } else {
        document.getElementById("inputTabla").innerHTML = "Error al cargar los datos";
    }
}

}


// PELICULAS

let ob2 = document.getElementById('inputGenero');
ob2.addEventListener('click', presionBoton2, false);

let conexion2;
function presionBoton2() {
    console.log("presionBoton");
    conexion2 = new XMLHttpRequest();
    let selec = document.getElementById("inputGenero");
    let gen = selec.value;

    if(gen=="todos"){
        conexion2.open('GET', 'cargar_peliculas_xml.php', true);

    }else{
        conexion2.open('GET', 'cargar_peliculas_xml.php?genero=' + gen, true);

    }
    conexion2.timeout = 3000;
    conexion2.addEventListener('readystatechange', procesarDatos2);
    conexion2.addEventListener('timeout', tiempoVencido2);
    console.log("Ojn");
    conexion2.send();
}

function tiempoVencido2() {
    document.getElementById("inputTabla").innerHTML = "Tiempo de espera vencido";
}

function procesarDatos2() {
    if (conexion2.readyState == 4) {
        if (conexion2.status == 200) {
            let mostrarPeliculas = document.getElementById("inputTabla");
            try {
                let xmlDoc2 = conexion2.responseXML;
                console.log(xmlDoc2);

                mostrarPeliculas.innerHTML = "";

                let datos2 = xmlDoc2.getElementsByTagName("pelicula");
                

                if (datos2.length === 0) {
                    mostrarPeliculas.innerHTML = "No se encontraron peliculas.";
                    return;
                }

                for (let f2 = 0; f2 < datos2.length; f2++) {
                    let tr2 = document.createElement("tr");

                    let tdTitulo = document.createElement("td");
                    tdTitulo.textContent = datos2[f2].getElementsByTagName('titulo')[0].textContent;
                    tr2.appendChild(tdTitulo);

                    let tdAnio = document.createElement("td");
                    tdAnio.textContent = datos2[f2].getElementsByTagName('anio')[0].textContent;
                    tr2.appendChild(tdAnio);

                    let tdGenero = document.createElement("td");
                    tdGenero.textContent = datos2[f2].getElementsByTagName('genero')[0].textContent;
                    tr2.appendChild(tdGenero);

                    let tdImagen = document.createElement("td");
                    tdImagen.innerHTML = "<img src='"+datos2[f2].getElementsByTagName('poster')[0].textContent+"'>";
                    tr2.appendChild(tdImagen);

                    let tdBoton = document.createElement("td");
                    tdBoton.innerHTML = "<button type='button' id='mostrarDescripcion' value='"+datos2[f2].getElementsByTagName('id')[0].textContent+"' onclick='mostrarDesc("+datos2[f2].getElementsByTagName('id')[0].textContent+")'>Descripcion</button>";
                    
                    tr2.appendChild(tdBoton);

                    mostrarPeliculas.appendChild(tr2);
                }

            } catch (ex2) {
                document.getElementById("inputTabla").innerHTML = "Error al cargar los datos del XML: " + ex2.message;
            }
        } else {
            // Si el status no es 200 (ok), mostrar un error
            document.getElementById("inputTabla").innerHTML = "Error al cargar los datos";
        }
    } else {
        document.getElementById("inputTabla").innerHTML = "Cargando...";
    }
}

function mostrarDesc(idTrama){
    if (conexion2.readyState == 4) {
        if (conexion2.status == 200) {
            let mostrarTrama = document.getElementById("inputTrama");
            try {
                let xmlDoc2 = conexion2.responseXML;
                console.log(xmlDoc2);

                mostrarTrama.innerHTML = "";

                let datos3 = xmlDoc2.getElementsByTagName("pelicula");
                

                if (datos3.length === 0) {
                    mostrarTrama.innerHTML = "No se encontraron tramas.";
                    return;
                }

                for (let f2 = 0; f2 < datos3.length; f2++) {
                    if(datos3[f2].getElementsByTagName('id')[0].textContent==idTrama){
                        let p = document.createElement('p');
                        p.textContent = datos3[f2].getElementsByTagName('sinopsis')[0].textContent;
                        mostrarTrama.appendChild(p);
                    }
                    
                }

            } catch (ex2) {
                document.getElementById("inputTrama").innerHTML = "Error al cargar los datos del XML: " + ex2.message;
            }
        } else {
            // Si el status no es 200 (ok), mostrar un error
            document.getElementById("inputTrama").innerHTML = "Error al cargar los datos";
        }
    } else {
        document.getElementById("inputTrama").innerHTML = "Cargando...";
    }

}

