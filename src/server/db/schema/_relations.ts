import { relations } from "drizzle-orm";
import {
  accounts,
  analytics,
  profiles,
  sessions,
  users,
  qrcodes,
  orders,
  type OrderSelect,
} from "@/server/db/schema/index";

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
}));

export const qrcodesRelations = relations(qrcodes, ({ one }) => ({
  user: one(users, { fields: [qrcodes.userId], references: [users.id] }),
  profile: one(profiles, {
    fields: [qrcodes.profileId],
    references: [profiles.id],
  }),
}));

export const analyticsRelations = relations(analytics, ({ one }) => ({
  user: one(users, { fields: [analytics.userId], references: [users.id] }),
  profiles: one(profiles, {
    fields: [analytics.profileId],
    references: [profiles.id],
  }),
  qrCode: one(qrcodes, {
    fields: [analytics.qrCodeId],
    references: [qrcodes.id],
  }),
}));

export const ordersRelations = relations(orders, ({ one }) => ({
  user: one(users, { fields: [orders.userId], references: [users.id] }),
}));

export function isDelivered(order: Pick<OrderSelect, "status">) {
  return order.status === "delivered";
}
export function isShipped(order: Pick<OrderSelect, "status">) {
  return order.status === "shipped";
}
export function isCancelled(order: Pick<OrderSelect, "status">) {
  return order.status === "cancelled";
}

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const profilesRelations = relations(profiles, ({ one, many }) => ({
  user: one(users, { fields: [profiles.userId], references: [users.id] }),
  analytics: many(analytics),
  qrcodes: many(qrcodes),
}));
