<!DOCTYPE html>
<html lang="es">
     <head>
         <meta charset="UTF-8">
         <meta name="viewport" content="width=device-width, initial-scale=1.0">
         <title></title>
         <!-- <link rel="stylesheet" href="style.css">    -->
     </head>
     <body>

    <p>El nombre es: <?= $_REQUEST['nombre'] ?> </p>
    <p>El sexo es: <?= $_REQUEST['sexo'] ?> </p>
    <p>La altura es: <?= $_REQUEST['altura'] ?> </p>
    <p>Fecha nac: <?= $_REQUEST['edad'] ?> </p>
    <p>La semana es: <?= $_REQUEST['semana'] ?> </p>
    <p>Fumador: <?= $fuma=(isset($_REQUEST['esFumador'])) ? 'Si' : 'No' ; ?> </p>
    <p><?= $fuma=(isset($_REQUEST['esFumador'])) ? 'Fuma: '. $_REQUEST['cigarrillos'] . ' cigarrillos' : '' ; ?></p>
    <p> <?= $observaciones=(isset($_REQUEST['observaciones']) && $_REQUEST['observaciones']!="" ) ? 'Observaciones: '. $_REQUEST['observaciones'] : 'Sin observaciones.' ; ?> </p>



     </body>
</html>