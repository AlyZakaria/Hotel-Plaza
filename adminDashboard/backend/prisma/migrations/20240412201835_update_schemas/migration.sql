/*
  Warnings:

  - A unique constraint covering the columns `[capacity,name,pricepernight]` on the table `roomtype` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `status` to the `offer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `room` DROP FOREIGN KEY `Room_typeId_fkey`;

-- DropForeignKey
ALTER TABLE `typeimage` DROP FOREIGN KEY `TypeImage_imageId_fkey`;

-- AlterTable
ALTER TABLE `offer` ADD COLUMN `status` ENUM('active', 'inactive') NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `RoomType_capacity_name_pricepernight_key` ON `roomtype`(`capacity`, `name`, `pricepernight`);

-- AddForeignKey
ALTER TABLE `room` ADD CONSTRAINT `Room_typeId_fkey` FOREIGN KEY (`typeId`) REFERENCES `roomtype`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `typeimage` ADD CONSTRAINT `TypeImage_imageId_fkey` FOREIGN KEY (`imageId`) REFERENCES `imageurl`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
