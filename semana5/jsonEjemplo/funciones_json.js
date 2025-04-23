addEventListener('load', inicializarEventos, false);

function inicializarEventos() {
    document.getElementById('boton1').addEventListener('click', cargarPerifericos);
}

function cargarPerifericos(e) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'cargar_perifericos_json.php', true);
    xhr.timeout = 3000; // Tiempo máximo de espera del API 3sg
    xhr.ontimeout = () => {
        document.getElementById("resultados").innerHTML = "Tiempo de espera vencido";
    };
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                try {
                    // Con JSON.parse se convierte el texto JSON en un objeto JavaScript
                    let perifericos = JSON.parse(xhr.responseText); // Los datos JSON se recuperan al igual que el texto plano
                    console.log(perifericos);
                    poblarPerifericos(perifericos);

                } catch (ex) {
                    document.getElementById("resultados").innerHTML = "Error al cargar parsear el JSON: " + ex.message;
                }

            } else {
                // Se ha recibido un código status distinto de 200
                document.getElementById("resultados").innerHTML = "Error al cargar los datos";
            }
        } else {
            document.getElementById("resultados").innerHTML = "Cargando...";
        }
    }
    xhr.send();
}


function poblarPerifericos(perifericos) {
    let salida = "";
    for (let f = 0; f < perifericos.length; f++) {
        let periferico = perifericos[f];
        salida += 'Codigo: ' + periferico.codigo + "<br>";
        salida += 'Descripcion: ' + periferico.descripcion + "<br>";
        salida += 'Precio: ' + periferico.precio + "<br><br>";
    }
    document.getElementById("resultados").innerHTML = salida;
}

