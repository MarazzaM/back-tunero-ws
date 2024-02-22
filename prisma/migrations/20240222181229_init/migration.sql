/*
  Warnings:

  - You are about to drop the column `display_name` on the `TipoAtencion` table. All the data in the column will be lost.
  - Added the required column `displayName` to the `TipoAtencion` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TipoAtencion" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
    "priority" INTEGER NOT NULL,
    "displayName" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL
);
INSERT INTO "new_TipoAtencion" ("active", "id", "priority", "type") SELECT "active", "id", "priority", "type" FROM "TipoAtencion";
DROP TABLE "TipoAtencion";
ALTER TABLE "new_TipoAtencion" RENAME TO "TipoAtencion";
CREATE UNIQUE INDEX "TipoAtencion_type_key" ON "TipoAtencion"("type");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
