/*
  Warnings:

  - Added the required column `vehicleDescription` to the `ServiceBooking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "EnquiryCategory" ADD VALUE 'MARKETPLACE';
ALTER TYPE "EnquiryCategory" ADD VALUE 'PARTNERSHIP';

-- AlterTable
ALTER TABLE "Enquiry" ADD COLUMN     "contactEmail" TEXT,
ADD COLUMN     "contactName" TEXT,
ADD COLUMN     "contactPhone" TEXT,
ADD COLUMN     "preferredContactMethod" TEXT;

-- AlterTable
ALTER TABLE "ImportRequest" ADD COLUMN     "contactEmail" TEXT,
ADD COLUMN     "contactName" TEXT,
ADD COLUMN     "contactPhone" TEXT,
ADD COLUMN     "timeline" TEXT;

-- AlterTable
ALTER TABLE "MarketplaceListing" ADD COLUMN     "condition" TEXT,
ADD COLUMN     "contactEmail" TEXT,
ADD COLUMN     "contactName" TEXT,
ADD COLUMN     "contactPhone" TEXT,
ADD COLUMN     "ownership" TEXT;

-- AlterTable
ALTER TABLE "ServiceBooking" ADD COLUMN     "contactEmail" TEXT,
ADD COLUMN     "contactName" TEXT,
ADD COLUMN     "contactPhone" TEXT,
ADD COLUMN     "vehicleDescription" TEXT NOT NULL,
ALTER COLUMN "vehicleMake" DROP NOT NULL,
ALTER COLUMN "vehicleModel" DROP NOT NULL;
