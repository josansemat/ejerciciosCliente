
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


--
-- Base de datos: `cuerpo`
--
CREATE DATABASE IF NOT EXISTS `cuerpo` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `cuerpo`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `partes`
--

DROP TABLE IF EXISTS `partes`;
CREATE TABLE `partes` (
  `id` varchar(3) NOT NULL,
  `descripcion` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `partes`
--

INSERT INTO `partes` (`id`, `descripcion`) VALUES
('b0', 'Cuerpo humano'),
('b1', 'Parte 1'),
('b10', 'Parte 10'),
('b11', 'Parte 11'),
('b12', 'Parte 12'),
('b2', 'Parte 2'),
('b3', 'Parte 3'),
('b4', 'Parte 4'),
('b5', 'Parte 5'),
('b6', 'Parte 6'),
('b7', 'Parte 7'),
('b8', 'Parte 8'),
('b9', 'Parte 9');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `partes`
--
ALTER TABLE `partes`
  ADD PRIMARY KEY (`id`);
COMMIT;

