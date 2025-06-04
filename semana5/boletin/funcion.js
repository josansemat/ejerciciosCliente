
// Inicializar eventos cuando se cargue la página
addEventListener('load', inicializarEventos, false);

function inicializarEventos() {
    // Cargar las comunidades al iniciar la página
    cargarComunidades();
}

function cargarComunidades() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'api/cargar_comunidades_autonomas.php', true);
    xhr.timeout = 3000; // Tiempo máximo de espera del API 3sg
    xhr.ontimeout = () => {
        document.getElementById("resultados").innerHTML = "Tiempo de espera vencido";
    };
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                try {
                    // Con JSON.parse se convierte el texto JSON en un objeto JavaScript
                    let comunidades = JSON.parse(xhr.responseText); // Los datos JSON se recuperan al igual que el texto plano
                    console.log(comunidades);
                    poblarComunidades(comunidades);

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

function poblarComunidades(comunidades) {
    const selectComunidades = document.getElementById("comunidades");
    
    // Mantener solo la primera opción (Seleccionar...)
    selectComunidades.innerHTML = '<option value="">Seleccionar...</option>';
    
    // Añadir cada comunidad como una opción
    for (let i = 0; i < comunidades.length; i++) {
        let comunidad = comunidades[i];
        let option = document.createElement('option');
        option.value = comunidad.id;
        option.textContent = comunidad.nombre;
        selectComunidades.appendChild(option);
    }
    
    // Actualizar el div de resultados
    document.getElementById("resultados").innerHTML = "Comunidades cargadas correctamente";
}

// Añadir evento change al select de comunidades
document.getElementById('comunidades').addEventListener('change', function() {
    const comunidadId = this.value;
    
    // Si se seleccionó una comunidad, cargar sus provincias
    if (comunidadId) {
        cargarProvincias(comunidadId);
    } else {
        // Si no hay comunidad seleccionada, vaciar el select de provincias
        const selectProvincias = document.getElementById('provincias');
        selectProvincias.innerHTML = '<option value="">Seleccionar...</option>';
        document.getElementById('resultados').innerHTML = "Seleccione una comunidad autónoma";
    }
});






// Añadir evento change al select de provincias
document.getElementById('provincias').addEventListener('change', function() {
    const provinciaId = this.value;
    const provinciaTexto = this.options[this.selectedIndex].text;
    
    // Mostrar la información de la provincia seleccionada
    if (provinciaId) {
        document.getElementById('resultados').innerHTML = 
            `<p>Provincia seleccionada: ID: <strong>${provinciaId}</strong>, Nombre: <strong>${provinciaTexto}</strong></p>`;
    } else {
        document.getElementById('resultados').innerHTML = "Seleccione una provincia";
    }
});

function cargarProvincias(comunidadId) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `api/cargar_provincias.php?cod=${comunidadId}`, true);
    xhr.timeout = 3000; // Tiempo máximo de espera del API 3sg
    
    xhr.ontimeout = () => {
        document.getElementById("resultados").innerHTML = "Tiempo de espera vencido al cargar provincias";
    };
    
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                try {
                    // Procesamos la respuesta XML
                    const xmlDoc = xhr.responseXML;
                    poblarProvincias(xmlDoc);
                } catch (ex) {
                    document.getElementById("resultados").innerHTML = "Error al procesar el XML: " + ex.message;
                }
            } else {
                document.getElementById("resultados").innerHTML = "Error al cargar las provincias";
            }
        } else {
            document.getElementById("resultados").innerHTML = "Cargando provincias...";
        }
    }
    
    xhr.send();
}

function poblarProvincias(xmlDoc) {
    const selectProvincias = document.getElementById("provincias");
    
    // Mantener solo la primera opción (Seleccionar...)
    selectProvincias.innerHTML = '<option value="">Seleccionar...</option>';
    
    // Obtener todas las provincias del XML
    const provincias = xmlDoc.getElementsByTagName("provincia");
    
    // Añadir cada provincia como una opción
    for (let i = 0; i < provincias.length; i++) {
        const id = provincias[i].getElementsByTagName("id")[0].textContent;
        const nombre = provincias[i].getElementsByTagName("nombre")[0].textContent;
        
        const option = document.createElement('option');
        option.value = id;
        option.textContent = nombre;
        selectProvincias.appendChild(option);
    }
    
    // Actualizar el div de resultados
    document.getElementById("resultados").innerHTML = "Provincias cargadas correctamente";
}
