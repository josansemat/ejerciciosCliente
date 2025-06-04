let articulos = [
    {
        id: 1,
        nombre: "Monitor",
        caracteristicas: { precio: 151.23, descuento: 10 },
    },
    {
        id: 2,
        nombre: "Ratón",
        caracteristicas: { precio: 5.45, descuento: 5 },
    },
    {
        id: 3,
        nombre: "Cascos",
        caracteristicas: { precio: 15.59, descuento: 15 },
    },
    {
        id: 4,
        nombre: "Escáner",
        caracteristicas: { precio: 95.12, descuento: 20 },
    },
];

document.addEventListener("DOMContentLoaded", inicializarEventos);

function inicializarEventos() {
    inicio();
}

function inicio() {
    let izquierda = document.querySelector('#tblIzquierda tbody');
    let izquierdaHTML = "";
    for (let articulo of articulos) {
        izquierdaHTML += `<tr id="articulo-${articulo.id}" onmouseover="pintarAmarillo(${articulo.id})" onmouseout="pintarBlanco(${articulo.id})">`;
        izquierdaHTML += `<td>${articulo.nombre}</td>`;
        izquierdaHTML += `<td>${articulo.caracteristicas.precio}</td>`;
        izquierdaHTML += `<td>
            <button class="botonIzquierda" value="izquierda" onclick="moverIzquierda(${articulo.id})"><</button>
            <button class="botonDerecha" value="izquierda" onclick="moverDerecha(${articulo.id})">></button>
            <button onclick="mostrarDescuento(${articulo.id})">Dto.</button>
        </td>`;
        izquierdaHTML += `</tr>`;
    }
    izquierda.innerHTML = izquierdaHTML;
}

function moverIzquierda(id) {
    let tr = document.getElementById(`articulo-${id}`);
    let buttonIzquierda = tr.querySelector(".botonIzquierda");
    let buttonDerecha = tr.querySelector(".botonDerecha");

    if (buttonIzquierda.value === "izquierda") {
        alert("No se puede mover a la izquierda");
    } else {
        buttonIzquierda.value = "izquierda";
        buttonDerecha.value = "izquierda";
        let tbodyIzquierda = document.querySelector("#tblIzquierda tbody");
        tbodyIzquierda.appendChild(tr);
    }
}

function moverDerecha(id) {
    let tr = document.getElementById(`articulo-${id}`);
    let buttonIzquierda = tr.querySelector(".botonIzquierda");
    let buttonDerecha = tr.querySelector(".botonDerecha");

    if (buttonDerecha.value === "derecha") {
        alert("No se puede mover a la derecha");
    } else {
        buttonIzquierda.value = "derecha";
        buttonDerecha.value = "derecha";
        let tbodyDerecha = document.querySelector("#tblDerecha tbody");
        tbodyDerecha.appendChild(tr);
    }
}

function mostrarDescuento(id) {
    let articulo = articulos.find(articulo => articulo.id === id);
    alert(articulo.caracteristicas.descuento + " Dto.");
}

function pintarAmarillo(id) {
    let tr = document.getElementById(`articulo-${id}`);
    tr.style.backgroundColor = "yellow";
}

function pintarBlanco(id) {
    let tr = document.getElementById(`articulo-${id}`);
    tr.style.backgroundColor = "white";
}
