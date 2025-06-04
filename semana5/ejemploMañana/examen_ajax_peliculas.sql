-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 25-02-2025 a las 10:44:09
-- Versión del servidor: 10.4.22-MariaDB
-- Versión de PHP: 8.0.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `examen_ajax_peliculas`
--
CREATE DATABASE IF NOT EXISTS `examen_ajax_peliculas` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `examen_ajax_peliculas`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `peliculas`
--

CREATE TABLE `peliculas` (
  `id` int(11) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `genero` varchar(50) NOT NULL,
  `anio` year(4) NOT NULL,
  `duracion` varchar(20) NOT NULL,
  `director` varchar(255) NOT NULL,
  `actores` varchar(1000) NOT NULL,
  `sinopsis` text NOT NULL,
  `poster` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `peliculas`
--

INSERT INTO `peliculas` (`id`, `titulo`, `genero`, `anio`, `duracion`, `director`, `actores`, `sinopsis`, `poster`) VALUES
(1, '2001: A Space Odyssey', 'Sci-Fi', 1968, '139 min', 'Stanley Kubrick', 'Keir Dullea, Gary Lockwood, William Sylvester', '\"2001\" is a story of evolution. A race begins between computers (HAL) and human (Bowman) to reach the monolith placers.', 'images/space_odyssey.jpg'),
(2, 'Clockwork Orange', 'Distopic', 1971, '137 min', 'Stanley Kubrick', 'Malcolm McDowell, Patrick Magee', 'A very wealthy, but lonely woman is stalked in her home by a violent serial killer.', 'images/clockworkorange.jpg'),
(3, 'Labyrinth', 'Adventure', 1986, '101 min', 'Jim Henson', 'David Bowie, Jennifer Connelly, Toby Froud', 'Sarah is forced by her stepmother to babysit her baby brother Toby. Sarah wishes that her stepbrother be taken by the Goblin King Jareth.', 'images/labyrinth.jpg'),
(4, 'Terminator', 'Sci-Fi', 1984, '108 min', 'James Cameron', 'Arnold Schwarzenegger, Linda Hamilton, Michael Biehn', 'A cyborg comes from the future, to kill a girl named Sarah Lee.', 'images/terminator.jpg');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `peliculas`
--
ALTER TABLE `peliculas`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `peliculas`
--
ALTER TABLE `peliculas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
