addEventListener('load', inicializarEventos, false);

function inicializarEventos() {
    document.getElementById('boton1').addEventListener('click', cargarPrecipitaciones);
}

function cargarPrecipitaciones(e) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'cargar_precipitaciones_json.php', true);
    xhr.timeout = 3000; // Tiempo máximo de espera del API 3sg
    xhr.ontimeout = () => {
        document.getElementById("resultados").innerHTML = "Tiempo de espera vencido";
    };
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                try {
                    // Con JSON.parse se convierte el texto JSON en un objeto JavaScript
                    let precipitaciones = JSON.parse(xhr.responseText); // Los datos JSON se recuperan al igual que el texto plano
                    console.log(precipitaciones);
                    poblarPrecipitaciones(precipitaciones);

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


function poblarPrecipitaciones(precipitaciones) {
   
    document.getElementById("resultados").innerHTML = '<div id="container" style="width:100%; height:400px;"></div>';
    
    let categorias = [];
    let datos = [];
    
    for (let i = 0; i < precipitaciones.length; i++) {
        categorias[i] = precipitaciones[i].mes;
        datos[i] = parseFloat(precipitaciones[i].precipitaciones);
    }
    
    Highcharts.chart('container', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Precipitaciones por mes'
        },
        xAxis: {
            categories: categorias,
            title: {
                text: 'Mes'
            }
        },
        yAxis: {
            title: {
                text: 'Precipitación (mm)'
            }
        },
        tooltip: {
            formatter: function() {
                return '<b>' + this.x + '</b><br/>' +
                    'Precipitación: ' + this.y + ' mm';
            }
        },
        series: [{
            name: 'Precipitaciones ' + precipitaciones[0].anio,
            data: datos,
            color: '#0080ff'
        }]
    });
}

