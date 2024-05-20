/*
  Warnings:

  - Added the required column `bed` to the `RoomType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `RoomType` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `roomtype` ADD COLUMN `bed` ENUM('single', 'double', 'king', 'queen') NOT NULL,
    ADD COLUMN `size` DECIMAL(65, 30) NOT NULL;
