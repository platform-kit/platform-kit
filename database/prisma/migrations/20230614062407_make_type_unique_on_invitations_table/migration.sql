/*
  Warnings:

  - A unique constraint covering the columns `[type]` on the table `Invitation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Invitation_type_key" ON "Invitation"("type");
