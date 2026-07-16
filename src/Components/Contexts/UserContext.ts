import { createContext } from "react";

export type PaymentMethod =
  | "Visa"
  | "MasterCard"
  | "PayPal"
  | "Stripe"
  | "Paymob"
  | "Fawry"
  | "Vodafone Cash"
  | "InstaPay"
  | "Cash On Delivery";

const UserContext = createContext({
  verified: false,
  setVerified: (_value: boolean) => {},

  phoneVerified: false,
  setPhoneVerified: (_value: boolean) => {},

  preferredPayment: "Cash On Delivery" as PaymentMethod,
  setPreferredPayment: (_value: PaymentMethod) => {},

  userWishlist: [] as string[],
  setUserWishlist: (_value: string[]) => {},
});

export default UserContext;
