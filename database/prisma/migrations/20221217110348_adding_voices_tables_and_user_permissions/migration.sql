-- AlterTable
ALTER TABLE "User" ADD COLUMN     "permissions" TEXT[];

-- CreateTable
CREATE TABLE "Voice" (
    "id" SERIAL NOT NULL,
    "uuidv4" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "title" VARCHAR(999) NOT NULL,
    "authorId" INTEGER,
    "users" TEXT[],
    "imageUrl" TEXT,
    "imageData" BYTEA,
    "metadata" JSONB,
    "type" TEXT,

    CONSTRAINT "Voice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VoiceSample" (
    "id" SERIAL NOT NULL,
    "uuidv4" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "title" VARCHAR(999) NOT NULL,
    "authorId" INTEGER,
    "metadata" JSONB,
    "type" TEXT,

    CONSTRAINT "VoiceSample_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VoiceOutputs" (
    "id" SERIAL NOT NULL,
    "uuidv4" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "title" VARCHAR(999) NOT NULL,
    "authorId" INTEGER,
    "voiceId" INTEGER,
    "metadata" JSONB,
    "type" TEXT,

    CONSTRAINT "VoiceOutputs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Voice_uuidv4_key" ON "Voice"("uuidv4");

-- CreateIndex
CREATE UNIQUE INDEX "VoiceSample_uuidv4_key" ON "VoiceSample"("uuidv4");

-- CreateIndex
CREATE UNIQUE INDEX "VoiceOutputs_uuidv4_key" ON "VoiceOutputs"("uuidv4");

-- AddForeignKey
ALTER TABLE "Voice" ADD CONSTRAINT "Voice_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VoiceSample" ADD CONSTRAINT "VoiceSample_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VoiceOutputs" ADD CONSTRAINT "VoiceOutputs_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VoiceOutputs" ADD CONSTRAINT "VoiceOutputs_voiceId_fkey" FOREIGN KEY ("voiceId") REFERENCES "Voice"("id") ON DELETE SET NULL ON UPDATE CASCADE;
