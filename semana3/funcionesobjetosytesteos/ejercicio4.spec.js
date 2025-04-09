/**
 * Tests para la clase Reserva
 */

// Importar la clase que vamos a testear
const { Reserva } = require('./ejercicio4');

describe("Clase Reserva", () => {
    let reserva;
    
    // Antes de cada test, crear una nueva instancia de Reserva
    beforeEach(() => {
        reserva = new Reserva("García;Ortiz;Juan Antonio", "44958625A", "27/02/2020", "3/03/2020");
    });
    
    // Test para comprobar que el código de cliente es correcto
    it("debería devolver el código de cliente correcto", () => {
        expect(reserva.codigoCliente).toBe("JGARCÍA625");
    });
    
    // Test para comprobar que el número de días de estancia es correcto
    it("debería calcular correctamente el número de días de estancia", () => {
        expect(reserva.numeroDiasEstancia).toBe(5);
    });
    
    // Test para comprobar que el coste de la estancia es correcto
    it("debería calcular correctamente el coste de la estancia", () => {
        expect(reserva.costeEstancia()).toBe(151);
    });
    
    // Test para comprobar que las fechas originales no se modifican al calcular el coste
    it("no debería modificar las fechas al calcular el coste", () => {
        const fechaEntradaOriginal = reserva.fechaEntrada;
        const fechaSalidaOriginal = reserva.fechaSalida;
        
        reserva.costeEstancia();
        
        expect(reserva.fechaEntrada).toBe(fechaEntradaOriginal);
        expect(reserva.fechaSalida).toBe(fechaSalidaOriginal);
    });
    
    // Test para comprobar que las fechas se modifican correctamente
    it("debería modificar correctamente las fechas", () => {
        reserva.modificarFechas("28/02/2020", "1/03/2020");
        expect(reserva.numeroDiasEstancia).toBe(2);
    });
    
    // Test para comprobar que se lanza un error si la fecha de salida es anterior a la de entrada
    it("debería lanzar un error si la fecha de salida es anterior a la de entrada", () => {
        expect(() => {
            reserva.modificarFechas("3/03/2020", "27/02/2020");
        }).toThrowError("Fecha de salida debe ser posterior a la de entrada");
    });
    
    // Test para comprobar que se lanza un error si la estancia es menor a un día
    it("debería lanzar un error si la estancia es menor a un día", () => {
        expect(() => {
            reserva.modificarFechas("27/02/2020", "27/02/2020");
        }).toThrowError("Estancia mínima debe ser un día");
    });
}); 