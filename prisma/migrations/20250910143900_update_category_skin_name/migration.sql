/*
  Warnings:

  - The `float` column on the `categoryNameSkins` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "categoryNameSkins" DROP COLUMN "float",
ADD COLUMN     "float" INTEGER NOT NULL DEFAULT 0;
