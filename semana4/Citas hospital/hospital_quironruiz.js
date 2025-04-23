let SEGUROS_MEDICOS = [
    {value: 1, texto: 'Adeslas'},
    {value: 2, texto: 'Asisa'},
    {value: 3, texto: 'Caser Salud'},
    {value: 4, texto: 'DKV'},
    {value: 5, texto: 'Mapfre'},
    {value: 6, texto: 'Sanitas'}
];

//Escribe su codigo aqui ...

// a) Será obligatorio rellenar el nombre y los apellidos del cliente.
let nomForm = document.getElementById('inputNombre');
let apellForm = document.getElementById('inputApellidos');
nomForm.required = true;
apellForm.required = true;

// c) Poblar dinámicamente el desplegable de seguro médico
let selectSeguro = document.getElementById('inputSeguroMedico');


// Añadir las opciones de seguros médicos
SEGUROS_MEDICOS.forEach(seguro => {
    let opcion = document.createElement('option');
    opcion.value = seguro.value;
    opcion.text = seguro.texto;
    selectSeguro.appendChild(opcion);
});
selectSeguro.required = true;

// d) Lógica para médico de familia o especialista
// Corregido: IDs correctos para los radio buttons
let tipoMedico = document.getElementsByName('medico'); // nombre correcto es 'medico'
let selectEspecialidad = document.getElementById('inputEspecialidad');

// Función para gestionar la disponibilidad de la especialidad
function gestionarEspecialidad() {
    // Corregido: ID correcto para el radio button de especialista
    if (document.getElementById('inputMedicoEspecialista').checked) {
        selectEspecialidad.disabled = false;
        selectEspecialidad.required = true;
    } else {
        selectEspecialidad.disabled = true;
        selectEspecialidad.required = false;
        selectEspecialidad.selectedIndex = 0;
    }
}

// Añadir eventos a los radio buttons (corregidos los IDs)
document.getElementById('inputMedicoFamilia').addEventListener('change', gestionarEspecialidad);
document.getElementById('inputMedicoEspecialista').addEventListener('change', gestionarEspecialidad);

// Inicializar estado al cargar
gestionarEspecialidad();

// Función para validar el DNI (formato y letra correcta)
function validarDni(dniCompleto) {
    // Validación por expresión regular (formato)
    const patronDni = /^\d{8}[trwagmyfpdxbnjzsqvhlcke]$/i;
    
    if (!patronDni.test(dniCompleto)) {
        return {
            valido: false,
            mensaje: "Formato de DNI no válido"
        };
    }
    
    // Validar la letra
    const numero = parseInt(dniCompleto.substring(0, 8));
    const letraIntroducida = dniCompleto.charAt(8).toUpperCase();
    const letras = 'TRWAGMYFPDXBNJZSQVHLCKE';
    const letraCalculada = letras.charAt(numero % 23);
    
    if (letraIntroducida !== letraCalculada) {
        return {
            valido: false,
            mensaje: "La letra del DNI no es válida"
        };
    }
    
    return { valido: true };
}

// Función para validar la fecha (solo lunes a jueves)
function validarFecha(fecha) {
    const diaSemana = new Date(fecha).getDay();
    // 1-4 corresponde a Lunes-Jueves (0 es domingo, 5 es viernes, 6 es sábado)
    if (diaSemana < 1 || diaSemana > 4) {
        return {
            valido: false,
            mensaje: "El día de la cita sólo puede ser de lunes a jueves"
        };
    }
    return { valido: true };
}

// Función para validar la hora según el día
function validarHora(fecha, hora) {
    const diaSemana = new Date(fecha).getDay();
    const [horas, minutos] = hora.split(':').map(Number);
    const horaDecimal = horas + (minutos / 60);
    
    // Días 1-3 (lunes a miércoles): 10:00 a 14:15
    if (diaSemana >= 1 && diaSemana <= 3) {
        if (horaDecimal < 10 || horaDecimal > 14.25) {
            return {
                valido: false,
                mensaje: "Para lunes a miércoles, la hora debe estar entre 10:00 y 14:15"
            };
        }
    } 
    // Día 4 (jueves): 18:30 a 20:00
    else if (diaSemana === 4) {
        if (horaDecimal < 18.5 || horaDecimal > 20) {
            return {
                valido: false,
                mensaje: "Para jueves, la hora debe estar entre 18:30 y 20:00"
            };
        }
    }
    
    return { valido: true };
}

// Mostrar errores de validación
function mostrarError(inputElement, mensaje) {
    // Buscamos el div de feedback que está después del input
    let feedbackDiv = inputElement.nextElementSibling;
    
    // Si no existe, lo creamos
    if (!feedbackDiv || !feedbackDiv.classList.contains('invalid-feedback')) {
        feedbackDiv = document.createElement('div');
        feedbackDiv.className = 'invalid-feedback';
        feedbackDiv.style.display = 'block'; // Importante para que se vea el mensaje
        inputElement.parentNode.insertBefore(feedbackDiv, inputElement.nextSibling);
    }
    
    feedbackDiv.textContent = mensaje;
    inputElement.classList.add('is-invalid');
}

// Limpiar errores
function limpiarError(inputElement) {
    inputElement.classList.remove('is-invalid');
    
    // Buscamos el div de feedback
    const feedbackDiv = inputElement.nextElementSibling;
    if (feedbackDiv && feedbackDiv.classList.contains('invalid-feedback')) {
        feedbackDiv.textContent = '';
        feedbackDiv.style.display = 'none';
    }
}

// Validación del formulario completo
document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    let formularioValido = true;
    
    // Limpiar errores previos
    document.querySelectorAll('.is-invalid').forEach(el => {
        limpiarError(el);
    });
    
    // Validación de DNI
    const inputDNI = document.getElementById('inputDNI');
    const resultadoDNI = validarDni(inputDNI.value);
    if (!resultadoDNI.valido) {
        mostrarError(inputDNI, resultadoDNI.mensaje);
        formularioValido = false;
    }
    
    // Validación de fecha 
    const inputFecha = document.getElementById('inputFechaCita');
    if (inputFecha.value) {
        const resultadoFecha = validarFecha(inputFecha.value);
        if (!resultadoFecha.valido) {
            mostrarError(inputFecha, resultadoFecha.mensaje);
            formularioValido = false;
        }
    } else {
        mostrarError(inputFecha, "La fecha es obligatoria");
        formularioValido = false;
    }
    
    // Validación de hora 
    const inputHora = document.getElementById('inputHoraCita');
    if (inputHora.value) {
        if (inputFecha.value) {
            const resultadoHora = validarHora(inputFecha.value, inputHora.value);
            if (!resultadoHora.valido) {
                mostrarError(inputHora, resultadoHora.mensaje);
                formularioValido = false;
            }
        }
    } else {
        mostrarError(inputHora, "La hora es obligatoria");
        formularioValido = false;
    }
    
    // Validación de seguro médico 
    const seguro = document.getElementById('inputSeguroMedico');
    if (!seguro.value) {
        mostrarError(seguro, "Debe seleccionar un seguro médico");
        formularioValido = false;
    }
    
    // Validación de especialidad cuando corresponda 
    if (document.getElementById('inputMedicoEspecialista').checked && !selectEspecialidad.value) {
        mostrarError(selectEspecialidad, "Debe seleccionar una especialidad");
        formularioValido = false;
    }
    
    // Si el formulario es válido, se envía
    if (formularioValido) {
        console.log("Formulario enviado con éxito");
        // Descomenta si realmente quieres enviar el formulario
        // this.submit();
    }
});