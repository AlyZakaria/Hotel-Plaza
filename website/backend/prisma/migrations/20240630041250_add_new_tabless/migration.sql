/*
  Warnings:

  - Added the required column `access` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `room` ADD COLUMN `access` ENUM('online', 'offline') NOT NULL,
    ADD COLUMN `status` ENUM('in_service', 'out_of_service') NOT NULL;

-- CreateTable
CREATE TABLE `lastYear` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `month` DATETIME(3) NOT NULL,
    `online_reservations` INTEGER NOT NULL,
    `offline_reservations` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `currentYear` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `month` DATETIME(3) NOT NULL,
    `online_reservations` INTEGER NOT NULL,
    `offline_reservations` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
