/*
  Warnings:

  - The values [online,offline] on the enum `Room_access` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `room` MODIFY `access` ENUM('online_accessible', 'online_inaccessible') NOT NULL;
