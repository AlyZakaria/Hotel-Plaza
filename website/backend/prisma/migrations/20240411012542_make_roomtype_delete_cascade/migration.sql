-- DropForeignKey
ALTER TABLE `typeimage` DROP FOREIGN KEY `TypeImage_typeId_fkey`;

-- AddForeignKey
ALTER TABLE `typeimage` ADD CONSTRAINT `TypeImage_typeId_fkey` FOREIGN KEY (`typeId`) REFERENCES `roomtype`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
