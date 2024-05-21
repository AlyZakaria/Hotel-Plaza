/*
  Warnings:

  - You are about to drop the column `zip` on the `customers` table. All the data in the column will be lost.
  - Added the required column `gender` to the `customers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `customers` DROP COLUMN `zip`,
    ADD COLUMN `gender` ENUM('male', 'female') NOT NULL;
