/*
  Warnings:

  - The primary key for the `newsletter` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `newsletter` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `newsLetter_email_key` ON `newsletter`;

-- AlterTable
ALTER TABLE `newsletter` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`email`);
