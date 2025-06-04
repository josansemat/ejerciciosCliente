<?php
require_once 'config.php'; // Incluir el archivo de configuración
require_once 'Pelicula.php'; // Incluir la clase Periferico

//sleep(2);

try {
    // Crear una nueva conexión PDO usando las variables del archivo de configuración
    $conexion = new PDO("mysql:host=$db_host;dbname=$db_nombre;charset=$db_charset", $db_usuario, $db_contraseña);
    // Configurar el modo de error de PDO
    $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die ("Error en la conexión: " . $e->getMessage());
}

$vec = []; 

$where = isset($_GET['genero']) ? " WHERE genero='{$_GET['genero']}'" : "";

$consulta = $conexion->query("SELECT * FROM peliculas $where");

while ($reg = $consulta->fetchObject()) {
  $vec[] = new Pelicula($reg->id,$reg->titulo, $reg->genero, $reg->anio, $reg->duracion, $reg->director, $reg->actores, $reg->sinopsis, $reg->poster);
}


// Crear la estructura XML usando SimpleXMLElement
$xmlstr = "<?xml version='1.0' encoding='UTF-8'?>\n".
          "<peliculas></peliculas>";
$xml = new SimpleXMLElement($xmlstr);

foreach ($vec as $pelicula) {
    $item = $xml->addChild('pelicula');
    $item->addChild('id', $pelicula->id);
    $item->addChild('titulo', $pelicula->titulo);
    $item->addChild('genero', $pelicula->genero);
    $item->addChild('anio', $pelicula->anio);
    //$item->addChild('duracion', $pelicula->duracion);
    //$item->addChild('director', $pelicula->director);
    //$item->addChild('actores', $pelicula->actores);
    $item->addChild('sinopsis', $pelicula->sinopsis);
    $item->addChild('poster', $pelicula->poster);
}

// Configurar el encabezado para XML
header('Content-Type: application/xml; charset=utf-8');
// Imprimir el XML generado
print $xml->asXML();
?>
