-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 14-05-2025 a las 16:14:18
-- Versión del servidor: 8.0.42-0ubuntu0.24.04.1
-- Versión de PHP: 8.3.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `seguraja_general`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `precipitaciones`
--

CREATE TABLE `precipitaciones` (
  `id` int NOT NULL,
  `mes` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `precipitaciones` float NOT NULL,
  `anio` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `precipitaciones`
--

INSERT INTO `precipitaciones` (`id`, `mes`, `precipitaciones`, `anio`) VALUES
(1, 'Enero', 35.2, 2025),
(2, 'Febrero', 65.28, 2025),
(3, 'Marzo', 5.35, 2025),
(4, 'Abril', 86.13, 2025),
(5, 'Mayo', 44.9, 2025),
(6, 'Junio', 32.4, 2025),
(7, 'Julio', 15.8, 2025),
(8, 'Agosto', 32.2, 2025),
(9, 'Septiembre', 35.62, 2025),
(10, 'Octubre', 98.9, 2025),
(11, 'Noviembre', 25.7, 2025),
(12, 'Diciembre', 12.6, 2025);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `precipitaciones`
--
ALTER TABLE `precipitaciones`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `precipitaciones`
--
ALTER TABLE `precipitaciones`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
