<?php
require_once 'config.php'; // Incluir el archivo de configuración
require_once 'Productos.php'; // Incluir el archivo de la clase Productos

//sleep(2);

try {
    // Crear una nueva conexión PDO usando las variables del archivo de configuración
    $conexion = new PDO("mysql:host=$db_host;dbname=$db_nombre;charset=$db_charset", $db_usuario, $db_contraseña);
    // Configurar el modo de error de PDO
    $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die ("Error en la conexión: " . $e->getMessage());
}

$vec=[]; // Array en el que se almacenarán los objetos Periferico

$consulta = $conexion->query("SELECT id, id_categoria, nombre, precio, descripcion, imagen, caracteristicas FROM productos");
while ($reg = $consulta->fetchObject()) {
  $vec[] = new Periferico($reg->id,$reg->id_categoria,$reg->nombre,$reg->precio,$reg->descripcion,$reg->imagen,$reg->caracteristicas);
}

// $vec contiene un array de objetos Periferico

//var_dump($vec);die();

// Añadimos la cabecera de tipo JSON
header('Content-Type: application/json; charset=utf-8');
print json_encode($vec);  // json_encode convierte un array en formato JSON

?>