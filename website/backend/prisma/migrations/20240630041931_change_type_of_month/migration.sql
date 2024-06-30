/*
  Warnings:

  - Changed the type of `month` on the `currentyear` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `month` on the `lastyear` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE `currentyear` DROP COLUMN `month`,
    ADD COLUMN `month` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `lastyear` DROP COLUMN `month`,
    ADD COLUMN `month` INTEGER NOT NULL;
