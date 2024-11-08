-- DropForeignKey
ALTER TABLE "Invitation" DROP CONSTRAINT "Invitation_id_fkey";

-- AlterTable
ALTER TABLE "Invitation" ADD COLUMN     "workspaceId" INTEGER;

-- AddForeignKey
ALTER TABLE "Invitation" ADD CONSTRAINT "Invitation_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE SET NULL ON UPDATE CASCADE;
