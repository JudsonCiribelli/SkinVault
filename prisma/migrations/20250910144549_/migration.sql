/*
  Warnings:

  - You are about to alter the column `float` on the `categoryNameSkins` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(12,11)`.

*/
-- AlterTable
ALTER TABLE "categoryNameSkins" ALTER COLUMN "float" DROP DEFAULT,
ALTER COLUMN "float" SET DATA TYPE DECIMAL(12,11);
