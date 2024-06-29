/*
  Warnings:

  - Added the required column `saleId` to the `Bill` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `bill` ADD COLUMN `saleId` VARCHAR(191) NOT NULL;
