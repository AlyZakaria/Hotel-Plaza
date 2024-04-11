/*
  Warnings:

  - A unique constraint covering the columns `[capacity,name,pricepernight]` on the table `RoomType` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `RoomType_capacity_name_key` ON `roomtype`;

-- CreateIndex
CREATE UNIQUE INDEX `RoomType_capacity_name_pricepernight_key` ON `RoomType`(`capacity`, `name`, `pricepernight`);
