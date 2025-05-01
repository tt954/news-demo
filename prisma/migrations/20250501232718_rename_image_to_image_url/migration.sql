/*
  Warnings:

  - You are about to drop the column `image` on the `Article` table. All the data in the column will be lost.
  - Added the required column `imageUrl` to the `Article` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Article" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Article" ("createdAt", "date", "id", "slug", "text", "title", "updatedAt") SELECT "createdAt", "date", "id", "slug", "text", "title", "updatedAt" FROM "Article";
DROP TABLE "Article";
ALTER TABLE "new_Article" RENAME TO "Article";
CREATE UNIQUE INDEX "Article_slug_key" ON "Article"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
