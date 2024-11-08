/*
  Warnings:

  - You are about to drop the `VoiceOutputs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "VoiceOutputs" DROP CONSTRAINT "VoiceOutputs_authorId_fkey";

-- DropForeignKey
ALTER TABLE "VoiceOutputs" DROP CONSTRAINT "VoiceOutputs_voiceId_fkey";

-- DropTable
DROP TABLE "VoiceOutputs";

-- CreateTable
CREATE TABLE "VoiceOutput" (
    "id" SERIAL NOT NULL,
    "uuidv4" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "title" VARCHAR(999) NOT NULL,
    "authorId" INTEGER,
    "raw" BYTEA,
    "voiceId" INTEGER,
    "metadata" JSONB,
    "type" TEXT,

    CONSTRAINT "VoiceOutput_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VoiceOutput_uuidv4_key" ON "VoiceOutput"("uuidv4");

-- AddForeignKey
ALTER TABLE "VoiceOutput" ADD CONSTRAINT "VoiceOutput_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VoiceOutput" ADD CONSTRAINT "VoiceOutput_voiceId_fkey" FOREIGN KEY ("voiceId") REFERENCES "Voice"("id") ON DELETE SET NULL ON UPDATE CASCADE;
