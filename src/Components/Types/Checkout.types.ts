export type BillingDetails = {
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

export type BillingErrors = Partial<Record<keyof BillingDetails, string>>;