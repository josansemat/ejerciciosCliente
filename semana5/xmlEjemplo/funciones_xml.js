addEventListener('load', inicializarEventos, false);

function inicializarEventos() {
    let ob = document.getElementById('boton1');
    ob.addEventListener('click', cargarPerifericos, false);
}


function cargarPerifericos() {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange =  () => {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                try {
                    let xml = xhr.responseXML; // En la propiedad responseXML se almacena el XML (tiene una estructura similar al DOM)
                    let json = xml2json(xml);
                    //console.log(json);
                    poblarPerifericos(json);
                } catch (ex) {
                    document.getElementById("resultados").innerHTML = "Error al cargar extraer del XML: " + ex.message;
                }
            } else {
                // Se ha recibido un código status distinto de 200
                document.getElementById("resultados").innerHTML = "Error al cargar los datos";
            }
        } else {
            document.getElementById("resultados").innerHTML = "Cargando...";
        }
    }
    xhr.open('GET', 'cargar_perifericos_xml.php', true);
    xhr.timeout = 3000; // Tiempo máximo de espera del API 3sg
    xhr.ontimeout = () => {
        document.getElementById("resultados").innerHTML = "Tiempo de espera vencido";
    }
    xhr.send();
}


function xml2json(xml) {
    let perifericos = xml.getElementsByTagName("periferico");
    let json = [];
    for (let i = 0; i < perifericos.length; i++) {
        let periferico = perifericos[i];
        let codigo = periferico.getElementsByTagName("codigo")[0].textContent;
        let descripcion = periferico.getElementsByTagName("descripcion")[0].textContent;
        let precio = periferico.getElementsByTagName("precio")[0].textContent;
        json.push({ codigo: codigo, descripcion: descripcion, precio: precio });
    }
    return json;
}


function poblarPerifericos(perifericosJSON){
    let salida = "";
    for (let f = 0; f < perifericosJSON.length; f++) {
        let periferico = perifericosJSON[f];
        salida += 'Codigo: ' + periferico.codigo + "<br>";
        salida += 'Descripcion: ' + periferico.descripcion + "<br>";
        salida += 'Precio: ' + periferico.precio + "<br><br>";
    }
    document.getElementById("resultados").innerHTML = salida;
}
