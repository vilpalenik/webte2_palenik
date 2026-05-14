/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19  Distrib 10.11.14-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: xpalenikv
-- ------------------------------------------------------
-- Server version	10.11.14-MariaDB-0ubuntu0.24.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cache`
--

DROP TABLE IF EXISTS `cache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` bigint(20) NOT NULL,
  PRIMARY KEY (`key`),
  KEY `cache_expiration_index` (`expiration`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache`
--

LOCK TABLES `cache` WRITE;
/*!40000 ALTER TABLE `cache` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cache_locks`
--

DROP TABLE IF EXISTS `cache_locks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` bigint(20) NOT NULL,
  PRIMARY KEY (`key`),
  KEY `cache_locks_expiration_index` (`expiration`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache_locks`
--

LOCK TABLES `cache_locks` WRITE;
/*!40000 ALTER TABLE `cache_locks` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache_locks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `destination_climates`
--

DROP TABLE IF EXISTS `destination_climates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `destination_climates` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `destination_id` bigint(20) unsigned NOT NULL,
  `month` tinyint(4) NOT NULL,
  `temp_avg` double NOT NULL,
  `temp_min` double NOT NULL,
  `temp_max` double NOT NULL,
  PRIMARY KEY (`id`),
  KEY `destination_climates_destination_id_foreign` (`destination_id`),
  CONSTRAINT `destination_climates_destination_id_foreign` FOREIGN KEY (`destination_id`) REFERENCES `destinations` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=241 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `destination_climates`
--

LOCK TABLES `destination_climates` WRITE;
/*!40000 ALTER TABLE `destination_climates` DISABLE KEYS */;
INSERT INTO `destination_climates` VALUES
(1,1,1,10,7,13),
(2,1,2,11,8,14),
(3,1,3,13,10,17),
(4,1,4,17,13,21),
(5,1,5,21,17,25),
(6,1,6,25,21,29),
(7,1,7,28,24,32),
(8,1,8,28,24,32),
(9,1,9,24,20,28),
(10,1,10,19,15,23),
(11,1,11,15,11,18),
(12,1,12,11,8,14),
(13,2,1,10,7,13),
(14,2,2,11,8,14),
(15,2,3,13,10,16),
(16,2,4,16,13,19),
(17,2,5,19,16,23),
(18,2,6,23,20,27),
(19,2,7,26,23,30),
(20,2,8,26,23,30),
(21,2,9,23,20,27),
(22,2,10,19,16,23),
(23,2,11,14,11,17),
(24,2,12,11,8,14),
(25,3,1,0,-3,3),
(26,3,2,2,-2,5),
(27,3,3,7,2,11),
(28,3,4,12,7,17),
(29,3,5,17,12,22),
(30,3,6,20,15,25),
(31,3,7,22,17,27),
(32,3,8,22,17,27),
(33,3,9,17,12,22),
(34,3,10,12,7,16),
(35,3,11,6,2,9),
(36,3,12,1,-2,4),
(37,4,1,12,9,15),
(38,4,2,12,9,15),
(39,4,3,14,11,17),
(40,4,4,18,14,21),
(41,4,5,22,18,26),
(42,4,6,26,22,30),
(43,4,7,29,25,33),
(44,4,8,29,25,33),
(45,4,9,26,22,30),
(46,4,10,21,18,25),
(47,4,11,17,14,20),
(48,4,12,13,10,16),
(49,5,1,8,4,12),
(50,5,2,9,5,13),
(51,5,3,12,8,16),
(52,5,4,16,12,20),
(53,5,5,21,16,25),
(54,5,6,25,20,30),
(55,5,7,28,23,33),
(56,5,8,28,23,33),
(57,5,9,24,19,29),
(58,5,10,18,14,23),
(59,5,11,13,9,17),
(60,5,12,9,5,13),
(61,6,1,-5,-9,-1),
(62,6,2,-4,-8,0),
(63,6,3,0,-4,4),
(64,6,4,7,3,11),
(65,6,5,12,8,16),
(66,6,6,15,11,19),
(67,6,7,17,13,21),
(68,6,8,17,13,21),
(69,6,9,13,9,17),
(70,6,10,8,4,12),
(71,6,11,2,-2,5),
(72,6,12,-3,-7,0),
(73,7,1,12,4,20),
(74,7,2,14,6,22),
(75,7,3,17,9,26),
(76,7,4,21,12,30),
(77,7,5,25,16,34),
(78,7,6,30,20,39),
(79,7,7,35,23,43),
(80,7,8,34,22,42),
(81,7,9,29,18,37),
(82,7,10,23,13,31),
(83,7,11,17,8,25),
(84,7,12,13,5,21),
(85,8,1,4,1,6),
(86,8,2,4,1,7),
(87,8,3,7,3,10),
(88,8,4,11,7,14),
(89,8,5,15,10,18),
(90,8,6,17,13,21),
(91,8,7,19,15,23),
(92,8,8,20,15,24),
(93,8,9,17,13,21),
(94,8,10,13,9,16),
(95,8,11,8,5,11),
(96,8,12,5,2,7),
(97,9,1,19,14,24),
(98,9,2,21,15,26),
(99,9,3,24,18,30),
(100,9,4,29,22,35),
(101,9,5,33,26,40),
(102,9,6,35,28,42),
(103,9,7,37,30,43),
(104,9,8,38,30,44),
(105,9,9,34,27,41),
(106,9,10,30,23,37),
(107,9,11,25,19,31),
(108,9,12,21,15,26),
(109,10,1,12,8,15),
(110,10,2,13,9,16),
(111,10,3,15,11,18),
(112,10,4,17,13,21),
(113,10,5,20,15,24),
(114,10,6,23,18,27),
(115,10,7,26,20,31),
(116,10,8,27,21,32),
(117,10,9,25,19,30),
(118,10,10,20,15,24),
(119,10,11,16,11,19),
(120,10,12,13,9,16),
(121,11,1,0,-3,3),
(122,11,2,1,-2,3),
(123,11,3,2,-1,4),
(124,11,4,5,2,8),
(125,11,5,9,5,12),
(126,11,6,12,8,15),
(127,11,7,13,10,17),
(128,11,8,13,10,16),
(129,11,9,10,7,13),
(130,11,10,6,3,9),
(131,11,11,3,0,5),
(132,11,12,1,-2,4),
(133,12,1,27,22,32),
(134,12,2,29,24,34),
(135,12,3,31,26,36),
(136,12,4,33,27,38),
(137,12,5,31,26,35),
(138,12,6,30,25,34),
(139,12,7,29,25,33),
(140,12,8,29,25,33),
(141,12,9,29,25,33),
(142,12,10,28,24,32),
(143,12,11,28,23,32),
(144,12,12,27,22,31),
(145,13,1,1,-3,4),
(146,13,2,3,-1,6),
(147,13,3,8,3,13),
(148,13,4,14,8,19),
(149,13,5,19,13,24),
(150,13,6,22,16,27),
(151,13,7,24,18,29),
(152,13,8,24,18,29),
(153,13,9,19,13,24),
(154,13,10,13,8,18),
(155,13,11,7,3,11),
(156,13,12,2,-1,5),
(157,14,1,5,2,8),
(158,14,2,6,2,10),
(159,14,3,10,5,14),
(160,14,4,13,8,18),
(161,14,5,17,12,22),
(162,14,6,20,15,25),
(163,14,7,23,17,28),
(164,14,8,23,17,28),
(165,14,9,19,14,24),
(166,14,10,14,10,19),
(167,14,11,9,5,13),
(168,14,12,6,2,9),
(169,15,1,-7,-12,-2),
(170,15,2,-6,-11,-1),
(171,15,3,-3,-8,2),
(172,15,4,2,-3,7),
(173,15,5,7,2,12),
(174,15,6,11,6,16),
(175,15,7,14,9,19),
(176,15,8,14,9,18),
(177,15,9,10,5,15),
(178,15,10,4,0,9),
(179,15,11,-2,-6,2),
(180,15,12,-6,-10,-1),
(181,16,1,29,26,31),
(182,16,2,29,26,31),
(183,16,3,30,27,32),
(184,16,4,30,27,32),
(185,16,5,29,26,31),
(186,16,6,28,26,30),
(187,16,7,28,25,30),
(188,16,8,28,25,30),
(189,16,9,28,26,30),
(190,16,10,29,26,31),
(191,16,11,29,26,31),
(192,16,12,29,26,31),
(193,17,1,5,1,9),
(194,17,2,6,2,11),
(195,17,3,10,5,15),
(196,17,4,16,11,21),
(197,17,5,21,16,26),
(198,17,6,24,20,29),
(199,17,7,28,24,33),
(200,17,8,30,25,34),
(201,17,9,25,21,30),
(202,17,10,19,14,24),
(203,17,11,13,8,18),
(204,17,12,7,3,12),
(205,18,1,1,-3,4),
(206,18,2,2,-2,6),
(207,18,3,7,2,12),
(208,18,4,13,8,18),
(209,18,5,19,13,24),
(210,18,6,24,18,29),
(211,18,7,27,22,32),
(212,18,8,26,21,31),
(213,18,9,22,17,27),
(214,18,10,16,11,21),
(215,18,11,10,5,14),
(216,18,12,3,-1,8),
(217,19,1,22,17,27),
(218,19,2,22,17,27),
(219,19,3,21,16,26),
(220,19,4,18,13,23),
(221,19,5,15,10,19),
(222,19,6,13,8,17),
(223,19,7,12,7,16),
(224,19,8,13,8,17),
(225,19,9,15,10,19),
(226,19,10,17,12,22),
(227,19,11,19,14,24),
(228,19,12,21,16,26),
(229,20,1,-4,-8,-1),
(230,20,2,-5,-9,-1),
(231,20,3,-1,-5,3),
(232,20,4,6,2,10),
(233,20,5,13,8,17),
(234,20,6,17,12,21),
(235,20,7,19,14,23),
(236,20,8,18,14,22),
(237,20,9,13,9,17),
(238,20,10,8,4,11),
(239,20,11,3,0,6),
(240,20,12,-1,-5,2);
/*!40000 ALTER TABLE `destination_climates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `destinations`
--

DROP TABLE IF EXISTS `destinations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `destinations` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `country_code` varchar(2) NOT NULL,
  `capital` varchar(255) NOT NULL,
  `currency_code` varchar(3) NOT NULL,
  `flight_hours_from_vienna` double NOT NULL,
  `types` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`types`)),
  `lat` double NOT NULL,
  `lon` double NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `destinations`
--

LOCK TABLES `destinations` WRITE;
/*!40000 ALTER TABLE `destinations` DISABLE KEYS */;
INSERT INTO `destinations` VALUES
(1,'Dubrovnik','Chorvátsko','hr','Záhreb','EUR',1.5,'[\"more\",\"historicke\"]',42.65,18.09,'2026-05-14 15:17:47','2026-05-14 15:17:47'),
(2,'Barcelona','Španielsko','es','Madrid','EUR',2.5,'[\"more\",\"historicke\",\"mestsky\"]',41.39,2.15,'2026-05-14 15:17:47','2026-05-14 15:17:47'),
(3,'Praha','Česko','cz','Praha','CZK',1,'[\"historicke\",\"mestsky\"]',50.08,14.44,'2026-05-14 15:17:47','2026-05-14 15:17:47'),
(4,'Santorini','Grécko','gr','Atény','EUR',2.5,'[\"more\",\"mestsky\"]',36.39,25.46,'2026-05-14 15:17:47','2026-05-14 15:17:47'),
(5,'Rím','Taliansko','it','Rím','EUR',1.5,'[\"historicke\",\"mestsky\"]',41.9,12.5,'2026-05-14 15:17:47','2026-05-14 15:17:47'),
(6,'Zakopané','Poľsko','pl','Varšava','PLN',1,'[\"hory\",\"aktivita\"]',49.3,19.95,'2026-05-14 15:17:47','2026-05-14 15:17:47'),
(7,'Marrakech','Maroko','ma','Rabat','MAD',4,'[\"historicke\",\"aktivita\",\"mestsky\"]',31.63,-8,'2026-05-14 15:17:47','2026-05-14 15:17:47'),
(8,'Amsterdam','Holandsko','nl','Amsterdam','EUR',2,'[\"mestsky\",\"historicke\"]',52.37,4.9,'2026-05-14 15:17:47','2026-05-14 15:17:47'),
(9,'Dubaj','SAE','ae','Abú Zabí','AED',6,'[\"more\",\"mestsky\",\"aktivita\"]',25.2,55.27,'2026-05-14 15:17:47','2026-05-14 15:17:47'),
(10,'Lisabon','Portugalsko','pt','Lisabon','EUR',3.5,'[\"more\",\"historicke\",\"mestsky\"]',38.72,-9.14,'2026-05-14 15:17:47','2026-05-14 15:17:47'),
(11,'Reykjavík','Island','is','Reykjavík','ISK',4,'[\"hory\",\"aktivita\"]',64.13,-21.82,'2026-05-14 15:17:47','2026-05-14 15:17:47'),
(12,'Bangkok','Thajsko','th','Bangkok','THB',11,'[\"more\",\"historicke\",\"mestsky\",\"aktivita\"]',13.75,100.52,'2026-05-14 15:17:47','2026-05-14 15:17:47'),
(13,'Viedeň','Rakúsko','at','Viedeň','EUR',0,'[\"historicke\",\"mestsky\"]',48.21,16.37,'2026-05-14 15:17:47','2026-05-14 15:17:47'),
(14,'Paríž','Francúzsko','fr','Paríž','EUR',2,'[\"historicke\",\"mestsky\"]',48.86,2.35,'2026-05-14 15:17:47','2026-05-14 15:17:47'),
(15,'Zermatt','Švajčiarsko','ch','Bern','CHF',1.5,'[\"hory\",\"aktivita\"]',46.02,7.75,'2026-05-14 15:17:47','2026-05-14 15:17:47'),
(16,'Maldivy','Maldivy','mv','Malé','MVR',10,'[\"more\",\"aktivita\"]',3.2,73.22,'2026-05-14 15:17:47','2026-05-14 15:17:47'),
(17,'Kyoto','Japonsko','jp','Tokio','JPY',12,'[\"historicke\",\"mestsky\",\"aktivita\"]',35.01,135.77,'2026-05-14 15:17:47','2026-05-14 15:17:47'),
(18,'New York','USA','us','Washington D.C.','USD',9,'[\"mestsky\",\"aktivita\"]',40.71,-74.01,'2026-05-14 15:17:47','2026-05-14 15:17:47'),
(19,'Kapské Mesto','Južná Afrika','za','Pretória','ZAR',11,'[\"more\",\"hory\",\"aktivita\"]',-33.93,18.42,'2026-05-14 15:17:47','2026-05-14 15:17:47'),
(20,'Tallinn','Estónsko','ee','Tallinn','EUR',2.5,'[\"historicke\",\"mestsky\"]',59.44,24.75,'2026-05-14 15:17:47','2026-05-14 15:17:47');
/*!40000 ALTER TABLE `destinations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `failed_jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_batches`
--

DROP TABLE IF EXISTS `job_batches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_batches`
--

LOCK TABLES `job_batches` WRITE;
/*!40000 ALTER TABLE `job_batches` DISABLE KEYS */;
/*!40000 ALTER TABLE `job_batches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` smallint(5) unsigned NOT NULL,
  `reserved_at` int(10) unsigned DEFAULT NULL,
  `available_at` int(10) unsigned NOT NULL,
  `created_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES
(1,'0001_01_01_000000_create_users_table',1),
(2,'0001_01_01_000001_create_cache_table',1),
(3,'0001_01_01_000002_create_jobs_table',1),
(4,'2026_05_12_174547_create_destinations_table',1),
(5,'2026_05_12_174558_create_destination_climates_table',1),
(6,'2026_05_12_174604_create_visits_table',1),
(7,'2026_05_12_174610_create_searches_table',1),
(8,'2026_05_14_155514_create_search_preferences_table',1);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset_tokens`
--

LOCK TABLES `password_reset_tokens` WRITE;
/*!40000 ALTER TABLE `password_reset_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_reset_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `search_preferences`
--

DROP TABLE IF EXISTS `search_preferences`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `search_preferences` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `type` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `searched_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `search_preferences`
--

LOCK TABLES `search_preferences` WRITE;
/*!40000 ALTER TABLE `search_preferences` DISABLE KEYS */;
INSERT INTO `search_preferences` VALUES
(1,'historicke','vacation_type','2026-05-14 15:18:08'),
(2,'teplo','temperature','2026-05-14 15:18:08'),
(3,'historicke','vacation_type','2026-05-14 15:18:10'),
(4,'prijemne','temperature','2026-05-14 15:18:10'),
(5,'historicke','vacation_type','2026-05-14 15:18:11'),
(6,'mestsky','vacation_type','2026-05-14 15:18:11'),
(7,'aktivita','vacation_type','2026-05-14 15:18:11'),
(8,'prijemne','temperature','2026-05-14 15:18:11'),
(9,'historicke','vacation_type','2026-05-14 15:18:13'),
(10,'mestsky','vacation_type','2026-05-14 15:18:13'),
(11,'aktivita','vacation_type','2026-05-14 15:18:13'),
(12,'hory','vacation_type','2026-05-14 15:18:13'),
(13,'prijemne','temperature','2026-05-14 15:18:13'),
(14,'hory','vacation_type','2026-05-14 15:18:15'),
(15,'prijemne','temperature','2026-05-14 15:18:15');
/*!40000 ALTER TABLE `search_preferences` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `searches`
--

DROP TABLE IF EXISTS `searches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `searches` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `destination_id` bigint(20) unsigned NOT NULL,
  `searched_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `searches_destination_id_foreign` (`destination_id`),
  CONSTRAINT `searches_destination_id_foreign` FOREIGN KEY (`destination_id`) REFERENCES `destinations` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `searches`
--

LOCK TABLES `searches` WRITE;
/*!40000 ALTER TABLE `searches` DISABLE KEYS */;
INSERT INTO `searches` VALUES
(1,1,'2026-05-14 15:18:06'),
(2,2,'2026-05-14 15:18:06'),
(3,3,'2026-05-14 15:18:06'),
(4,4,'2026-05-14 15:18:06'),
(5,5,'2026-05-14 15:18:06'),
(6,6,'2026-05-14 15:18:06'),
(7,7,'2026-05-14 15:18:06'),
(8,8,'2026-05-14 15:18:06'),
(9,9,'2026-05-14 15:18:06'),
(10,10,'2026-05-14 15:18:06'),
(11,1,'2026-05-14 15:18:08'),
(12,2,'2026-05-14 15:18:08'),
(13,3,'2026-05-14 15:18:08'),
(14,5,'2026-05-14 15:18:08'),
(15,10,'2026-05-14 15:18:08'),
(16,12,'2026-05-14 15:18:08'),
(17,13,'2026-05-14 15:18:08'),
(18,14,'2026-05-14 15:18:08'),
(19,17,'2026-05-14 15:18:08'),
(20,4,'2026-05-14 15:18:08'),
(21,8,'2026-05-14 15:18:10'),
(22,20,'2026-05-14 15:18:10'),
(23,6,'2026-05-14 15:18:10'),
(24,11,'2026-05-14 15:18:10'),
(25,15,'2026-05-14 15:18:10'),
(26,19,'2026-05-14 15:18:10'),
(27,1,'2026-05-14 15:18:10'),
(28,2,'2026-05-14 15:18:10'),
(29,3,'2026-05-14 15:18:10'),
(30,5,'2026-05-14 15:18:10'),
(31,8,'2026-05-14 15:18:11'),
(32,20,'2026-05-14 15:18:11'),
(33,7,'2026-05-14 15:18:11'),
(34,12,'2026-05-14 15:18:11'),
(35,17,'2026-05-14 15:18:11'),
(36,6,'2026-05-14 15:18:11'),
(37,11,'2026-05-14 15:18:11'),
(38,15,'2026-05-14 15:18:11'),
(39,19,'2026-05-14 15:18:11'),
(40,2,'2026-05-14 15:18:11'),
(41,6,'2026-05-14 15:18:13'),
(42,8,'2026-05-14 15:18:13'),
(43,11,'2026-05-14 15:18:13'),
(44,15,'2026-05-14 15:18:13'),
(45,19,'2026-05-14 15:18:13'),
(46,20,'2026-05-14 15:18:13'),
(47,7,'2026-05-14 15:18:13'),
(48,12,'2026-05-14 15:18:13'),
(49,17,'2026-05-14 15:18:13'),
(50,2,'2026-05-14 15:18:13'),
(51,6,'2026-05-14 15:18:15'),
(52,11,'2026-05-14 15:18:15'),
(53,15,'2026-05-14 15:18:15'),
(54,19,'2026-05-14 15:18:15'),
(55,8,'2026-05-14 15:18:15'),
(56,20,'2026-05-14 15:18:15');
/*!40000 ALTER TABLE `searches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) unsigned DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `visits`
--

DROP TABLE IF EXISTS `visits`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `visits` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `ip_hash` varchar(255) NOT NULL,
  `visited_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `visits`
--

LOCK TABLES `visits` WRITE;
/*!40000 ALTER TABLE `visits` DISABLE KEYS */;
INSERT INTO `visits` VALUES
(1,'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855','2026-05-14 15:17:58');
/*!40000 ALTER TABLE `visits` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-05-14 19:22:15
