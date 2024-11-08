/*
  Warnings:

  - You are about to drop the column `imageData` on the `Voice` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `Voice` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "voiceId" INTEGER;

-- AlterTable
ALTER TABLE "Voice" DROP COLUMN "imageData",
DROP COLUMN "imageUrl",
ADD COLUMN     "base64" TEXT,
ADD COLUMN     "binary" BYTEA;

-- AlterTable
ALTER TABLE "Workspace" ADD COLUMN     "voiceId" INTEGER;

-- AddForeignKey
ALTER TABLE "Workspace" ADD CONSTRAINT "Workspace_voiceId_fkey" FOREIGN KEY ("voiceId") REFERENCES "Voice"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_voiceId_fkey" FOREIGN KEY ("voiceId") REFERENCES "Voice"("id") ON DELETE SET NULL ON UPDATE CASCADE;
