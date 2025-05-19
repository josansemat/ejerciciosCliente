<?php
class Precipitaciones { 

public int $id;
public string $mes;
public float $precipitaciones;
public int $anio;


function __construct($id, $mes, $precipitaciones,$anio)
{
	$this->id = $id;	
	$this->mes = $mes;
	$this->precipitaciones = $precipitaciones;
	$this->anio=$anio;
}
	
public function getid()
{
    return $this->id;
}
	
public function getmes()
{
	return $this->mes;
}
		
public function getprecipitaciones()
{
	return $this->precipitaciones;
}
public function getanio()
{
	return $this->anio;
}

}

