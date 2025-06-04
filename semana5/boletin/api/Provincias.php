<?php
    class Provincias{
        public $id;
        public $nombre;
        public $comunidad;


    public function __construct( $id,  $nombre,  $comunidad){$this->id = $id;$this->nombre = $nombre;$this->comunidad = $comunidad;}
	public function getId() {return $this->id;}

	public function getNombre() {return $this->nombre;}

	public function getComunidad() {return $this->comunidad;}

	public function setId( $id): void {$this->id = $id;}

	public function setNombre( $nombre): void {$this->nombre = $nombre;}

	public function setComunidad( $comunidad): void {$this->comunidad = $comunidad;}	
    } 





?>