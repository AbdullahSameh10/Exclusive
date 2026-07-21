export type OrderStatus =
  "Pending" | "Confirmed" | "Preparing" | "Shipped" | "Delivered" | "Cancelled";

export interface OrderProduct {
  id: number;
  title: string;
  thumbnail: string;
  price: number;
  quantity: number;
}

export interface Order {
  userId: string;

  orderNumber: string;

  createdAt: Date;

  status: OrderStatus;

  paymentMethod: string;

  billingInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    country: string;
    city: string;
    streetAddress: string;
    apartment: string;
    orderNotes: string;
  };

  items: OrderProduct[];

  subtotal: number;

  discount: number;

  shipping: number;

  total: number;
}
