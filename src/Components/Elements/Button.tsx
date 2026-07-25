import type { PropsWithChildren } from "react";

type ButtonPropsTypes = {
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
};

export default function Button({
  className = "",
  onClick,
  disabled = false,
  type = "button",
  children,
}: PropsWithChildren<ButtonPropsTypes>) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-lg bg-[#DB4444] px-5 py-3 font-poppins text-sm font-medium text-white transition-all duration-300 hover:bg-[#E07575] focus:outline-none focus:ring-2 focus:ring-[#DB4444]/30 focus:ring-offset-2 active:scale-95 disabled:scale-100 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-gray-100 disabled:hover:bg-gray-400 dark:focus:ring-offset-neutral-900 dark:disabled:bg-neutral-700 dark:disabled:text-neutral-400 sm:px-7 sm:py-3.5 sm:text-base lg:px-10 lg:py-4 ${className} `}
    >
      {children}
    </button>
  );
}
