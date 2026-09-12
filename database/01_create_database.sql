-- ============================================================================
-- NCC Academic & Management Portal - MySQL 8 Database Creation
-- File: 01_create_database.sql
-- ============================================================================

CREATE DATABASE IF NOT EXISTS `ncc_portal_db`
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_unicode_ci;

USE `ncc_portal_db`;

-- Set session parameters for strict SQL compliance
SET FOREIGN_KEY_CHECKS = 0;
SET SQL_MODE = 'NO_AUTO_VALUE_ON_ZERO,STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION';
