/*
  Warnings:

  - The values [CLOSE] on the enum `Issue_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `issue` MODIFY `status` ENUM('OPEN', 'CLOSED', 'IN_PROGRESS') NOT NULL DEFAULT 'OPEN';
