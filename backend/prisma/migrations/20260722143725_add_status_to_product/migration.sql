-- CreateEnum
CREATE TYPE "Statue" AS ENUM ('Active', 'Inactive');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "status" "Statue" NOT NULL DEFAULT 'Active';
