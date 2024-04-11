-- DropForeignKey
ALTER TABLE `typeimage` DROP FOREIGN KEY `TypeImage_imageId_fkey`;

-- AddForeignKey
ALTER TABLE `typeimage` ADD CONSTRAINT `TypeImage_imageId_fkey` FOREIGN KEY (`imageId`) REFERENCES `imageurl`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
