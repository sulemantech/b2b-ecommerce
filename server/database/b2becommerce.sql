-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 22, 2024 at 06:52 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `b2becommerce`
--

-- --------------------------------------------------------

--
-- Table structure for table `addresses`
--

CREATE TABLE `addresses` (
  `id` int(11) NOT NULL,
  `address` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `stateId` int(11) NOT NULL,
  `zipCode` int(11) NOT NULL,
  `country` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `addresses`
--

INSERT INTO `addresses` (`id`, `address`, `city`, `stateId`, `zipCode`, `country`, `createdAt`, `updatedAt`) VALUES
(1, 'f-200, mexico', 'Cityville', 1, 12345, 'mexico', '2023-12-04 06:36:16', '2023-12-04 06:36:16'),
(2, 'f-200, mexico', 'Cityville', 1, 12345, 'mexico', '2024-01-19 12:33:19', '2024-01-19 12:33:19');

-- --------------------------------------------------------

--
-- Table structure for table `businesses`
--

CREATE TABLE `businesses` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `contactNumber` int(11) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `businesses`
--

INSERT INTO `businesses` (`id`, `name`, `address`, `email`, `contactNumber`, `description`, `createdAt`, `updatedAt`) VALUES
(1, 'New Business', '789 Elm St', 'newbusiness@example.com', 55512345, 'A new business description.', '2024-01-18 05:53:54', '2024-01-18 05:53:54');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'electronics', '2024-02-20 10:00:00', '2024-01-03 11:59:24'),
(2, 'homeAccessories', '2023-11-20 06:35:33', '2023-11-20 06:35:33'),
(3, 'kitchen', '2023-11-20 06:35:48', '2023-11-20 06:35:48'),
(7, 'Fashion', '2024-01-04 05:09:44', '2024-01-04 05:09:44');

-- --------------------------------------------------------

--
-- Table structure for table `cities`
--

CREATE TABLE `cities` (
  `id` int(11) NOT NULL,
  `cityName` varchar(255) NOT NULL,
  `stateId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cities`
--

INSERT INTO `cities` (`id`, `cityName`, `stateId`, `createdAt`, `updatedAt`) VALUES
(1, 'Islamabad', 12, '2023-12-04 16:32:28', '2023-12-04 04:32:28'),
(2, 'Peshawar', 1, '2023-12-04 16:50:32', '2023-12-04 04:50:32');

-- --------------------------------------------------------

--
-- Table structure for table `companies`
--

CREATE TABLE `companies` (
  `id` int(11) NOT NULL,
  `companyName` varchar(255) NOT NULL,
  `industry` varchar(255) NOT NULL,
  `addressId` int(11) NOT NULL,
  `description` text DEFAULT NULL,
  `contactInformation` varchar(255) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `industryType` varchar(255) DEFAULT NULL,
  `shippingInformation` text DEFAULT NULL,
  `paymentMethods` varchar(255) DEFAULT NULL,
  `returnPolicy` text DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `companies`
--

INSERT INTO `companies` (`id`, `companyName`, `industry`, `addressId`, `description`, `contactInformation`, `website`, `industryType`, `shippingInformation`, `paymentMethods`, `returnPolicy`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 'google', 'Test Industry', 1, 'Test Description', 'Test Contact Info', 'http://www.testcompany.com', 'Test Industry Type', 'Test Shipping Info', 'Test Payment Methods', 'CARD', 'Active', '2023-12-08 12:35:54', '2023-12-08 12:35:54'),
(2, 'facebook', 'Test Industry', 1, 'Test Description', 'Test Contact Info', 'http://www.testcompany.com', 'Test Industry Type', 'Test Shipping Info', 'Test Payment Methods', 'CARD', 'Active', '2023-12-08 12:36:37', '2023-12-08 12:36:37');

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `contactNumber` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `name`, `address`, `email`, `contactNumber`, `createdAt`, `updatedAt`) VALUES
(1, 'luthfullah', '123 islamabad ,pakistan', 'luthfullah.doe@example.com', 12345678, '2024-01-18 03:03:42', '2024-01-18 03:03:42'),
(2, 'luthfullah2', '123 islamabad, pakistan', 'luthfullah2.doe@example.com', 12345678, '2024-01-18 15:16:09', '2024-01-18 15:16:09'),
(3, 'luthfullah3', '123 islamabad, pakistan', 'luthfullah3.doe@example.com', 12345678, '2024-01-18 15:16:09', '2024-01-18 15:16:09'),
(4, 'luthfullah1', '123 islamabad ,pakistan', 'luthfullah1.doe@example.com', 12345678, '2024-01-18 03:16:09', '2024-01-18 03:16:09');

-- --------------------------------------------------------

--
-- Table structure for table `notificationconfigurations`
--

CREATE TABLE `notificationconfigurations` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `notification_type_id` int(11) NOT NULL,
  `is_enabled` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `notification_type_id` int(11) NOT NULL,
  `related_entity_type` varchar(255) NOT NULL,
  `related_entity_id` int(11) NOT NULL,
  `message` varchar(255) NOT NULL,
  `timestamp` datetime NOT NULL,
  `is_read` tinyint(1) NOT NULL DEFAULT 0,
  `sender_id` int(11) DEFAULT NULL,
  `recipient_id` int(11) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `notification_type_id`, `related_entity_type`, `related_entity_id`, `message`, `timestamp`, `is_read`, `sender_id`, `recipient_id`, `status`) VALUES
(2, 1, 'user', 123, 'This is a test notification', '2024-02-13 11:25:50', 0, 456, 789, 'pending'),
(3, 1, 'user', 123, 'This is a test notification', '2024-02-14 02:51:20', 0, 456, 789, 'pending'),
(4, 1, 'user', 123, 'This is a test notification', '2024-02-14 02:52:33', 0, 13, 13, 'pending');

-- --------------------------------------------------------

--
-- Table structure for table `notificationtypes`
--

CREATE TABLE `notificationtypes` (
  `id` int(11) NOT NULL,
  `typeName` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `notificationtypes`
--

INSERT INTO `notificationtypes` (`id`, `typeName`, `description`) VALUES
(1, 'order successful', 'This is a new notification type for successful order'),
(2, 'message', 'message send');

-- --------------------------------------------------------

--
-- Table structure for table `orderitems`
--

CREATE TABLE `orderitems` (
  `id` int(11) NOT NULL,
  `orderId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` float NOT NULL,
  `discount` float NOT NULL DEFAULT 0,
  `totalPrice` float NOT NULL,
  `vendorId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `orderId` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `orderDate` datetime DEFAULT NULL,
  `totalPrice` decimal(10,2) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `discount` int(11) DEFAULT NULL,
  `paymentMethod` varchar(255) DEFAULT NULL,
  `trackingNumber` int(11) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `contactNumber` int(11) NOT NULL,
  `zipCode` int(11) DEFAULT NULL,
  `additionalInfo` varchar(255) DEFAULT NULL,
  `city` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`orderId`, `userId`, `address`, `orderDate`, `totalPrice`, `status`, `discount`, `paymentMethod`, `trackingNumber`, `name`, `email`, `contactNumber`, `zipCode`, `additionalInfo`, `city`, `country`, `createdAt`, `updatedAt`) VALUES
(70, 1, '123 Main St', '2023-12-04 17:54:51', '50.00', 'Pending', 100, 'Credit Card', 123456, 'john', 'john@example.com', 1234567890, 12345, 'Special instructions for delivery', 'Sample City', 'Sample Country', '2023-12-15 15:24:21', '2023-12-15 15:24:21'),
(71, 1, '123 Main St', '2023-12-04 17:54:51', '0.00', 'Pending', 10, 'Credit Card', 123456, 'john', 'john@example.com', 1234567890, 12345, 'Special instructions for delivery', 'Sample City', 'Sample Country', '2023-12-15 15:27:41', '2023-12-15 15:27:41'),
(74, 1, '123 Main St', '2023-12-04 17:54:51', '100.00', 'Pending', 10, 'Credit Card', 123456, 'john', 'john@example.com', 1234567890, 12345, 'Special instructions for delivery', 'Sample City', 'Sample Country', '2023-12-15 15:33:37', '2023-12-15 15:33:37'),
(76, 1, '123 Main St', '2023-12-04 17:54:51', '300.00', 'Pending', 10, 'Credit Card', 123456, 'john', 'john@example.com', 1234567890, 12345, 'Special instructions for delivery', 'Sample City', 'Sample Country', '2023-12-15 15:35:06', '2023-12-15 15:35:06'),
(78, 8, '123 Main St', '2023-12-08 15:19:02', '200.00', 'Pending', 10, 'Credit Card', 123456, 'luthfi', 'luthfi@example.com', 1234567890, 12345, 'Special instructions for delivery', 'Sample City', 'Sample Country', '2024-01-01 16:17:38', '2024-01-01 16:17:38'),
(79, 8, '123 Main St', '2023-12-08 15:19:02', '200.00', 'Pending', 10, 'Credit Card', 123456, 'luthfi', 'luthfi@example.com', 1234567890, 12345, 'Special instructions for delivery', 'Sample City', 'Sample Country', '2024-01-01 16:17:39', '2024-01-01 16:17:39'),
(80, 8, '123 Main St', '2023-12-08 15:19:02', '200.00', 'Pending', 10, 'Credit Card', 123456, 'luthfi', 'luthfi@example.com', 1234567890, 12345, 'Special instructions for delivery', 'Sample City', 'Sample Country', '2024-01-01 17:29:19', '2024-01-01 17:29:19'),
(84, 8, '123 Main St', '2023-12-08 15:19:02', '200.00', 'Pending', 10, 'Credit card', 123456, 'luthfi', 'luthfi@example.com', 1234567890, 12345, 'Special instructions for delivery', 'Sample City', 'Sample Country', '2024-01-17 17:18:25', '2024-01-17 17:18:25'),
(85, 13, '123 Main St', '2023-12-08 15:19:02', '200.00', 'Pending', 10, 'Credit card', 123456, 'luthfi', 'luthfi@example.com', 1234567890, 12345, 'Special instructions for delivery', 'Sample City', 'Sample Country', '2024-01-17 17:26:11', '2024-01-17 17:26:11'),
(86, 8, '123 Main St', NULL, '200.00', 'Pending', 10, 'Credit card', 123456, 'luthfi', 'luthfi@example.com', 1234567890, 12345, 'Special instructions for delivery', 'Sample City', 'Sample Country', '2024-01-18 11:39:55', '2024-01-18 11:39:55'),
(87, 13, '123 peshawar', NULL, '200.00', 'Pending', 10, 'Credit card', 123456, 'luthfi', 'luthfi@example.com', 1234567890, 12345, 'Special instructions for delivery', 'Sample City', 'Sample Country', '2024-02-13 15:19:38', '2024-02-13 15:19:38'),
(88, 8, '123 peshawar', NULL, '200.00', 'Pending', 10, 'Credit card', 123456, 'luthfi', 'luthfi@example.com', 1234567890, 12345, 'Special instructions for delivery', 'Sample City', 'Sample Country', '2024-02-13 15:35:43', '2024-02-13 15:35:43'),
(89, 13, '123 peshawar', NULL, '200.00', 'Pending', 10, 'Credit card', 123456, 'luthfi', 'luthfi@example.com', 1234567898, 12345, 'Special instructions for delivery', 'Sample City', 'Sample Country', '2024-02-13 15:41:09', '2024-02-13 15:41:09'),
(90, 13, '123 peshawar', NULL, '200.00', 'Pending', 10, 'Credit card', 123456, 'luthfi', 'luthfi@example.com', 1234567898, 12345, 'Special instructions for delivery', 'Sample City', 'Sample Country', '2024-02-13 15:52:00', '2024-02-13 15:52:00'),
(91, 13, '123 peshawar', NULL, '200.00', 'Pending', 10, 'Credit card', 123456, 'luthfi', 'luthfi@example.com', 1234567898, 12345, 'Special instructions for delivery', '123', 'Sample Country', '2024-02-13 15:53:21', '2024-02-13 15:53:21'),
(92, 8, '123 peshawar', NULL, '200.00', 'Pending', 10, 'Credit card', 123456, 'luthfi', 'luthfi@example.com', 1234567898, 12345, 'Special instructions for delivery', 'islamabad', 'Sample Country', '2024-02-13 15:54:05', '2024-02-13 15:54:05'),
(93, 8, '123 peshawar', NULL, '200.00', 'Pending', 10, 'Credit card', 123456, 'luthfi', 'luthfi@example.com', 1234567898, 12345, 'Special instructions for delivery', 'islamabad', 'Sample Country', '2024-02-13 15:56:38', '2024-02-13 15:56:38'),
(94, 8, '123 peshawar', NULL, '200.00', 'Pending', 10, 'Credit card', 123456, 'luthfi', 'luthfi@example.com', 1234567898, 12345, 'Special instructions for delivery', 'islamabad', 'Sample Country', '2024-02-13 15:56:46', '2024-02-13 15:56:46');

-- --------------------------------------------------------

--
-- Table structure for table `productcategories`
--

CREATE TABLE `productcategories` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `productId` int(11) NOT NULL,
  `categoryId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `productcategories`
--

INSERT INTO `productcategories` (`createdAt`, `updatedAt`, `productId`, `categoryId`) VALUES
('2023-11-21 12:30:08', '2023-11-21 12:30:08', 1, 1),
('2023-11-21 12:30:08', '2023-11-21 12:30:08', 3, 3),
('2023-11-30 12:20:15', '2023-11-30 12:20:15', 6, 1),
('2023-11-30 12:25:13', '2023-11-30 12:25:13', 9, 3),
('2023-11-30 12:27:59', '2023-11-30 12:27:59', 10, 3),
('2023-11-30 12:29:56', '2023-11-30 12:29:56', 11, 1),
('2023-11-30 12:31:44', '2023-11-30 12:31:44', 12, 2),
('2023-11-30 12:33:40', '2023-11-30 12:33:40', 13, 2);

-- --------------------------------------------------------

--
-- Table structure for table `productimages`
--

CREATE TABLE `productimages` (
  `id` int(11) NOT NULL,
  `date` datetime DEFAULT NULL,
  `images` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `productId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `productimages`
--

INSERT INTO `productimages` (`id`, `date`, `images`, `productId`, `createdAt`, `updatedAt`) VALUES
(2, '2023-11-21 16:37:06', '[\"/assets/products/sku_2/1.jpg\"]', 1, '2023-11-21 16:37:06', '2023-11-21 16:37:06'),
(3, '2023-11-21 16:37:55', '[\"/assets/products/sku_3/1.png\"]', 3, '2023-11-21 16:37:55', '2023-11-21 16:37:55'),
(4, '2023-11-21 16:38:13', '[\"/assets/products/sku_4/1.jpg\"]', 4, '2023-11-21 16:38:13', '2023-11-21 16:38:13'),
(5, '2023-11-21 15:20:04', '[\"/assets/products/sku_5/1.jpg\"]', 5, '2023-11-21 15:20:04', '2023-11-21 15:20:04'),
(6, '2023-11-21 15:20:04', '[\"/assets/products/sku_6/1.jpg\"]', 6, '2023-11-21 15:20:04', '2023-11-21 15:20:04'),
(7, '2023-11-21 15:20:04', '[\"/assets/products/sku_7/1.jpg\"]', 7, '2023-11-21 15:20:04', '2023-11-21 15:20:04'),
(8, '2023-11-21 15:20:04', '[\"/assets/products/sku_8/1.jpg\"]', 8, '2023-11-21 15:20:04', '2023-11-21 15:20:04'),
(9, '2023-11-21 15:20:04', '[\"/assets/products/sku_9/1.jpg\"]', 9, '2023-11-21 15:20:04', '2023-11-21 15:20:04'),
(10, '2023-11-21 15:20:04', '[\"/assets/products/sku_10/1.jpg\"]', 10, '2023-11-21 15:20:04', '2023-11-21 15:20:04'),
(11, '2023-11-21 15:20:04', '[\"/assets/products/sku_11/1.jpg\"]', 11, '2023-11-21 15:20:04', '2023-11-21 15:20:04'),
(12, '2023-11-21 15:20:04', '[\"/assets/products/sku_12/1.jpg\"]', 12, '2023-11-21 15:20:04', '2023-11-21 15:20:04'),
(13, '2023-11-21 15:20:04', '[\"/assets/products/sku_13/1.jpg\"]', 13, '2023-11-21 15:20:04', '2023-11-21 15:20:04'),
(15, '2023-11-21 15:20:04', '[\"/assets/products/image-1708427593067-977490650-h1j2t0he.png\"]', 38, '2023-11-21 15:20:04', '2023-11-21 15:20:04'),
(16, '2023-11-21 15:20:04', '[\"/assets/products/sku_24/magneticcharger.jpg\"]', 38, '2023-11-21 15:20:04', '2023-11-21 15:20:04'),
(17, '2023-11-21 15:20:04', '[\"/assets/products/sku_26/condom.jpg\"]', 39, '2023-11-21 15:20:04', '2023-11-21 15:20:04'),
(18, '2023-11-21 15:20:04', '[\"/assets/products/sku_9/Apple pen.jpg\"]', 4, '2023-11-21 15:20:04', '2023-11-21 15:20:04'),
(19, '2023-11-21 15:20:04', '[\"/assets/products/sku_9/Apple pen - Copy.jpg\"]', 11, '2023-11-21 15:20:04', '2023-11-21 15:20:04'),
(20, '2023-11-21 15:20:04', '[\"/assets/products/sku_8/Registor roles mini.jpg\"]', 19, '2023-11-21 15:20:04', '2023-11-21 15:20:04'),
(21, '2023-11-21 15:20:04', '[\"/assets/products/sku_8/Registor roles mini - Copy.jpg\"]', 19, '2023-11-21 15:20:04', '2023-11-21 15:20:04'),
(22, '2023-11-21 15:20:04', '[\"/assets/products/sku_8/Registor roles mini - Copy (2).jpg\"]', 19, '2023-11-21 15:20:04', '2023-11-21 15:20:04'),
(23, '2023-11-21 15:20:04', '[\"/assets/products/sku_2/1.jpg\"]', 6, '2023-11-21 15:20:04', '2023-11-21 15:20:04'),
(24, '2023-11-21 15:20:04', '[\"/assets/products/sku_2/2.jpg\"]', 6, '2023-11-21 15:20:04', '2023-11-21 15:20:04'),
(25, '2023-11-21 15:20:04', '[\"/assets/products/sku_2/3.jpg\"]', 6, '2023-11-21 15:20:04', '2023-11-21 15:20:04'),
(26, '2023-11-21 15:20:04', '[\"/assets/products/sku_2/4.jpg\"]', 6, '2023-11-21 15:20:04', '2023-11-21 15:20:04'),
(27, '2023-11-21 15:20:04', '[\"/assets/products/sku_9/Apple pen - Copy.jpg\"]', 4, '2023-11-21 15:20:04', '2023-11-21 15:20:04'),
(28, '2023-11-21 15:20:04', '[\"/assets/products/sku_8/Registor roles mini.jpg\"]', 19, '2023-11-21 15:20:04', '2023-11-21 15:20:04'),
(29, '2023-11-21 15:20:04', '[\"/assets/products/sku_2/1.jpg\"]', 6, '2023-11-21 15:20:04', '2023-11-21 15:20:04'),
(30, '2023-11-21 15:20:04', '[\"/assets/products/sku_2/2.jpg\"]', 6, '2023-11-21 15:20:04', '2023-11-21 15:20:04'),
(31, '2023-11-21 15:20:04', '[\"/assets/products/sku_2/3.jpg\"]', 6, '2023-11-21 15:20:04', '2023-11-21 15:20:04'),
(32, '2023-11-21 15:20:04', '[\"/assets/products/sku_2/4.jpg\"]', 6, '2023-11-21 15:20:04', '2023-11-21 15:20:04'),
(36, '2023-11-21 15:20:04', '[\"/assets/products/sku_13/6.jpg\"]', 12, '2023-11-21 15:20:04', '2023-11-21 15:20:04'),
(37, '2023-11-21 15:20:04', '[\"/assets/products/sku_13/5.jpg\"]', 12, '2023-11-21 15:20:04', '2023-11-21 15:20:04'),
(38, '2023-11-21 15:20:04', '[\"/assets/products/sku_13/4.jpg\"]', 12, '2023-11-21 15:20:04', '2023-11-21 15:20:04'),
(39, '2023-11-21 15:20:04', '[\"/assets/products/sku_24/2.jpg\"]', 38, '2023-11-21 15:20:04', '2023-11-21 15:20:04'),
(40, '2023-11-21 15:20:04', '[\"/assets/products/sku_24/4.jpg\"]', 38, '2023-11-21 15:20:04', '2023-11-21 15:20:04'),
(41, '2023-11-21 15:20:04', '[\"/assets/products/sku_24/3.jpg\"]', 38, '2023-11-21 15:20:04', '2023-11-21 15:20:04'),
(42, '2023-11-21 15:20:04', '[\"/assets/products/sku_25/2.jpg\"]', 32, '2023-11-21 15:20:04', '2023-11-21 15:20:04'),
(43, '2023-11-21 15:20:04', '[\"/assets/products/sku_25/3.jpg\"]', 32, '2023-11-21 15:20:04', '2023-11-21 15:20:04'),
(44, '2023-11-21 15:20:04', '[\"/assets/products/sku_20/3.jpg\"]', 27, '2023-11-21 15:20:04', '2023-11-21 15:20:04'),
(45, '2023-11-21 15:20:04', '[\"/assets/products/sku_20/4.jpg\"]', 1, '2023-11-21 15:20:04', '2023-11-21 15:20:04'),
(46, '2023-11-21 15:20:04', '[\"/assets/products/sku_11/1.jpg\"]', 11, '2023-11-21 15:20:04', '2023-11-21 15:20:04'),
(47, '2023-11-21 15:20:04', '[\"/assets/products/sku_10/1.jpg\"]', 10, '2023-11-21 15:20:04', '2023-11-21 15:20:04'),
(48, '2023-11-21 15:20:04', '[\"/assets/products/sku_9/1.jpg\"]', 9, '2023-11-21 15:20:04', '2023-11-21 15:20:04'),
(49, '2023-11-21 15:20:04', '[\"/assets/products/sku_8/1.jpg\"]', 8, '2023-11-21 15:20:04', '2023-11-21 15:20:04'),
(50, '2023-11-21 15:20:04', '[\"/assets/products/sku_7/1.jpg\"]', 7, '2023-11-21 15:20:04', '2023-11-21 15:20:04'),
(51, '2023-11-21 15:20:04', '[\"/assets/products/sku_4/1.jpg\"]', 4, '2023-11-21 16:38:13', '2023-11-21 16:38:13'),
(52, '2023-11-21 15:20:04', '[\"/assets/products/sku_21/2.jpg\"]', 29, '2023-11-21 15:20:04', '2023-11-21 15:20:04'),
(53, '2023-11-21 15:20:04', '[\"/assets/products/sku_21/3.jpg\"]', 29, '2023-11-21 15:20:04', '2023-11-21 15:20:04'),
(54, '2023-11-21 15:20:04', '[\"/assets/products/sku_21/4.jpg\"]', 29, '2023-11-21 15:20:04', '2023-11-21 15:20:04'),
(55, '2023-11-21 15:20:04', '[\"/assets/products/sku_19/2.jpg\"]', 37, '2023-11-21 15:20:04', '2023-11-21 15:20:04'),
(56, '2023-11-21 15:20:04', '[\"/assets/products/sku_19/3.jpg\"]', 33, '2023-11-21 15:20:04', '2023-11-21 15:20:04'),
(57, '2023-11-21 15:20:04', '[\"/assets/products/sku_19/4.jpg\"]', 37, '2023-11-21 15:20:04', '2023-11-21 15:20:04'),
(58, '2023-11-21 15:20:04', '[\"/assets/products/sku_3/1.png\"]', 3, '2023-11-21 16:37:55', '2023-11-21 16:37:55'),
(59, '2023-11-21 15:20:04', '[\"/assets/products/sku_4/2.jpg\"]', 10, '2023-11-21 15:20:04', '2023-11-21 15:20:04'),
(60, '2023-11-21 15:20:04', '[\"/assets/products/sku_4/3.jpg\"]', 10, '2023-11-21 15:20:04', '2023-11-21 15:20:04'),
(61, '2023-11-21 15:20:04', '[\"/assets/products/sku_4/4.jpg\"]', 10, '2023-11-21 15:20:04', '2023-11-21 15:20:04'),
(62, '2023-11-21 15:20:04', '[\"/assets/products/sku_16/2.jpg\"]', 7, '2023-11-21 15:20:04', '2023-11-21 15:20:04'),
(63, '2023-11-21 15:20:04', '[\"/assets/products/sku_23/lighter.jpg\"]', 1, '2023-11-21 15:20:04', '2023-11-21 15:20:04'),
(64, '2023-11-21 15:20:04', '[\"/assets/products/sku_17/4.jpg\"]', 10, '2023-11-21 15:20:04', '2023-11-21 15:20:04'),
(65, '2023-11-21 15:20:04', '[\"/assets/products/sku_17/3.jpg\"]', 10, '2023-11-21 15:20:04', '2023-11-21 15:20:04'),
(66, '2023-11-21 15:20:04', '[\"/assets/products/sku_17/2.jpg\"]', 10, '2023-11-21 15:20:04', '2023-11-21 15:20:04'),
(67, '2023-11-21 15:20:04', '[\"/assets/products/sku_7/1.jpg\"]', 17, '2023-11-21 15:20:04', '2023-11-21 15:20:04'),
(68, '2023-11-21 15:20:04', '[\"/assets/products/sku_7/2.jpg\"]', 17, '2023-11-21 15:20:04', '2023-11-21 15:20:04'),
(69, '2023-11-21 15:20:04', '[\"/assets/products/sku_7/3.jpg\"]', 17, '2023-11-21 15:20:04', '2023-11-21 15:20:04'),
(70, '2023-11-21 15:20:04', '[\"/assets/products/sku_3/3.jpg\"]', 18, '2023-11-21 15:20:04', '2023-11-21 15:20:04'),
(71, '2023-11-21 15:20:04', '[\"/assets/products/sku_3/2.jpg\"]', 18, '2023-11-21 15:20:04', '2023-11-21 15:20:04'),
(72, '2023-11-21 15:20:04', '[\"/assets/products/sku_3/1.jpg\"]', 18, '2023-11-21 15:20:04', '2023-11-21 15:20:04'),
(73, '2023-11-21 15:20:04', '[\"/assets/products/sku_12/3.jpg\"]', 21, '2023-11-21 15:20:04', '2023-11-21 15:20:04'),
(74, '2023-11-21 15:20:04', '[\"/assets/products/sku_12/2.jpg\"]', 21, '2023-11-21 15:20:04', '2023-11-21 15:20:04'),
(75, '2023-11-21 15:20:04', '[\"/assets/products/sku_22/2.jpg\"]', 36, '2023-11-21 15:20:04', '2023-11-21 15:20:04'),
(76, '2023-11-21 15:20:04', '[\"/assets/products/sku_22/1.jpg\"]', 36, '2023-11-21 15:20:04', '2023-11-21 15:20:04'),
(77, '2023-11-21 15:20:04', '[\"/assets/products/sku_15/4.jpg\"]', 9, '2023-11-21 15:20:04', '2023-11-21 15:20:04'),
(78, '2023-11-21 15:20:04', '[\"/assets/products/sku_15/3.jpg\"]', 9, '2023-11-21 15:20:04', '2023-11-21 15:20:04'),
(79, '2023-11-21 15:20:04', '[\"/assets/products/sku_15/2.jpg\"]', 9, '2023-11-21 15:20:04', '2023-11-21 15:20:04'),
(81, '2024-02-21 09:53:19', '[\"/assets/products/image-1708509199927-952546543-h1j2t0he.png\"]', 1, '2024-02-21 09:53:19', '2024-02-21 09:53:19'),
(82, '2024-02-21 10:09:35', '[\"/assets/products/image-1708510175672-297563617-h1j2t0he.png\"]', 5, '2024-02-21 10:09:35', '2024-02-21 10:09:35');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `price` float NOT NULL,
  `quantity` int(11) DEFAULT NULL,
  `manufacturer` varchar(255) NOT NULL,
  `dateAdded` datetime NOT NULL,
  `discount` int(11) NOT NULL DEFAULT 0,
  `isNew` tinyint(1) NOT NULL DEFAULT 1,
  `rating` int(11) DEFAULT NULL,
  `saleCount` int(11) DEFAULT NULL,
  `tag` varchar(255) DEFAULT NULL,
  `stock` int(11) NOT NULL DEFAULT 0,
  `quantityInStock` int(11) NOT NULL DEFAULT 0,
  `sku` varchar(255) NOT NULL,
  `categoryName` varchar(255) NOT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `supplier_id` int(11) DEFAULT NULL,
  `category_id` int(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `price`, `quantity`, `manufacturer`, `dateAdded`, `discount`, `isNew`, `rating`, `saleCount`, `tag`, `stock`, `quantityInStock`, `sku`, `categoryName`, `status`, `createdAt`, `updatedAt`, `supplier_id`, `category_id`) VALUES
(1, 'lighter2', 'Portable and reliable lighter for everyday use.', 37.99, 40, 'luthfi', '2023-11-10 00:00:00', 10, 0, 4, 5, '{electronics}', 50, 50, 'SM-SMALL-LIGHTER-50', '', '', '2023-11-20 12:57:24', '2023-11-20 12:57:24', 1, 3),
(3, 'Dell Latitude 9000', 'AC Adapter 100W', 1499, 50, 'luthfi', '2023-11-17 00:00:00', 10, 0, 4, 5, '{electronics}', 50, 50, 'ADAPTER-100W-INT', '', '', '2023-11-20 12:57:24', '2023-11-20 12:57:24', 3, 1),
(4, 'Apple pen', 'Portable and reliable', 20, 50, 'luthfi', '2023-11-21 00:00:00', 10, 0, 4, 5, '{electronics}', 50, 50, 'APL-PEN-wht-00l', '', 'active', '2023-11-20 12:57:24', '2023-11-20 12:57:24', 1, 1),
(5, 'Nike Air Zoom', 'Lightweight running shoes for optimal comfort.', 192, 50, 'luthfi', '2023-11-22 00:00:00', 10, 1, 4, 5, '{home,\"new feature\"}', 50, 50, 'FSH-FTW-ATH-RUN-001', 'electronics', 'inactive', '2023-11-20 12:57:24', '2024-01-16 11:48:58', 2, 2),
(6, 'In-1 Magnetic Folding Charger', 'Compact magnetic charger with multiple ports for versatile device charging.', 32, 100, 'USA', '2023-11-30 07:20:14', 10, 1, 4, 10, '{Electronics,\"new feature\"}', 99, 99, 'PC-3IN1MAGFOLD', 'Electronics', 'active', '2023-11-30 07:20:14', '2023-11-30 07:20:14', 3, 1),
(7, '4-in-1 Charging Dock', 'Docking station with four charging ports for simultaneous device charging.', 32, 100, 'UK', '2023-11-30 07:21:55', 10, 1, 4, 10, '{Electronics,\"new feature\"}', 99, 99, 'CHG-4IN1-INT', 'Electronics', 'active', '2023-11-30 07:21:55', '2023-11-30 07:21:55', 1, 1),
(8, 'AC adapter 100W', 'High-powered AC adapter with 100W output for fast charging.', 35, 100, 'UK', '2023-11-30 07:23:19', 10, 0, 4, 10, '{Electronics,\"new feature\"}', 99, 99, 'ADAPT-100W-INT', '', 'active', '2023-11-30 07:23:19', '2023-11-30 07:23:19', 1, 2),
(9, 'Dell Latitude 9000', 'Portable and reliable', 1499, 100, 'UK', '2023-11-30 07:25:13', 10, 1, 4, 10, '{Electronics,\"new feature\"}', 99, 99, 'ELE-LAP-BIZ-ULT-001', 'Electronics', 'active', '2023-11-30 07:25:13', '2023-11-30 07:25:13', 2, 1),
(10, 'HP EliteBook 1000', 'Premium business laptop with security features', 1799, 100, 'China', '2023-12-01 09:00:00', 15, 0, 5, 20, '{Electronics, Laptops}', 150, 150, 'ELE-LAP-BIZ-ELT-002', 'Electronics', 'active', '2023-12-01 09:00:00', '2023-12-01 09:00:00', 1, 1),
(11, 'Samsung Galaxy S23', 'Top-of-the-line Android flagship with advanced camera.', 999, 100, 'South Korea', '2023-12-01 09:00:00', 10, 1, 5, 30, '{Electronics, Smartphones}', 200, 200, 'ELE-SMP-AND-FLG-002', 'Electronics', 'active', '2023-12-01 09:00:00', '2023-12-01 09:00:00', 2, 1),
(12, 'Nike Air Zoom 2', 'Improved version of lightweight running shoes for optimal comfort.', 199, 50, 'USA', '2023-12-01 09:00:00', 20, 1, 5, 15, '{Sports, Footwear}', 100, 100, 'FSH-FTW-ATH-RUN-002', 'Fashion', 'active', '2023-12-01 09:00:00', '2023-12-01 09:00:00', 3, 7),
(13, 'Apple MacBook Pro', 'Powerful laptop for professionals with stunning Retina display.', 2399, 50, 'USA', '2023-12-02 10:00:00', 10, 1, 5, 25, '{Electronics, Laptops}', 100, 100, 'ELE-LAP-PRO-MBP-001', 'Electronics', 'active', '2023-12-02 10:00:00', '2023-12-02 10:00:00', 3, 1),
(14, 'Sony PlayStation 5', 'Next-gen gaming console with cutting-edge graphics and performance.', 499, 50, 'Japan', '2023-12-02 10:00:00', 0, 1, 5, 30, '{Electronics, Gaming}', 150, 150, 'ELE-GAM-PS5-001', 'Electronics', 'active', '2023-12-02 10:00:00', '2023-12-02 10:00:00', 2, 1),
(15, 'Canon EOS R5', 'High-performance mirrorless camera for professional photographers.', 3899, 30, 'Japan', '2023-12-02 10:00:00', 5, 1, 5, 20, '{Electronics, Cameras}', 80, 80, 'ELE-CAM-EOSR5-001', 'Electronics', 'active', '2023-12-02 10:00:00', '2023-12-02 10:00:00', 1, 1),
(16, 'Logitech MX Master 3', 'Advanced wireless mouse with customizable buttons and ergonomic design.', 99, 100, 'Switzerland', '2023-12-03 11:00:00', 15, 1, 5, 35, '{Electronics, Accessories}', 200, 200, 'ELE-ACC-MX3-001', 'Electronics', 'active', '2023-12-03 11:00:00', '2023-12-03 11:00:00', 3, 2),
(17, 'Bose QuietComfort 45', 'Premium noise-canceling headphones with exceptional sound quality.', 329, 50, 'USA', '2023-12-03 11:00:00', 10, 1, 5, 25, '{Electronics, Audio}', 120, 120, 'ELE-AUD-QC45-001', 'Electronics', 'active', '2023-12-03 11:00:00', '2023-12-03 11:00:00', 1, 1),
(18, 'Samsung QLED 4K TV', 'Immersive 4K television with Quantum Dot technology for vivid colors.', 1499, 20, 'South Korea', '2023-12-03 11:00:00', 5, 1, 5, 15, '{Electronics, TVs}', 50, 50, 'ELE-TV-QLED-001', 'Electronics', 'active', '2023-12-03 11:00:00', '2023-12-03 11:00:00', 2, 1),
(19, 'Fitbit Versa 3', 'Advanced fitness tracker with built-in GPS and heart rate monitoring.', 229, 80, 'USA', '2023-12-03 11:00:00', 0, 1, 5, 40, '{Electronics, Wearables}', 150, 150, 'ELE-WBL-FITBIT-001', 'Electronics', 'active', '2023-12-03 11:00:00', '2023-12-03 11:00:00', 3, 1),
(20, 'Apple AirPods Pro', 'Wireless earbuds with active noise cancellation and customizable fit.', 249, 100, 'USA', '2023-12-04 12:00:00', 10, 1, 5, 50, '{Electronics, Audio}', 200, 200, 'ELE-AUD-APPRO-001', 'Electronics', 'active', '2023-12-04 12:00:00', '2023-12-04 12:00:00', 3, 1),
(21, 'Amazon Echo Dot (4th Gen)', 'Smart speaker with Alexa voice assistant for hands-free control.', 49, 150, 'USA', '2023-12-04 12:00:00', 0, 1, 5, 75, '{Electronics, Smart Home}', 300, 300, 'ELE-SMRT-ECHODOT4-001', 'Electronics', 'active', '2023-12-04 12:00:00', '2023-12-04 12:00:00', 1, 2),
(22, 'Nintendo Switch OLED', 'Handheld gaming console with vibrant OLED display and versatile gameplay.', 349, 80, 'Japan', '2023-12-05 09:00:00', 5, 1, 5, 40, '{Electronics, Gaming}', 100, 100, 'ELE-GAM-SWITCHOLED-001', 'Electronics', 'active', '2023-12-05 09:00:00', '2023-12-05 09:00:00', 2, 2),
(23, 'GoPro Hero 10 Black', 'High-performance action camera with 5.3K video recording and improved stabilization.', 499, 60, 'USA', '2023-12-05 09:00:00', 0, 1, 5, 30, '{Electronics, Cameras}', 80, 80, 'ELE-CAM-HERO10B-001', 'Electronics', 'active', '2023-12-05 09:00:00', '2023-12-05 09:00:00', 3, 2),
(24, 'LG OLED C1 4K TV', 'Premium OLED television with Dolby Vision IQ and AI-enhanced picture quality.', 1799, 30, 'South Korea', '2023-12-06 10:00:00', 10, 1, 5, 20, '{Electronics, TVs}', 50, 50, 'ELE-TV-OLED-C1-001', 'Electronics', 'active', '2023-12-06 10:00:00', '2023-12-06 10:00:00', 1, 2),
(25, 'Fitbit Charge 5', 'Advanced fitness tracker with built-in GPS, ECG app, and stress management tools.', 179, 120, 'USA', '2023-12-06 10:00:00', 5, 1, 5, 60, '{Electronics, Wearables}', 200, 200, 'ELE-WBL-FITBITC5-001', 'Kitchen', 'active', '2023-12-06 10:00:00', '2023-12-06 10:00:00', 3, 3),
(26, 'Sony WH-1000XM4', 'Premium wireless headphones with industry-leading noise cancellation and sound quality.', 349, 70, 'Japan', '2023-12-06 10:00:00', 15, 1, 5, 35, '{Electronics, Audio}', 100, 100, 'ELE-AUD-WH1000XM4-001', 'Kitchen', 'active', '2023-12-06 10:00:00', '2023-12-06 10:00:00', 2, 3),
(27, 'Type C Cable', 'USB Type C cable for fast and reliable data transfer and charging.', 13, 90, 'china', '2023-11-29 15:30:00', 10, 0, 5, 50, '{tag}', 200, 40, 'ACC-CHG-CAB-BLK-016', '', '', '2023-11-20 12:57:24', '2023-11-20 12:57:24', 1, 7),
(28, 'Type C HeadPhones', 'Headphones with USB Type C connection for compatible devices.', 3, 90, 'china', '2023-11-29 15:30:00', 10, 0, 5, 50, '{tag}', 200, 40, 'AUD-TYP-CHD-SLV-018', '', '', '2023-11-20 12:57:24', '2023-11-20 12:57:24', 1, 1),
(29, 'DV2T', 'Electronic device or component with DV2T specifications.', 5, 90, 'china', '2023-11-29 15:30:00', 10, 0, 5, 50, '{tag}', 200, 40, 'ACC-DV2T-001', '', '', '2023-11-20 12:57:24', '2023-11-20 12:57:24', 2, 2),
(30, 'DIsplay Box', 'Box for displaying products or items attractively.', 2.5, 90, 'china', '2023-11-29 15:30:00', 10, 0, 5, 50, '{tag}', 200, 40, 'ACC-DB-002', '', '', '2023-11-20 12:57:24', '2023-11-20 12:57:24', 3, 3),
(31, 'Gen 3', 'Third-generation product or device with improved features.', 25, 90, 'china', '2023-11-29 15:30:00', 10, 0, 5, 50, '{tag}', 200, 40, 'ELE-GEN-0022', '', '', '2023-11-20 12:57:24', '2023-11-20 12:57:24', 3, 7),
(32, 'Generation 2', 'Third-generation product or device with improved features.', 22, 90, 'china', '2023-11-29 15:30:00', 10, 0, 5, 50, '{tag}', 200, 40, 'ELE-GEN-002', '', '', '2023-11-20 12:57:24', '2023-11-20 12:57:24', 2, 7),
(33, 'Face Mask', 'Protective mask for personal safety.', 5, 90, 'china', '2023-11-29 15:30:00', 10, 0, 5, 50, '{tag}', 200, 40, 'PC-FM-003', '', '', '2023-11-20 12:57:24', '2023-11-20 12:57:24', 2, 3),
(34, 'Headphone Type C wired', 'Standard charging cable for iPhones in classic white color.', 5, 90, 'china', '2023-11-29 15:30:00', 10, 0, 5, 50, '{tag}', 200, 40, 'ELE-HP-TCW-004', '', '', '2023-11-20 12:57:24', '2023-11-20 12:57:24', 2, 3),
(35, 'Iphone Speaker', 'Extended length USB cable for charging and syncing iPhones.', 15, 90, 'china', '2023-11-29 15:30:00', 10, 1, 5, 50, '{tag}', 200, 40, 'ELE-SP-IP-005', '', 'active', '2023-11-20 12:57:24', '2023-11-20 12:57:24', 2, 3),
(36, 'Iphone Cables', 'MagSafe charger for quick and secure wireless charging.', 2.35, 90, 'china', '2023-11-29 15:30:00', 10, 1, 5, 50, '{tag}', 200, 40, 'ELE-CAB-IP-ST-USB-007', '', 'active', '2023-11-20 12:57:24', '2023-11-20 12:57:24', 2, 7),
(37, 'Magesafe', 'MagSafe charger for quick and secure wireless chargin.', 10, 90, 'china', '2023-11-29 15:30:00', 10, 1, 5, 50, '{tag}', 200, 40, 'ELE-CHG-MS-008', '', 'active', '2023-11-20 12:57:24', '2023-11-20 12:57:24', 3, 7),
(38, 'Magnatic Charging Banks', 'Portable power bank with magnetic charging capability.', 45, 90, 'china', '2023-11-29 15:30:00', 10, 1, 5, 50, '{tag}', 200, 40, 'ELE-CHG-MAG-009', '', 'active', '2023-11-20 12:57:24', '2023-11-20 12:57:24', 3, 7),
(39, 'Magnum Condem', 'Premium quality Magnum-sized condoms for safe and comfortable intimacy.', 12.99, 90, 'china', '2023-11-29 15:30:00', 10, 1, 5, 50, '{tag}', 200, 40, 'HW-CND-MAG-010', '', 'active', '2023-11-20 12:57:24', '2023-11-20 12:57:24', 3, 3),
(40, 'Magsafe Charger', 'Next-generation MagSafe charger for efficient wireless charging.', 12, 90, 'china', '2023-11-29 15:30:00', 10, 1, 5, 50, '{tag}', 200, 40, 'ELE-CHG-MS-011', '', 'active', '2023-11-20 12:57:24', '2023-11-20 12:57:24', 2, 3),
(41, 'Max', 'Extra Large Maximum Absorbency Personal Care Products in Assorted.', 130, 90, 'china', '2023-11-29 15:30:00', 10, 1, 5, 50, '{tag}', 200, 40, 'PC-PRODUCT-019', '', 'active', '2023-11-20 12:57:24', '2023-11-20 12:57:24', 2, 7),
(42, 'Micro USB cables', 'Versatile connectors for charging and data transfer, compatible with a wide range of devices', 2.3, 90, 'china', '2023-11-29 15:30:00', 10, 1, 5, 50, '{tag}', 200, 40, 'MC-USB', '', 'active', '2023-11-20 12:57:24', '2023-11-20 12:57:24', 2, 2),
(43, 'mango2', 'This is a sample product', 19.99, 100, 'Sample Manufacturer', '2024-01-02 05:49:36', 10, 1, 4, 0, '{tag1,tag2}', 1000, 100, 'pkpmange', 'Sample Category', 'active', '2024-01-02 05:49:36', '2024-02-13 11:36:55', 1, 2),
(170, 'mango', 'description for mango', 100, 100, 'Sample Manufacturer', '2024-02-15 12:37:11', 10, 0, 4, 0, '{tag1,tag2}', 1000, 100, 'pkpangoje-1269', 'Sample Category', 'active', '2024-02-15 12:37:11', '2024-02-15 12:37:11', 1, 1),
(172, 'mango', 'description for mango', 100, 100, 'Sample Manufacturer', '2024-02-21 08:07:30', 10, 1, 4, 0, 'tag1,tag2', 1000, 100, 'pkp0-1269', 'Sample Category', 'active', '2024-02-21 08:07:30', '2024-02-21 08:07:30', 3, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `productvariants`
--

CREATE TABLE `productvariants` (
  `id` int(11) NOT NULL,
  `type` varchar(255) DEFAULT NULL,
  `weight` float DEFAULT NULL,
  `unit` varchar(255) DEFAULT NULL,
  `key` varchar(255) DEFAULT NULL,
  `value` text DEFAULT NULL,
  `availableQuantity` int(11) DEFAULT NULL,
  `variantPrice` decimal(10,2) DEFAULT NULL,
  `productId` int(11) DEFAULT NULL,
  `optionValues` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `productvariants`
--

INSERT INTO `productvariants` (`id`, `type`, `weight`, `unit`, `key`, `value`, `availableQuantity`, `variantPrice`, `productId`, `optionValues`) VALUES
(2, 'individual', 1.5, 'kg', 'size', '[\"small\",\"medium\",\"E-large\"]', 100, '24.99', 172, '[{\"id\":\"1\",\"name\":\"small\",\"variantSku\":[\"ABC1239-small\"]},{\"id\":\"2\",\"name\":\"medium\",\"variantSku\":[\"ABC1239-medium\"]},{\"id\":\"3\",\"name\":\"E-large\",\"variantSku\":[\"ABC1239-large\"]}]'),
(3, 'individual', 1.5, 'kg', 'color', '[\"red\",\"black\"]', 100, '24.99', 172, '12');

-- --------------------------------------------------------

--
-- Table structure for table `states`
--

CREATE TABLE `states` (
  `stateName` varchar(255) NOT NULL,
  `stateCode` int(11) NOT NULL,
  `stateId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `states`
--

INSERT INTO `states` (`stateName`, `stateCode`, `stateId`, `createdAt`, `updatedAt`) VALUES
('California', 1233, 1, '2023-12-04 16:25:35', '2023-12-04 04:25:35'),
('California', 12334, 3, '2023-12-05 11:27:20', '2023-12-05 11:27:20'),
('California', 123, 12, '2023-12-04 15:58:31', '2023-12-04 03:58:31');

-- --------------------------------------------------------

--
-- Table structure for table `suppliers`
--

CREATE TABLE `suppliers` (
  `supplier_id` int(11) NOT NULL,
  `supplier_name` varchar(255) NOT NULL,
  `contact_info` varchar(255) DEFAULT NULL,
  `contact_person` varchar(255) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `suppliers`
--

INSERT INTO `suppliers` (`supplier_id`, `supplier_name`, `contact_info`, `contact_person`, `website`, `description`, `created_at`, `updated_at`, `createdAt`, `updatedAt`) VALUES
(1, 'luthfi', '123-456-7890', 'John Doe', 'http://luthfi.com', 'A description of the supplier', '2023-11-30 14:45:37', '2023-11-30 14:45:37', '2023-11-30 14:45:37', '2023-11-30 02:45:37'),
(2, 'john', '123-456-7890', 'afridi', 'http://products.com', 'A description of the supplier about products', '2023-11-30 15:14:12', '2023-11-30 15:14:12', '2023-11-30 15:14:12', '2023-11-30 03:14:12'),
(3, 'john1', '123-456-1890', 'afridi1', 'http://productsn.com', 'A description of the supplier about products', '2023-11-30 15:26:31', '2023-11-30 15:26:31', '2023-11-30 15:26:31', '2023-11-30 03:26:31');

-- --------------------------------------------------------


--
-- Indexes for dumped tables
--

--
-- Indexes for table `addresses`
--
ALTER TABLE `addresses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `stateId` (`stateId`);

--
-- Indexes for table `businesses`
--
ALTER TABLE `businesses`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cities`
--
ALTER TABLE `cities`
  ADD PRIMARY KEY (`id`),
  ADD KEY `stateId` (`stateId`);

--
-- Indexes for table `companies`
--
ALTER TABLE `companies`
  ADD PRIMARY KEY (`id`),
  ADD KEY `addressId` (`addressId`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `notificationconfigurations`
--
ALTER TABLE `notificationconfigurations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `notification_type_id` (`notification_type_id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `notification_type_id` (`notification_type_id`);

--
-- Indexes for table `notificationtypes`
--
ALTER TABLE `notificationtypes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orderitems`
--
ALTER TABLE `orderitems`
  ADD PRIMARY KEY (`id`),
  ADD KEY `orderId` (`orderId`),
  ADD KEY `productId` (`productId`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`orderId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `productcategories`
--
ALTER TABLE `productcategories`
  ADD PRIMARY KEY (`productId`,`categoryId`),
  ADD KEY `categoryId` (`categoryId`);

--
-- Indexes for table `productimages`
--
ALTER TABLE `productimages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `productId` (`productId`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `sku` (`sku`),
  ADD KEY `supplier_id` (`supplier_id`);

--
-- Indexes for table `productvariants`
--
ALTER TABLE `productvariants`
  ADD PRIMARY KEY (`id`),
  ADD KEY `productId` (`productId`);

--
-- Indexes for table `states`
--
ALTER TABLE `states`
  ADD PRIMARY KEY (`stateId`);

--
-- Indexes for table `suppliers`
--
ALTER TABLE `suppliers`
  ADD PRIMARY KEY (`supplier_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `customerId` (`customerId`),
  ADD KEY `businessId` (`businessId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `addresses`
--
ALTER TABLE `addresses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `businesses`
--
ALTER TABLE `businesses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `cities`
--
ALTER TABLE `cities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `companies`
--
ALTER TABLE `companies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `notificationconfigurations`
--
ALTER TABLE `notificationconfigurations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `notificationtypes`
--
ALTER TABLE `notificationtypes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `orderitems`
--
ALTER TABLE `orderitems`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `orderId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=95;

--
-- AUTO_INCREMENT for table `productimages`
--
ALTER TABLE `productimages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=83;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=173;

--
-- AUTO_INCREMENT for table `productvariants`
--
ALTER TABLE `productvariants`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `suppliers`
--
ALTER TABLE `suppliers`
  MODIFY `supplier_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `addresses`
--
ALTER TABLE `addresses`
  ADD CONSTRAINT `addresses_ibfk_1` FOREIGN KEY (`stateId`) REFERENCES `states` (`stateId`);

--
-- Constraints for table `cities`
--
ALTER TABLE `cities`
  ADD CONSTRAINT `cities_ibfk_1` FOREIGN KEY (`stateId`) REFERENCES `states` (`stateId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `companies`
--
ALTER TABLE `companies`
  ADD CONSTRAINT `companies_ibfk_1` FOREIGN KEY (`addressId`) REFERENCES `addresses` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `notificationconfigurations`
--
ALTER TABLE `notificationconfigurations`
  ADD CONSTRAINT `notificationconfigurations_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `notificationconfigurations_ibfk_2` FOREIGN KEY (`notification_type_id`) REFERENCES `notificationtypes` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`notification_type_id`) REFERENCES `notificationtypes` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `orderitems`
--
ALTER TABLE `orderitems`
  ADD CONSTRAINT `orderitems_ibfk_1` FOREIGN KEY (`orderId`) REFERENCES `orders` (`orderId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orderitems_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `productcategories`
--
ALTER TABLE `productcategories`
  ADD CONSTRAINT `productcategories_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `productcategories_ibfk_2` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `productimages`
--
ALTER TABLE `productimages`
  ADD CONSTRAINT `productimages_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers` (`supplier_id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `productvariants`
--
ALTER TABLE `productvariants`
  ADD CONSTRAINT `productvariants_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`customerId`) REFERENCES `customers` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `users_ibfk_2` FOREIGN KEY (`businessId`) REFERENCES `businesses` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
