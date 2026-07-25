/*
  Warnings:

  - You are about to drop the column `quantity` on the `Batch` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Batch" DROP COLUMN "quantity",
ADD COLUMN     "currentquantity" DECIMAL(65,30) NOT NULL DEFAULT 0,
ADD COLUMN     "startquantity" DECIMAL(65,30) NOT NULL DEFAULT 0;
