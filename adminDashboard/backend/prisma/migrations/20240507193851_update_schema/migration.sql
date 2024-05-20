/*
  Warnings:

  - A unique constraint covering the columns `[name,view,capacity]` on the table `RoomType` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `bed` to the `RoomType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `RoomType` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `room` DROP FOREIGN KEY `Room_typeId_fkey`;

-- DropForeignKey
ALTER TABLE `typeimage` DROP FOREIGN KEY `TypeImage_imageId_fkey`;

-- DropIndex
DROP INDEX `RoomType_name_view_count_key` ON `roomtype`;

-- AlterTable
ALTER TABLE `customers` ADD COLUMN `image` LONGBLOB NULL,
    ADD COLUMN `imageType` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `otp` ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `roomtype` ADD COLUMN `bed` ENUM('single', 'double', 'king', 'queen') NOT NULL,
    ADD COLUMN `size` DECIMAL(65, 30) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `RoomType_name_view_capacity_key` ON `RoomType`(`name`, `view`, `capacity`);

-- AddForeignKey
ALTER TABLE `Room` ADD CONSTRAINT `Room_typeId_fkey` FOREIGN KEY (`typeId`) REFERENCES `RoomType`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TypeImage` ADD CONSTRAINT `TypeImage_imageId_fkey` FOREIGN KEY (`imageId`) REFERENCES `ImageURL`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
