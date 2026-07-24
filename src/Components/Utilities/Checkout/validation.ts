import type { BillingDetails, BillingErrors } from "@Types/Checkout.types";
import type { Dispatch, SetStateAction } from "react";

export default function validateBillingDetails (
  billingDetails: BillingDetails,
  setErrors: Dispatch<SetStateAction<BillingErrors>>,
) {
  const newErrors: BillingErrors = {};

  if (!billingDetails.firstName.trim()) {
    newErrors.firstName = "First name is required.";
  }

  if (!billingDetails.lastName.trim()) {
    newErrors.lastName = "Last name is required.";
  }

  if (!billingDetails.email.trim()) {
    newErrors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(billingDetails.email)) {
    newErrors.email = "Please enter a valid email.";
  }

  if (!billingDetails.phone.trim()) {
    newErrors.phone = "Phone number is required.";
  }

  if (!billingDetails.country.trim()) {
    newErrors.country = "Country is required.";
  }

  if (!billingDetails.city.trim()) {
    newErrors.city = "City is required.";
  }

  if (!billingDetails.streetAddress.trim()) {
    newErrors.streetAddress = "Street address is required.";
  }

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};
