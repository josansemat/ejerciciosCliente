/**
 * Tests para la función areaPiramide
 */

// Importar la función que vamos a testear
const { areaPiramide } = require('./ejercicio1');

describe("Función areaPiramide", () => {
    // Valores de prueba proporcionados
    const datosPrueba = [
        { lado: 6.8, altura: 9, areaEsperada: 177.083 },
        { lado: 7.1, altura: 9.4, areaEsperada: 193.092 },
        { lado: 7.4, altura: 9.8, areaEsperada: 209.793 }
    ];

    // Testear que devuelve los valores esperados para diferentes entradas
    datosPrueba.forEach(({ lado, altura, areaEsperada }) => {
        it(`debería devolver un área aproximada a ${areaEsperada} para lado=${lado} y altura=${altura}`, () => {
            // Calcular el área con nuestra función
            const areaCalculada = areaPiramide(lado, altura);
            
            // Comprobar que el resultado es aproximadamente igual al esperado
            // (redondeado a 3 decimales para comparar con el valor esperado)
            expect(areaCalculada).toBeCloseTo(areaEsperada, 3);
        });
    });

    // Testear que devuelve un tipo de dato number
    it("debería devolver un dato de tipo number", () => {
        const area = areaPiramide(6.8, 9);
        expect(typeof area).toBe('number');
    });

    // Testear que lanza un error cuando el lado es negativo
    it("debería lanzar un error cuando el lado es negativo", () => {
        expect(() => {
            areaPiramide(-6.8, 9);
        }).toThrowError("Los parámetros de entrada deben tener valores positivos");
    });

    // Testear que lanza un error cuando la altura es negativa
    it("debería lanzar un error cuando la altura es negativa", () => {
        expect(() => {
            areaPiramide(6.8, -9);
        }).toThrowError("Los parámetros de entrada deben tener valores positivos");
    });
}); 