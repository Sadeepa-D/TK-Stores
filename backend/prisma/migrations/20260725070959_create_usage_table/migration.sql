-- CreateTable
CREATE TABLE "Usage" (
    "id" TEXT NOT NULL,
    "batchId" TEXT NOT NULL,
    "quantity" DECIMAL(65,30) NOT NULL,
    "usageDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Usage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Usage" ADD CONSTRAINT "Usage_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "Batch"("id") ON DELETE CASCADE ON UPDATE CASCADE;
