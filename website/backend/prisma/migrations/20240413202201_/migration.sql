/*
  Warnings:

  - You are about to drop the column `resetPassword` on the `otp` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `otp` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `otp` DROP COLUMN `resetPassword`,
    DROP COLUMN `status`;
