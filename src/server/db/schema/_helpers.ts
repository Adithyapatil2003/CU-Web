import { sql, eq, getTableColumns } from "drizzle-orm";
import { db } from "@/server/db";
import { orders, updateStatusInputSchema, type OrderInsert, type OrderSelect } from "@/server/db/schema/index";

export function getQrUrl(apiBase: string, id: string) {
  return `${apiBase}/api/qr/${id}/download`;
}

export function getScanUrl(apiBase: string, id: string) {
  return `${apiBase}/api/qr/scan/${id}`;
}

export function generateOrderNumber(): string {
  const timestamp = Date.now().toString();
  const random = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");
  return `TAP${timestamp}${random}`;
}

export async function createOrderWithAutoNumber(
  base: Omit<OrderInsert, "orderNumber" | "id" | "createdAt" | "updatedAt">,
  maxRetries = 5,
) {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    const orderNumber = generateOrderNumber();
    try {
      const [row] = await db
        .insert(orders)
        .values({ ...base, orderNumber })
        .returning();
      return row;
    } catch (err: unknown) {
      if (
        typeof err === "object" &&
        err !== null &&
        "code" in err &&
        typeof (err as { code?: unknown }).code === "string" &&
        (err as { code: string }).code === "23505"
      ) {
        if (attempt < maxRetries - 1) continue;
      }

      throw err;
    }
  }
  throw new Error("Failed to generate a unique order number");
}

export async function updateOrderStatus(
  input: unknown, // <-- accept the value you want to parse
): Promise<OrderSelect | undefined> {
  const { id, newStatus } = updateStatusInputSchema.parse(input);

  const setEstimated =
    newStatus === "shipped" ? sql`now() + interval '7 days'` : null;

  const [row] = await db
    .update(orders)
    .set({
      status: newStatus,
      estimatedDelivery: setEstimated,
      updatedAt: new Date(),
    })
    .where(eq(orders.id, id))
    .returning();

  return row;
}

export async function getOrdersWithStatus() {
  const rows = await db
    .select({
      ...getTableColumns(orders),
      isDelivered: sql<boolean>`${orders.status} = 'delivered'`,
      isShipped: sql<boolean>`${orders.status} = 'shipped'`,
      isCancelled: sql<boolean>`${orders.status} = 'cancelled'`,
    })
    .from(orders);
  return rows;
}
