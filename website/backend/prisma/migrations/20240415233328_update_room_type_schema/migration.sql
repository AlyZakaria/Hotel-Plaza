/*
  Warnings:

  - A unique constraint covering the columns `[name,view,capacity]` on the table `RoomType` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `RoomType_name_view_capacity_key` ON `RoomType`(`name`, `view`, `capacity`);
