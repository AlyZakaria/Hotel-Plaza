/*
  Warnings:

  - A unique constraint covering the columns `[capacity,name]` on the table `RoomType` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `RoomType_capacity_name_key` ON `RoomType`(`capacity`, `name`);
