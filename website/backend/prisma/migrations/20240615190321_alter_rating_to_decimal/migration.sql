/*
  Warnings:

  - You are about to alter the column `rating` on the `review` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal(65,30)`.
  - Added the required column `reviewId` to the `customers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `customers` ADD COLUMN `reviewId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `review` MODIFY `rating` DECIMAL(65, 30) NOT NULL;
  