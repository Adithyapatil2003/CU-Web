import { sql } from "drizzle-orm";
import { index } from "drizzle-orm/pg-core";
import { userRoleEnum } from "@/server/db/schema/_enums";
import { createTable } from "@/server/db/index";

export const users = createTable(
  "user",
  (d) => ({
    id: d
      .varchar({ length: 255 })
      .notNull()
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    name: d.varchar({ length: 255 }),
    email: d.varchar({ length: 255 }).notNull(),
    emailVerified: d
      .timestamp({
        mode: "date",
        withTimezone: true,
      })
      .default(sql`CURRENT_TIMESTAMP`),
    image: d.varchar({ length: 255 }),
    role: userRoleEnum("role").notNull().default("user"),
    permissions: d
      .text("permissions")
      .array()
      .notNull()
      .default(sql`'{}'::text[]`),
    isLocked: d.boolean("is_locked").notNull().default(false),
    loginAttempts: d.integer("login_attempts").notNull().default(0),
    lockUntil: d.timestamp("lock_until", { mode: "date", withTimezone: true }),
    lastLogin: d.timestamp("last_login", { mode: "date", withTimezone: true }),

    resetPasswordToken: d.varchar("reset_password_token", { length: 255 }),
    resetPasswordExpire: d.timestamp("reset_password_expire", {
      mode: "date",
      withTimezone: true,
    }),

    emailVerificationToken: d.varchar("email_verification_token", {
      length: 255,
    }),
    emailVerificationExpire: d.timestamp("email_verification_expire", {
      mode: "date",
      withTimezone: true,
    }),

    createdAt: d
      .timestamp("created_at", { mode: "date", withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: d
      .timestamp("updated_at", { mode: "date", withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull()
      .$onUpdate(() => new Date()),
  }),
  (t) => [
    index("user_email_idx").on(t.email),
    index("user_role_idx").on(t.role),
    index("user_is_locked_idx").on(t.isLocked),
  ],
);
