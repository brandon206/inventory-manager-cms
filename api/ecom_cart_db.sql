-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jan 29, 2020 at 10:55 PM
-- Server version: 5.7.29-0ubuntu0.18.04.1
-- PHP Version: 7.2.24-0ubuntu0.18.04.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ecom_cart_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `Inventory`
--

CREATE TABLE `Inventory` (
  `id` int(10) UNSIGNED NOT NULL,
  `product_title` varchar(30) NOT NULL,
  `product_description` varchar(100) NOT NULL,
  `quantity` mediumint(9) NOT NULL,
  `price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Inventory`
--

INSERT INTO `Inventory` (`id`, `product_title`, `product_description`, `quantity`, `price`) VALUES
(22, 'Stardust', 'Stardust - Gold frames feature a wayfarer shape with metal.', 300, '30.00'),
(23, 'Andromeda', 'Andromeda - Patterned frames feature a rounded style.', 450, '27.99'),
(24, 'Finale', 'Finale - Gold frames feature a two-toned, geometric style. A unique and vibrant look.', 550, '29.99'),
(25, 'Moonlight', 'Moonlight - Navy frames feature a rounded-rectangular style.', 750, '19.99'),
(26, 'Cascade Gold', 'Cascade is the perfect round frame that is simple enough for any occasion.', 1000, '22.50'),
(27, 'Conifer Black', 'Conifer - Brass glasses feature a simple round wire frame.', 150, '28.99'),
(28, 'Star Gold', 'Star - Gold frames boast a new circular shape with gold metal frames', 460, '5.42'),
(29, 'Hourglass', 'Hourglass Metallic Black - Black rounded frames for a unique look', 1500, '32.00'),
(30, 'Clubmaster', 'Clubmaster - Half circle frames that feature a sophisticated look', 255, '25.95'),
(31, 'Clubmaster', 'Clubmaster - sophisticated frames for the bold', 550, '32.95'),
(32, 'Clubmaster', 'Clubmaster - frames that are for the sophisticated and bold', 750, '32.95');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Inventory`
--
ALTER TABLE `Inventory`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Inventory`
--
ALTER TABLE `Inventory`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
