/*
  Warnings:

  - Added the required column `resetPassword` to the `otp` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `otp` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `otp` ADD COLUMN `resetPassword` BOOLEAN NOT NULL,
    ADD COLUMN `status` ENUM('verified', 'unverified') NOT NULL;
