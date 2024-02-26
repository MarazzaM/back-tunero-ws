-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TipoAtencion" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
    "priority" INTEGER NOT NULL,
    "displayName" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "color" TEXT DEFAULT 'f6f6f6'
);
INSERT INTO "new_TipoAtencion" ("active", "color", "displayName", "id", "priority", "type") SELECT "active", "color", "displayName", "id", "priority", "type" FROM "TipoAtencion";
DROP TABLE "TipoAtencion";
ALTER TABLE "new_TipoAtencion" RENAME TO "TipoAtencion";
CREATE UNIQUE INDEX "TipoAtencion_type_key" ON "TipoAtencion"("type");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
