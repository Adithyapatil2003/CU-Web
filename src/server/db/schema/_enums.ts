import { pgEnum } from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum("user_role_enum", [
  "user",
  "admin",
  "super_admin",
]);

export const productTypeEnum = pgEnum("product_type_enum", [
  "nfc_card",
  "review_card",
]);

export const orderStatusEnum = pgEnum("order_status_enum", [
  "pending",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
]);

export const paymentStatusEnum = pgEnum("payment_status_enum", [
  "pending",
  "paid",
  "failed",
  "refunded",
]);

export const profileTheme = pgEnum("profile_theme", [
  "default",
  "dark",
  "light",
  "colorful",
  "minimal",
]);
