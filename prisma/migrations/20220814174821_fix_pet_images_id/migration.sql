/*
  Warnings:

  - The primary key for the `PetImages` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "PetImages" DROP CONSTRAINT "PetImages_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "PetImages_pkey" PRIMARY KEY ("id");
