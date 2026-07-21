import type { InputHTMLAttributes, ReactNode } from "react";

interface CheckoutInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string | ReactNode;
  required?: boolean;
  error?: string;
}

export default function CheckoutInput({
  label,
  required,
  error,
  className = "",
  ...props
}: CheckoutInputProps) {
  const hasError =
    Boolean(error) &&
    typeof props.value === "string" &&
    props.value.trim() === "";

  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-medium text-neutral-700">
        {label}

        {required && <span className="ml-1 text-emerald-500">*</span>}
      </span>

      <input
        {...props}
        className={`h-12 rounded-lg border bg-white px-4 outline-none transition-all duration-200 placeholder:text-neutral-400 ${
          hasError
            ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-100"
            : "border-neutral-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
        } ${className}`}
      />

      {hasError && (
        <span className="text-sm font-medium text-red-500">{error}</span>
      )}
    </label>
  );
}
