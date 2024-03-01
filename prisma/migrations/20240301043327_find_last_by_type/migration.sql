-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Done" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "number" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "start" DATETIME NOT NULL,
    "end" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "caller" TEXT NOT NULL,
    "customer" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Done" ("caller", "customer", "end", "id", "number", "start", "type") SELECT "caller", "customer", "end", "id", "number", "start", "type" FROM "Done";
DROP TABLE "Done";
ALTER TABLE "new_Done" RENAME TO "Done";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
