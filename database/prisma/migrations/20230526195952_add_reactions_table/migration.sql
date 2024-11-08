-- CreateTable
CREATE TABLE "Reaction" (
    "id" SERIAL NOT NULL,
    "uuidv4" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "thread" TEXT,
    "authorId" INTEGER,
    "content" TEXT,
    "metadata" JSONB,
    "type" TEXT,
    "parentId" INTEGER,

    CONSTRAINT "Reaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Reaction_uuidv4_key" ON "Reaction"("uuidv4");

-- AddForeignKey
ALTER TABLE "Reaction" ADD CONSTRAINT "Reaction_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reaction" ADD CONSTRAINT "Reaction_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Reaction"("id") ON DELETE SET NULL ON UPDATE CASCADE;
