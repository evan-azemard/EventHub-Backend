-- AlterTable
ALTER TABLE "User" ADD COLUMN     "otpEnabled" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "otpSecret" TEXT;
