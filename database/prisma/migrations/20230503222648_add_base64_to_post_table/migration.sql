/*
  Warnings:

  - You are about to drop the column `textOutput` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "textOutput",
ADD COLUMN     "base64" TEXT,
ADD COLUMN     "text" TEXT;
