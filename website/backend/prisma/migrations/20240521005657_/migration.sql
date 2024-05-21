/*
  Warnings:

  - The primary key for the `room` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `room` table. All the data in the column will be lost.
  - Added the required column `room_id` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `booking` DROP FOREIGN KEY `Booking_roomId_fkey`;

-- AlterTable
ALTER TABLE `room` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `room_id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`room_id`);

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `Room`(`room_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
