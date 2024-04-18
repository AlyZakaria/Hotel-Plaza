/*
  Warnings:

  - A unique constraint covering the columns `[name,view,count]` on the table `RoomType` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `RoomType_name_view_count_key` ON `RoomType`(`name`, `view`, `count`);
