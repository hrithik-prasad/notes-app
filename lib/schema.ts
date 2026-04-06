import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createId } from "@paralleldrive/cuid2";
import { sql } from "drizzle-orm";

export const notes = sqliteTable("Note", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  title: text("title").notNull(),
  content: text("content").notNull(),
  createdAt: text("createdAt")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updatedAt")
    .notNull()
    .$defaultFn(() => new Date().toISOString())
    .$onUpdate(() => new Date().toISOString()),
});
