/*
  Warnings:

  - You are about to drop the column `imageData` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "imageData",
ADD COLUMN     "fileData" BYTEA,
ADD COLUMN     "model" TEXT,
ADD COLUMN     "textOutput" TEXT;
