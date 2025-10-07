import { pgTableCreator } from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

// Replace with your own env loader
const DATABASE_URL = process.env.DATABASE_URL!;
const NODE_ENV = process.env.NODE_ENV || "development";

/**
 * Cache the connection in dev to avoid rebuilding on HMR.
 */
const globalForDb = globalThis as unknown as { conn?: postgres.Sql };
const conn =
  globalForDb.conn ??
  postgres(DATABASE_URL, {
    ssl: NODE_ENV === "production" ? "require" : false,
  });
if (NODE_ENV !== "production") globalForDb.conn = conn;

export const db = drizzle(conn);

/**
 * Namespaced table creator for multi-project schemas
 * (Drizzle Kit filters these via tablesFilter).
 */
export const createTable = pgTableCreator(
  (name) => `ConnectionUnlimited_${name}`,
);
