SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

DROP TABLE IF EXISTS `producto`;

CREATE TABLE `producto` (
  `codigo` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(200) NOT NULL,
  `unidad` varchar(20) NOT NULL,
  `costo` decimal(12,2) NOT NULL,
  `precio` decimal(12,2) NOT NULL,
  PRIMARY KEY (`codigo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `producto` (`descripcion`, `unidad`, `costo`, `precio`) VALUES
('Cemento Portland 50kg', 'bulto', 8500.00, 10500.00),
('Varilla de acero 3/8" x 6m', 'unidad', 4200.00, 5800.00),
('Clavos para madera 2"', 'kilos', 3200.00, 4500.00),
('Cable eléctrico 2x1.5mm 100m', 'metro', 185.00, 265.00),
('Pintura esmalte blanco 1gl', 'unidad', 12500.00, 16800.00),
('Llave inglesa 10"', 'unidad', 9800.00, 13500.00),
('Tuerca hexagonal M10 (100u)', 'unidad', 1500.00, 2200.00),
('Sierra circular 7-1/4"', 'unidad', 24500.00, 32900.00);

COMMIT;