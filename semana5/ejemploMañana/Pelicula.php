<?php
class Pelicula { 

public int $id;
public string $titulo;
public string $genero;
public int $anio;
public string $duracion;
public string $director;
public string $actores;
public string $sinopsis;
public string $poster;


function __construct($id,$titulo,$genero,$anio, $duracion, $director, $actores, $sinopsis, $poster)
{
	$this->id = $id;
	$this->titulo = $titulo;
	$this->genero = $genero;
	$this->anio = $anio;
	$this->duracion = $duracion;
	$this->director = $director;
	$this->actores = $actores;
	$this->sinopsis = $sinopsis;
	$this->poster = $poster;
}
	

}

