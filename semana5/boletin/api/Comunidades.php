<?php
    class Comunidades{
        public $id;
        public $nombre;

        public function __construct( $id,  $nombre){$this->id = $id;$this->nombre = $nombre;}
	
        public function getId() {return $this->id;}

	    public function getNombre() {return $this->nombre;}

	    public function setId( $id): void {$this->id = $id;}

	    public function setNombre( $nombre): void {$this->nombre = $nombre;}
    } 
?>