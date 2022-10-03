-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Issue" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "creator" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "severity" INTEGER NOT NULL,
    "isResolved" BOOLEAN NOT NULL DEFAULT false,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "departmentId" TEXT NOT NULL,
    CONSTRAINT "Issue_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Issue" ("created_at", "creator", "departmentId", "description", "id", "isResolved", "severity", "title") SELECT "created_at", "creator", "departmentId", "description", "id", "isResolved", "severity", "title" FROM "Issue";
DROP TABLE "Issue";
ALTER TABLE "new_Issue" RENAME TO "Issue";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
