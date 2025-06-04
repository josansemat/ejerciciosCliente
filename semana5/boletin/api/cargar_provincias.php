<?php
require_once 'config.php'; // Incluir el archivo de configuración
require_once 'Provincias.php'; // Incluir la clase provincia

//sleep(2);

// Comprobar si se ha recibido el código de comunidad
if (!isset($_GET['cod'])) {
    header('HTTP/1.1 400 Bad Request');
    exit('Falta el código de comunidad autónoma');
}

$codComunidad = intval($_GET['cod']); // Convertir a entero y sanitizar

try {
    // Crear una nueva conexión PDO usando las variables del archivo de configuración
    $conexion = new PDO("mysql:host=$db_host;dbname=$db_nombre;charset=$db_charset", $db_usuario, $db_contraseña);
    // Configurar el modo de error de PDO
    $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die ("Error en la conexión: " . $e->getMessage());
}

$vec = []; 

// Modificar la consulta para filtrar por comunidad
$consulta = $conexion->prepare("SELECT id, nombre, comunidad FROM provincias WHERE comunidad = ?");
$consulta->execute([$codComunidad]);

while ($reg = $consulta->fetchObject()) {
  $vec[] = new Provincias($reg->id, $reg->nombre, $reg->comunidad);
}

// Crear la estructura XML usando SimpleXMLElement
$xmlstr = "<?xml version='1.0' encoding='UTF-8'?>\n".
          "<provincias></provincias>";
$xml = new SimpleXMLElement($xmlstr);

foreach ($vec as $provincia) {
    $item = $xml->addChild('provincia');
    $item->addChild('id', $provincia->id);
    $item->addChild('nombre', $provincia->nombre);
    $item->addChild('comunidad', $provincia->comunidad);
}

// Configurar el encabezado para XML
header('Content-Type: application/xml; charset=utf-8');
// Imprimir el XML generado
print $xml->asXML();
?>