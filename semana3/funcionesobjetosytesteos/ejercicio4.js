/**
 * Ejercicio 4: Clase Reserva
 * 
 * Implementa la clase Reserva, que permita crear posteriormente reservas para un hotel indicando:
 * - El nombre del cliente que hace la reserva (usando el formato CSV separados por punto y coma 
 *   "Apellido1;Apellido2; Nombre de Pila")
 * - El DNI, será un dato de tipo string que contendrá tanto los dígitos como la letra del DNI
 * - La fecha de entrada, que se indicará como un dato de tipo String con el formato "dd/mm/yyyy"
 * - La fecha de salida, que se indicará como un dato de tipo String con el formato "dd/mm/yyyy"
 */

class Reserva {
    /**
     * Constructor de la clase Reserva
     * @param {string} nombreCliente - Nombre del cliente en formato "Apellido1;Apellido2;Nombre"
     * @param {string} dni - DNI del cliente incluyendo letra
     * @param {string} fechaEntrada - Fecha de entrada en formato "dd/mm/yyyy"
     * @param {string} fechaSalida - Fecha de salida en formato "dd/mm/yyyy"
     */
    constructor(nombreCliente, dni, fechaEntrada, fechaSalida) {
        this.nombreCliente = nombreCliente;
        this.dni = dni;
        this.fechaEntrada = fechaEntrada;
        this.fechaSalida = fechaSalida;
        
        // Validar que la fecha de salida es posterior a la de entrada
        this._validarFechas(fechaEntrada, fechaSalida);
    }
    
    /**
     * Obtiene el código del cliente formado por la primera inicial del nombre,
     * el primer apellido y los tres últimos dígitos del DNI (todo en mayúsculas)
     * @returns {string} - El código del cliente
     */
    get codigoCliente() {
        // Dividir el nombre del cliente por punto y coma
        const partes = this.nombreCliente.split(';');
        
        // Obtener el primer apellido (índice 0) y el nombre (índice 2)
        const primerApellido = partes[0].trim();
        const nombrePila = partes[2] ? partes[2].trim() : '';
        
        // Extraer la primera letra del nombre de pila
        const inicialNombre = nombrePila.charAt(0);
        
        // Extraer los tres últimos dígitos del DNI
        const ultimosTresDigitosDNI = this.dni.substring(this.dni.length - 4, this.dni.length - 1);
        
        // Formar el código del cliente y convertirlo a mayúsculas
        return (inicialNombre + primerApellido + ultimosTresDigitosDNI).toUpperCase();
    }
    
    /**
     * Calcula el número de días de estancia
     * @returns {number} - El número de días de estancia
     */
    get numeroDiasEstancia() {
        return this._calcularDiasEntreFechas(this.fechaEntrada, this.fechaSalida);
    }
    
    /**
     * Modifica las fechas de entrada y salida
     * @param {string} nuevaFechaEntrada - Nueva fecha de entrada en formato "dd/mm/yyyy"
     * @param {string} nuevaFechaSalida - Nueva fecha de salida en formato "dd/mm/yyyy"
     */
    modificarFechas(nuevaFechaEntrada, nuevaFechaSalida) {
        // Validar las nuevas fechas
        this._validarFechas(nuevaFechaEntrada, nuevaFechaSalida);
        
        // Actualizar las fechas
        this.fechaEntrada = nuevaFechaEntrada;
        this.fechaSalida = nuevaFechaSalida;
    }
    
    /**
     * Calcula el coste de la estancia
     * @returns {number} - El coste total de la estancia
     */
    costeEstancia() {
        // Obtener las fechas como objetos Date
        const fechaIni = this._convertirAFecha(this.fechaEntrada);
        const fechaFin = this._convertirAFecha(this.fechaSalida);
        
        let costeTotal = 0;
        
        // Recorrer cada día de la estancia
        const fechaActual = new Date(fechaIni);
        while (fechaActual < fechaFin) {
            // Determinar el día de la semana (0-6, donde 0 es domingo y 6 es sábado)
            const diaSemana = fechaActual.getDay();
            
            // Asignar el coste según el día de la semana
            if (diaSemana === 0) { // Domingo
                costeTotal += 43;
            } else if (diaSemana === 6) { // Sábado
                costeTotal += 36;
            } else { // De lunes a viernes
                costeTotal += 24;
            }
            
            // Avanzar al siguiente día
            fechaActual.setDate(fechaActual.getDate() + 1);
        }
        
        return costeTotal;
    }
    
    /**
     * Convierte una fecha en formato "dd/mm/yyyy" a un objeto Date
     * @param {string} fecha - Fecha en formato "dd/mm/yyyy"
     * @returns {Date} - Objeto Date
     * @private
     */
    _convertirAFecha(fecha) {
        const [dia, mes, anio] = fecha.split('/');
        return new Date(anio, mes - 1, dia); // La resta en el mes es porque en JavaScript los meses van de 0 a 11
    }
    
    /**
     * Calcula el número de días entre dos fechas
     * @param {string} fechaDesde - Fecha inicial en formato "dd/mm/yyyy"
     * @param {string} fechaHasta - Fecha final en formato "dd/mm/yyyy"
     * @returns {number} - Número de días entre las fechas
     * @private
     */
    _calcularDiasEntreFechas(fechaDesde, fechaHasta) {
        const fechaIni = this._convertirAFecha(fechaDesde);
        const fechaFin = this._convertirAFecha(fechaHasta);
        
        // Calcular la diferencia en milisegundos
        const diferenciaMs = fechaFin - fechaIni;
        
        // Convertir de milisegundos a días
        // 1000 ms/s * 60 s/min * 60 min/h * 24 h/día = 86400000 ms/día
        return Math.round(diferenciaMs / 86400000);
    }
    
    /**
     * Valida que las fechas sean correctas (la salida posterior a la entrada y estancia mínima de 1 día)
     * @param {string} fechaEntrada - Fecha de entrada en formato "dd/mm/yyyy"
     * @param {string} fechaSalida - Fecha de salida en formato "dd/mm/yyyy"
     * @throws {Error} - Si las fechas no cumplen con las condiciones
     * @private
     */
    _validarFechas(fechaEntrada, fechaSalida) {
        const fechaIni = this._convertirAFecha(fechaEntrada);
        const fechaFin = this._convertirAFecha(fechaSalida);
        
        // Comprobar que la fecha de salida es posterior a la de entrada
        if (fechaFin <= fechaIni) {
            throw new Error("Fecha de salida debe ser posterior a la de entrada");
        }
        
        // Comprobar que hay al menos un día de estancia
        const diasEstancia = this._calcularDiasEntreFechas(fechaEntrada, fechaSalida);
        if (diasEstancia < 1) {
            throw new Error("Estancia mínima debe ser un día");
        }
    }
}

// Exportar la clase para los tests
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Reserva };
} 