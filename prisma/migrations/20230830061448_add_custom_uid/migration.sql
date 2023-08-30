/*
  Warnings:

  - The primary key for the `CryptoCurrency` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CryptoCurrency" (
    "uid" TEXT NOT NULL PRIMARY KEY,
    "id" TEXT NOT NULL,
    "rank" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "supply" TEXT NOT NULL,
    "maxSupply" TEXT NOT NULL,
    "marketCapUsd" TEXT NOT NULL,
    "volumeUsd24Hr" TEXT NOT NULL,
    "priceUsd" TEXT NOT NULL,
    "changePercent24Hr" TEXT NOT NULL,
    "vwap24Hr" TEXT NOT NULL,
    "explorer" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "CryptoCurrency_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_CryptoCurrency" ("changePercent24Hr", "createdAt", "explorer", "id", "marketCapUsd", "maxSupply", "name", "priceUsd", "rank", "supply", "symbol", "uid", "updatedAt", "userId", "volumeUsd24Hr", "vwap24Hr") SELECT "changePercent24Hr", "createdAt", "explorer", "id", "marketCapUsd", "maxSupply", "name", "priceUsd", "rank", "supply", "symbol", "uid", "updatedAt", "userId", "volumeUsd24Hr", "vwap24Hr" FROM "CryptoCurrency";
DROP TABLE "CryptoCurrency";
ALTER TABLE "new_CryptoCurrency" RENAME TO "CryptoCurrency";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
