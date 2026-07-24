import type { Order } from "@Types/Order.types";
import generateOrderNumber from "./generateOrderNumber";

interface BuildOrderProps {
  userId: string;

  billing: Order["billingInfo"];

  items: Order["items"];

  paymentMethod: Order["paymentMethod"];

  subtotal: number;

  discount: number;

  shipping: number;

  total: number;
}

export default function buildOrder({
  userId,
  billing,
  items,
  paymentMethod,
  subtotal,
  discount,
  shipping,
  total,
}: BuildOrderProps): Order {
  return {
    id: crypto.randomUUID(),

    userId,

    orderNumber: generateOrderNumber(),

    billingInfo: billing,

    items,

    paymentMethod,

    subtotal,

    discount,

    shipping,

    total,

    status: "Pending",

    createdAt: null as unknown as Order["createdAt"],
  };
}
