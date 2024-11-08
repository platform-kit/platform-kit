/*
  Warnings:

  - A unique constraint covering the columns `[userId,postId]` on the table `Invitation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Invitation_userId_postId_key" ON "Invitation"("userId", "postId");
