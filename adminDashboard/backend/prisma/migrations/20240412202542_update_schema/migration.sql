-- DropForeignKey
ALTER TABLE `room` DROP FOREIGN KEY `Room_typeId_fkey`;

-- DropForeignKey
ALTER TABLE `typeimage` DROP FOREIGN KEY `TypeImage_imageId_fkey`;

-- DropIndex
DROP INDEX `RoomType_capacity_name_pricepernight_key` ON `roomtype`;

-- AddForeignKey
ALTER TABLE `Room` ADD CONSTRAINT `Room_typeId_fkey` FOREIGN KEY (`typeId`) REFERENCES `RoomType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TypeImage` ADD CONSTRAINT `TypeImage_imageId_fkey` FOREIGN KEY (`imageId`) REFERENCES `ImageURL`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
