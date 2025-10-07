import { sql } from "drizzle-orm";
import { index } from "drizzle-orm/pg-core";

import {
  profiles,
  users,
  type QRAnalytics,
  type QRSettings,
} from "@/server/db/schema/index";
import { createTable } from "@/server/db/index";

export const qrcodes = createTable(
  "qr_code",
  (d) => ({
    id: d
      .varchar("id", { length: 255 })
      .notNull()
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: d
      .varchar("user_id", { length: 255 })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    profileId: d
      .varchar("profile_id", { length: 255 })
      .notNull()
      .references(() => profiles.id, { onDelete: "cascade" }),
    name: d.varchar("name", { length: 100 }).notNull(),
    qrData: d.text("qr_data").notNull(),
    qrImage: d.varchar("qr_image", { length: 255 }),
    logo: d.varchar("logo", { length: 255 }),
    scanCount: d.integer("scan_count").notNull().default(0),
    isActive: d.boolean("is_active").notNull().default(true),
    settings: d
      .jsonb("settings")
      .$type<QRSettings>()
      .notNull()
      .default(
        sql`'{"size":200,"foregroundColor":"#000000","backgroundColor":"#FFFFFF","errorCorrectionLevel":"M","margin":4}'::jsonb`,
      ),

    analytics: d
      .jsonb("analytics")
      .$type<QRAnalytics>()
      .notNull()
      .default(
        sql`'{"totalScans":0,"uniqueScans":0,"lastScannedAt":null,"scanHistory":[]}'::jsonb`,
      ),

    // timestamps (TIMESTAMPTZ)
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
    index("qr_code_user_idx").on(t.userId),
    index("qr_code_profile_idx").on(t.profileId),
    index("qr_code_is_active_idx").on(t.isActive),
    index("qr_code_created_at_idx").on(t.createdAt),
  ],
);
