/*
  Warnings:

  - Added the required column `description` to the `Offer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Offer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageType` to the `Offer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `offer` ADD COLUMN `description` VARCHAR(191) NOT NULL,
    ADD COLUMN `image` LONGBLOB NOT NULL,
    ADD COLUMN `imageType` VARCHAR(191) NOT NULL;
