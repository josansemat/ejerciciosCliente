let dias = [
    { id: 1, nombre: 'L' },
    { id: 2, nombre: 'M' },
    { id: 3, nombre: 'X' },
    { id: 4, nombre: 'J' },
    { id: 5, nombre: 'V' }
];

let tramos = [
    { id: 1, hora: '8:00-9:00', descripcion: '1ª Hora' },
    { id: 2, hora: '9:00-10:00', descripcion: '2ª Hora' },
    { id: 3, hora: '10:00-11:00', descripcion: '3ª Hora' },
    { id: 4, hora: '11:00-11:30', descripcion: 'RECREO' },
    { id: 5, hora: '11:30-12:30', descripcion: '4ª Hora' },
    { id: 6, hora: '12:30-13:30', descripcion: '5ª Hora' },
    { id: 7, hora: '13:30-14:30', descripcion: '6ª Hora' }
];

let asignaturas = [
    { id: 1, nombre: '', grupo:'', aula: '', color: 'white' },
    { id: 2, nombre: 'Música', grupo:'1º ESO A', aula: 'Aula 6', color: 'blue' },
    { id: 3, nombre: 'Entorno Desarrollo', grupo:'1ºDAW', aula: 'Aula 9C', color: 'magenta' },
	{ id: 4, nombre: 'Comput. y robótica', grupo:'1ºESO D', aula: 'Aula 10A', color: 'cyan' },
	{ id: 5, nombre: 'Comput. y robótica', grupo:'1ºESO B', aula: 'Aula VII', color: 'yellow' },
	{ id: 6, nombre: 'Despl. Aplic. Web', grupo:'2ºDAW', aula: 'Aula 10B', color: 'green' },
	{ id: 7, nombre: 'Guardia Mant.', grupo:'', aula: 'Taller Informática', color: 'SteelBlue' },
    { id: 8, nombre: 'Música', grupo:'1º ESO B', aula: 'Aula 7', color: 'brown' },
    { id: 9, nombre: 'RECREO', grupo:'', aula: '', color: 'LightGrey' },
];


let horario = [
    {
        idTramo: 1, asignaturas: [
            { idDia: 1, idAsignatura: 2},
            { idDia: 2, idAsignatura: 3},
            { idDia: 3, idAsignatura: 3},
            { idDia: 4, idAsignatura: 1},
            { idDia: 5, idAsignatura: 7}
        ]
    },
	{
        idTramo: 2, asignaturas: [
            { idDia: 1, idAsignatura: 7},
            { idDia: 2, idAsignatura: 2},
            { idDia: 3, idAsignatura: 3},
            { idDia: 4, idAsignatura: 1},
            { idDia: 5, idAsignatura: 4}
        ]
    },
	{
        idTramo: 3, asignaturas: [
            { idDia: 1, idAsignatura: 1},
            { idDia: 2, idAsignatura: 4},
            { idDia: 3, idAsignatura: 7},
            { idDia: 4, idAsignatura: 1},
            { idDia: 5, idAsignatura: 5}
        ]
    },
	{
        idTramo: 4, asignaturas: [
            { idDia: 1, idAsignatura: 9},
            { idDia: 2, idAsignatura: 9},
            { idDia: 3, idAsignatura: 9},
            { idDia: 4, idAsignatura: 9},
            { idDia: 5, idAsignatura: 9}
        ]
    },
	{
        idTramo: 5, asignaturas: [
            { idDia: 1, idAsignatura: 1},
            { idDia: 2, idAsignatura: 1},
            { idDia: 3, idAsignatura: 1},
            { idDia: 4, idAsignatura: 8},
            { idDia: 5, idAsignatura: 6}
        ]
    },
	{
        idTramo: 6, asignaturas: [
            { idDia: 1, idAsignatura: 1},
            { idDia: 2, idAsignatura: 1},
            { idDia: 3, idAsignatura: 1},
            { idDia: 4, idAsignatura: 8},
            { idDia: 5, idAsignatura: 6}
        ]
    },
	{
        idTramo: 7, asignaturas: [
            { idDia: 1, idAsignatura: 1},
            { idDia: 2, idAsignatura: 1},
            { idDia: 3, idAsignatura: 1},
            { idDia: 4, idAsignatura: 1},
            { idDia: 5, idAsignatura: 6}
        ]
    }
];

// Escribe aquí tu código
//recorrer un array de objetos y coger el objeto que quiero con el id que le paso
function obtenerAsignatura(id){
    for(let i = 0; i < asignaturas.length; i++){
        if(asignaturas[i].id == id){
            return asignaturas[i];
        }
    }
    return null;
}

//funcion obtener dia semana
function obtenerDiaSemana(id) {
    for(let i = 0; i < dias.length; i++){
        if(dias[i].id == id){
            return dias[i];
        }
    }
    return null; 
}

//funcion obtener tramo
function obtenerTramoHorario(id) {
    for(let i = 0; i < tramos.length; i++){
        if(tramos[i].id == id){
            return tramos[i];
        }
    }
    return null; 
}

// Crear la tabla del horario
function crearHorario() {
    let tabla = document.getElementById('horario');
    // Crear la cabecera de la tabla
    let cabecera = document.createElement('thead');
    let filaCabecera = document.createElement('tr');
    let celdaCabecera = document.createElement('th');
    celdaCabecera.innerHTML = 'Hora/Día';
    filaCabecera.appendChild(celdaCabecera);
    for (let dia of dias) {
        let celda = document.createElement('th');
        celda.innerHTML = dia.nombre;
        filaCabecera.appendChild(celda);
    }
    cabecera.appendChild(filaCabecera);
    tabla.appendChild(cabecera);

    // Crear el cuerpo de la tabla
    let cuerpo = document.createElement('tbody');
    for (let tramo of horario) {
        //horario
        let fila = document.createElement('tr');
        let celdaHora = document.createElement('td');
        let tramoHorario = obtenerTramoHorario(tramo.idTramo);
        celdaHora.innerHTML = tramoHorario.hora;
        fila.appendChild(celdaHora);
        //contenido
        for (let dia of dias) {
            let celda = document.createElement('td');

            let asignaturaDia;
            for (let a of tramo.asignaturas) {//cada celda tiene que tener el evvento de entrada y de salidad, se le pasa el id y asi saca la clase 
                if (a.idDia === dia.id) {
                    asignaturaDia = a;
                    break;
                }
            }
            
            let asignatura = obtenerAsignatura(asignaturaDia.idAsignatura);
            celda.innerHTML = `${asignatura.nombre}<br>${asignatura.grupo}`;
            celda.style.backgroundColor = asignatura.color;

            // eventos en cada celda cuando esta el encima de la celda y cuando lo quitas
            celda.addEventListener('mouseover', function() {
                informacion(asignatura);
            });
            celda.addEventListener('mouseout', informacionOut);

            fila.appendChild(celda);
        }
        cuerpo.appendChild(fila);
    }
    tabla.appendChild(cuerpo);
}

function informacion(asignatura) {
    let aula = document.getElementById('aula');
    aula.innerHTML = asignatura.aula;
}

function informacionOut() {
    let aula = document.getElementById('aula');
    aula.innerHTML = "";
}

document.getElementById('inputCrearHorario').addEventListener('click', crearHorario);

