-- Migration: 001_create_applications_table.sql
-- Creates the `applications` table for storing application payloads.
-- Requirements: MySQL 5.7+ (for JSON column support)

CREATE TABLE IF NOT EXISTS `applications` (
  `id` BIGINT NOT NULL PRIMARY KEY,
  `payload` JSON NOT NULL,
  `status` VARCHAR(50) NOT NULL DEFAULT 'Applied',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_status` (`status`),
  INDEX `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
