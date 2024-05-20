-- DropForeignKey
ALTER TABLE `typeimage` DROP FOREIGN KEY `TypeImage_imageId_fkey`;

-- AddForeignKey
ALTER TABLE `TypeImage` ADD CONSTRAINT `TypeImage_imageId_fkey` FOREIGN KEY (`imageId`) REFERENCES `ImageURL`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
