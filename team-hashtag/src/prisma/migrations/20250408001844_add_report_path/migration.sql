/*
  Warnings:

  - Added the required column `reportPath` to the `UploadedLog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UploadedLog" ADD COLUMN     "reportPath" TEXT NOT NULL;
