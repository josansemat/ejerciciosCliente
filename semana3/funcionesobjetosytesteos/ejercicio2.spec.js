/**
 * Tests para la función filtrarPrimosMayoresOnce
 */

// Importar la función que vamos a testear
const { filtrarPrimosMayoresOnce } = require('./ejercicio2');

describe("Función filtrarPrimosMayoresOnce", () => {
    // Datos para las pruebas
    const datos = [
        { entrada: [6, 11, 18, 43, 8, 5, 45, 53, 9, 7, 24, 23], salida: [23, 43, 53] },
        { entrada: [6, 5, 24, 47, 8, 11, 18, 41, 9, 2, 35, 19], salida: [19, 41, 47] },
        { entrada: [4, 5, 45, 47, 6, 7, 27, 43, 10, 11, 35, 23], salida: [23, 43, 47] },
        { entrada: [9, 11, 20, 23, 6, 3, 24, 17, 8, 5, 14, 47], salida: [17, 23, 47] },
        { entrada: [9, 2, 45, 29, 8, 7, 18, 19, 6, 5, 12, 13], salida: [13, 19, 29] }
    ];

    // Testear que la función devuelve los resultados esperados para cada conjunto de datos
    datos.forEach((caso, index) => {
        it(`debería filtrar correctamente el caso ${index + 1}`, () => {
            const resultado = filtrarPrimosMayoresOnce(caso.entrada);
            expect(resultado).toEqual(caso.salida);
        });
    });

    // Testear que la función devuelve un array
    it("debería devolver un array", () => {
        const resultado = filtrarPrimosMayoresOnce([6, 11, 18, 43]);
        expect(Array.isArray(resultado)).toBe(true);
    });

    // Casos adicionales de prueba
    it("debería devolver un array vacío si no hay primos mayores que 11", () => {
        const resultado = filtrarPrimosMayoresOnce([6, 11, 4, 9, 10, 8, 6]);
        expect(resultado).toEqual([]);
    });

    it("debería manejar correctamente un array vacío", () => {
        const resultado = filtrarPrimosMayoresOnce([]);
        expect(resultado).toEqual([]);
    });
}); 