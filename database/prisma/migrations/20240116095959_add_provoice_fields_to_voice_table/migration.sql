-- AlterTable
ALTER TABLE "Voice" ADD COLUMN     "proVoiceAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "proVoiceId" TEXT;