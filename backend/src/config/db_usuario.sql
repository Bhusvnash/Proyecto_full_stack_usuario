
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

-- Drop table if exists helps prevent errors if you run this multiple times
DROP TABLE IF EXISTS `usuario`;

CREATE TABLE `usuario` (
  `id_usuario` int NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `apellidos` varchar(250) NOT NULL,
  `email` varchar(250) NOT NULL,
  `telefono` varchar(250) DEFAULT NULL,
  `ciudad` varchar(200) NOT NULL,
  `estado` varchar(100) NOT NULL,
  `password` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `usuario` (`id_usuario`, `nombre`, `apellidos`, `email`, `telefono`, `ciudad`, `estado`, `password`) VALUES
(1, 'Pedro', 'Perez', 'pedro@gmail.com', '3224578', 'Cali', 'activo', '123456'),
(2, 'Petro', 'Aguilar', 'petro@gmail.com', '3224578', 'Bogota', 'activo', '123456'),
(3, 'Brayan', 'Davith', 'davith@gmail.com', '3224578', 'Cartago', 'activo', '123456'); -- <-- Changed comma to semicolon

ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`);

ALTER TABLE `usuario`
  MODIFY `id_usuario` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4; -- <-- Fixed next value
  
COMMIT;