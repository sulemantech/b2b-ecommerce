-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 26, 2024 at 12:03 PM
-- Server version: 8.0.36-cll-lve
-- PHP Version: 8.1.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `devcares_b2bdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `addresses`
--

CREATE TABLE `addresses` (
  `id` int NOT NULL,
  `address` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `stateId` int NOT NULL,
  `zipCode` int NOT NULL,
  `country` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `contactNumber` int DEFAULT NULL,
  `description` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `parentId` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `createdAt`, `updatedAt`, `parentId`) VALUES
(1, 'Electronics', '2023-11-20 06:35:14', '2024-01-03 11:59:24', NULL),
(2, 'HomeAccessories', '2024-03-06 12:45:56', '2024-03-06 12:45:56', NULL),
(3, 'Home & Lifestyle', '2023-11-20 06:35:48', '2023-11-20 06:35:48', NULL),
(7, 'Fashion', '2024-01-04 05:09:44', '2024-01-04 05:09:44', NULL),
(13, 'Smart Phones', '2024-03-21 09:55:17', '2024-03-21 09:55:17', 1),
(14, 'Feature Phones', '2024-03-21 10:51:56', '2024-03-21 10:51:56', 1),
(15, 'Monitors', '2024-03-21 10:51:58', '2024-03-21 10:51:58', 1),
(16, 'Laptops', '2024-03-21 10:51:59', '2024-03-21 10:51:59', 1),
(17, 'Desktops', '2024-03-21 10:52:01', '2024-03-21 10:52:01', 1),
(18, 'Tablets', '2024-03-21 10:52:02', '2024-03-21 10:52:02', 1),
(19, 'Air Conditioner', '2024-03-21 10:54:33', '2024-03-21 10:54:33', 2),
(20, 'Televisions', '2024-03-21 10:54:34', '2024-03-21 10:54:34', 2),
(21, 'Washing Machines', '2024-03-21 10:54:36', '2024-03-21 10:54:36', 2),
(22, 'Cooling & Heating', '2024-03-21 10:54:37', '2024-03-21 10:54:37', 2),
(23, 'Women Bags', '2024-03-21 10:58:08', '2024-03-21 10:58:08', 7),
(24, 'Kids Watches', '2024-03-21 10:58:09', '2024-03-21 10:58:09', 7),
(25, 'Sunglasses', '2024-03-21 10:58:10', '2024-03-21 10:58:10', 7),
(26, 'Decor', '2024-03-21 11:02:23', '2024-03-21 11:02:23', 3),
(27, 'Lightening', '2024-03-21 11:02:33', '2024-03-21 11:02:33', 3),
(28, 'Furniture', '2024-03-21 11:02:44', '2024-03-21 11:02:44', 3);

-- --------------------------------------------------------

--
-- Table structure for table `cities`
--

CREATE TABLE `cities` (
  `id` int NOT NULL,
  `cityName` varchar(255) NOT NULL,
  `stateId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `cities`
--

INSERT INTO `cities` (`id`, `cityName`, `stateId`, `createdAt`, `updatedAt`) VALUES
(1, 'islamabad', 12, '2023-12-04 04:32:28', '2023-12-04 04:32:28'),
(2, 'peshawar', 1, '2023-12-04 04:50:32', '2023-12-04 04:50:32'),
(3, 'peshawar', 1, '2024-03-06 12:53:48', '2024-03-06 12:53:48'),
(4, 'peshawar', 1, '2024-03-06 13:07:44', '2024-03-06 13:07:44');

-- --------------------------------------------------------

--
-- Table structure for table `companies`
--

CREATE TABLE `companies` (
  `id` int NOT NULL,
  `companyName` varchar(255) NOT NULL,
  `industry` varchar(255) NOT NULL,
  `addressId` int NOT NULL,
  `description` text,
  `contactInformation` varchar(255) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `industryType` varchar(255) DEFAULT NULL,
  `shippingInformation` text,
  `paymentMethods` varchar(255) DEFAULT NULL,
  `returnPolicy` text,
  `status` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `companies`
--

INSERT INTO `companies` (`id`, `companyName`, `industry`, `addressId`, `description`, `contactInformation`, `website`, `industryType`, `shippingInformation`, `paymentMethods`, `returnPolicy`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 'google', 'Test Industry', 1, 'Test Description', 'Test Contact Info', 'http://www.testcompany.com', 'Test Industry Type', 'Test Shipping Info', 'Test Payment Methods', 'CARD', 'Active', '2023-12-08 12:35:54', '2023-12-08 12:35:54'),
(2, 'facebook', 'Test Industry', 1, 'Test Description', 'Test Contact Info', 'http://www.testcompany.com', 'Test Industry Type', 'Test Shipping Info', 'Test Payment Methods', 'CARD', 'Active', '2023-12-08 12:36:37', '2023-12-08 12:36:37'),
(3, 'facebook', 'Test Industry', 1, 'Test Description', 'Test Contact Info', 'http://www.testcompany.com', 'Test Industry Type', 'Test Shipping Info', 'Test Payment Methods', 'CARD', 'Active', '2024-03-06 13:03:53', '2024-03-06 13:03:53');

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `contactNumber` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `name`, `address`, `email`, `contactNumber`, `createdAt`, `updatedAt`) VALUES
(1, 'luthfullah', '123 islamabad ,pakistan', 'luthfullah.doe@example.com', 12345678, '2024-01-18 03:03:42', '2024-01-18 03:03:42'),
(2, 'luthfullah2', '123 islamabad ,pakistan', 'luthfullah2.doe@example.com', 12345678, '2024-01-18 03:16:09', '2024-01-18 03:16:09'),
(3, 'luthfullah3', '123 islamabad ,pakistan', 'luthfullah3.doe@example.com', 12345678, '2024-01-18 03:16:09', '2024-01-18 03:16:09'),
(4, 'luthfullah1', '123 islamabad ,pakistan', 'luthfullah1.doe@example.com', 12345678, '2024-01-18 03:16:09', '2024-01-18 03:16:09'),
(5, 'luthfi12 Luna', '123 Main St', 'luthf9909@gmail.com', 1234567890, '2024-03-06 12:49:20', '2024-03-06 12:49:20'),
(11, 'luthfi12 L', '123 Main St', 'luthf990989@gmail.com', 123456789, '2024-03-06 13:05:56', '2024-03-06 13:05:56'),
(13, 'luthfi12 Luna', '123 Main St', 'luthf9909@gmaill.com', 1234567890, '2024-03-06 13:06:56', '2024-03-06 13:06:56'),
(15, 'luthfullah1', '123 islamabad ,pakistan', 'luthfullah1.dooe@example.com', 12345678, '2024-03-06 13:07:57', '2024-03-06 13:07:57'),
(16, 'luthfullah1', '123 islamabad ,pakistan', 'luthfullah21.doe@example.com', 12345678, '2024-03-06 13:10:23', '2024-03-06 13:10:23'),
(18, 'Sahibzada Hamza sardar', 'Nasir Bagh road canal town street 4A house no#24 peshwar', 'sardar36@gmail.com', 318, '2024-03-19 10:29:07', '2024-03-19 10:29:07'),
(19, 'izaz khan', 'islambad', 'izaz@gmail.com', 31892, '2024-03-19 10:31:45', '2024-03-19 10:31:45'),
(20, 'zabi ullah', 'islamabad', 'zabi@gmail.com', 3156, '2024-03-19 10:37:02', '2024-03-19 10:37:02'),
(21, 'huzai khan', 'karachi', 'huzail@gmail.com', 31890, '2024-03-19 10:38:44', '2024-03-19 10:38:44'),
(22, 'jalal khan', 'khana', 'jalal@gmail.com', 91890, '2024-04-24 06:01:22', '2024-04-24 06:01:22');

-- --------------------------------------------------------

--
-- Table structure for table `notificationConfigurations`
--

CREATE TABLE `notificationConfigurations` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `notification_type_id` int NOT NULL,
  `is_enabled` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `notificationConfigurations`
--

INSERT INTO `notificationConfigurations` (`id`, `user_id`, `notification_type_id`, `is_enabled`) VALUES
(1, 8, 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int NOT NULL,
  `notification_type_id` int NOT NULL,
  `related_entity_type` varchar(255) NOT NULL,
  `related_entity_id` int NOT NULL,
  `message` varchar(255) NOT NULL,
  `timestamp` datetime NOT NULL,
  `is_read` tinyint(1) NOT NULL DEFAULT '0',
  `sender_id` int DEFAULT NULL,
  `recipient_id` int DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `notification_type_id`, `related_entity_type`, `related_entity_id`, `message`, `timestamp`, `is_read`, `sender_id`, `recipient_id`, `status`) VALUES
(2, 1, 'user', 123, 'This is a test notification', '2024-02-13 11:25:50', 0, 456, 1, 'pending'),
(3, 1, 'user', 123, 'This is a test notification', '2024-02-14 02:51:20', 0, 456, 1, 'pending'),
(4, 1, 'user', 123, 'This is a test notification', '2024-02-14 02:52:33', 0, 13, 8, 'pending'),
(5, 1, 'user', 123, 'This is a test notification', '2024-03-06 13:05:01', 1, 456, 8, 'pending'),
(6, 1, 'user', 123, 'This is a test notification', '2024-03-06 13:22:01', 0, 456, 789, 'pending'),
(7, 1, 'user', 123, 'This is a test notification', '2024-04-15 07:51:50', 0, 456, 789, 'pending'),
(8, 2, 'order', 1, 'Your order has been placed successfully.', '2024-04-16 09:31:54', 1, 2, 8, 'pending'),
(9, 2, 'order', 1, 'Your order has been placed successfully.', '2024-04-16 09:35:24', 0, 2, 1, 'pending'),
(10, 2, 'order', 1, 'Your order has been placed successfully.', '2024-04-16 09:49:56', 0, 2, 1, 'pending'),
(11, 2, 'order', 1, 'Your order has been placed successfully.', '2024-04-16 10:53:20', 0, 2, 8, 'pending'),
(12, 2, 'order', 1, 'Your order has been placed successfully.', '2024-04-18 12:06:22', 0, 9, 8, 'pending'),
(13, 2, 'order', 1, 'Your order has been placed successfully.', '2024-04-18 12:08:47', 0, 9, 8, 'pending'),
(14, 2, 'order', 1, 'Your order has been placed successfully.', '2024-04-19 07:29:01', 0, 9, 8, 'pending'),
(15, 2, 'order', 1, 'Your order has been placed successfully.', '2024-04-19 07:31:52', 0, 9, 8, 'pending'),
(16, 2, 'order', 1, 'Your order has been placed successfully.', '2024-04-22 06:19:37', 0, 9, 8, 'pending'),
(17, 2, 'order', 1, 'Your order has been placed successfully.', '2024-04-22 06:56:35', 0, 9, 8, 'pending'),
(18, 2, 'order', 1, 'Your order has been placed successfully.', '2024-04-22 07:19:32', 0, 9, 8, 'pending'),
(19, 2, 'order', 1, 'Your order has been placed successfully.', '2024-04-22 09:38:06', 0, 9, 8, 'pending'),
(20, 2, 'order', 1, 'Your order has been placed successfully.', '2024-04-22 10:08:37', 0, 9, 8, 'pending'),
(21, 2, 'order', 1, 'Your order has been placed successfully.', '2024-04-22 10:20:41', 0, 9, 8, 'pending'),
(22, 2, 'order', 1, 'Your order has been placed successfully.', '2024-04-22 10:21:40', 0, 9, 8, 'pending'),
(23, 2, 'order', 1, 'Your order has been placed successfully.', '2024-04-22 10:27:05', 0, 9, 8, 'pending'),
(24, 2, 'order', 1, 'Your order has been placed successfully.', '2024-04-22 10:32:20', 0, 9, 8, 'pending'),
(25, 2, 'order', 1, 'Your order has been placed successfully.', '2024-04-22 10:35:34', 0, 9, 8, 'pending'),
(26, 2, 'order', 1, 'Your order has been placed successfully.', '2024-04-22 10:44:01', 0, 9, 8, 'pending'),
(27, 2, 'order', 1, 'Your order has been placed successfully.', '2024-04-22 10:45:31', 0, 9, 8, 'pending'),
(28, 2, 'order', 1, 'Your order has been placed successfully.', '2024-04-22 10:45:48', 0, 9, 8, 'pending'),
(29, 2, 'order', 1, 'Your order has been placed successfully.', '2024-04-22 10:46:19', 0, 9, 8, 'pending'),
(30, 2, 'order', 1, 'Your order has been placed successfully.', '2024-04-22 10:50:46', 0, 9, 8, 'pending'),
(31, 2, 'order', 1, 'Your order has been placed successfully.', '2024-04-22 10:51:02', 0, 9, 8, 'pending'),
(32, 2, 'order', 1, 'Your order has been placed successfully.', '2024-04-22 10:51:40', 0, 9, 8, 'pending'),
(33, 2, 'order', 1, 'Your order has been placed successfully.', '2024-04-22 11:37:52', 0, 9, 8, 'pending'),
(34, 2, 'order', 1, 'Your order has been placed successfully.', '2024-04-23 05:34:10', 0, 9, 8, 'pending'),
(35, 2, 'order', 1, 'Your order has been placed successfully.', '2024-04-23 18:19:11', 0, 9, 8, 'pending'),
(36, 2, 'order', 1, 'Your order has been placed successfully.', '2024-04-29 06:06:28', 0, 9, 8, 'pending'),
(37, 2, 'order', 1, 'Your order has been placed successfully.', '2024-04-29 06:11:41', 0, 9, 8, 'pending'),
(38, 2, 'order', 1, 'Your order has been placed successfully.', '2024-04-29 06:20:11', 0, 9, 8, 'pending'),
(39, 2, 'order', 1, 'Your order has been placed successfully.', '2024-04-29 06:25:23', 0, 9, 8, 'pending'),
(40, 2, 'order', 1, 'Your order has been placed successfully.', '2024-04-29 06:46:12', 0, 9, 8, 'pending');

-- --------------------------------------------------------

--
-- Table structure for table `notificationTypes`
--

CREATE TABLE `notificationTypes` (
  `id` int NOT NULL,
  `typeName` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `notificationTypes`
--

INSERT INTO `notificationTypes` (`id`, `typeName`, `description`) VALUES
(1, 'order', 'This is a new notification type for successful order'),
(2, 'updates', 'message send'),
(3, 'order successful ', 'This is a new notification type for successful order'),
(4, 'order successful ', 'This is a new notification type for successful order'),
(5, 'order successful ', 'This is a new notification type for successful order'),
(6, 'OrderPlaced', 'Notification for order placed'),
(7, 'OrderPlaced', 'Notification for order placed'),
(8, 'OrderPlaced', 'Notification for order placed'),
(9, 'OrderPlaced', 'Notification for order placed'),
(10, 'OrderPlaced', 'Notification for order placed'),
(11, 'OrderPlaced', 'Notification for order placed'),
(12, 'OrderPlaced', 'Notification for order placed'),
(13, 'OrderPlaced', 'Notification for order placed'),
(14, 'order successful ', 'This is a new notification type for successful order'),
(15, 'order successful ', 'This is a new notification type for successful order'),
(16, 'order successful ', 'This is a new notification type for successful order'),
(17, 'order successful ', 'This is a new notification type for successful order'),
(18, 'order successful ', 'This is a new notification type for successful order'),
(19, 'order successful ', 'This is a new notification type for successful order'),
(20, 'order successful ', 'This is a new notification type for successful order'),
(21, 'order successful ', 'This is a new notification type for successful order'),
(22, 'order successful ', 'This is a new notification type for successful order'),
(23, 'Order successful for order undefined', 'Notification for successful order undefined');

-- --------------------------------------------------------

--
-- Table structure for table `orderItems`
--

CREATE TABLE `orderItems` (
  `id` int NOT NULL,
  `orderId` int NOT NULL,
  `productId` int NOT NULL,
  `quantity` int NOT NULL,
  `price` float NOT NULL,
  `discount` float NOT NULL DEFAULT '0',
  `totalPrice` float NOT NULL,
  `vendorId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `orderItems`
--

INSERT INTO `orderItems` (`id`, `orderId`, `productId`, `quantity`, `price`, `discount`, `totalPrice`, `vendorId`, `createdAt`, `updatedAt`) VALUES
(81, 91, 3, 50, 1499, 10, 74450, 1, '2024-03-07 07:49:58', '2024-03-07 07:49:58'),
(82, 92, 3, 50, 1499, 10, 74450, 1, '2024-03-07 07:49:58', '2024-03-07 07:49:58'),
(83, 93, 3, 50, 1499, 10, 74450, 1, '2024-03-07 07:49:58', '2024-03-07 07:49:58'),
(84, 94, 2, 1, 25, 10, 15, 1, '2024-03-07 18:46:57', '2024-03-07 18:46:57'),
(85, 95, 1, 1, 37.99, 10, 27.99, 1, '2024-03-18 10:20:46', '2024-03-18 10:20:46'),
(86, 96, 1, 40, 37.99, 10, 1119.6, 1, '2024-03-21 06:25:42', '2024-03-21 06:25:42'),
(87, 97, 1, 1, 37.99, 10, 27.99, 1, '2024-04-15 08:13:21', '2024-04-15 08:13:21'),
(88, 98, 2, 100, 19.99, 10, 999, 1, '2024-04-15 08:17:49', '2024-04-15 08:17:49'),
(89, 99, 2, 100, 19.99, 10, 999, 1, '2024-04-15 08:24:29', '2024-04-15 08:24:29'),
(90, 100, 2, 100, 19.99, 10, 999, 1, '2024-04-15 08:25:57', '2024-04-15 08:25:57'),
(91, 101, 3, 1, 1499, 10, 1489, 1, '2024-04-15 08:29:06', '2024-04-15 08:29:06'),
(92, 102, 6, 100, 32, 10, 2200, 1, '2024-04-15 08:31:34', '2024-04-15 08:31:34'),
(93, 103, 8, 100, 35, 10, 2500, 1, '2024-04-15 08:33:09', '2024-04-15 08:33:09'),
(94, 104, 3, 1, 1499, 10, 1489, 1, '2024-04-15 08:39:09', '2024-04-15 08:39:09'),
(95, 105, 1, 1, 37.99, 10, 27.99, 1, '2024-04-15 09:24:14', '2024-04-15 09:24:14'),
(96, 106, 1, 1, 37.99, 10, 27.99, 1, '2024-04-15 09:25:11', '2024-04-15 09:25:11'),
(97, 107, 1, 40, 37.99, 10, 1119.6, 1, '2024-04-15 09:26:07', '2024-04-15 09:26:07'),
(98, 108, 3, 1, 1499, 10, 1489, 1, '2024-04-15 09:29:50', '2024-04-15 09:29:50'),
(99, 109, 3, 1, 1499, 10, 1489, 1, '2024-04-15 09:30:57', '2024-04-15 09:30:57'),
(100, 110, 3, 1, 1499, 10, 1489, 1, '2024-04-15 09:32:17', '2024-04-15 09:32:17'),
(101, 111, 2, 1, 19.99, 10, 9.99, 1, '2024-04-15 09:35:26', '2024-04-15 09:35:26'),
(102, 112, 1, 1, 37.99, 10, 27.99, 1, '2024-04-15 09:39:32', '2024-04-15 09:39:32'),
(103, 113, 4, 1, 20, 10, 10, 1, '2024-04-15 09:42:29', '2024-04-15 09:42:29'),
(104, 114, 1, 1, 37.99, 10, 27.99, 1, '2024-04-15 09:47:03', '2024-04-15 09:47:03'),
(105, 115, 1, 40, 37.99, 10, 1119.6, 1, '2024-04-15 11:52:58', '2024-04-15 11:52:58'),
(106, 116, 1, 1, 37.99, 10, 27.99, 1, '2024-04-15 12:03:27', '2024-04-15 12:03:27'),
(107, 117, 1, 2, 37.99, 10, 55.98, 1, '2024-04-16 08:24:19', '2024-04-16 08:24:19'),
(108, 118, 2, 1, 19.99, 10, 9.99, 1, '2024-04-16 08:27:04', '2024-04-16 08:27:04'),
(109, 119, 1, 1, 37.99, 10, 27.99, 1, '2024-04-16 09:31:54', '2024-04-16 09:31:54'),
(110, 120, 1, 1, 37.99, 10, 27.99, 1, '2024-04-16 09:35:23', '2024-04-16 09:35:23'),
(111, 121, 1, 40, 37.99, 10, 1119.6, 1, '2024-04-16 09:49:56', '2024-04-16 09:49:56'),
(112, 122, 1, 40, 37.99, 10, 1119.6, 1, '2024-04-16 10:53:19', '2024-04-16 10:53:19'),
(113, 123, 1, 40, 37.99, 10, 1119.6, 1, '2024-04-18 12:06:22', '2024-04-18 12:06:22'),
(114, 124, 1, 1, 37.99, 10, 27.99, 1, '2024-04-18 12:08:47', '2024-04-18 12:08:47'),
(115, 125, 1, 40, 37.99, 10, 1119.6, 1, '2024-04-19 06:17:34', '2024-04-19 06:17:34'),
(116, 126, 1, 40, 37.99, 10, 1119.6, 1, '2024-04-19 06:19:12', '2024-04-19 06:19:12'),
(117, 127, 1, 40, 37.99, 10, 1119.6, 1, '2024-04-19 06:21:23', '2024-04-19 06:21:23'),
(118, 128, 1, 40, 37.99, 10, 1119.6, 1, '2024-04-19 06:24:36', '2024-04-19 06:24:36'),
(119, 129, 1, 1, 37.99, 10, 27.99, 1, '2024-04-19 06:45:38', '2024-04-19 06:45:38'),
(120, 130, 1, 1, 37.99, 10, 27.99, 1, '2024-04-19 06:46:53', '2024-04-19 06:46:53'),
(121, 131, 1, 1, 37.99, 10, 27.99, 1, '2024-04-19 06:47:34', '2024-04-19 06:47:34'),
(122, 132, 1, 40, 37.99, 10, 1119.6, 1, '2024-04-19 06:50:42', '2024-04-19 06:50:42'),
(123, 133, 1, 40, 37.99, 10, 1119.6, 1, '2024-04-19 06:53:39', '2024-04-19 06:53:39'),
(124, 134, 1, 40, 37.99, 10, 1119.6, 1, '2024-04-19 07:05:55', '2024-04-19 07:05:55'),
(125, 135, 1, 40, 37.99, 10, 1119.6, 1, '2024-04-19 07:23:45', '2024-04-19 07:23:45'),
(126, 136, 1, 40, 37.99, 10, 1119.6, 1, '2024-04-19 07:29:01', '2024-04-19 07:29:01'),
(127, 137, 1, 40, 37.99, 10, 1119.6, 1, '2024-04-19 07:31:52', '2024-04-19 07:31:52'),
(128, 138, 1, 1, 37.99, 10, 27.99, 1, '2024-04-22 06:19:37', '2024-04-22 06:19:37'),
(129, 139, 1, 40, 37.99, 10, 1119.6, 1, '2024-04-22 06:56:35', '2024-04-22 06:56:35'),
(130, 140, 1, 40, 37.99, 10, 1119.6, 1, '2024-04-22 07:19:32', '2024-04-22 07:19:32'),
(131, 141, 1, 1, 37.99, 10, 27.99, 1, '2024-04-22 09:38:06', '2024-04-22 09:38:06'),
(132, 142, 7, 1, 32, 10, 22, 1, '2024-04-22 10:08:37', '2024-04-22 10:08:37'),
(133, 143, 9, 1, 1499, 10, 1489, 1, '2024-04-22 10:20:41', '2024-04-22 10:20:41'),
(134, 144, 18, 1, 140, 10, 130, 1, '2024-04-22 10:21:39', '2024-04-22 10:21:39'),
(135, 145, 21, 1, 25, 10, 15, 1, '2024-04-22 10:27:05', '2024-04-22 10:27:05'),
(136, 146, 1, 1, 37.99, 10, 27.99, 1, '2024-04-22 10:32:20', '2024-04-22 10:32:20'),
(137, 147, 1, 40, 37.99, 10, 1119.6, 1, '2024-04-22 10:35:33', '2024-04-22 10:35:33'),
(138, 148, 1, 1, 37.99, 10, 27.99, 1, '2024-04-22 10:44:01', '2024-04-22 10:44:01'),
(139, 149, 1, 1, 37.99, 10, 27.99, 1, '2024-04-22 10:45:30', '2024-04-22 10:45:30'),
(140, 150, 2, 1, 19.99, 10, 9.99, 1, '2024-04-22 10:45:46', '2024-04-22 10:45:46'),
(141, 151, 3, 50, 1499, 10, 74450, 1, '2024-04-22 10:46:18', '2024-04-22 10:46:18'),
(142, 152, 1, 1, 37.99, 10, 27.99, 1, '2024-04-22 10:50:46', '2024-04-22 10:50:46'),
(143, 153, 1, 1, 37.99, 10, 27.99, 1, '2024-04-22 10:51:02', '2024-04-22 10:51:02'),
(144, 154, 1, 1, 37.99, 10, 27.99, 1, '2024-04-22 10:51:40', '2024-04-22 10:51:40'),
(145, 155, 1, 40, 37.99, 10, 1119.6, 1, '2024-04-22 11:37:52', '2024-04-22 11:37:52'),
(146, 156, 1, 40, 37.99, 10, 1119.6, 1, '2024-04-23 05:34:09', '2024-04-23 05:34:09'),
(147, 157, 1, 40, 37.99, 10, 1119.6, 1, '2024-04-23 18:19:10', '2024-04-23 18:19:10'),
(148, 158, 1, 40, 37.99, 10, 1119.6, 1, '2024-04-29 06:06:28', '2024-04-29 06:06:28'),
(149, 159, 2, 100, 19.99, 10, 999, 1, '2024-04-29 06:11:41', '2024-04-29 06:11:41'),
(150, 160, 1, 40, 37.99, 10, 1119.6, 1, '2024-04-29 06:20:10', '2024-04-29 06:20:10'),
(151, 161, 1, 40, 37.99, 10, 1119.6, 1, '2024-04-29 06:25:22', '2024-04-29 06:25:22'),
(152, 162, 1, 40, 37.99, 10, 1119.6, 1, '2024-04-29 06:46:11', '2024-04-29 06:46:11');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `orderId` int NOT NULL,
  `userId` int DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `orderDate` datetime DEFAULT NULL,
  `totalPrice` decimal(10,2) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `discount` int DEFAULT NULL,
  `paymentMethod` varchar(255) DEFAULT NULL,
  `trackingNumber` int DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `contactNumber` int NOT NULL,
  `zipCode` int DEFAULT NULL,
  `additionalInfo` varchar(255) DEFAULT NULL,
  `city` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`orderId`, `userId`, `address`, `orderDate`, `totalPrice`, `status`, `discount`, `paymentMethod`, `trackingNumber`, `name`, `email`, `contactNumber`, `zipCode`, `additionalInfo`, `city`, `country`, `createdAt`, `updatedAt`) VALUES
(70, 1, '234 peshawar', '2023-12-04 05:54:51', 50.00, 'Pending', 100, 'Credit Card', 123456, '2023-12-15 3:24:21 PM', '2023-12-15 3:24:21 PM', 0, 0, '1234567890', '12345', 'Special instructions for delivery', '2024-03-07 07:50:50', '2024-04-17 07:15:30'),
(71, 1, '234 peshawar', '2023-12-04 05:54:51', 0.00, 'Pending', 10, 'Credit Card', 123456, '2023-12-15 3:27:41 PM', '2023-12-15 3:27:41 PM', 0, 0, '1234567890', '12345', 'Special instructions for delivery', '2024-03-07 07:50:50', '2024-04-17 07:15:30'),
(74, 1, '234 peshawar', '2023-12-04 05:54:51', 100.00, 'Pending', 10, 'Credit Card', 123456, '2023-12-15 3:33:37 PM', '2023-12-15 3:33:37 PM', 0, 0, '1234567890', '12345', 'Special instructions for delivery', '2024-03-07 07:50:50', '2024-04-17 07:15:30'),
(76, 1, '234 peshawar', '2023-12-04 05:54:51', 300.00, 'Pending', 10, 'Credit Card', 123456, '2023-12-15 3:35:06 PM', '2023-12-15 3:35:06 PM', 0, 0, '1234567890', '12345', 'Special instructions for delivery', '2024-03-07 07:50:50', '2024-04-17 07:15:30'),
(78, 8, '123 Main St', '2023-12-08 03:19:02', 200.00, 'Pending', 10, 'Credit Card', 123456, '2024-01-01 4:17:38 PM', '2024-01-01 4:17:38 PM', 0, 0, '1234567890', '12345', 'Special instructions for delivery', '2024-03-07 07:50:50', '2024-03-07 07:50:50'),
(79, 8, '123 Main St', '2023-12-08 03:19:02', 200.00, 'Pending', 10, 'Credit Card', 123456, '2024-01-01 4:17:39 PM', '2024-01-01 4:17:39 PM', 0, 0, '1234567890', '12345', 'Special instructions for delivery', '2024-03-07 07:50:50', '2024-03-07 07:50:50'),
(80, 8, '123 Main St', '2023-12-08 03:19:02', 200.00, 'Pending', 10, 'Credit Card', 123456, '2024-01-01 5:29:19 PM', '2024-01-01 5:29:19 PM', 0, 0, '1234567890', '12345', 'Special instructions for delivery', '2024-03-07 07:50:50', '2024-03-07 07:50:50'),
(85, 13, '234 peshawar', '2023-12-08 03:19:02', 200.00, 'Pending', 10, 'Credit card', 123456, '2024-01-17 5:26:11 PM', '2024-01-17 5:26:11 PM', 0, 0, '1234567890', '12345', 'Special instructions for delivery', '2024-03-07 07:50:50', '2024-03-07 07:50:50'),
(87, 13, '234 peshawar', '0000-00-00 00:00:00', 200.00, 'Pending', 10, 'Credit card', 123456, '2024-02-13 3:19:38 PM', '2024-02-13 3:19:38 PM', 0, 0, '1234567890', '12345', 'Special instructions for delivery', '2024-03-07 07:50:50', '2024-03-07 07:50:50'),
(89, 13, '234 peshawar', '0000-00-00 00:00:00', 200.00, 'Pending', 10, 'Credit card', 123456, '2024-02-13 3:41:09 PM', '2024-02-13 3:41:09 PM', 0, 0, '1234567898', '12345', 'Special instructions for delivery', '2024-03-07 07:50:50', '2024-03-07 07:50:50'),
(90, 13, '234 peshawar', NULL, 200.00, NULL, 10, 'Credit card ', 123456, 'luthfi', 'luthfi@example.com', 1234567898, 12345, 'Special instructions for delivery', 'islamabad', 'Sample Country', '2024-03-07 07:50:50', '2024-03-07 07:50:50'),
(91, 8, '123 Main Street', NULL, 74450.00, NULL, 5, 'Cash on delivery', 3734, 'Sahibzada', 'shamzasardar36@gmail.com', 123456789, 25000, 'khaa', 'Peshawar', '', '2024-03-07 07:50:50', '2024-03-07 07:50:50'),
(92, 8, '123 Main Street', NULL, 74450.00, NULL, 5, 'Cash on delivery', 770095, 'Sahibzada', 'shamzasardar36@gmail.com', 123456789, 25000, '', 'Peshawar', '', '2024-03-07 07:50:50', '2024-03-07 07:50:50'),
(93, 8, '123 Main Street', NULL, 74450.00, NULL, 5, 'Cash on delivery', 921859, 'Sahibzada', 'shamzasardar36@gmail.com', 123456789, 25000, '', 'Peshawar', '', '2024-03-07 07:50:50', '2024-03-07 07:50:50'),
(94, 8, '123 Main Street', NULL, 15.00, NULL, 5, 'Cash on delivery', 273567, 'Sahibzada', 'shamzasardar36@gmail.com', 123456789, 25000, '', 'Peshawar', '', '2024-03-07 18:46:57', '2024-03-07 18:46:57'),
(95, 8, '123 Main Street', NULL, 27.99, NULL, 5, 'Cash on delivery', 255430, 'Sahibzada', 'shamzasardar36@gmail.com', 123456789, 25000, '', 'Peshawar', '', '2024-03-18 10:20:46', '2024-03-18 10:20:46'),
(96, 8, '123 Main Street', NULL, 1119.60, NULL, 5, 'Cash on delivery', 508438, 'Sahibzada', 'luthfi@gmail.com', 123456789, 25000, '', 'Peshawar', '', '2024-03-21 06:25:42', '2024-03-21 06:25:42'),
(97, 8, '123 Main Street', NULL, 27.99, NULL, 5, 'Cash on delivery', 585321, 'luthfi', 'luthfi@gmail.com', 123456789, 2000, 'kha g', 'peshawAR', '', '2024-04-15 08:13:21', '2024-04-15 08:13:21'),
(98, 8, '123 Main Street', NULL, 999.00, NULL, 5, 'Cash on delivery', 225924, 'luthfi', 'luthfi@gmail.com', 123456789, 1000, 'lvu', 'norway', '', '2024-04-15 08:17:49', '2024-04-15 08:17:49'),
(99, 8, '123 Main Street', NULL, 999.00, NULL, 5, 'Cash on delivery', 81062, 'luthfi', 'luthfi@gmail.com', 123456789, 100, 'kon', 'lahor', '', '2024-04-15 08:24:29', '2024-04-15 08:24:29'),
(100, 8, '123 Main Street', NULL, 999.00, NULL, 5, 'Cash on delivery', 174804, 'luthfi', 'luthfi@gmail.com', 123456789, 100, 'kon', 'lahor', '', '2024-04-15 08:25:57', '2024-04-15 08:25:57'),
(101, 8, '123 Main Street', NULL, 1489.00, NULL, 5, 'Cash on delivery', 418263, 'Sahibzada', 'shamzasardar36@gmail.com', 123456789, 25000, '', 'Peshawar', '', '2024-04-15 08:29:06', '2024-04-15 08:29:06'),
(102, 8, '123 Main Street', NULL, 2200.00, NULL, 5, 'Cash on delivery', 215282, 'Sahibzada', 'shamzasardar36@gmail.com', 123456789, 25000, '', 'Peshawar', '', '2024-04-15 08:31:34', '2024-04-15 08:31:34'),
(103, 8, '123 Main Street', NULL, 2500.00, NULL, 5, 'Cash on delivery', 919829, 'Sahibzada', 'shamzasardar36@gmail.com', 123456789, 25000, '', 'Peshawar', '', '2024-04-15 08:33:09', '2024-04-15 08:33:09'),
(104, 1, '234 peshawar', NULL, 1489.00, NULL, 5, 'Cash on delivery', 35549, 'Sahibzada', 'shamzasardar36@gmail.com', 1234567890, 25000, '', 'Peshawar', '', '2024-04-15 08:39:09', '2024-04-17 07:15:30'),
(105, 1, '234 peshawar', NULL, 27.99, NULL, 5, 'Cash on delivery', 289316, 'Sahibzada', 'shamzasardar36@gmail.com', 1234567890, 25000, '', 'Peshawar', '', '2024-04-15 09:24:14', '2024-04-17 07:15:30'),
(106, 1, '234 peshawar', NULL, 27.99, NULL, 5, 'Cash on delivery', 387345, 'Sahibzada', 'shamzasardar36@gmail.com', 1234567890, 25000, '', 'Peshawar', '', '2024-04-15 09:25:11', '2024-04-17 07:15:30'),
(107, 1, '234 peshawar', NULL, 1119.60, NULL, 5, 'Cash on delivery', 145214, 'Sahibzada', 'shamzasardar36@gmail.com', 1234567890, 25000, '', 'Peshawar', '', '2024-04-15 09:26:07', '2024-04-17 07:15:30'),
(108, 1, '234 peshawar', NULL, 1489.00, NULL, 5, 'Cash on delivery', 471563, 'Sahibzada', 'shamzasardar36@gmail.com', 1234567890, 25000, '', 'Peshawar', '', '2024-04-15 09:29:50', '2024-04-17 07:15:30'),
(109, 1, '234 peshawar', NULL, 1489.00, NULL, 5, 'Cash on delivery', 228558, 'Sahibzada', 'shamzasardar36@gmail.com', 1234567890, 25000, '', 'Peshawar', '', '2024-04-15 09:30:57', '2024-04-17 07:15:30'),
(110, 1, '234 peshawar', NULL, 1489.00, NULL, 5, 'Cash on delivery', 822953, 'Sahibzada', 'shamzasardar36@gmail.com', 1234567890, 25000, '', 'Peshawar', '', '2024-04-15 09:32:17', '2024-04-17 07:15:30'),
(111, 8, '123 Main Street', NULL, 9.99, NULL, 5, 'Cash on delivery', 507453, 'Sahibzada', 'shamzasardar36@gmail.com', 123456789, 25000, '', 'Peshawar', '', '2024-04-15 09:35:26', '2024-04-15 09:35:26'),
(112, 8, '123 Main Street', NULL, 27.99, NULL, 5, 'Cash on delivery', 29382, 'Sahibzada', 'shamzasardar36@gmail.com', 123456789, 25000, '', 'Peshawar', '', '2024-04-15 09:39:32', '2024-04-15 09:39:32'),
(113, 1, '234 peshawar', NULL, 10.00, NULL, 5, 'Cash on delivery', 245162, 'johnWICK', 'johndoe@gmail.com', 1234567890, 20, '', 'peshawar', '', '2024-04-15 09:42:29', '2024-04-17 07:15:30'),
(114, 1, '234 peshawar', NULL, 27.99, NULL, 5, 'Cash on delivery', 781158, 'Sahibzada', 'shamzasardar36@gmail.com', 1234567890, 25000, '', 'Peshawar', '', '2024-04-15 09:47:03', '2024-04-17 07:15:30'),
(115, 8, '123 Main Street', NULL, 1119.60, NULL, 5, 'Cash on delivery', 171868, 'luthfi', 'luthfi@gmail.com', 123456789, 800, 'khaa', 'kara', '', '2024-04-15 11:52:58', '2024-04-15 11:52:58'),
(116, 8, '123 Main Street', NULL, 27.99, NULL, 5, 'Cash on delivery', 519979, 'luthfi', 'luthfi@gmail.com', 123456789, 7484, 'khss', 'haja', '', '2024-04-15 12:03:26', '2024-04-15 12:03:26'),
(117, 8, '123 Main Street', NULL, 55.98, NULL, 5, 'Cash on delivery', 575505, 'luthfi', 'luthfi@gmail.com', 123456789, 100, '', 'wah', '', '2024-04-16 08:24:19', '2024-04-16 08:24:19'),
(118, 8, '123 Main Street', NULL, 9.99, NULL, 5, 'Cash on delivery', 839385, 'Sahibzada', 'shamzasardar36@gmail.com', 123456789, 25000, '', 'Peshawar', '', '2024-04-16 08:27:04', '2024-04-16 08:27:04'),
(119, 8, '123 Main Street', NULL, 27.99, NULL, 5, 'Cash on delivery', 333254, 'Sahibzada', 'shamzasardar36@gmail.com', 123456789, 25000, '', 'Peshawar', '', '2024-04-16 09:31:54', '2024-04-16 09:31:54'),
(120, 1, '234 peshawar', NULL, 27.99, NULL, 5, 'Cash on delivery', 945086, 'Sahibzada', 'shamzasardar36@gmail.com', 1234567890, 25000, '', 'Peshawar', '', '2024-04-16 09:35:23', '2024-04-17 07:15:30'),
(121, 1, '234 peshawar', NULL, 1119.60, NULL, 5, 'Cash on delivery', 843386, 'Sahibzada', 'shamzasardar36@gmail.com', 1234567890, 25000, '', 'Peshawar', '', '2024-04-16 09:49:56', '2024-04-17 07:15:30'),
(122, 8, '123 Main Street', NULL, 1119.60, NULL, 5, 'Cash on delivery', 37006, 'Sahibzada', 'shamzasardar36@gmail.com', 123456789, 25000, '', 'Peshawar', '', '2024-04-16 10:53:19', '2024-04-16 10:53:19'),
(123, 8, '123 Main Street', NULL, 1119.60, NULL, 5, 'Cash on delivery', 391118, 'Sahibzada', 'shamzasardar36@gmail.com', 123456789, 25000, '', 'Peshawar', '', '2024-04-18 12:06:22', '2024-04-18 12:06:22'),
(124, 8, '123 Main Street', NULL, 27.99, NULL, 5, 'Cash on delivery', 284762, 'Sahibzada', 'shamzasardar36@gmail.com', 123456789, 25000, '', 'Peshawar', '', '2024-04-18 12:08:47', '2024-04-18 12:08:47'),
(125, 8, '123 Main Street', NULL, 1119.60, NULL, 5, 'Cash on delivery', 912129, 'Sahibzada', 'shamzasardar36@gmail.com', 123456789, 25000, '', 'Peshawar', '', '2024-04-19 06:17:34', '2024-04-19 06:17:34'),
(126, 8, '123 Main Street', NULL, 1119.60, NULL, 5, 'Cash on delivery', 494566, 'Sahibzada', 'shamzasardar36@gmail.com', 123456789, 25000, '', 'Peshawar', '', '2024-04-19 06:19:12', '2024-04-19 06:19:12'),
(127, 8, '123 Main Street', NULL, 1119.60, NULL, 5, 'Cash on delivery', 579572, 'Sahibzada', 'shamzasardar36@gmail.com', 123456789, 25000, '', 'Peshawar', '', '2024-04-19 06:21:23', '2024-04-19 06:21:23'),
(128, 8, '123 Main Street', NULL, 1119.60, NULL, 5, 'Cash on delivery', 102283, 'Sahibzada', 'shamzasardar36@gmail.com', 123456789, 25000, '', 'Peshawar', '', '2024-04-19 06:24:36', '2024-04-19 06:24:36'),
(129, 8, '123 Main Street', NULL, 27.99, NULL, 5, 'Cash on delivery', 510491, 'Sahibzada', 'shamzasardar36@gmail.com', 123456789, 25000, '', 'Peshawar', '', '2024-04-19 06:45:38', '2024-04-19 06:45:38'),
(130, 8, '123 Main Street', NULL, 27.99, NULL, 5, 'Cash on delivery', 109890, 'Sahibzada', 'shamzasardar36@gmail.com', 123456789, 25000, '', 'Peshawar', '', '2024-04-19 06:46:53', '2024-04-19 06:46:53'),
(131, 8, '123 Main Street', NULL, 27.99, NULL, 5, 'Cash on delivery', 706357, 'Sahibzada', 'shamzasardar36@gmail.com', 123456789, 25000, '', 'Peshawar', '', '2024-04-19 06:47:34', '2024-04-19 06:47:34'),
(132, 8, '123 Main Street', NULL, 1119.60, NULL, 5, 'Cash on delivery', 463217, 'Sahibzada', 'shamzasardar36@gmail.com', 123456789, 25000, '', 'Peshawar', '', '2024-04-19 06:50:42', '2024-04-19 06:50:42'),
(133, 8, '123 Main Street', NULL, 1119.60, NULL, 5, 'Cash on delivery', 589260, 'Sahibzada', 'shamzasardar36@gmail.com', 123456789, 25000, '', 'Peshawar', '', '2024-04-19 06:53:39', '2024-04-19 06:53:39'),
(134, 8, '123 Main Street', NULL, 1119.60, NULL, 5, 'Cash on delivery', 544840, 'Sahibzada', 'shamzasardar36@gmail.com', 123456789, 25000, '', 'Peshawar', '', '2024-04-19 07:05:55', '2024-04-19 07:05:55'),
(135, 8, '123 Main Street', NULL, 1119.60, NULL, 5, 'Cash on delivery', 268941, 'Sahibzada', 'shamzasardar36@gmail.com', 123456789, 25000, '', 'Peshawar', '', '2024-04-19 07:23:45', '2024-04-19 07:23:45'),
(136, 8, '123 Main Street', NULL, 1119.60, NULL, 5, 'Cash on delivery', 832298, 'Sahibzada', 'shamzasardar36@gmail.com', 123456789, 25000, '', 'Peshawar', '', '2024-04-19 07:29:01', '2024-04-19 07:29:01'),
(137, 8, '123 Main Street', NULL, 1119.60, NULL, 5, 'Cash on delivery', 171471, 'Sahibzada', 'shamzasardar36@gmail.com', 123456789, 25000, '', 'Peshawar', '', '2024-04-19 07:31:51', '2024-04-19 07:31:51'),
(138, 8, '123 Main Street', NULL, 27.99, NULL, 5, 'Cash on delivery', 830397, 'Sahibzada', 'shamzasardar36@gmail.com', 123456789, 804, '', 'Peshawar', '', '2024-04-22 06:19:37', '2024-04-22 06:19:37'),
(139, 8, '123 Main Street', NULL, 1119.60, NULL, 5, 'Cash on delivery', 125829, 'Sahibzada', 'shamzasardar36@gmail.com', 123456789, 19, '', 'Peshawar', '', '2024-04-22 06:56:35', '2024-04-22 06:56:35'),
(140, 8, '123 Main Street', NULL, 1119.60, NULL, 5, 'Cash on delivery', 255821, 'Sahibzada', 'shamzasardar36@gmail.com', 123456789, 25000, '', 'Peshawar', '', '2024-04-22 07:19:32', '2024-04-22 07:19:32'),
(141, 8, '123 Main Street', NULL, 27.99, NULL, 5, 'Cash on delivery', 649058, 'Sahibzada', 'shamzasardar36@gmail.com', 123456789, 25000, '', 'Peshawar', '', '2024-04-22 09:38:06', '2024-04-22 09:38:06'),
(142, 8, '123 Main Street', NULL, 22.00, NULL, 5, 'Cash on delivery', 82326, 'Sahibzada', 'shamzasardar36@gmail.com', 123456789, 25000, '', 'Peshawar', '', '2024-04-22 10:08:37', '2024-04-22 10:08:37'),
(143, 8, '123 Main Street', NULL, 1489.00, NULL, 5, 'Cash on delivery', 741940, 'Sahibzada', 'shamzasardar36@gmail.com', 123456789, 25000, '', 'Peshawar', '', '2024-04-22 10:20:41', '2024-04-22 10:20:41'),
(144, 8, '123 Main Street', NULL, 130.00, NULL, 5, 'Cash on delivery', 694150, 'Sahibzada', 'shamzasardar36@gmail.com', 123456789, 25000, '', 'Peshawar', '', '2024-04-22 10:21:39', '2024-04-22 10:21:39'),
(145, 8, '123 Main Street', NULL, 15.00, NULL, 5, 'Cash on delivery', 869459, 'Sahibzada', 'shamzasardar36@gmail.com', 123456789, 25000, '', 'Peshawar', '', '2024-04-22 10:27:05', '2024-04-22 10:27:05'),
(146, 8, '123 Main Street', NULL, 27.99, NULL, 5, 'Cash on delivery', 584004, 'Sahibzada', 'shamzasardar36@gmail.com', 123456789, 25000, '', 'Peshawar', '', '2024-04-22 10:32:20', '2024-04-22 10:32:20'),
(147, 8, '123 Main Street', NULL, 1119.60, NULL, 5, 'Cash on delivery', 667973, 'Sahibzada', 'shamzasardar36@gmail.com', 123456789, 25000, '', 'Peshawar', '', '2024-04-22 10:35:33', '2024-04-22 10:35:33'),
(148, 8, '123 Main Street', NULL, 27.99, NULL, 5, 'Cash on delivery', 335058, 'Sahibzada', 'shamzasardar36@gmail.com', 123456789, 25000, '', 'Peshawar', '', '2024-04-22 10:44:01', '2024-04-22 10:44:01'),
(149, 8, '123 Main Street', NULL, 27.99, NULL, 5, 'Cash on delivery', 940197, 'Sahibzada', 'shamzasardar36@gmail.com', 123456789, 25000, '', 'Peshawar', '', '2024-04-22 10:45:30', '2024-04-22 10:45:30'),
(150, 8, '123 Main Street', NULL, 9.99, NULL, 5, 'Cash on delivery', 15477, 'Sahibzada', 'shamzasardar36@gmail.com', 123456789, 25000, '', 'Peshawar', '', '2024-04-22 10:45:46', '2024-04-22 10:45:46'),
(151, 8, '123 Main Street', NULL, 74450.00, NULL, 5, 'Cash on delivery', 223175, 'Sahibzada', 'shamzasardar36@gmail.com', 123456789, 25000, '', 'Peshawar', '', '2024-04-22 10:46:18', '2024-04-22 10:46:18'),
(152, 8, '123 Main Street', NULL, 27.99, NULL, 5, 'Cash on delivery', 396237, 'Sahibzada', 'shamzasardar36@gmail.com', 123456789, 25000, '', 'Peshawar', '', '2024-04-22 10:50:46', '2024-04-22 10:50:46'),
(153, 8, '123 Main Street', NULL, 27.99, NULL, 5, 'Cash on delivery', 480490, 'Sahibzada', 'shamzasardar36@gmail.com', 123456789, 25000, '', 'Peshawar', '', '2024-04-22 10:51:02', '2024-04-22 10:51:02'),
(154, 8, '123 Main Street', NULL, 27.99, NULL, 5, 'Cash on delivery', 377282, 'Sahibzada', 'shamzasardar36@gmail.com', 123456789, 25000, '', 'Peshawar', '', '2024-04-22 10:51:40', '2024-04-22 10:51:40'),
(155, 8, '123 Main Street', NULL, 1119.60, NULL, 5, 'Cash on delivery', 966886, 'Sahibzada', 'shamzasardar36@gmail.com', 123456789, 25000, '', 'Peshawar', '', '2024-04-22 11:37:52', '2024-04-22 11:37:52'),
(156, 8, '123 Main Street', NULL, 1119.60, NULL, 5, 'Cash on delivery', 252166, 'Sahibzada', 'shamzasardar36@gmail.com', 123456789, 25000, '', 'Peshawar', '', '2024-04-23 05:34:09', '2024-04-23 05:34:09'),
(157, 8, '123 Main Street', NULL, 1119.60, NULL, 5, 'Cash on delivery', 978931, 'Sahibzada', 'shamzasardar36@gmail.com', 123456789, 25000, '', 'Peshawar', '', '2024-04-23 18:19:10', '2024-04-23 18:19:10'),
(158, 8, '123 Main Street', NULL, 1119.60, NULL, 5, 'Cash on delivery', 535127, 'Sahibzada', 'shamzasardar36@gmail.com', 123456789, 25000, '', 'Peshawar', '', '2024-04-29 06:06:28', '2024-04-29 06:06:28'),
(159, 8, '123 Main Street', NULL, 999.00, NULL, 5, 'Cash on delivery', 202691, 'Sahibzada', 'shamzasardar36@gmail.com', 123456789, 25000, '', 'Peshawar', '', '2024-04-29 06:11:41', '2024-04-29 06:11:41'),
(160, 8, '123 Main Street', NULL, 1119.60, NULL, 5, 'Cash on delivery', 903897, 'Sahibzada', 'shamzasardar36@gmail.com', 123456789, 25000, '', 'Peshawar', '', '2024-04-29 06:20:10', '2024-04-29 06:20:10'),
(161, 8, '123 Main Street', NULL, 1119.60, NULL, 5, 'Cash on delivery', 647699, 'Sahibzada', 'shamzasardar36@gmail.com', 123456789, 25000, '', 'Peshawar', '', '2024-04-29 06:25:22', '2024-04-29 06:25:22'),
(162, 8, '123 Main Street', NULL, 1119.60, NULL, 5, 'Cash on delivery', 78290, 'Sahibzada', 'shamzasardar36@gmail.com', 123456789, 25000, '', 'Peshawar', '', '2024-04-29 06:46:11', '2024-04-29 06:46:11');

-- --------------------------------------------------------

--
-- Table structure for table `productCategories`
--

CREATE TABLE `productCategories` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `productId` int NOT NULL,
  `categoryId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `productCategories`
--

INSERT INTO `productCategories` (`createdAt`, `updatedAt`, `productId`, `categoryId`) VALUES
('2023-11-21 12:30:08', '2023-11-21 12:30:08', 3, 3),
('2023-11-30 12:20:15', '2023-11-30 12:20:15', 6, 1),
('2023-11-30 12:21:55', '2023-11-30 12:21:55', 7, 1),
('2023-11-30 12:23:19', '2023-11-30 12:23:19', 8, 1),
('2023-11-30 12:25:13', '2023-11-30 12:25:13', 9, 3);

-- --------------------------------------------------------

--
-- Table structure for table `productImages`
--

CREATE TABLE `productImages` (
  `id` int NOT NULL,
  `date` datetime DEFAULT NULL,
  `images` text NOT NULL,
  `productId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `productImages`
--

INSERT INTO `productImages` (`id`, `date`, `images`, `productId`, `createdAt`, `updatedAt`) VALUES
(2, '2023-11-21 16:37:06', '[\"/assets/products/sku_2/2.jpg\"]', 8, '2023-11-21 16:37:06', '2023-11-21 16:37:06'),
(3, '2023-11-21 16:37:55', '[\"/assets/products/sku_3/1.png\"]', 41, '2023-11-21 16:37:55', '2023-11-21 16:37:55'),
(5, '2023-11-21 15:20:04', '[\"/assets/products/sku_13/Nike Air Zoom Pegasus - Copy.jpg\"]', 5, '2023-11-21 15:20:04', '2023-11-21 15:20:04'),
(7, '2023-11-21 15:20:04', '[\"/assets/products/sku_7/1.jpg\"]', 7, '2023-11-21 15:20:04', '2023-11-21 15:20:04'),
(8, '2023-11-21 15:20:04', '[\"/assets/products/sku_2/AC adapter 100W - Copy.jpg\"]', 8, '2023-11-21 15:20:04', '2023-11-21 15:20:04'),
(16, '2023-11-21 15:20:04', '[\"/assets/products/sku_13/5.jpg\"]', 5, '2023-11-21 15:20:04', '2023-11-21 15:20:04'),
(17, '2023-11-21 15:20:04', '[\"/assets/products/sku_26/condom.jpg\"]', 39, '2023-11-21 15:20:04', '2023-11-21 15:20:04'),
(23, '2023-11-21 15:20:04', '[\"/assets/products/sku_16/DellLatitude9000.jpg\"]', 3, '2023-11-21 15:20:04', '2023-11-21 15:20:04'),
(24, '2023-11-21 15:20:04', '[\"/assets/products/sku_16/2.jpg\"]', 3, '2023-11-21 15:20:04', '2023-11-21 15:20:04'),
(25, '2023-11-21 15:20:04', '[\"/assets/products/sku_16/3.jpg\"]', 3, '2023-11-21 15:20:04', '2023-11-21 15:20:04'),
(26, '2023-11-21 15:20:04', '[\"/assets/products/sku_16/4.jpg\"]', 3, '2023-11-21 15:20:04', '2023-11-21 15:20:04'),
(29, '2023-11-21 15:20:04', '[\"/assets/products/sku_24/magneticcharger.jpg\"]', 6, '2023-11-21 15:20:04', '2023-11-21 15:20:04'),
(30, '2023-11-21 15:20:04', '[\"/assets/products/sku_24/2.jpg\"]', 6, '2023-11-21 15:20:04', '2023-11-21 15:20:04'),
(31, '2023-11-21 15:20:04', '[\"/assets/products/sku_24/3.jpg\"]', 6, '2023-11-21 15:20:04', '2023-11-21 15:20:04'),
(32, '2023-11-21 15:20:04', '[\"/assets/products/sku_24/4.jpg\"]', 6, '2023-11-21 15:20:04', '2023-11-21 15:20:04'),
(39, '2023-11-21 15:20:04', '[\"/assets/products/sku_13/4 .jpg\"]', 5, '2023-11-21 15:20:04', '2023-11-21 15:20:04'),
(40, '2023-11-21 15:20:04', '[\"/assets/products/sku_13/6.jpg\"]', 5, '2023-11-21 15:20:04', '2023-11-21 15:20:04'),
(41, '2023-11-21 15:20:04', '[\"/assets/products/sku_24/3.jpg\"]', 38, '2023-11-21 15:20:04', '2023-11-21 15:20:04'),
(42, '2023-11-21 15:20:04', '[\"/assets/products/sku_25/2.jpg\"]', 32, '2023-11-21 15:20:04', '2023-11-21 15:20:04'),
(43, '2023-11-21 15:20:04', '[\"/assets/products/sku_25/3.jpg\"]', 32, '2023-11-21 15:20:04', '2023-11-21 15:20:04'),
(44, '2023-11-21 15:20:04', '[\"/assets/products/sku_20/3.jpg\"]', 27, '2023-11-21 15:20:04', '2023-11-21 15:20:04'),
(45, '2023-11-21 15:20:04', '[\"/assets/products/sku_2/3.jpg\"]', 8, '2023-11-21 15:20:04', '2023-11-21 15:20:04'),
(49, '2023-11-21 15:20:04', '[\"/assets/products/sku_2/1.jpg\"]', 8, '2023-11-21 15:20:04', '2023-11-21 15:20:04'),
(50, '2023-11-21 15:20:04', '[\"/assets/products/sku_7/1.jpg\"]', 7, '2023-11-21 15:20:04', '2023-11-21 15:20:04'),
(52, '2023-11-21 15:20:04', '[\"/assets/products/sku_21/2.jpg\"]', 29, '2023-11-21 15:20:04', '2023-11-21 15:20:04'),
(53, '2023-11-21 15:20:04', '[\"/assets/products/sku_21/3.jpg\"]', 29, '2023-11-21 15:20:04', '2023-11-21 15:20:04'),
(54, '2023-11-21 15:20:04', '[\"/assets/products/sku_21/4.jpg\"]', 29, '2023-11-21 15:20:04', '2023-11-21 15:20:04'),
(55, '2023-11-21 15:20:04', '[\"/assets/products/sku_19/2.jpg\"]', 37, '2023-11-21 15:20:04', '2023-11-21 15:20:04'),
(56, '2023-11-21 15:20:04', '[\"/assets/products/sku_19/3.jpg\"]', 33, '2023-11-21 15:20:04', '2023-11-21 15:20:04'),
(57, '2023-11-21 15:20:04', '[\"/assets/products/sku_19/4.jpg\"]', 37, '2023-11-21 15:20:04', '2023-11-21 15:20:04'),
(58, '2023-11-21 15:20:04', '[\"/assets/products/sku_3/2.png\"]', 41, '2023-11-21 16:37:55', '2023-11-21 16:37:55'),
(62, '2023-11-21 15:20:04', '[\"/assets/products/sku_16/2.jpg\"]', 7, '2023-11-21 15:20:04', '2023-11-21 15:20:04'),
(64, '2023-11-21 15:20:04', '[\"/assets/products/sku_17/4.jpg\"]', 10, '2023-11-21 15:20:04', '2023-11-21 15:20:04'),
(65, '2023-11-21 15:20:04', '[\"/assets/products/sku_17/3.jpg\"]', 10, '2023-11-21 15:20:04', '2023-11-21 15:20:04'),
(66, '2023-11-21 15:20:04', '[\"/assets/products/sku_17/2.jpg\"]', 10, '2023-11-21 15:20:04', '2023-11-21 15:20:04'),
(70, '2023-11-21 15:20:04', '[\"/assets/products/sku_9/Apple pen - Copy.jpg\"]', 4, '2023-11-21 15:20:04', '2023-11-21 15:20:04'),
(71, '2023-11-21 15:20:04', '[\"/assets/products/sku_9/2.jpg\"]', 4, '2023-11-21 15:20:04', '2023-11-21 15:20:04'),
(72, '2023-11-21 15:20:04', '[\"/assets/products/sku_9/3.jpg\"]', 4, '2023-11-21 15:20:04', '2023-11-21 15:20:04'),
(75, '2023-11-21 15:20:04', '[\"/assets/products/sku_22/2.jpg\"]', 36, '2023-11-21 15:20:04', '2023-11-21 15:20:04'),
(76, '2023-11-21 15:20:04', '[\"/assets/products/sku_22/1.jpg\"]', 36, '2023-11-21 15:20:04', '2023-11-21 15:20:04'),
(102, '2024-03-07 06:42:22', '[\"/assets/products/image-1709793742457-111249883-1.jpg\"]', 1, '2024-03-07 06:42:22', '2024-03-07 06:42:22'),
(103, '2024-03-07 06:44:45', '[\"/assets/products/image-1709793885546-995029024-AC adapter 100W - Copy.jpg\"]', 2, '2024-03-07 06:44:45', '2024-03-07 06:44:45'),
(104, '2024-03-07 06:46:19', '[\"/assets/products/image-1709793979389-140586466-2.jpg\"]', 9, '2024-03-07 06:46:19', '2024-03-07 06:46:19'),
(105, '2024-03-07 06:47:48', '[\"/assets/products/image-1709794068762-786919603-HPEliteBook1000.jpg\"]', 10, '2024-03-07 06:47:48', '2024-03-07 06:47:48'),
(108, '2024-03-07 06:49:30', '[\"/assets/products/image-1709794170415-555602131-PD cables Iphone - Copy.jpg\"]', 16, '2024-03-07 06:49:30', '2024-03-07 06:49:30'),
(109, '2024-03-07 06:49:59', '[\"/assets/products/image-1709794199995-216405084-iphon headphones - Copy.jpg\"]', 17, '2024-03-07 06:49:59', '2024-03-07 06:49:59'),
(110, '2024-03-07 06:50:37', '[\"/assets/products/image-1709794237963-298539872-1.png\"]', 18, '2024-03-07 06:50:37', '2024-03-07 06:50:37'),
(111, '2024-03-07 06:51:02', '[\"/assets/products/image-1709794262222-369988340-Registor roles mini.jpg\"]', 19, '2024-03-07 06:51:02', '2024-03-07 06:51:02'),
(112, '2024-03-07 07:01:38', '[\"/assets/products/image-1709794898792-130211139-registerthermal.png\"]', 20, '2024-03-07 07:01:38', '2024-03-07 07:01:38'),
(113, '2024-03-07 07:01:59', '[\"/assets/products/image-1709794919719-373860493-royal honey - Copy.jpg\"]', 21, '2024-03-07 07:01:59', '2024-03-07 07:01:59'),
(114, '2024-03-07 07:02:25', '[\"/assets/products/image-1709794945517-419653664-screen protector - Copy.jpg\"]', 22, '2024-03-07 07:02:25', '2024-03-07 07:02:25'),
(115, '2024-03-07 07:02:48', '[\"/assets/products/image-1709794968352-93819401-smart watch - Copy (2).jpg\"]', 23, '2024-03-07 07:02:48', '2024-03-07 07:02:48'),
(116, '2024-03-07 07:05:51', '[\"/assets/products/image-1709795151134-972127264-ihone-casing.png\"]', 24, '2024-03-07 07:05:51', '2024-03-07 07:05:51'),
(117, '2024-03-07 07:08:24', '[\"/assets/products/image-1709795304953-938325890-blunt-powder.png\"]', 25, '2024-03-07 07:08:24', '2024-03-07 07:08:24'),
(118, '2024-03-07 07:10:15', '[\"/assets/products/image-1709795415838-626795728-3.jpg\"]', 26, '2024-03-07 07:10:15', '2024-03-07 07:10:15'),
(119, '2024-03-07 07:10:44', '[\"/assets/products/image-1709795444629-709523904-type c cable.jpg\"]', 27, '2024-03-07 07:10:44', '2024-03-07 07:10:44'),
(120, '2024-03-07 07:12:14', '[\"/assets/products/image-1709795529372-328157456-image-1706004860531-663816964-1.jpg\"]', 28, '2024-03-07 07:12:14', '2024-03-07 07:12:14'),
(121, '2024-03-07 07:12:25', '[\"/assets/products/image-1709795540318-641045484-image-1706006698413-723164395-1.jpg\"]', 28, '2024-03-07 07:12:25', '2024-03-07 07:12:25'),
(122, '2024-03-07 07:13:22', '[\"/assets/products/image-1709795602966-269340003-dv2t.png\"]', 29, '2024-03-07 07:13:22', '2024-03-07 07:13:22'),
(123, '2024-03-07 07:14:06', '[\"/assets/products/image-1709795646222-561235599-image-1704958027876-20370397-homeaccessories.png\"]', 30, '2024-03-07 07:14:06', '2024-03-07 07:14:06'),
(124, '2024-03-07 07:27:41', '[\"/assets/products/image-1709796461458-500298535-gen2.jpg\"]', 31, '2024-03-07 07:27:41', '2024-03-07 07:27:41'),
(125, '2024-03-07 07:28:17', '[\"/assets/products/image-1709796497286-806757063-3.png\"]', 32, '2024-03-07 07:28:17', '2024-03-07 07:28:17'),
(126, '2024-03-07 07:30:45', '[\"/assets/products/image-1709796645466-517105912-face-mask.png\"]', 33, '2024-03-07 07:30:45', '2024-03-07 07:30:45'),
(127, '2024-03-07 07:32:22', '[\"/assets/products/image-1709796742946-433829683-Iphone standard cable - Copy.jpg\"]', 34, '2024-03-07 07:32:22', '2024-03-07 07:32:22'),
(128, '2024-03-07 07:35:10', '[\"/assets/products/image-1709796910069-571645316-speaker.png\"]', 35, '2024-03-07 07:35:10', '2024-03-07 07:35:10'),
(129, '2024-03-07 07:35:35', '[\"/assets/products/image-1709796935615-555402690-PD cables Iphone - Copy.jpg\"]', 36, '2024-03-07 07:35:35', '2024-03-07 07:35:35'),
(130, '2024-03-07 07:36:08', '[\"/assets/products/image-1709796968854-649414626-magsafecharger.jpg\"]', 37, '2024-03-07 07:36:08', '2024-03-07 07:36:08'),
(131, '2024-03-07 07:36:34', '[\"/assets/products/image-1709796994751-128115539-magneticcharger.jpg\"]', 38, '2024-03-07 07:36:34', '2024-03-07 07:36:34'),
(132, '2024-03-07 07:37:12', '[\"/assets/products/image-1709797032190-397453772-condom.jpg\"]', 39, '2024-03-07 07:37:12', '2024-03-07 07:37:12'),
(134, '2024-03-11 10:13:48', '[]', 4, '2024-03-11 10:13:48', '2024-03-11 10:13:48'),
(139, '2024-03-11 10:25:30', '[\"/assets/products/image-1710152730308-149947724-Screenshot (58).png\"]', 23, '2024-03-11 10:25:30', '2024-03-11 10:25:30'),
(140, '2024-03-11 10:27:21', '[\"/assets/products/image-1710152841511-58199595-Screenshot (58).png\"]', 23, '2024-03-11 10:27:21', '2024-03-11 10:27:21');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `price` float NOT NULL,
  `quantity` int DEFAULT NULL,
  `manufacturer` varchar(255) NOT NULL,
  `dateAdded` datetime NOT NULL,
  `discount` int NOT NULL DEFAULT '0',
  `isNew` tinyint(1) NOT NULL DEFAULT '1',
  `rating` int DEFAULT NULL,
  `saleCount` int DEFAULT NULL,
  `tag` varchar(255) DEFAULT NULL,
  `stock` int NOT NULL DEFAULT '0',
  `quantityInStock` int NOT NULL DEFAULT '0',
  `sku` varchar(255) NOT NULL,
  `categoryName` varchar(255) NOT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `category_id` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `supplier_id` int DEFAULT NULL,
  `subCategoryId` int NOT NULL,
  `DealId` varchar(50) DEFAULT NULL,
  `SaleStatus` tinyint(1) DEFAULT NULL,
  `DealStatus` tinyint(1) DEFAULT NULL,
  `SalePrice` int DEFAULT NULL,
  `Approved` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `price`, `quantity`, `manufacturer`, `dateAdded`, `discount`, `isNew`, `rating`, `saleCount`, `tag`, `stock`, `quantityInStock`, `sku`, `categoryName`, `status`, `category_id`, `createdAt`, `updatedAt`, `supplier_id`, `subCategoryId`, `DealId`, `SaleStatus`, `DealStatus`, `SalePrice`, `Approved`) VALUES
(1, 'lighter2', 'Portable and reliable lighter for everyday use.', 39.99, 40, 'luthfi', '2023-11-10 00:00:00', 10, 1, 4, 20, '{electronics}', 50, 50, 'SM-SMALL-LIGHTER-50\n  ', '2023-11-20 12:57:24.662', 'inactive', 1, '2024-03-07 07:49:00', '2024-05-13 12:54:46', 1, 13, NULL, NULL, NULL, NULL, NULL),
(2, 'AC Adapter', 'This is a sample product', 19.99, 100, 'Sample Manufacturer', '2023-11-13 00:00:00', 10, 1, 4, 20, 'tag1,tag2', 1000, 100, 'pkpmanga', 'Sample Category', 'active', 1, '2024-03-07 07:49:00', '2024-05-27 11:46:07', 1, 14, NULL, NULL, NULL, NULL, NULL),
(3, 'Dell Latitude 9000', 'AC Adapter 100W', 1499, 50, 'luthfi', '2023-11-17 00:00:00', 10, 1, 4, 5, '{electronics}', 50, 50, ' ADAPTER-100W-INT', '2023-11-20 12:57:24.662', 'active', 1, '2024-03-07 07:49:00', '2024-03-07 07:49:00', 1, 15, NULL, NULL, NULL, NULL, NULL),
(4, 'Apple pen', 'Portable and reliable', 50, 50, 'luthfi', '2023-11-21 00:00:00', 10, 1, 4, 20, '{electronics}', 50, 50, 'APL-PEN-wht-00l', '2023-11-20 12:57:24.662', 'active', 1, '2024-03-07 07:49:00', '2024-05-07 05:37:00', 1, 16, NULL, NULL, NULL, NULL, NULL),
(5, 'Nike Air Zoom ', 'Lightweight running shoes for optimal comfort.', 192, 50, 'luthfi', '2023-11-22 00:00:00', 10, 1, 4, 20, '{homeAccessories}', 50, 50, ' FSH-FTW-ATH-RUN-001', '2023-11-20 12:57:24.662', 'active', 2, '2024-03-07 07:49:00', '2024-03-20 06:01:41', 1, 17, NULL, NULL, NULL, NULL, NULL),
(6, 'In-1 Magnetic Folding Charger', ' Compact magnetic charger with multiple ports for versatile device charging.', 32, 100, 'USA', '2023-11-30 07:20:14', 10, 1, 4, 10, '{electronics}', 99, 99, 'PC-3IN1MAGFOLD', '2023-11-30 07:20:14.994', 'active', 1, '2024-03-07 07:49:00', '2024-03-07 07:49:00', 1, 18, NULL, NULL, NULL, NULL, NULL),
(7, '4-in-1 Charging Dock', 'Docking station with four charging ports for simultaneous device charging.', 32, 100, 'UK', '2023-11-30 07:21:55', 10, 1, 4, 10, '{electronics}', 99, 99, 'CHG-4IN1-INT', '2023-11-30 07:21:55.424', 'active', 1, '2024-03-07 07:49:00', '2024-03-07 07:49:00', 1, 19, NULL, NULL, NULL, NULL, NULL),
(8, 'AC adapter 100W', 'High-powered AC adapter with 100W output for fast charging.', 35, 100, 'UK', '2023-11-30 07:23:19', 10, 1, 4, 10, '{electronics}', 99, 99, 'ADAPT-100W-INT', '2023-11-30 07:23:19.668', 'active', 1, '2024-03-07 07:49:00', '2024-03-07 07:49:00', 1, 20, NULL, NULL, NULL, NULL, NULL),
(9, 'laptop', 'Portable and reliable', 1499, 100, 'UK', '2023-11-30 07:25:13', 10, 1, 4, 10, '{electronics}', 99, 99, 'ELE-LAP-BIZ-ULT-001', '2023-11-30 07:25:13.188', 'active', 1, '2024-03-07 07:49:00', '2024-03-07 07:49:00', 1, 21, NULL, NULL, NULL, NULL, NULL),
(10, 'HP EliteBook 1000', 'Premium business laptop with security features', 1799, 100, 'china CN', '2023-11-30 07:27:59', 10, 1, 4, 10, '{electronics}', 99, 99, 'ELE-LAP-BIZ-ELT-001', '2023-11-30 07:27:59.332', 'active', 1, '2024-03-07 07:49:00', '2024-03-07 07:49:00', 1, 22, NULL, NULL, NULL, NULL, NULL),
(16, ' PD Cables Iphone', 'Durable and stylish braided Lightning cable for fast charging and data transfer.', 4, 90, 'china', '2023-11-29 15:30:00', 10, 1, 5, 50, '{homeAccessories}', 200, 40, 'PD-LTUC-BRD-001', '2023-11-20 12:57:24.662', 'active', 2, '2024-03-07 07:49:00', '2024-03-07 07:49:00', 1, 23, NULL, NULL, NULL, NULL, NULL),
(17, 'Iphon Headphones', 'High-quality headphones designed for iPhone devices..', 4, 90, 'china', '2023-11-29 15:30:00', 10, 1, 5, 50, '{homeAccessories}', 200, 40, 'AUD-IPH-WH-001', '2023-11-20 12:57:24.662', 'active', 2, '2024-03-07 07:49:00', '2024-03-07 07:49:00', 1, 24, NULL, NULL, NULL, NULL, NULL),
(18, 'Pro Max', 'Top-tier iPhone model with advanced features and capabilities.', 140, 90, 'china', '2023-11-29 15:30:00', 10, 1, 5, 50, '{homeAccessories}', 200, 40, 'PHN-IPH-PRO-SPC-001', '2023-11-20 12:57:24.662', 'active', 2, '2024-03-07 07:49:00', '2024-03-07 07:49:00', 1, 25, NULL, NULL, NULL, NULL, NULL),
(19, 'Registor Roles Mini', ' Miniature resistor rolls for electronic circuits.', 64, 90, 'china', '2023-11-29 15:30:00', 10, 1, 5, 50, '{homeAccessories}', 200, 40, ' OFF-REG-MIN-BLU-001', '2023-11-20 12:57:24.662', 'active', 2, '2024-03-07 07:49:00', '2024-03-07 07:49:00', 1, 26, NULL, NULL, NULL, NULL, NULL),
(20, 'Registor Tharmal', ' ThRegistor tharmalermal resistor for temperature regulation in electronic devices..', 64, 90, 'china', '2023-11-29 15:30:00', 10, 1, 5, 50, '{homeAccessories}', 200, 40, ' OFF-REG-THR-WHT-004', '2023-11-20 12:57:24.662', 'active', 2, '2024-03-07 07:49:00', '2024-03-07 07:49:00', 1, 27, NULL, NULL, NULL, NULL, NULL),
(21, 'Royal Honey', '  Premium honey product with special qualities..', 25, 90, 'china', '2023-11-29 15:30:00', 10, 1, 5, 50, '{homeAccessories}', 200, 40, '  HLW-SUP-HNY-AMB-006', '2023-11-20 12:57:24.662', 'active', 2, '2024-03-07 07:49:00', '2024-03-07 07:49:00', 1, 28, NULL, NULL, NULL, NULL, NULL),
(22, 'Screen Protector', 'Protective film for safeguarding iPhone screens from scratches and damage. .', 5, 90, 'china', '2023-11-29 15:30:00', 10, 1, 5, 50, '{homeAccessories}', 200, 40, 'ACC-PRO-SCR-CLR-008', '2023-11-20 12:57:24.662', 'active', 2, '2024-03-07 07:49:00', '2024-03-07 07:49:00', 1, 13, NULL, NULL, NULL, NULL, NULL),
(23, 'Smart Watch', ' Stylish and functional smartwatch for versatile use..', 120, 90, 'china', '2023-11-29 15:30:00', 10, 1, 5, 50, '{homeAccessories}', 200, 40, 'WBL-SMT-WCH-BLK-009', '2023-11-20 12:57:24.662', 'active', 2, '2024-03-07 07:49:00', '2024-03-07 07:49:00', 1, 13, NULL, NULL, NULL, NULL, NULL),
(24, 'Transparent Iphone Casings', ' transparent..', 7, 90, 'china', '2023-11-29 15:30:00', 10, 1, 5, 50, '{homeAccessories}', 200, 40, 'ACC-CAS-CLR-012', '2023-11-20 12:57:24.662', 'active', 2, '2024-03-07 07:49:00', '2024-03-07 07:49:00', 1, 13, NULL, NULL, NULL, NULL, NULL),
(25, 'Blunt Powder', 'Specialized powder product for specific purposes.', 28, 90, 'china', '2023-11-29 15:30:00', 10, 1, 5, 50, '{homeAccessories}', 200, 40, 'HLW-SUP-PWD-BLT-013', '2023-11-20 12:57:24.662', 'active', 7, '2024-03-07 07:49:00', '2024-03-07 07:49:00', 1, 13, NULL, NULL, NULL, NULL, NULL),
(26, 'Carmax', 'Lip balm for moisturizing and protecting lips..', 29, 90, 'china', '2023-11-29 15:30:00', 10, 1, 5, 50, '{homeAccessories}', 200, 40, 'PC-LIP-BLM-ORG-015', '2023-11-20 12:57:24.662', 'active', 2, '2024-03-07 07:49:00', '2024-03-07 07:49:00', 1, 13, NULL, NULL, NULL, NULL, NULL),
(27, 'Type C Cable', 'USB Type C cable for fast and reliable data transfer and charging..', 13, 90, 'china', '2023-11-29 15:30:00', 10, 1, 5, 50, '{electronics}', 200, 40, 'ACC-CHG-CAB-BLK-016', '2023-11-20 12:57:24.662', 'active', 1, '2024-03-07 07:49:00', '2024-03-07 07:49:00', 1, 13, NULL, NULL, NULL, NULL, NULL),
(28, 'Type C HeadPhones', 'Headphones with USB Type C connection for compatible devices.', 3, 90, 'china', '2023-11-29 15:30:00', 10, 1, 5, 50, '{electronics}', 200, 40, 'AUD-TYP-CHD-SLV-018', '2023-11-20 12:57:24.662', 'active', 1, '2024-03-07 07:49:00', '2024-03-07 07:49:00', 1, 13, NULL, NULL, NULL, NULL, NULL),
(29, 'DV2T', 'Electronic device or component with DV2T specifications.', 5, 90, 'china', '2023-11-29 15:30:00', 10, 1, 5, 50, '{electronics}', 200, 40, 'ACC-DV2T-001', '2023-11-20 12:57:24.662', 'active', 1, '2024-03-07 07:49:00', '2024-03-07 07:49:00', 1, 13, NULL, NULL, NULL, NULL, NULL),
(30, 'DIsplay Box', 'Box for displaying products or items attractively.', 2.5, 90, 'china', '2023-11-29 15:30:00', 10, 1, 5, 50, '{electronics}', 200, 40, 'ACC-DB-002', '2023-11-20 12:57:24.662', 'active', 1, '2024-03-07 07:49:00', '2024-03-07 07:49:00', 1, 13, NULL, NULL, NULL, NULL, NULL),
(31, 'Gen 3', 'Third-generation product or device with improved features.', 25, 90, 'china', '2023-11-29 15:30:00', 10, 1, 5, 50, '{electronics}', 200, 40, 'ELE-GEN-0022', '2023-11-20 12:57:24.662', 'active', 1, '2024-03-07 07:49:00', '2024-03-07 07:49:00', 1, 13, NULL, NULL, NULL, NULL, NULL),
(32, 'Generation 2', 'Third-generation product or device with improved features.', 22, 90, 'china', '2023-11-29 15:30:00', 10, 1, 5, 50, '{electronics}', 200, 40, 'ELE-GEN-002', '2023-11-20 12:57:24.662', 'active', 1, '2024-03-07 07:49:00', '2024-03-07 07:49:00', 1, 13, NULL, NULL, NULL, NULL, NULL),
(33, 'Face Mask', 'Protective mask for personal safety..', 5, 90, 'china', '2023-11-29 15:30:00', 10, 1, 5, 50, '{electronics}', 200, 40, 'PC-FM-003', '2023-11-20 12:57:24.662', 'active', 1, '2024-03-07 07:49:00', '2024-03-07 07:49:00', 1, 13, NULL, NULL, NULL, NULL, NULL),
(34, 'Headphone Type C wired', 'Standard charging cable for iPhones in classic white color..', 5, 90, 'china', '2023-11-29 15:30:00', 10, 1, 5, 50, '{electronics}', 200, 40, ' ELE-HP-TCW-004', '2023-11-20 12:57:24.662', 'active', 1, '2024-03-07 07:49:00', '2024-03-07 07:49:00', 1, 13, NULL, NULL, NULL, NULL, NULL),
(35, 'Iphone Speaker ', 'Extended length USB cable for charging and syncing iPhones..', 15, 90, 'china', '2023-11-29 15:30:00', 10, 1, 5, 50, '{electronics}', 200, 40, 'ELE-SP-IP-005', '2023-11-20 12:57:24.662', 'active', 1, '2024-03-07 07:49:00', '2024-03-07 07:49:00', 1, 13, NULL, NULL, NULL, NULL, NULL),
(36, 'Iphone Cables', ' MagSafe charger for quick and secure wireless charging.', 2.35, 90, 'china', '2023-11-29 15:30:00', 10, 1, 5, 50, '{kitchen}', 200, 40, 'ELE-CAB-IP-ST-USB-007', '2023-11-20 12:57:24.662', 'active', 3, '2024-03-07 07:49:00', '2024-03-07 07:49:00', 1, 13, NULL, NULL, NULL, NULL, NULL),
(37, 'Magesafe', 'MagSafe charger for quick and secure wireless chargin.', 10, 90, 'china', '2023-11-29 15:30:00', 10, 1, 5, 50, '{kitchen}', 200, 40, 'ELE-CHG-MS-008', '2023-11-20 12:57:24.662', 'active', 3, '2024-03-07 07:49:00', '2024-03-07 07:49:00', 1, 13, NULL, NULL, NULL, NULL, NULL),
(38, 'Magnatic Charging  Banks', 'Portable power bank with magnetic charging capability..', 45, 90, 'china', '2023-11-29 15:30:00', 10, 1, 5, 50, '{kitchen}', 200, 40, 'ELE-CHG-MAG-009', '2023-11-20 12:57:24.662', 'active', 3, '2024-03-07 07:49:00', '2024-03-07 07:49:00', 1, 13, NULL, NULL, NULL, NULL, NULL),
(39, 'Magnum Condem', 'Premium quality Magnum-sized condoms for safe and comfortable intimacy..', 12.99, 90, 'china', '2023-11-29 15:30:00', 10, 1, 5, 50, '{kitchen}', 200, 40, 'HW-CND-MAG-010', '2023-11-20 12:57:24.662', 'active', 3, '2024-03-07 07:49:00', '2024-03-07 07:49:00', 1, 13, NULL, NULL, NULL, NULL, NULL),
(41, 'Max', 'Extra Large Maximum Absorbency Personal Care Products in Assorted.', 130, 90, 'china', '2023-11-29 15:30:00', 10, 1, 5, 50, '{kitchen}', 200, 40, 'PC-PRODUCT-019', '2023-11-20 12:57:24.662', 'active', 3, '2024-03-07 07:49:00', '2024-03-07 07:49:00', 1, 13, NULL, NULL, NULL, NULL, NULL),
(181, 'mango', 'description for mango', 100, 100, 'Sample Manufacturer', '2024-03-07 07:53:08', 10, 1, 4, 0, '{electronics}', 1000, 100, 'p172-1269pjo', 'Sample Category', 'active', 1, '2024-03-07 07:53:08', '2024-03-07 07:53:08', 1, 13, NULL, NULL, NULL, NULL, NULL),
(182, 'mango', 'description for mango', 100, 100, 'Sample Manufacturer', '2024-03-11 10:14:45', 10, 1, 4, 0, 'tag1,tag2', 1000, 100, 'p172-123pl0', 'Sample Category', 'active', 1, '2024-03-11 10:14:45', '2024-03-11 10:14:45', 3, 13, NULL, NULL, NULL, NULL, NULL),
(183, 'mango', 'description for mango', 100, 100, 'Sample Manufacturer', '2024-03-14 06:46:03', 10, 1, 4, 0, 'tag1,tag2', 1000, 100, 'p172-124q', 'Sample Category', 'active', 1, '2024-03-14 06:46:03', '2024-03-14 06:46:03', 3, 13, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `productVariants`
--

CREATE TABLE `productVariants` (
  `id` int NOT NULL,
  `type` varchar(255) DEFAULT NULL,
  `weight` float DEFAULT NULL,
  `unit` varchar(255) DEFAULT NULL,
  `key` varchar(255) DEFAULT NULL,
  `value` text,
  `availableQuantity` int DEFAULT NULL,
  `variantPrice` decimal(10,2) DEFAULT NULL,
  `productId` int DEFAULT NULL,
  `optionValues` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `productVariants`
--

INSERT INTO `productVariants` (`id`, `type`, `weight`, `unit`, `key`, `value`, `availableQuantity`, `variantPrice`, `productId`, `optionValues`) VALUES
(136, 'individual', 1.5, 'kg', 'size', '[\"small\",\"medium\",\"E-large\"]', 100, 24.99, 181, '[{\"id\":\"1\",\"name\":\"small\",\"variantSku\":[\"ABC1239-small\"]},{\"id\":\"2\",\"name\":\"medium\",\"variantSku\":[\"ABC1239-medium\"]},{\"id\":\"3\",\"name\":\"E-large\",\"variantSku\":[\"ABC1239-large\"]}]'),
(137, 'individual', 1.5, 'kg', 'color', '[\"red\",\"black\"]', 100, 24.99, 181, '12'),
(138, 'individual', 1.5, 'kg', 'size', '[\"small\",\"medium\",\"E-large\"]', 100, 24.99, 182, '[{\"id\":\"1\",\"name\":\"small\",\"variantSku\":[\"ABC1239-small\"]},{\"id\":\"2\",\"name\":\"medium\",\"variantSku\":[\"ABC1239-medium\"]},{\"id\":\"3\",\"name\":\"E-large\",\"variantSku\":[\"ABC1239-large\"]}]'),
(139, 'individual', 1.5, 'kg', 'color', '[\"red\",\"black\"]', 100, 24.99, 182, '12'),
(140, 'individual', 1.5, 'kg', 'size', '[\"small\",\"medium\",\"E-large\"]', 100, 24.99, 183, '[{\"id\":\"1\",\"name\":\"small\",\"variantSku\":[\"ABC1239-small\"]},{\"id\":\"2\",\"name\":\"medium\",\"variantSku\":[\"ABC1239-medium\"]},{\"id\":\"3\",\"name\":\"E-large\",\"variantSku\":[\"ABC1239-large\"]}]'),
(141, 'individual', 1.5, 'kg', 'color', '[\"red\",\"black\"]', 100, 24.99, 183, '12'),
(147, 'individual', 1.5, 'kg', 'color', '[\"red\",\"black\"]', 50, 20.00, 2, '[{\"id\":\"1\",\"name\":\"red\",\"variantSku\":[\"ABC1239-red\"]},{\"id\":\"2\",\"name\":\"black\",\"variantSku\":[\"ABC1239-black\"]}]'),
(148, 'individual', 1.5, 'kg', 'size', '[\"size\",\"medium\"]', 50, 20.00, 2, '[{\"id\":\"1\",\"name\":\"small\",\"variantSku\":[\"ABC1239-small\"]},{\"id\":\"2\",\"name\":\"medium\",\"variantSku\":[\"ABC1239-medium\"]},{\"id\":\"3\",\"name\":\"E-large\",\"variantSku\":[\"ABC1239-large\"]}]'),
(149, 'individual', 1.5, 'kg', 'color', '[\"red\",\"black\"]', 50, 20.00, 2, '[{\"id\":\"1\",\"name\":\"red\",\"variantSku\":[\"ABC1239-red\"]},{\"id\":\"2\",\"name\":\"black\",\"variantSku\":[\"ABC1239-black\"]}]'),
(150, 'individual', 1.5, 'kg', 'size', '[\"size\",\"medium\"]', 50, 24.99, 2, '[{\"id\":\"1\",\"name\":\"small\",\"variantSku\":[\"ABC1239-small\"]},{\"id\":\"2\",\"name\":\"medium\",\"variantSku\":[\"ABC1239-medium\"]},{\"id\":\"3\",\"name\":\"E-large\",\"variantSku\":[\"ABC1239-large\"]}]'),
(151, 'individual', 1.5, 'kg', 'color', '[\"red\",\"black\"]', 50, 24.99, 2, '[{\"id\":\"1\",\"name\":\"red\",\"variantSku\":[\"ABC1239-red\"]},{\"id\":\"2\",\"name\":\"black\",\"variantSku\":[\"ABC1239-black\"]}]');

-- --------------------------------------------------------

--
-- Table structure for table `states`
--

CREATE TABLE `states` (
  `stateName` varchar(255) NOT NULL,
  `stateCode` int NOT NULL,
  `stateId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `states`
--

INSERT INTO `states` (`stateName`, `stateCode`, `stateId`, `createdAt`, `updatedAt`) VALUES
('California', 1233, 1, '2023-12-04 04:25:35', '2023-12-04 04:25:35'),
('California', 12334, 3, '2023-12-05 11:27:20', '2023-12-05 11:27:20'),
('California', 12334, 4, '2024-03-06 13:09:07', '2024-03-06 13:09:07'),
('California', 12334, 5, '2024-03-06 13:22:49', '2024-03-06 13:22:49'),
('California', 12334, 9, '2024-03-06 13:23:44', '2024-03-06 13:23:44'),
('California', 123, 12, '2023-12-04 03:58:31', '2023-12-04 03:58:31');

-- --------------------------------------------------------

--
-- Table structure for table `suppliers`
--

CREATE TABLE `suppliers` (
  `supplier_id` int NOT NULL,
  `supplier_name` varchar(255) NOT NULL,
  `contact_info` varchar(255) DEFAULT NULL,
  `contact_person` varchar(255) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `description` text,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `suppliers`
--

INSERT INTO `suppliers` (`supplier_id`, `supplier_name`, `contact_info`, `contact_person`, `website`, `description`, `createdAt`, `updatedAt`) VALUES
(1, 'luthfi', '123-456-7890', 'John Doe', 'http://luthfi.com', 'A description of the supplier', '2024-03-07 07:54:35', '2024-03-07 07:54:35'),
(2, 'john', '123-456-7890', 'afridi', 'http://products.com', 'A description of the supplier about products', '2024-03-07 07:54:35', '2024-03-07 07:54:35'),
(3, 'john1', '123-456-1890', 'afridi1', 'http://productsn.com', 'A description of the supplier about products', '2024-03-07 07:54:35', '2024-03-07 07:54:35'),
(4, 'luthfi', '123-456-7890', 'John Doe', 'http://luthfi.com', 'A description of the supplier', '2024-03-07 07:54:35', '2024-03-07 07:54:35');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `contactNumber` int DEFAULT NULL,
  `businessName` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT 'user',
  `customerId` int DEFAULT NULL,
  `businessId` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstname`, `lastname`, `email`, `password`, `address`, `contactNumber`, `businessName`, `role`, `customerId`, `businessId`) VALUES
(1, 'johnWICK', 'Doe', 'johndoe@gmail.com', '$2b$10$tdJjOfBc1ZReXdG6MZSSseSNgPWxdjqlCsFIwl9.bK.dBkimdKN.6', '123 Main St', 1234567890, 'Doe Enterprises', 'supplier', NULL, NULL),
(8, 'luthfi', 'luthfi', 'luthfi@gmail.com', '$2b$10$rBPGvUUCrR0QMRLT2v46QO.HiRqAolrWpFaqZBo8GLetF7b/W6Mke', '123 Main Street', 123456789, 'Doe Enterprises', 'user', NULL, 1),
(9, 'admin', 'admin', 'admin@gmail.com', '$2b$10$tBK6mlDfuKnqD7hDKAPgVecvshEvIgyqdLDUWiXeRWaVyDxfp8Fse', '123 Main St', 1234567890, 'Doe Enterprises', 'admin', 4, NULL),
(13, 'luthfi', 'luthfi', 'luthfi@email.com', '$2b$10$Qj18OPpJQcJD5eK48LbnmeA6KgoP30Gldt1izUVG.I2iwzkSpZhkG', '123 Main Street', 123456789, 'Doe Enterprises', 'user', NULL, NULL),
(14, 'luthfi1', 'luthfi1', 'luthfi1@gmail.com', '$2b$10$TxIMKIqQ8DCeBQWbU21gjOzbvwBqm/AVkxdyBTYJHWKCH1Y0B03MO', '123 Main St', 1234567890, 'luthfi1 Enterprises', 'user', NULL, NULL),
(18, 'Sahibzada', 'Hamza sardar', 'sardar36@gmail.com', '$2b$10$SUtRR7YuKyLOd6A5/9dkm.pN6ihr6NfM0qbKujy9EmM9SZ5SW1oTK', 'Nasir Bagh road canal town street 4A house no#24 peshwar', 318, 'black', 'user', 18, NULL),
(19, 'izaz', 'khan', 'izaz@gmail.com', '$2b$10$Ay4cOLZRg7lKM6Vn/MJLjOlEEXfZyv.4f6gD6Bi3f0M5Yb5PN4YFe', 'islambad', 31892, 'shoes', 'user', 19, NULL),
(20, 'zabi', 'ullah', 'zabi@gmail.com', '$2b$10$dcPoF1qPWu05iVcXIrNJy.OrAy/wVEuCjucBIsGOC1x60d/umgSPG', 'islamabad', 3156, 'ball', 'user', 20, NULL),
(21, 'huzai', 'khan', 'huzail@gmail.com', '$2b$10$/G9.GZQwSps6mR88.vJG5eRr8cP7M6djoMmjQHZlUPn7Xi9gJT57K', 'karachi', 31890, 'brand', 'user', 21, NULL),
(22, 'jalal', 'khan', 'jalal@gmail.com', '$2b$10$Vg8ytA7vHHYe8KCkgD5Ok.4d9rkmLl3m2bSueWM.JKi6GAf1.0.BS', 'khana', 91890, 'ko', 'user', 22, NULL);

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
-- Indexes for table `notificationConfigurations`
--
ALTER TABLE `notificationConfigurations`
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
-- Indexes for table `notificationTypes`
--
ALTER TABLE `notificationTypes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orderItems`
--
ALTER TABLE `orderItems`
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
-- Indexes for table `productCategories`
--
ALTER TABLE `productCategories`
  ADD PRIMARY KEY (`productId`,`categoryId`),
  ADD KEY `categoryId` (`categoryId`);

--
-- Indexes for table `productImages`
--
ALTER TABLE `productImages`
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
-- Indexes for table `productVariants`
--
ALTER TABLE `productVariants`
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
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `businesses`
--
ALTER TABLE `businesses`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `cities`
--
ALTER TABLE `cities`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `companies`
--
ALTER TABLE `companies`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `notificationConfigurations`
--
ALTER TABLE `notificationConfigurations`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `notificationTypes`
--
ALTER TABLE `notificationTypes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `orderItems`
--
ALTER TABLE `orderItems`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=153;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `orderId` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=163;

--
-- AUTO_INCREMENT for table `productImages`
--
ALTER TABLE `productImages`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=142;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=184;

--
-- AUTO_INCREMENT for table `productVariants`
--
ALTER TABLE `productVariants`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=152;

--
-- AUTO_INCREMENT for table `suppliers`
--
ALTER TABLE `suppliers`
  MODIFY `supplier_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

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
  ADD CONSTRAINT `companies_ibfk_1` FOREIGN KEY (`addressId`) REFERENCES `addresses` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `notificationConfigurations`
--
ALTER TABLE `notificationConfigurations`
  ADD CONSTRAINT `notificationConfigurations_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `notificationConfigurations_ibfk_2` FOREIGN KEY (`notification_type_id`) REFERENCES `notificationTypes` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`notification_type_id`) REFERENCES `notificationTypes` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `orderItems`
--
ALTER TABLE `orderItems`
  ADD CONSTRAINT `orderItems_ibfk_1` FOREIGN KEY (`orderId`) REFERENCES `orders` (`orderId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orderItems_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `productCategories`
--
ALTER TABLE `productCategories`
  ADD CONSTRAINT `productCategories_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `productCategories_ibfk_2` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `productImages`
--
ALTER TABLE `productImages`
  ADD CONSTRAINT `productImages_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers` (`supplier_id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `productVariants`
--
ALTER TABLE `productVariants`
  ADD CONSTRAINT `productVariants_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`customerId`) REFERENCES `customers` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `users_ibfk_2` FOREIGN KEY (`businessId`) REFERENCES `businesses` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
