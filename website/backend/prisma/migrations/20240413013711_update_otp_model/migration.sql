/*
  Warnings:

  - A unique constraint covering the columns `[otp,userId]` on the table `otp` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `otp` MODIFY `otp` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `otp_otp_userId_key` ON `otp`(`otp`, `userId`);
