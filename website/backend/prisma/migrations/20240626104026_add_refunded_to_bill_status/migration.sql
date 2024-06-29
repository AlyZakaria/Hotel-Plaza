-- AlterTable
ALTER TABLE `bill` MODIFY `status` ENUM('incomplete', 'complete', 'refunded') NOT NULL;
