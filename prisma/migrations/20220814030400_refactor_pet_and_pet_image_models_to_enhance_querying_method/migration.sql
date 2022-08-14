/*
  Warnings:

  - You are about to drop the column `age` on the `Pet` table. All the data in the column will be lost.
  - The primary key for the `PetImages` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `PetImages` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Pet" DROP CONSTRAINT "Pet_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "Pet" DROP CONSTRAINT "Pet_userId_fkey";

-- AlterTable
ALTER TABLE "Pet" DROP COLUMN "age",
ALTER COLUMN "breed" DROP NOT NULL,
ALTER COLUMN "breed" SET DEFAULT 'SRD',
ALTER COLUMN "userId" DROP NOT NULL,
ALTER COLUMN "organizationId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "PetImages" DROP CONSTRAINT "PetImages_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "PetImages_pkey" PRIMARY KEY ("petId");

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
