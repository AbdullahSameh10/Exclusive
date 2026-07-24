export type OrderStatus = "Pending" | "Confirmed" | "Preparing" | "Shipped" | "Delivered" | "Cancelled";

export interface OrderItem {
  id: number;
  title: string;
  thumbnail: string;
  price: number;
  quantity: number;
}

export interface BillingInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  streetAddress: string;
  apartment: string;
  orderNotes: string;
}

export interface Order {
  id: string;
  
  userId: string;

  orderNumber: string;

  createdAt: number;

  status: OrderStatus;

  paymentMethod: string;

  billingInfo: BillingInfo;

  items: OrderItem[];

  subtotal: number;

  discount: number;

  shipping: number;

  total: number;
}
