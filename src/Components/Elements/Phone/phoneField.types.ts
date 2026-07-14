import type { CountryCode } from "libphonenumber-js";

export interface CountryOption {
  value: CountryCode;
  label: string;
  code: string;
}

export interface PhoneFieldProps {
  value?: string;
  defaultCountry?: CountryCode;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (phone: string, isValid: boolean) => void;
}