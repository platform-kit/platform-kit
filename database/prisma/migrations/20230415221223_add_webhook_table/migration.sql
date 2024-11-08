-- CreateTable
CREATE TABLE "Webhook" (
    "id" SERIAL NOT NULL,
    "uuidv4" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" VARCHAR(999) NOT NULL,
    "url" TEXT,
    "text" TEXT,
    "binary" BYTEA,
    "json" JSONB,
    "metadata" JSONB,
    "type" TEXT,

    CONSTRAINT "Webhook_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Webhook_uuidv4_key" ON "Webhook"("uuidv4");
