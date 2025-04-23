<?php
class Productos { 
public int $id;
public int $id_categoria;
public string $nombre;
public int $precio;
public string $descripcion;
public string $imagen;
public string $caracteristicas;

public function __construct(int $id, int $id_categoria, string $nombre, int $precio, string $descripcion, string $imagen, string $caracteristicas){$this->id = $id;$this->id_categoria = $id_categoria;$this->nombre = $nombre;$this->precio = $precio;$this->descripcion = $descripcion;$this->imagen = $imagen;$this->caracteristicas = $caracteristicas;}
public function getId(): int {return $this->id;}

public function getIdCategoria(): int {return $this->id_categoria;}

public function getNombre(): string {return $this->nombre;}

public function getPrecio(): int {return $this->precio;}

public function getDescripcion(): string {return $this->descripcion;}

public function getImagen(): string {return $this->imagen;}

public function getCaracteristicas(): string {return $this->caracteristicas;}

}


	