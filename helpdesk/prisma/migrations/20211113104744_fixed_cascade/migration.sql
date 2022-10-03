-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Comment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "comment" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "issueId" TEXT NOT NULL,
    CONSTRAINT "Comment_issueId_fkey" FOREIGN KEY ("issueId") REFERENCES "Issue" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Comment" ("comment", "created_at", "id", "issueId") SELECT "comment", "created_at", "id", "issueId" FROM "Comment";
DROP TABLE "Comment";
ALTER TABLE "new_Comment" RENAME TO "Comment";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
