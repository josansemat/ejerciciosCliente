/**
 * Ejercicio 1: Área de una pirámide
 * 
 * Crea una función llamada areaPiramide que tenga dos argumentos de entrada, 
 * el lado de la pirámide L y la altura de la misma h. La función debe devolver 
 * un number con el área de la pirámide redondeada a cinco decimales. 
 * Si a la función le pasamos un lado o altura negativos debe lanzar un error 
 * con el texto "Los parámetros de entrada deben tener valores positivos"
 * 
 * El área de una pirámide viene dada por la fórmula:
 * A=L∙(L+4h2+L2)
 * (Donde L es el lado y h la altura)
 */

/**
 * Calcula el área de una pirámide cuadrada
 * @param {number} lado - El lado de la base de la pirámide
 * @param {number} altura - La altura de la pirámide
 * @returns {number} - El área de la pirámide redondeada a 5 decimales
 * @throws {Error} - Si el lado o la altura son negativos
 */
function areaPiramide(lado, altura) {
    // Comprobar que los parámetros de entrada son positivos
    if (lado < 0 || altura < 0) {
        throw new Error("Los parámetros de entrada deben tener valores positivos");
    }

    // Calcular la raíz cuadrada de (4h² + L²)
    const raizCuadrada = Math.sqrt(4 * Math.pow(altura, 2) + Math.pow(lado, 2));
    
    // Calcular el área usando la fórmula A = L * (L + raíz)
    const area = lado * (lado + raizCuadrada);
    
    // Redondear el resultado a 5 decimales
    return Math.round(area * 100000) / 100000;
}

// Exportar la función para los tests
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { areaPiramide };
} 