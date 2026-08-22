/*
  Warnings:

  - A unique constraint covering the columns `[referenceCode]` on the table `MarketplaceListing` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "MarketplaceListing" ADD COLUMN     "referenceCode" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "MarketplaceListing_referenceCode_key" ON "MarketplaceListing"("referenceCode");
