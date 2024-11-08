-- DropForeignKey
ALTER TABLE "Workspace" DROP CONSTRAINT "Workspace_id_fkey";

-- AlterTable
ALTER TABLE "Workspace" ADD COLUMN     "authorId" INTEGER;

-- AddForeignKey
ALTER TABLE "Workspace" ADD CONSTRAINT "Workspace_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
