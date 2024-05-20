-- DropForeignKey
ALTER TABLE `room` DROP FOREIGN KEY `Room_typeId_fkey`;

-- AddForeignKey
ALTER TABLE `Room` ADD CONSTRAINT `Room_typeId_fkey` FOREIGN KEY (`typeId`) REFERENCES `RoomType`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
