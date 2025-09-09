/*
  Warnings:

  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CategoryItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CategoryNameSkin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PurchasedItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SellingItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CategoryItem" DROP CONSTRAINT "CategoryItem_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "CategoryNameSkin" DROP CONSTRAINT "CategoryNameSkin_categoryItemId_fkey";

-- DropForeignKey
ALTER TABLE "CategoryNameSkin" DROP CONSTRAINT "CategoryNameSkin_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "PurchasedItem" DROP CONSTRAINT "PurchasedItem_skinId_fkey";

-- DropForeignKey
ALTER TABLE "PurchasedItem" DROP CONSTRAINT "PurchasedItem_userId_fkey";

-- DropForeignKey
ALTER TABLE "SellingItem" DROP CONSTRAINT "SellingItem_skinId_fkey";

-- DropForeignKey
ALTER TABLE "SellingItem" DROP CONSTRAINT "SellingItem_userId_fkey";

-- DropTable
DROP TABLE "Category";

-- DropTable
DROP TABLE "CategoryItem";

-- DropTable
DROP TABLE "CategoryNameSkin";

-- DropTable
DROP TABLE "PurchasedItem";

-- DropTable
DROP TABLE "SellingItem";

-- CreateTable
CREATE TABLE "categorys" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categorys_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categoryItems" (
    "id" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categoryItems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categoryNameSkins" (
    "id" TEXT NOT NULL,
    "categoryItemId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "float" DOUBLE PRECISION NOT NULL,
    "sellerName" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "wear" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categoryNameSkins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PurchasedItems" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "skinId" TEXT NOT NULL,
    "purchasedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PurchasedItems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SellingItems" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "skinId" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "listedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SellingItems_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "categoryItems" ADD CONSTRAINT "categoryItems_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categorys"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categoryNameSkins" ADD CONSTRAINT "categoryNameSkins_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categoryNameSkins" ADD CONSTRAINT "categoryNameSkins_categoryItemId_fkey" FOREIGN KEY ("categoryItemId") REFERENCES "categoryItems"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchasedItems" ADD CONSTRAINT "PurchasedItems_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchasedItems" ADD CONSTRAINT "PurchasedItems_skinId_fkey" FOREIGN KEY ("skinId") REFERENCES "categoryNameSkins"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SellingItems" ADD CONSTRAINT "SellingItems_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SellingItems" ADD CONSTRAINT "SellingItems_skinId_fkey" FOREIGN KEY ("skinId") REFERENCES "categoryNameSkins"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
