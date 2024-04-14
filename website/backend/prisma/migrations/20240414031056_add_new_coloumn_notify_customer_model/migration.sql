/*
  Warnings:

  - Added the required column `notify` to the `customers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `customers` ADD COLUMN `notify` BOOLEAN NOT NULL;
