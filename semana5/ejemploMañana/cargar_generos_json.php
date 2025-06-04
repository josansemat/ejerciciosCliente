<?php
require_once 'config.php'; // Incluir el archivo de configuración
require_once 'Genero.php'; // Incluir el archivo de la clase Categoria

//sleep(2);

try {
    // Crear una nueva conexión PDO usando las variables del archivo de configuración
    $conexion = new PDO("mysql:host=$db_host;dbname=$db_nombre;charset=$db_charset", $db_usuario, $db_contraseña);
    // Configurar el modo de error de PDO
    $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die ("Error en la conexión: " . $e->getMessage());
}

$vec=[]; // Array en el que se almacenarán los objetos Categoria

$consulta = $conexion->query("SELECT DISTINCT genero FROM peliculas");
while ($reg = $consulta->fetchObject()) {
  $vec[] = new Genero($reg->genero);
}

// $vec contiene un array de objetos Categoria

//var_dump($vec);die();

// Añadimos la cabecera de tipo JSON
header('Content-Type: application/json; charset=utf-8');
print json_encode($vec);  // json_encode convierte un array en formato JSON

?>