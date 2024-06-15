-- AlterTable
ALTER TABLE `customers` ADD COLUMN `address` VARCHAR(191) NULL,
    ADD COLUMN `dob` DATETIME(3) NULL,
    ADD COLUMN `provenance` VARCHAR(191) NULL;
