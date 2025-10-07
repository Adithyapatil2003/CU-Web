// scripts/migrate.ts
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { db } from "@/server/db";
import path from "path";

async function main() {
  await migrate(db, { migrationsFolder: path.resolve("drizzle") });
  console.log("✅ Migrations applied");
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Migration failed:", err);
  process.exit(1);
});
