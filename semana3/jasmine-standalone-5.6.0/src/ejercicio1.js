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