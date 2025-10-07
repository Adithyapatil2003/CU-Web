import { sql } from "drizzle-orm";
import { index } from "drizzle-orm/pg-core";
import { profiles, users } from  "@/server/db/schema/index";
import type { Metadata } from "@/server/db/schema/_types";
import { createTable } from "@/server/db/index";

export const analytics = createTable(
  "analytics",
  (d) => ({
    id: d.uuid("id").defaultRandom().primaryKey(),
    userId: d
      .varchar("user_id", { length: 255 })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    profileId: d
      .varchar("profile_id", { length: 255 })
      .notNull()
      .references(() => profiles.id, { onDelete: "cascade" }),

    qrCodeId: d
      .varchar("profile_id", { length: 255 })
      .notNull()
      .references(() => profiles.id, { onDelete: "cascade" }),

    eventType: d.text("event_type").notNull().default("general"),
    eventCategory: d.text("event_category").default("engagement"),
    eventAction: d.text("event_action").notNull().default("unknown"),

    metadata: d
      .jsonb("metadata")
      .$type<Metadata>()
      .notNull()
      .default(sql`'{}'::jsonb`),
    session: d
      .jsonb("session")
      .$type<Record<string, unknown>>()
      .notNull()
      .default(sql`'{}'::jsonb`),
    userJourney: d
      .jsonb("user_journey")
      .$type<Record<string, unknown>>()
      .notNull()
      .default(sql`'{}'::jsonb`),
    performance: d
      .jsonb("performance")
      .$type<Record<string, unknown>>()
      .notNull()
      .default(sql`'{}'::jsonb`),
    conversion: d
      .jsonb("conversion")
      .$type<Record<string, unknown>>()
      .notNull()
      .default(sql`'{}'::jsonb`),

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
    index("analytics_user_idx").on(t.userId),
    index("analytics_created_at_idx").on(t.createdAt),
    index("analytics_event_type_idx").on(t.eventType),
    index("analytics_user_created_at_idx").on(t.userId, t.createdAt),
  ],
);
