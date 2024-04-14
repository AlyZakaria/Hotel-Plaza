/*
  Warnings:

  - The primary key for the `newsletter` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[email]` on the table `newsLetter` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id` to the `newsLetter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `newsletter` DROP PRIMARY KEY,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- CreateIndex
CREATE UNIQUE INDEX `newsLetter_email_key` ON `newsLetter`(`email`);
