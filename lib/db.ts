import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "./schema";

const globalForDb = globalThis as unknown as {
  db: ReturnType<typeof drizzle>;
};

function createClient() {
  const url = process.env.DATABASE_URL!;
  const filepath = url.startsWith("file:") ? url.slice(5) : url;
  const sqlite = new Database(filepath);
  sqlite.pragma("journal_mode = WAL");
  return drizzle(sqlite, { schema });
}

export const db = globalForDb.db || createClient();

if (process.env.NODE_ENV !== "production") {
  globalForDb.db = db;
}
