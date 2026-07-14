import {
  getCountryCallingCode,
  type CountryCode,
} from "libphonenumber-js";

export function getFullPhone(country: CountryCode, phone: string) {
  return `+${getCountryCallingCode(country)}${phone}`;
}

export function getCallingCode(country: CountryCode) {
  return "+" + getCountryCallingCode(country);
}
