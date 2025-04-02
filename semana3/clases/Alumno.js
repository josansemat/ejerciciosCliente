// 1. Constructor
// Debes crear la clase Alumno la cual tendrá las siguientes propiedades:
// Nombre: será un dato alfanumérico con el nombre de pila
// Apellido1: primer apellido del alumno
// Apellido2: segundo apellido del alumno
// DNI: DNI del alumno
// Debes tener también en cuenta que posteriormente se podrán añadir las notas del alumno.
//  Por ejemplo, para crear una instancia de un alumno llamado Fco. Javier Soldado Galvin, con DNI 44968715T usaremos:
//  
// let alumno1=new Alumno ("Fco. Javier", "Soldado", "Galvín", "44968715T")

class Alumno {
    constructor(nombre,apellido1,apellido2,dni) {
        this.nombre = nombre;
        this.apellido1 = apellido1;
        this.apellido2 = apellido2;
        this.dni = dni;
        this.notas = []; 
    }
    // 2. Método agregarNotas()
//  Crea para la clase Alumno un método llamado agregarNotas que permita añadir las notas del alumno. Las notas se introducirán con un literal de objeto con el formato {asignatura: "DWEC", nota: 6.1} . Se podrán agregar un número variables de notas.
//  Por ejemplo si el alumno tiene dos notas de la asignatura DWEC con 6.3 y 7.1 y una nota de DIW con una nota de 8.7 usaremos:
// 
// 
//  alumno1.agregarNotas({asignatura:"DWEC", nota: 6.2}, {asignatura: "DWEC", nota: 7.1}, {asignatura:"DIW", nota: 8.7});
    agregarNotas(...notas) {
        for (let i = 0; i < notas.length; i++) {
    
            this.notas.push(notas[i]);
        }
    }
    // 3. Método obtenerCorreoCorporativo()
// Crea para la clase Alumno un método llamado obtenerCorreoCorporativo que tenga como argumento un nombre de dominio (por ejemplo "iesruizgijon.com"). Este método devolverá el correo corporativo del alumno teniendo en cuenta las siguientes reglas:
// Primera inicial del nombre, tres primeras letras del primer apellido, tres primeras letras del segundo apellido, tres últimos dígitos del DNI
// Todos los caracteres deberán estar en minúsculas
// No tendrás tildes ni ñ (se sustituirá por n)
// 
// 
//  Por ejemplo, para el alumno Fco. Javier Soldado Galvin con DNI 44968715T :
// 
// 
//  alumno1.obtenerCorreoCorporativo("iesruizgijon.com"); // Devolverá fsolgal715@iesruizgijon.com
obtenerCorreoCorporativo(dominio){
    // Función para reemplazar acentos y 'ñ'
    const pepe = (texto) => {
        return texto.toLowerCase().replace(/[\u0300-\u036f]/g, "").replace(/ñ/g, "n"); // Reemplaza ñ por n y elimina acentos
    };
    let nombre = pepe(this.nombre.charAt(0));
    let apellido1 = pepe(this.apellido1.slice(0,3));
    let apellido2 = pepe(this.apellido2.slice(0,3));
    let dni = this.dni.slice(5,8).toLowerCase();
    let correo = `${nombre}${apellido1}${apellido2}${dni}@${dominio}`;
    return correo;
}
// 4. Método obtenerNotasMedias()
//  Implementar en la clase Alumno el método obtenerNotasMedias, el cual devolverá un array de objetos literales con la nota media de cada asignatura. Por ejemplo si el alumno tiene dos notas de la asignatura DWEC con 6.3 y 7.1 y una nota de DIW con una nota de 8.7 al invocar e invocamos este método:
// 
// 
// 
//  alumno1.obtenerNotasMedias(); // Devolverá el array [{asignatura:"DWEC", notaMedia:6.7}, {asignatura:"DWEC", notaMedia: 8.7}]

obtenerNotasMedias(){
    let asignaturas = {};
    let notasMedia = [];
    let suma = 0;
    let contador = 0;
    for (let i = 0; i < this.notas.length; i++) {
        // Obtenemos la asignatura y la nota de cada objeto literal
        let asignatura = this.notas[i].asignatura;
        let nota = this.notas[i].nota;
        // Si la asignatura no existe en el objeto asignaturas, la creamos
        if (!asignaturas[asignatura]) {
            asignaturas[asignatura] = { suma: 0, contador: 0 };
        }
        // Sumamos la nota a la suma de la asignatura y aumentamos el contador
        asignaturas[asignatura].suma += nota;
        asignaturas[asignatura].contador++;
    }
    // Calculamos la nota media de cada asignatura y la añadimos al array notasMedia
    for (let asignatura in asignaturas) {//for-in se usa para recorrer las propiedades de un objeto
        let notaMedia = (asignaturas[asignatura].suma) / (asignaturas[asignatura].contador);
        notasMedia.push({ asignatura: asignatura, notaMedia: notaMedia });
    }
    return notasMedia;
    
}

}

// 5. Clase Aula
// 
//  Crea la Clase Aula, la cual tendrá las siguientes propiedades:
//  NumeroAula: por ejemplo "9B"
//  NombreAula: por ejemplo "2º DAW"
//  Por tanto, para crear una instancia de un aula usaremos:
//  let aula1=new Aula ("9B", "2º DAW");
// 
// 
// 
// 
//  Esta clase Aula permitirá añadir alumnos mediante el método agregarAlumno, el cuál tendrá como parámetro un objeto alumno. Por ejemplo:
// 
// 
// 
// aula1.agregarAlumno(alumno1);
// aula1.agregarAlumno(alumno2);
// 
// 
// 
// 
// Además tendrá que implementar un getter en la clase Aula llamado numeroAlumnos que devuelva el número de alumnos de ese aula. Por ejemplo, si en aula1 agregamos dos alumnos:
// 
// 
// aula1.numeroAlumnos; // Devolverá 2


class Aula {
    constructor(numeroAula,nombreAula){
        this.numeroAula = numeroAula;
        this.nombreAula = nombreAula;
        this.alumnos = [];
    }
    agregarAlumno(alumno){
        this.alumnos.push(alumno);
    }
    get numeroAlumnos(){
        return this.alumnos.length;
    }
}

