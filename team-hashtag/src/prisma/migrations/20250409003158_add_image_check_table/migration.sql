-- CreateTable
CREATE TABLE "ImageCheck" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "filepath" TEXT NOT NULL,
    "isCorrupted" BOOLEAN NOT NULL,
    "checkedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ImageCheck_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ImageCheck" ADD CONSTRAINT "ImageCheck_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
