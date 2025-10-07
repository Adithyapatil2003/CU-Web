import { type Config } from "drizzle-kit";

import { env } from "@/env";

export default {
  schema: "./src/server/db/schema/**/*.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  strict: true,
  verbose: true,
  tablesFilter: ["ConnectionUnlimited_*"],
  migrations: {
    table: "__drizzle_migrations_connectionunlimited__",
  },
} satisfies Config;
