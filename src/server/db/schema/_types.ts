import z from "zod";
import type {
  analytics,
  orders,
  profiles,
  qrcodes,
  users,
} from "@/server/db/schema/index";

export const orderStatusSchema = z.enum([
  "pending",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
]);

export const updateStatusInputSchema = z.object({
  id: z.string(),
  newStatus: orderStatusSchema,
});

export type Location = {
  country?: string;
  region?: string;
  city?: string;
};

export type Metadata = {
  ipAddress?: string;
  userAgent?: string;
  referrer?: string;
  device?: string;
  location?: Location;
  timestamp?: string | Date;
};

export type UpdateStatusInput = z.infer<typeof updateStatusInputSchema>;
export type OrderStatus = z.infer<typeof orderStatusSchema>;

export type AnalyticsInsert = typeof analytics.$inferInsert;
export type AnalyticsSelect = typeof analytics.$inferSelect;

export type OrderInsert = typeof orders.$inferInsert;
export type OrderSelect = typeof orders.$inferSelect;

export type UserInsert = typeof users.$inferInsert;
export type UserSelect = typeof users.$inferSelect;

export type QRCodeInsert = typeof qrcodes.$inferInsert;
export type qrcodeselect = typeof qrcodes.$inferSelect;

export type ProfileInsert = typeof profiles.$inferInsert;
export type ProfileSelect = typeof profiles.$inferSelect;

export type QRErrorCorrectionLevel = "L" | "M" | "Q" | "H";

export type QRSettings = {
  size?: number;
  foregroundColor?: string;
  backgroundColor?: string;
  errorCorrectionLevel?: QRErrorCorrectionLevel;
  margin?: number;
};

export type ScanEntry = {
  timestamp?: string | Date;
  ipAddress?: string | null;
  userAgent?: string | null;
  location?: string | null;
  device?: string | null;
};

export type QRAnalytics = {
  totalScans?: number;
  uniqueScans?: number;
  lastScannedAt?: string | Date | null;
  scanHistory?: ScanEntry[];
};

export type SocialLinks = {
  website?: string;
  linkedin?: string;
  twitter?: string;
  instagram?: string;
  facebook?: string;
  youtube?: string;
  github?: string;
};

export type ContactInfo = {
  email?: string;
  phone?: string;
  address?: string;
};

export type CustomFieldType = "text" | "link" | "email" | "phone";

export type CustomField = {
  label?: string;
  value?: string;
  type?: CustomFieldType;
};

export type ProfileSettings = {
  showEmail?: boolean;
  showPhone?: boolean;
  allowContact?: boolean;
  analyticsEnabled?: boolean;
};

export type ShippingAddress = {
  firstName?: string;
  lastName?: string;
  company?: string;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  phone?: string;
};
