<?php
class Categorias { 

public int $id;
public string $nombre;


function __construct($id, $nombre)
{
	$this->id = $id;	
	$this->nombre = $nombre;
	
}
	
public function getid()
{
    return $this->id;
}
	
public function getnombre()
{
	return $this->nombre;
}

}
