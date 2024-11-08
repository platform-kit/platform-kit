/*
  Warnings:

  - A unique constraint covering the columns `[uuidv4]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "ApiCall" ADD COLUMN     "compute_seconds" DOUBLE PRECISION,
ADD COLUMN     "cost_usd" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "uuidv4" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_uuidv4_key" ON "User"("uuidv4");
