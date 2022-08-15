/*
  Warnings:

  - The values [outro] on the enum `petType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "petType_new" AS ENUM ('cat', 'dog', 'rabbit', 'rodent', 'bird', 'other');
ALTER TABLE "Pet" ALTER COLUMN "type" TYPE "petType_new" USING ("type"::text::"petType_new");
ALTER TYPE "petType" RENAME TO "petType_old";
ALTER TYPE "petType_new" RENAME TO "petType";
DROP TYPE "petType_old";
COMMIT;
