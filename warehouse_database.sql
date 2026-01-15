-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: localhost    Database: warehouse_database
-- ------------------------------------------------------
-- Server version	8.0.44

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `articles`
--
CREATE DATABASE IF NOT EXISTS warehouse_database;
USE warehouse_database;

DROP TABLE IF EXISTS `articles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `articles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  `ean` varchar(50) DEFAULT NULL,
  `unit` varchar(50) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articles`
--

LOCK TABLES `articles` WRITE;
/*!40000 ALTER TABLE `articles` DISABLE KEYS */;
INSERT INTO `articles` VALUES (1,'Test Article','Demo product','1234567890123','pcs',1),(2,'Milk 1L','Updated description','9876543210123','l',1),(3,'Bread','Whole Grain Bread','4007933131036','pcs',1);
/*!40000 ALTER TABLE `articles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `document_items`
--

DROP TABLE IF EXISTS `document_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `document_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `document_id` int NOT NULL,
  `article_id` int NOT NULL,
  `from_location_id` int NOT NULL,
  `to_location_id` int NOT NULL,
  `quantity` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_item_document` (`document_id`),
  KEY `fk_item_article` (`article_id`),
  KEY `fk_item_from_location` (`from_location_id`),
  KEY `fk_item_to_location` (`to_location_id`),
  CONSTRAINT `fk_item_article` FOREIGN KEY (`article_id`) REFERENCES `articles` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_item_document` FOREIGN KEY (`document_id`) REFERENCES `documents` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_item_from_location` FOREIGN KEY (`from_location_id`) REFERENCES `locations` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_item_to_location` FOREIGN KEY (`to_location_id`) REFERENCES `locations` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=96 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `document_items`
--

LOCK TABLES `document_items` WRITE;
/*!40000 ALTER TABLE `document_items` DISABLE KEYS */;
INSERT INTO `document_items` VALUES (1,1,1,1,2,10.00),(2,2,1,1,2,6.00),(3,3,1,1,2,2.00),(4,4,1,1,3,1.00),(5,5,1,1,2,1.00),(6,6,1,1,3,3.00),(7,6,1,1,3,3.00),(8,19,1,2,3,2.00),(9,20,1,2,1,1.00),(10,21,1,1,2,1.00),(11,22,1,2,3,30.00),(12,23,1,2,3,30.00),(13,23,1,2,3,30.00),(14,24,1,1,2,21.00),(15,25,1,2,1,500.00),(16,26,1,2,1,500.00),(17,26,1,2,3,50.00),(18,27,1,2,1,500.00),(19,27,1,2,3,50.00),(20,29,1,2,1,500.00),(21,29,1,2,3,50.00),(22,29,1,1,3,600.00),(23,30,1,1,3,600.00),(24,31,1,1,2,1.00),(25,31,1,1,2,1000.00),(26,32,1,1,2,6.00),(27,32,1,1,2,698.00),(28,33,1,1,2,6.00),(29,33,1,1,2,698.00),(30,33,1,1,2,698.00),(31,34,1,1,2,2000.00),(32,35,1,3,1,2.00),(33,35,1,3,1,20000.00),(34,36,1,1,2,200.00),(35,37,1,1,2,5000.00),(36,38,1,1,2,2.00),(37,38,1,1,2,2000.00),(38,39,1,1,3,500.00),(39,40,1,1,2,2.00),(40,41,1,1,2,2.00),(41,41,1,1,2,2.00),(42,41,1,1,2,2000.00),(43,42,1,1,2,2.00),(44,42,1,1,2,2.00),(45,42,1,1,2,2000.00),(46,43,1,1,2,2.00),(47,43,1,1,2,2.00),(48,43,1,1,2,2000.00),(49,44,1,1,2,2.00),(50,44,1,1,2,2.00),(51,44,1,1,2,2000.00),(52,45,1,1,2,2.00),(53,45,1,1,2,2.00),(54,45,1,1,2,2000.00),(55,46,1,1,2,2.00),(56,46,1,1,2,2.00),(57,46,1,1,2,2000.00),(58,47,1,1,2,2.00),(59,47,1,1,2,2.00),(60,47,1,1,2,2000.00),(61,48,1,2,3,2.00),(62,49,1,2,3,3.00),(63,123,1,1,2,3.00),(64,124,1,1,3,1.00),(65,125,1,2,9,1.00),(66,127,1,1,2,1.00),(67,128,1,1,9,1.00),(68,129,1,1,2,1.00),(69,130,1,1,2,1.00),(70,130,1,2,8,3.00),(71,130,1,1,9,5.00),(72,131,1,1,3,1.00),(73,131,1,1,3,3.00),(74,132,1,1,3,1.00),(75,132,1,1,3,3.00),(76,133,1,1,2,1.00),(77,133,1,1,2,2.00),(78,134,1,1,1,1.00),(79,135,1,1,2,1.00),(80,135,1,2,8,3.00),(81,135,1,3,8,1.00),(82,136,1,1,8,10000.00),(83,137,1,1,2,3.00),(85,138,1,2,9,2.00),(86,139,1,1,2,1.00),(87,141,1,1,8,3.00),(88,142,1,3,9,3.00),(89,144,1,1,2,1.00),(90,145,1,3,8,1.00),(91,146,1,1,9,1.00),(92,147,1,2,8,3.00),(93,148,1,1,2,1.00);
/*!40000 ALTER TABLE `document_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `documents`
--

DROP TABLE IF EXISTS `documents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `documents` (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(50) NOT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `confirmed_date` datetime DEFAULT NULL,
  `status` varchar(20) NOT NULL DEFAULT 'DRAFT',
  `confirmed_by` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  KEY `fk_document_user` (`confirmed_by`),
  CONSTRAINT `fk_document_user` FOREIGN KEY (`confirmed_by`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=153 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `documents`
--

LOCK TABLES `documents` WRITE;
/*!40000 ALTER TABLE `documents` DISABLE KEYS */;
INSERT INTO `documents` VALUES (1,'DOC-001','2025-12-22 04:31:55','2025-12-22 04:32:19','CONFIRMED',1),(2,'DOC-002','2025-12-27 19:26:41','2026-01-03 19:40:32','CONFIRMED',1),(3,'DOC-003','2025-12-28 02:07:18','2025-12-28 02:35:45','CONFIRMED',1),(4,'DOC-005','2026-01-03 18:41:12','2026-01-03 19:45:21','CONFIRMED',1),(5,'DOC-006','2026-01-03 18:49:51','2026-01-03 19:50:02','CONFIRMED',1),(6,'DOC-004','2026-01-03 18:52:18','2026-01-03 18:53:24','CONFIRMED',1),(19,'DOC-007','2026-01-03 19:22:27','2026-01-03 19:22:40','CONFIRMED',1),(20,'DOC-008','2026-01-03 19:24:11',NULL,'NOT CONFIRMED',NULL),(21,'DOC-009','2026-01-03 19:26:50',NULL,'NOT CONFIRMED',NULL),(22,'DOC-010','2026-01-03 19:29:24','2026-01-03 19:29:40','CONFIRMED',1),(23,'DOC-011','2026-01-03 19:36:01','2026-01-03 22:12:53','CONFIRMED',1),(24,'DOC-012','2026-01-03 22:09:39','2026-01-03 22:12:49','CONFIRMED',1),(25,'DOC-013','2026-01-03 22:13:15','2026-01-04 00:15:59','CONFIRMED',1),(26,'DOC-014','2026-01-03 22:17:08',NULL,'NOT CONFIRMED',NULL),(27,'DOC-015','2026-01-03 22:18:07',NULL,'NOT CONFIRMED',NULL),(29,'DOC-016','2026-01-03 22:18:40',NULL,'NOT CONFIRMED',NULL),(30,'DOC-017','2026-01-03 22:21:35',NULL,'NOT CONFIRMED',NULL),(31,'DOC-018','2026-01-03 22:33:59','2026-01-03 22:34:26','CONFIRMED',1),(32,'DOC-019','2026-01-03 22:48:26','2026-01-03 22:48:32','CONFIRMED',1),(33,'DOC-020','2026-01-03 22:55:27','2026-01-03 22:55:31','CONFIRMED',1),(34,'DOC-021','2026-01-03 22:57:59','2026-01-03 22:58:31','CONFIRMED',1),(35,'DOC-022','2026-01-03 22:58:25','2026-01-03 23:00:33','CONFIRMED',1),(36,'DOC-023','2026-01-03 23:01:06','2026-01-03 23:02:25','CONFIRMED',1),(37,'DOC-024','2026-01-03 23:21:21','2026-01-03 23:24:10','CONFIRMED',1),(38,'DOC-025','2026-01-03 23:25:21','2026-01-03 23:25:26','CONFIRMED',1),(39,'DOC-026','2026-01-03 23:27:23','2026-01-03 23:27:26','CONFIRMED',1),(40,'DOC-027','2026-01-03 23:33:20','2026-01-04 00:15:01','CONFIRMED',2),(41,'DOC-028','2026-01-03 23:34:04','2026-01-03 23:34:23','CONFIRMED',1),(42,'DOC-029','2026-01-03 23:35:34','2026-01-03 23:35:56','CONFIRMED',1),(43,'DOC-030','2026-01-03 23:37:34','2026-01-03 23:37:52','CONFIRMED',1),(44,'DOC-031','2026-01-03 23:39:08','2026-01-03 23:39:21','CONFIRMED',1),(45,'DOC-032','2026-01-03 23:40:18','2026-01-03 23:40:32','CONFIRMED',1),(46,'DOC-033','2026-01-03 23:42:50','2026-01-03 23:42:55','CONFIRMED',1),(47,'DOC-034','2026-01-03 23:49:54',NULL,'NOT CONFIRMED',NULL),(48,'DOC-035','2026-01-04 00:36:14',NULL,'NOT CONFIRMED',NULL),(49,'DOC-038','2026-01-04 00:39:28',NULL,'NOT CONFIRMED',NULL),(123,'DOC-039','2026-01-04 02:44:30','2026-01-04 02:44:35','CONFIRMED',1),(124,'DOC-040','2026-01-05 13:06:11',NULL,'NOT CONFIRMED',NULL),(125,'DOC-041','2026-01-05 13:06:14','2026-01-05 15:08:39','CONFIRMED',5),(127,'DOC-050','2026-01-05 14:46:30',NULL,'NOT CONFIRMED',NULL),(128,'DOC-051','2026-01-05 15:11:03','2026-01-05 15:11:08','CONFIRMED',5),(129,'DOC-052','2026-01-05 15:22:11',NULL,'NOT CONFIRMED',NULL),(130,'DOC-053','2026-01-05 15:24:35',NULL,'NOT CONFIRMED',NULL),(131,'DOC-054','2026-01-05 15:26:33',NULL,'NOT CONFIRMED',NULL),(132,'DOC-055','2026-01-05 15:26:45',NULL,'NOT CONFIRMED',NULL),(133,'DOC-056','2026-01-05 15:29:51',NULL,'NOT CONFIRMED',NULL),(134,'DOC-057','2026-01-05 15:31:10',NULL,'NOT CONFIRMED',NULL),(135,'DOC-058','2026-01-05 15:31:55',NULL,'NOT CONFIRMED',NULL),(136,'DOC-059','2026-01-05 15:32:56',NULL,'NOT CONFIRMED',NULL),(137,'DOC-TEST-017','2026-01-14 23:47:30','2026-01-14 23:48:03','CONFIRMED',2),(138,'DOC-TEST-018','2026-01-14 23:54:32','2026-01-14 23:55:09','CONFIRMED',2),(139,'DOC-TEST-001','2026-01-14 23:57:06',NULL,'NOT CONFIRMED',NULL),(141,'DOC-TEST-058','2026-01-15 00:00:29',NULL,'NOT CONFIRMED',NULL),(142,'DOC-TEST-077','2026-01-15 00:01:11',NULL,'NOT CONFIRMED',NULL),(144,'DOC-TEST-445','2026-01-15 21:15:35',NULL,'NOT CONFIRMED',NULL),(145,'DOC-TEST-585','2026-01-15 21:16:57',NULL,'NOT CONFIRMED',NULL),(146,'DOC-TEST-247','2026-01-15 21:19:42',NULL,'NOT CONFIRMED',NULL),(147,'DOC-TEST-852','2026-01-15 21:21:05',NULL,'NOT CONFIRMED',NULL),(148,'DOC-TEST-477','2026-01-15 21:21:55',NULL,'NOT CONFIRMED',NULL);
/*!40000 ALTER TABLE `documents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `locations`
--

DROP TABLE IF EXISTS `locations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `locations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(50) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `locations`
--

LOCK TABLES `locations` WRITE;
/*!40000 ALTER TABLE `locations` DISABLE KEYS */;
INSERT INTO `locations` VALUES (1,'LOC-01','Main Warehouse'),(2,'LOC-02','Secondary Warehouse'),(3,'LOC-03','Third Warehouse'),(8,'LOC-04','Fourth Warehouse'),(9,'LOC-05','Fifth Warehouse');
/*!40000 ALTER TABLE `locations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stock`
--

DROP TABLE IF EXISTS `stock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stock` (
  `id` int NOT NULL AUTO_INCREMENT,
  `article_id` int NOT NULL,
  `location_id` int NOT NULL,
  `quantity` decimal(10,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_article_location` (`article_id`,`location_id`),
  KEY `fk_stock_location` (`location_id`),
  CONSTRAINT `fk_stock_article` FOREIGN KEY (`article_id`) REFERENCES `articles` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_stock_location` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=166 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stock`
--

LOCK TABLES `stock` WRITE;
/*!40000 ALTER TABLE `stock` DISABLE KEYS */;
INSERT INTO `stock` VALUES (1,1,1,74.00),(2,2,1,0.00),(3,1,2,13534.00),(4,2,2,0.00),(5,3,1,4.00),(6,3,2,0.00),(8,1,3,500.00),(9,2,3,0.00),(10,3,3,0.00),(42,1,8,0.00),(43,2,8,0.00),(44,3,8,0.00),(49,1,9,4.00),(50,2,9,0.00),(51,3,9,0.00);
/*!40000 ALTER TABLE `stock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'test@warehouse.com','$2a$12$ze61//of4IY0qVEomVA3d.RYWdnQ9TokqeNEd0o8dMk/oypCp0k.2','2025-12-22 04:08:33'),(2,'new@warehouse.com','$2b$10$1b1fsgXvmDYPKv6NTYZzsufZB/EzI5ul16P5NU3FnlT6jbbQ3Lw1i','2026-01-04 00:13:59'),(3,'newuser1@warehouse.com','$2b$10$Qn2kWLJ9KMsChHHnHttkfetxKz1GQzUOKXy5r30Uk3HKfUFq.wBI.','2026-01-04 00:29:50'),(4,'new3@warehouse.com','$2b$10$q3.3iMuXGcqhDnkZVQX2/.Q7dqaABKW3fnsItEuXRT3R9JtnB7Tvm','2026-01-05 12:56:53'),(5,'new5@warehouse.com','$2b$10$nuzBqDwIcaoASVge0P8OOeshddnNr1W1s8/xS1/mwOst6oHxlKVfG','2026-01-05 14:32:26'),(7,'new56@warehouse.com','$2b$10$DTATIZ.Iucbjo8y.3Bbko.awLA3Zsk1Y6AoiScWjMQCisRZA.kdQS','2026-01-14 18:59:14'),(8,'new32@warehouse.com','$2b$10$d.PfkHiS5gLUdXLEiKVxp.jCXSbhz6wixHerAYUSPqZuDnBEpK8MC','2026-01-14 19:01:56'),(9,'new98@warehouse.com','$2b$10$3wUzKWFmtLzlPvqC6XMiOOCkI4dHIfxHZzqa5Utc60ggWSvfOWZtG','2026-01-14 19:02:31'),(11,'new11@warehouse.com','$2b$10$g4BRK.F7FZRL5B1W5Im0KeIqFlGG9Izf5Tz57FWbBOAgPdUh2C/sy','2026-01-14 19:30:52'),(13,'new74@warehouse.com','$2b$10$SjRA.XX93WVW.mBOnPjEVe3iuhrjCacUBI8ygmKfxMm5Am612KgNC','2026-01-14 19:40:12'),(15,'new12@warehouse.com','$2b$10$619P4Hw8VAXv4ZMHgR9t0OtPrgP2Q9YYra7/3x9ARksB/0rqSZNkG','2026-01-14 23:05:48'),(17,'new33@warehouse.com','$2b$10$iaYuxOlJgOR5Qb6IVu3jQuNTKJPAyu..dr8QKd0ftzh1ZbUEXrrDS','2026-01-15 00:09:51'),(19,'new97@warehouse.com','$2b$10$dQhmBym9YUFMdmjZkHX8R..vqnUA4fj9jWQHKI2xUWh1YmMZgw1Cm','2026-01-15 21:54:28');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-01-15 21:56:54
