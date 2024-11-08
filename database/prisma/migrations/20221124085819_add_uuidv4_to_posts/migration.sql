/*
  Warnings:

  - A unique constraint covering the columns `[uuidv4]` on the table `Post` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `uuidv4` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "uuidv4" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Post_uuidv4_key" ON "Post"("uuidv4");
