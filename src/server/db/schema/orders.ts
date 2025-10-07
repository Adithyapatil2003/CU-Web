import { index } from "drizzle-orm/pg-core";
import { createTable } from "@/server/db/index";
import { sql } from "drizzle-orm";
import { users, type ShippingAddress } from "@/server/db/schema/index";
import {
  orderStatusEnum,
  paymentStatusEnum,
  productTypeEnum,
} from "@/server/db/schema/_enums";

export const orders = createTable(
  "order",
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
    orderNumber: d.varchar("order_number", { length: 64 }).notNull().unique(),
    productType: productTypeEnum("product_type").notNull(),
    quantity: d.integer("quantity").notNull(),
    totalAmount: d
      .numeric("total_amount", { precision: 12, scale: 2 })
      .notNull(),
    status: orderStatusEnum("status").notNull().default("pending"),
    shippingAddress: d
      .jsonb("shipping_address")
      .$type<ShippingAddress>()
      .notNull()
      .default(sql`'{}'::jsonb`),
    paymentStatus: paymentStatusEnum("payment_status").default("pending"),
    stripePaymentIntentId: d
      .varchar("stripe_payment_intent_id", { length: 255 })
      .notNull()
      .default("0"),
    trackingNumber: d
      .varchar("tracking_number", { length: 255 })
      .notNull()
      .default("0"),
    estimatedDelivery: d.timestamp("estimated_delivery", {
      mode: "date",
      withTimezone: true,
    }),
    notes: d.varchar("notes", { length: 500 }),
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
    index("order_user_idx").on(t.userId),
    index("order_status_idx").on(t.status),
    index("order_created_at_idx").on(t.createdAt),
  ],
);
