/**
 * Ejercicio 2: Filtrar números primos mayores que 11.
 * 
 * Crea una función llamada filtrarPrimosMayoresOnce que tenga como argumento de entrada un array de números. 
 * Tu función debe devolver un array que contenga solo los números primos del array de entrada mayores que 11.
 * Además, el array devuelto deberá estar ordenado de menor a mayor.
 * Para el filtrado debes utilizar el método filter que ofrecen los objetos de tipo Array.
 */

/**
 * Determina si un número es primo
 * @param {number} numero - El número a comprobar
 * @returns {boolean} - true si el número es primo, false en caso contrario
 */
function esPrimo(numero) {
    // Los números menores o iguales a 1 no son primos
    if (numero <= 1) return false;
    
    // 2 y 3 son primos
    if (numero <= 3) return true;
    
    // Si es divisible por 2 o 3, no es primo
    if (numero % 2 === 0 || numero % 3 === 0) return false;
    
    // Comprobar divisibilidad por números de la forma 6k±1 hasta la raíz cuadrada
    for (let i = 5; i * i <= numero; i += 6) {
        if (numero % i === 0 || numero % (i + 2) === 0) return false;
    }
    
    return true;
}

/**
 * Filtra los números primos mayores que 11 de un array
 * @param {number[]} array - Array de números
 * @returns {number[]} - Array con los números primos mayores que 11 ordenados de menor a mayor
 */
function filtrarPrimosMayoresOnce(array) {
    // Filtrar solo los números primos mayores que 11
    const primosMayoresOnce = array.filter(num => num > 11 && esPrimo(num));
    
    // Ordenar el array resultante de menor a mayor
    return primosMayoresOnce.sort((a, b) => a - b);
}

// Exportar la función para los tests
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { filtrarPrimosMayoresOnce };
} 