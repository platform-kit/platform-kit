/*
  Warnings:

  - Added the required column `endpoint` to the `ApiCall` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ApiCall" ADD COLUMN     "endpoint" TEXT NOT NULL,
ADD COLUMN     "raw" BYTEA,
ADD COLUMN     "stripeData" JSONB,
ADD COLUMN     "text" TEXT;
