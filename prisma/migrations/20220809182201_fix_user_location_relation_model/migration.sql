/*
  Warnings:

  - The primary key for the `UserLocation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `UserLocation` table. All the data in the column will be lost.
  - Added the required column `city` to the `Location` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Location" ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "district" TEXT,
ADD COLUMN     "isMainLocation" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "UserLocation" DROP CONSTRAINT "UserLocation_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "UserLocation_pkey" PRIMARY KEY ("userId", "locationId");
