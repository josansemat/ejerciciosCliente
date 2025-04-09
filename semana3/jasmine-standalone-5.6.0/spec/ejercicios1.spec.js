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
            // expect(areaCalculada).toEqual(177.083)

        });
    });

    // datosPrueba.forEach(
    //     (item)=>{
    //         it('Para un lado de ${item.lado} y altura ${item.altura} es ${item.areaEsperada}', () => {
    //             expect(area............No me ha dado tiempo de copiarlo)
    //         });
    //     }
    // )



    // Testear que devuelve un tipo de dato number
    it("debería devolver un dato de tipo number", () => {
        expect(areaPiramide(6,5)).toBeInstanceOf(Number);
    });

    // Testear que lanza un error cuando el lado es negativo
    it("debería lanzar un error cuando el lado es negativo", () => {
        expect(() => {
            areaPiramide(-6.8, 9);
        }).toThrowError();
    });

    // Testear que lanza un error cuando la altura es negativa
    it("debería lanzar un error cuando la altura es negativa", () => {
        expect(() => {
            areaPiramide(6.8, -9);
        }).toThrowError();
    });
    
}); 