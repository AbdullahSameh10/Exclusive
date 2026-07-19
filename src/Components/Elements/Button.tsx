import type { PropsWithChildren } from "react";

type ButtonPropsTypes = {
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
};

export default function Button(props: PropsWithChildren<ButtonPropsTypes>) {
  const { className, onClick, disabled, type, children } = props;
  return (
    <button
      className={`flex items-center justify-center gap-[10px] rounded-[4px] border-none bg-[#DB4444] px-12 py-4 font-poppins text-base font-medium text-[#F5F5F5] outline-none transition-all duration-300 hover:bg-[#E07575] active:scale-95 ${className}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
}
