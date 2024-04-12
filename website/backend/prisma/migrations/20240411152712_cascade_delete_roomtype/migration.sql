-- DropForeignKey
ALTER TABLE `room` DROP FOREIGN KEY `Room_typeId_fkey`;

-- AddForeignKey
ALTER TABLE `room` ADD CONSTRAINT `Room_typeId_fkey` FOREIGN KEY (`typeId`) REFERENCES `roomtype`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
