<?php require_once 'config.php'; 

try {
    $conexion = new PDO("mysql:host=$db_host;dbname=$db_nombre;charset=$db_charset", $db_usuario, $db_contraseña);
    $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo $e->getMessage();
    exit;
}

$codigo = $_GET['cod'];

$xmlstr = "<?xml version='1.0' encoding='UTF-8'?>\n" . "<partes></partes>";
$xml = new SimpleXMLElement($xmlstr);

if ($codigo) {
    $consulta = $conexion->prepare("SELECT id, descripcion FROM partes WHERE id = $codigo");
    $consulta = $conexion->prepare("SELECT id, descripcion FROM partes WHERE id = :id");
    $consulta->execute(['id' => $codigo]);
    $resultado = $consulta->fetch();

    if ($resultado) {
        $item = $xml->addChild('parte');
        $item->addChild('id', $resultado['id']);
        $item->addChild('descripcion', $resultado['descripcion']);
    }
}

header('Content-Type: application/xml; charset=utf-8');
print $xml->asXML();