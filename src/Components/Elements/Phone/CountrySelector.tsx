import { useMemo, useState } from "react";
import type { CountryCode } from "libphonenumber-js";
import ReactCountryFlag from "react-country-flag";
import { Check, ChevronDown } from "lucide-react";

import { countries } from "./countryData";

import { Popover } from "@Components/UI/index";

import { PopoverContent, PopoverTrigger } from "@Components/UI/popover";

import Command from "@Components/UI/command";
import {
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/Components/UI/command";

import ScrollArea from "@Components/UI/scroll-area";

interface CountrySelectorProps {
  value: CountryCode;
  onChange: (country: CountryCode) => void;
}

export default function CountrySelector({
  value,
  onChange,
}: CountrySelectorProps) {
  const [open, setOpen] = useState(false);

  const selectedCountry = useMemo(
    () => countries.find((country) => country.value === value)!,
    [value],
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        type="button"
        className="flex h-full max-w-[230px] w-[calc(100%+25px)] items-center justify-between border-r bg-transparent px-4 transition hover:bg-gray-50"
      >
        <div className="flex items-center gap-3">
          <ReactCountryFlag
            svg
            countryCode={selectedCountry.value}
            style={{
              width: "1.4rem",
              height: "1.4rem",
            }}
          />

          <span className="truncate text-sm font-medium">
            {selectedCountry.label}
          </span>
        </div>

        <ChevronDown
          size={18}
          className={`transition ${open ? "rotate-180" : ""}`}
        />
      </PopoverTrigger>

      <PopoverContent
        align="start"
        className="w-[320px] rounded-lg border-none bg-white p-0 shadow-xl"
      >
        <Command>
          <CommandInput placeholder="Search country..." />

          <CommandEmpty>No country found.</CommandEmpty>

          <ScrollArea className="h-80">
            <CommandGroup>
              {countries.map((country) => (
                <CommandItem
                  key={country.value}
                  value={`${country.label} ${country.code}`}
                  onSelect={() => {
                    onChange(country.value);
                    setOpen(false);
                  }}
                >
                  <ReactCountryFlag
                    svg
                    countryCode={country.value}
                    style={{
                      width: "1.3rem",
                      height: "1.3rem",
                    }}
                  />

                  <span className="ml-3 flex-1">{country.label}</span>

                  <span className="mr-3 text-sm text-gray-500">
                    {country.code}
                  </span>

                  {country.value === value && (
                    <Check size={16} className="text-red-500" />
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </ScrollArea>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
