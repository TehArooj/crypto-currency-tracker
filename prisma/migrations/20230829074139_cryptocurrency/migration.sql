-- CreateTable
CREATE TABLE "CryptoCurrency" (
    "uid" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
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

-- CreateIndex
CREATE UNIQUE INDEX "CryptoCurrency_rank_key" ON "CryptoCurrency"("rank");
