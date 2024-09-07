/*
  Warnings:

  - Added the required column `role` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wallet_address` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "UserRole" NOT NULL,
ADD COLUMN     "total_coins" INTEGER DEFAULT 0,
ADD COLUMN     "used_coins" INTEGER DEFAULT 0,
ADD COLUMN     "wallet_address" TEXT NOT NULL;
