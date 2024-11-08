/*
  Warnings:

  - A unique constraint covering the columns `[authorId,uuidv4]` on the table `Workspace` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Workspace_authorId_uuidv4_key" ON "Workspace"("authorId", "uuidv4");
