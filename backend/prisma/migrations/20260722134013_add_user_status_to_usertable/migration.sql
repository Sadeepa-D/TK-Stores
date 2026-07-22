-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Active', 'Suspended');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'Active';
