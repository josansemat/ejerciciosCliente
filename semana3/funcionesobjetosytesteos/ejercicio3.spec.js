/**
 * Tests para la función numeroDiasFechas
 */

// Importar la función que vamos a testear
const { numeroDiasFechas } = require('./ejercicio3');

describe("Función numeroDiasFechas", () => {
    // Datos para las pruebas
    const datosPrueba = [
        { fechaDesde: "9/11/2021", fechaHasta: "9/11/2021", diasEsperados: 0 },
        { fechaDesde: "28/02/2020", fechaHasta: "1/3/2020", diasEsperados: 2 },
        { fechaDesde: "28/02/2021", fechaHasta: "1/3/2021", diasEsperados: 1 },
        { fechaDesde: "17/04/1973", fechaHasta: "14/11/1979", diasEsperados: 2402 }
    ];

    // Testear que la función devuelve los resultados esperados para cada conjunto de datos
    datosPrueba.forEach(({ fechaDesde, fechaHasta, diasEsperados }) => {
        it(`debería devolver ${diasEsperados} días entre ${fechaDesde} y ${fechaHasta}`, () => {
            const diasCalculados = numeroDiasFechas(fechaDesde, fechaHasta);
            expect(diasCalculados).toBe(diasEsperados);
        });
    });

    // Testear que la función devuelve un número
    it("debería devolver un dato de tipo number", () => {
        const diasTranscurridos = numeroDiasFechas("9/11/2021", "10/11/2021");
        expect(typeof diasTranscurridos).toBe('number');
    });

    // Testear que la función lanza un error cuando una fecha es incorrecta
    it("debería lanzar un error cuando la fecha de inicio es incorrecta", () => {
        expect(() => {
            numeroDiasFechas("32/10/2024", "10/11/2024");
        }).toThrowError("Alguna(s) de las fechas de entrada es incorrecta");
    });

    it("debería lanzar un error cuando la fecha de fin es incorrecta", () => {
        expect(() => {
            numeroDiasFechas("10/11/2024", "30/02/2024");
        }).toThrowError("Alguna(s) de las fechas de entrada es incorrecta");
    });

    it("debería lanzar un error cuando ambas fechas son incorrectas", () => {
        expect(() => {
            numeroDiasFechas("32/10/2024", "30/02/2024");
        }).toThrowError("Alguna(s) de las fechas de entrada es incorrecta");
    });
}); 