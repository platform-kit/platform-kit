-- AlterTable
ALTER TABLE "Invitation" ADD COLUMN     "postId" INTEGER;

-- AddForeignKey
ALTER TABLE "Invitation" ADD CONSTRAINT "Invitation_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;
