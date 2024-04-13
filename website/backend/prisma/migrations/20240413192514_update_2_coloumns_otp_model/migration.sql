/*
  Warnings:

  - You are about to alter the column `resetPassword` on the `otp` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `Enum(EnumId(5))`.
  - The values [unverified] on the enum `otp_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `otp` MODIFY `resetPassword` ENUM('completed', 'expired', 'pending') NOT NULL,
    MODIFY `status` ENUM('verified', 'expired', 'pending') NOT NULL;
