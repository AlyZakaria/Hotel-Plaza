/*
  Warnings:

  - You are about to drop the column `zip` on the `customers` table. All the data in the column will be lost.
  - The primary key for the `room` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `room` table. All the data in the column will be lost.
  - Added the required column `saleId` to the `Bill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `customers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Offer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Offer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageType` to the `Offer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `room_id` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `booking` DROP FOREIGN KEY `Booking_roomId_fkey`;

-- AlterTable
ALTER TABLE `bill` ADD COLUMN `saleId` VARCHAR(191) NOT NULL,
    MODIFY `status` ENUM('incomplete', 'complete', 'refunded') NOT NULL;

-- AlterTable
ALTER TABLE `customers` DROP COLUMN `zip`,
    ADD COLUMN `dob` DATETIME(3) NULL,
    ADD COLUMN `gender` ENUM('male', 'female') NOT NULL,
    ADD COLUMN `provenance` VARCHAR(191) NULL,
    MODIFY `country` VARCHAR(191) NULL,
    MODIFY `address` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `offer` ADD COLUMN `description` VARCHAR(191) NOT NULL,
    ADD COLUMN `image` LONGBLOB NOT NULL,
    ADD COLUMN `imageType` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `room` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `room_id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`room_id`);

-- AlterTable
ALTER TABLE `roomtype` MODIFY `description` VARCHAR(1000) NULL;

-- CreateTable
CREATE TABLE `Review` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `roomTypeId` INTEGER NOT NULL,
    `customerId` INTEGER NOT NULL,
    `rating` DECIMAL(65, 30) NOT NULL,
    `comment` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `Room`(`room_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_roomTypeId_fkey` FOREIGN KEY (`roomTypeId`) REFERENCES `RoomType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `customers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
