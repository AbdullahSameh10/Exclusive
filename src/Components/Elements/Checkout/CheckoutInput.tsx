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
      <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
        {label}

        {required && <span className="ml-1 text-emerald-500">*</span>}
      </span>

      <input
        {...props}
        className={`h-12 rounded-lg border bg-white px-4 text-neutral-900 outline-none transition-all duration-200 placeholder:text-neutral-400 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:placeholder:text-neutral-500 ${
          hasError
            ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-100 dark:focus:ring-red-900/40"
            : "border-neutral-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 dark:focus:border-emerald-500 dark:focus:ring-emerald-900/40"
        } ${className}`}
      />

      {hasError && (
        <span className="text-sm font-medium text-red-500">{error}</span>
      )}
    </label>
  );
}
