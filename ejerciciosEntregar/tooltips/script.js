addEventListener('load', inicializarEventos, false);

function inicializarEventos() {
    var vec = document.getElementsByTagName('div');
    for(f = 0; f < vec.length; f++) {
        vec[f].addEventListener('mouseover', mostrarToolTip, false);
        vec[f].addEventListener('mouseout', ocultarToolTip, false);
        vec[f].addEventListener('mousemove', actualizarToolTip, false);
    }
    
    var ele = document.createElement('div');
    ele.setAttribute('id','divmensaje');
    vec = document.getElementsByTagName('body');
    vec[0].appendChild(ele);
}

function mostrarToolTip(e) {
    var d = document.getElementById("divmensaje");
    d.style.visibility = "visible";
    d.style.left = (e.clientX + document.body.scrollLeft + 15) + 'px';
    d.style.top = (e.clientY + document.body.scrollTop + 15) + 'px';
    var ref;
    ref = e.target;
    recuperarServidorTooltip(ref.getAttribute('id'));
}

function actualizarToolTip(e) {
    var d = document.getElementById("divmensaje");
    d.style.left = (e.clientX + document.body.scrollLeft + 15) + 'px';
    d.style.top = (e.clientY + document.body.scrollTop + 15) + 'px';
}

function ocultarToolTip(e) {
    var d = document.getElementById("divmensaje");
    d.style.visibility = "hidden";
}

var conexion1;
function recuperarServidorTooltip(codigo) {
    conexion1 = new XMLHttpRequest();
    conexion1.open('GET', 'cargar_partes_xml.php?cod=' + codigo, true);
    conexion1.addEventListener('readystatechange', procesarEventos);
    conexion1.send();
}

function procesarEventos() {
    let d = document.getElementById("divmensaje");
    
    if(conexion1.readyState == 4 && conexion1.status == 200) {
        try {
            let xmlDoc = conexion1.responseXML;
            
            let partes = xmlDoc.getElementsByTagName("parte");
            
            let id = partes[0].getElementsByTagName("id")[0].textContent;
            let descripcion = partes[0].getElementsByTagName("descripcion")[0].textContent;
            d.innerHTML = '<div><b>Id:</b> ' + id + "<br>" + '<b>Descripción:</b> ' + descripcion + "</div>";
        } catch (ex) {
            console.error('Error al cargar los datos:', ex);
        }
    } else {
        d.innerHTML = '<img src="img/cargando.gif" alt="Cargando" class="cargando">';
    }
}