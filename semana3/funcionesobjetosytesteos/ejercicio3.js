/**
 * Ejercicio 3: Calcular el número de días entre dos fechas.
 * 
 * Crea una función llamada numeroDiasFechas que tenga como argumento de entrada dos argumentos 
 * de tipo string que representan una fecha en formato "dd/mm/yyyy". 
 * Tu función debe devolver el número de días transcurridos entre esas dos fechas.
 * Si alguna de las fechas de entrada es incorrecta (p.e. "32/10/2024") debe lanzar un error 
 * con el texto "Alguna(s) de las fechas de entrada es incorrecta"
 */

/**
 * Valida si una fecha en formato "dd/mm/yyyy" es correcta
 * @param {string} fecha - La fecha a validar en formato "dd/mm/yyyy"
 * @returns {boolean} - true si la fecha es válida, false en caso contrario
 */
function esFechaValida(fecha) {
    // Expresión regular para validar el formato de la fecha (dd/mm/yyyy)
    const formatoRegex = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
    
    // Si el formato no es correcto, la fecha no es válida
    if (!formatoRegex.test(fecha)) {
        return false;
    }
    
    // Extraer día, mes y año de la fecha
    const [, dia, mes, anio] = formatoRegex.exec(fecha);
    
    // Convertir a números
    const diaNum = parseInt(dia, 10);
    const mesNum = parseInt(mes, 10);
    const anioNum = parseInt(anio, 10);
    
    // Validar rango de mes (1-12)
    if (mesNum < 1 || mesNum > 12) {
        return false;
    }
    
    // Días por mes (teniendo en cuenta año bisiesto para febrero)
    const diasPorMes = [
        31, // enero
        (anioNum % 400 === 0 || (anioNum % 100 !== 0 && anioNum % 4 === 0)) ? 29 : 28, // febrero
        31, // marzo
        30, // abril
        31, // mayo
        30, // junio
        31, // julio
        31, // agosto
        30, // septiembre
        31, // octubre
        30, // noviembre
        31  // diciembre
    ];
    
    // Validar rango de día según el mes
    return diaNum >= 1 && diaNum <= diasPorMes[mesNum - 1];
}

/**
 * Calcula el número de días transcurridos entre dos fechas
 * @param {string} fechaDesde - Fecha inicial en formato "dd/mm/yyyy"
 * @param {string} fechaHasta - Fecha final en formato "dd/mm/yyyy"
 * @returns {number} - Número de días transcurridos entre las dos fechas
 * @throws {Error} - Si alguna de las fechas es incorrecta
 */
function numeroDiasFechas(fechaDesde, fechaHasta) {
    // Validar que ambas fechas sean correctas
    if (!esFechaValida(fechaDesde) || !esFechaValida(fechaHasta)) {
        throw new Error("Alguna(s) de las fechas de entrada es incorrecta");
    }
    
    // Convertir las fechas a objetos Date
    // Para ello, transformamos el formato dd/mm/yyyy a mm/dd/yyyy para JavaScript
    const [diaDesde, mesDesde, anioDesde] = fechaDesde.split('/');
    const [diaHasta, mesHasta, anioHasta] = fechaHasta.split('/');
    
    const dateDesde = new Date(`${mesDesde}/${diaDesde}/${anioDesde}`);
    const dateHasta = new Date(`${mesHasta}/${diaHasta}/${anioHasta}`);
    
    // Calcular la diferencia en milisegundos
    const diferenciaMs = dateHasta - dateDesde;
    
    // Convertir de milisegundos a días
    // 1000 ms/s * 60 s/min * 60 min/h * 24 h/día = 86400000 ms/día
    const diasTranscurridos = Math.round(diferenciaMs / 86400000);
    
    return diasTranscurridos;
}

// Exportar la función para los tests
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { numeroDiasFechas };
} 