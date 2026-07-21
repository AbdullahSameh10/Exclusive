import { useMemo } from "react";
import {
  parsePhoneNumberFromString,
  getCountryCallingCode,
  type CountryCode,
} from "libphonenumber-js";

import CountrySelector from "./CountrySelector";

interface PhoneFieldProps {
  defaultCountry?: CountryCode;
  value?: string;
  onChange?: (phone: string) => void;
  className?: string;
}

export default function PhoneField({
  defaultCountry = "EG",
  value,
  onChange,
  className,
}: PhoneFieldProps) {
  const parsedPhone = useMemo(() => {
    if (!value) return null;

    return parsePhoneNumberFromString(value);
  }, [value]);

  const country = parsedPhone?.country ?? defaultCountry;

  const nationalNumber = parsedPhone?.nationalNumber ?? "";

  const callingCode = `+${getCountryCallingCode(country)}`;

  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    const national = e.target.value.replace(/\D/g, "");

    onChange?.(`${callingCode}${national}`);
  }

  function handleCountryChange(newCountry: CountryCode) {
    const code = `+${getCountryCallingCode(newCountry)}`;

    onChange?.(`${code}${nationalNumber}`);
  }

  return (
    <div
      className={`flex h-12 overflow-hidden rounded-md border bg-gray-100 transition-all focus-within:ring-2 focus-within:ring-red-400 ${className}`}
    >
      <CountrySelector value={country} onChange={handleCountryChange} />

      <div className="flex flex-1 items-center">
        <span className="px-3 text-gray-500">{callingCode}</span>

        <input
          type="tel"
          id="phone"
          name="phone"
          defaultValue={nationalNumber}
          onChange={handlePhoneChange}
          placeholder="Phone number"
          className="flex-1 bg-transparent outline-none"
        />
      </div>
    </div>
  );
}
