import { sql } from "drizzle-orm";
import { createTable } from "@/server/db/index";
import { index } from "drizzle-orm/pg-core";
import { users, type ContactInfo, type CustomField, type ProfileSettings, type SocialLinks } from "@/server/db/schema/index";
import { profileTheme } from "./_enums";

export const profiles = createTable(
  "profile",
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
    displayName: d.varchar("display_name", { length: 100 }).notNull(),
    username: d.varchar("username", { length: 64 }).unique().notNull(),
    bio: d.varchar("bio", { length: 500 }).notNull(),
    avatar: d.varchar("avatar", { length: 255 }),
    theme: profileTheme("theme").notNull().default("default"),
    isPublic: d.boolean("is_public").notNull().default(true),
    socialLinks: d
      .jsonb("social_links")
      .$type<SocialLinks>()
      .notNull()
      .default(sql`'{}'::jsonb`),

    contactInfo: d
      .jsonb("contact_info")
      .$type<ContactInfo>()
      .notNull()
      .default(sql`'{}'::jsonb`),
    customFields: d
      .jsonb("custom_fields")
      .$type<CustomField[]>()
      .notNull()
      .default(sql`'[]'::jsonb`),
    settings: d
      .jsonb("settings")
      .$type<ProfileSettings>()
      .notNull()
      .default(
        sql`'{"showEmail":false,"showPhone":false,"allowContact":true,"analyticsEnabled":true}'::jsonb`,
      ),
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
    index("profile_user_idx").on(t.userId),
    index("profile_username_idx").on(t.username),
    index("profile_is_public_idx").on(t.isPublic),
  ],
);
