-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-12-2025 a las 16:21:53
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `biblioteca`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `autores`
--

CREATE TABLE `autores` (
  `idAutor` int(11) NOT NULL,
  `autNombre` varchar(100) DEFAULT NULL,
  `autApellido` varchar(100) DEFAULT NULL,
  `autFechaNac` date DEFAULT NULL,
  `autFechaDes` date DEFAULT NULL,
  `autBiografia` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `autores`
--

INSERT INTO `autores` (`idAutor`, `autNombre`, `autApellido`, `autFechaNac`, `autFechaDes`, `autBiografia`) VALUES
(1, 'bernardo', 'bernardiniii', '2011-11-08', '2011-11-09', 'vio a boca jugar y le dio un paro\r\n');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `editoriales`
--

CREATE TABLE `editoriales` (
  `idEditorial` int(11) NOT NULL,
  `ediNombre` varchar(100) DEFAULT NULL,
  `ediDireccion` varchar(100) DEFAULT NULL,
  `ediTelefono` varchar(50) DEFAULT NULL,
  `ediEmail` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `editoriales`
--

INSERT INTO `editoriales` (`idEditorial`, `ediNombre`, `ediDireccion`, `ediTelefono`, `ediEmail`) VALUES
(1, 'editorial animal', 'mitre1013', '3343-544342', 'editorial1@gmail.com'),
(2, 'peso pluma', 'calle123', '3435418543', 'editorial2@gmail.com'),
(5, 'editorial cumpal', 'hospitalllllll', '3435223435', 'hospial@gmail.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `libros`
--

CREATE TABLE `libros` (
  `idLibro` int(11) NOT NULL,
  `libTitulo` varchar(100) DEFAULT NULL,
  `libAnio` varchar(6) DEFAULT NULL,
  `libNotaDeContenido` varchar(255) DEFAULT NULL,
  `editorialID` int(11) DEFAULT NULL,
  `materiaID` int(11) DEFAULT NULL,
  `autorID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `libros`
--

INSERT INTO `libros` (`idLibro`, `libTitulo`, `libAnio`, `libNotaDeContenido`, `editorialID`, `materiaID`, `autorID`) VALUES
(3, '100 años de soledad', '1167', 'Novela de realismo mágico', 1, 1, 1),
(4, '09 años de soledad', '1967', 'Novela de realismo mágico', 5, 1, 1),
(9, 'elchavo', '1212', 'no contiene  muchhovamoboke', 2, 2, 1),
(10, 'el principito', '1212', 'literatura de francia', 1, 2, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `materias`
--

CREATE TABLE `materias` (
  `idMateria` int(11) NOT NULL,
  `matNombre` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `materias`
--

INSERT INTO `materias` (`idMateria`, `matNombre`) VALUES
(1, 'matematica'),
(2, 'lengua');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personas`
--

CREATE TABLE `personas` (
  `idPersona` int(11) NOT NULL,
  `perNombre` varchar(50) DEFAULT NULL,
  `perApellido` varchar(50) DEFAULT NULL,
  `perDni` varchar(10) DEFAULT NULL,
  `perContrasena` varchar(255) DEFAULT NULL,
  `rolID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `personas`
--

INSERT INTO `personas` (`idPersona`, `perNombre`, `perApellido`, `perDni`, `perContrasena`, `rolID`) VALUES
(1, 'borja', 'de titularfjffjfh', '123123111', 'hsanblas', 1),
(2, 'franco', 'manstantuono', '123123222', 'hsanblas', 2),
(4, 'elpibe', 'janson', '123123444', 'hsanblas', 1),
(5, 'profesor', 'x', '123123555', 'hsanblas', 2),
(11, 'francisco', 'leiva', '41980718', 'hsanblas', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `prestamos`
--

CREATE TABLE `prestamos` (
  `idPrestamo` int(11) NOT NULL,
  `presFechaDev` date DEFAULT NULL,
  `presFechaSal` date DEFAULT NULL,
  `presObservacion` varchar(100) DEFAULT NULL,
  `personaID` int(11) DEFAULT NULL,
  `libroID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `prestamos`
--

INSERT INTO `prestamos` (`idPrestamo`, `presFechaDev`, `presFechaSal`, `presObservacion`, `personaID`, `libroID`) VALUES
(1, '2025-11-20', '2025-11-10', 'Buen estado al devolver.', 1, 2),
(2, '2025-12-12', '2025-12-05', 'Préstamo vigente.', 1, 2),
(4, '2025-12-12', '2025-12-01', 'Libro con el lomo levemente dañado.', 1, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `idRol` int(11) NOT NULL,
  `rolNombre` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`idRol`, `rolNombre`) VALUES
(1, 'estudiante'),
(2, 'bibliotecario');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `autores`
--
ALTER TABLE `autores`
  ADD PRIMARY KEY (`idAutor`);

--
-- Indices de la tabla `editoriales`
--
ALTER TABLE `editoriales`
  ADD PRIMARY KEY (`idEditorial`);

--
-- Indices de la tabla `libros`
--
ALTER TABLE `libros`
  ADD PRIMARY KEY (`idLibro`);

--
-- Indices de la tabla `materias`
--
ALTER TABLE `materias`
  ADD PRIMARY KEY (`idMateria`);

--
-- Indices de la tabla `personas`
--
ALTER TABLE `personas`
  ADD PRIMARY KEY (`idPersona`);

--
-- Indices de la tabla `prestamos`
--
ALTER TABLE `prestamos`
  ADD PRIMARY KEY (`idPrestamo`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`idRol`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `autores`
--
ALTER TABLE `autores`
  MODIFY `idAutor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `editoriales`
--
ALTER TABLE `editoriales`
  MODIFY `idEditorial` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `libros`
--
ALTER TABLE `libros`
  MODIFY `idLibro` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `materias`
--
ALTER TABLE `materias`
  MODIFY `idMateria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `personas`
--
ALTER TABLE `personas`
  MODIFY `idPersona` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `prestamos`
--
ALTER TABLE `prestamos`
  MODIFY `idPrestamo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `idRol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
