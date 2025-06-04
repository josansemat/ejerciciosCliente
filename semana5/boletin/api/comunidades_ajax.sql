-- Crear la base de datos
CREATE DATABASE comunidades_ajax;

-- Usar la base de datos
USE comunidades_ajax;

-- Crear la tabla comunidades_autonomas
CREATE TABLE comunidades_autonomas (
    id INT(11) NOT NULL PRIMARY KEY,
    nombre VARCHAR(30) NOT NULL
);

-- Insertar registros en comunidades_autonomas
INSERT INTO comunidades_autonomas (id, nombre) VALUES
(1, 'Valencia'),
(2, 'Extremadura'),
(3, 'Aragon');

-- Crear la tabla provincias
CREATE TABLE provincias (
    id INT(11) NOT NULL PRIMARY KEY,
    nombre VARCHAR(30) NOT NULL,
    comunidad INT(11) NOT NULL
);

-- Insertar registros en provincias
INSERT INTO provincias (id, nombre, comunidad) VALUES
(1, 'Castellon', 1),
(2, 'Valencia', 1),
(3, 'Alicante', 1),
(4, 'Caceres', 2),
(5, 'Badajoz', 2),
(6, 'Huesca', 3),
(7, 'Zaragoza', 3),
(8, 'Teruel', 3);
