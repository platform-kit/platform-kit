-- CreateTable
CREATE TABLE "Upload" (
    "id" SERIAL NOT NULL,
    "uuidv4" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" VARCHAR(999) NOT NULL,
    "authorId" INTEGER,
    "imageUrl" TEXT,
    "imageData" BYTEA,
    "metadata" JSONB,
    "type" TEXT,
    "fileName" TEXT,

    CONSTRAINT "Upload_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Upload_uuidv4_key" ON "Upload"("uuidv4");

-- AddForeignKey
ALTER TABLE "Upload" ADD CONSTRAINT "Upload_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
